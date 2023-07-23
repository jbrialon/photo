<template>
  <div class="velo">
    <div class="velo__content" v-cloak>
      <div class="title-wrap">
        <h1 class="title">Complètement à l'est //</h1>
        <span class="subtitle" v-if="false">
          Jour {{ activity.dayNumber }} :
          {{ velo[activity.dayNumber - 1].startLocation }} -
          {{ velo[activity.dayNumber - 1].endLocation }}
        </span>
        <div class="subtitle" v-if="false">
          Distance :
          <animated-number
            :value="activity.totalDistance"
            :duration="1000"
            :formatValue="formatToKm"
          />
        </div>
        <div class="subtitle" v-if="false">
          Denivelé :
          <animated-number
            :value="activity.totalElevation"
            :duration="1000"
            :formatValue="formatToElevation"
          />
        </div>
      </div>
    </div>
    <div class="velo__map" v-cloak>
      <div id="map" ref="map"></div>
    </div>
  </div>
</template>

<script>
import content from "../data/content";
import Header from "../components/Header";
import geojson from "../assets/geojson/full.json";
import data from "../data/velo.json";
import gju from "geojson-utils";
import MobileDetect from "mobile-detect";
import AnimatedNumber from "animated-number-vue";
import { parse, format } from "date-fns";
import { enGB } from "date-fns/locale";
import { find } from "lodash";

const md = new MobileDetect(window.navigator.userAgent);
const startPath = [6.236866, 46.198834];
let map = null;
let emptyGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [startPath],
      },
    },
  ],
};
const mapOptions = {
  token:
    "pk.eyJ1IjoiamJyaWFsb24iLCJhIjoiZjJkNjkyNDNiMzU0YjAxY2FjNGZlMjU3MGFiYjYyZmQifQ.lwFTmFgGxSuvfoJdTcx7Jg",
  style: "mapbox://styles/jbrialon/cktviax1t2amj19qooc4d32qy/draft",
  center: [6.621296291298819, 46.31963262434434],
  zoom: 10,
};

const photosOnMap = [];
function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}

export default {
  name: "velo",
  metaInfo() {
    return {
      title: this.$t("velo.displayName").toUpperCase(),
      titleTemplate: `%s //`,
      meta: content.velo.meta,
    };
  },
  data() {
    return {
      isMobile: md.phone() !== null,
      links: content.social,
      content: content.velo,
      animation: null,
      animationParams: {
        speedFactor: 45,
        index: 0,
      },
      activity: {
        currentDate: new Date(
          geojson.features[0].properties.coordinateProperties.times[0]
        ),
        currentDay: new Date(
          geojson.features[0].properties.coordinateProperties.times[0]
        ).getDate(),
        dayNumber: 1,
        circPos: [],
        bounds: [
          new mapboxgl.LngLatBounds(
            [6.236866, 46.198834],
            [6.841184, 46.459159]
          ),
          new mapboxgl.LngLatBounds(
            [6.841184, 46.459159],
            [7.347178503121125, 46.61349919114108]
          ),
          new mapboxgl.LngLatBounds([7.322, 46.4245], [8.190455, 46.71943]),
          new mapboxgl.LngLatBounds(
            [8.190455, 46.71943],
            [8.513203, 47.170359]
          ),
          new mapboxgl.LngLatBounds(
            [8.513203, 47.170359],
            [9.186209, 47.115204]
          ),
          new mapboxgl.LngLatBounds(
            [9.186209, 47.115204],
            [9.705132257091371, 47.554503792029195]
          ),
        ],
        totalDistance: 0,
        totalElevation: 0,
      },
      velo: data.velo,
    };
  },
  components: {
    "c-header": Header,
    "animated-number": AnimatedNumber,
  },
  computed: {
    photos() {
      // create a new context to get all images in assets/photos
      const req = require.context("../assets/photos/velo", true, /\.jpg$/);
      const photos = req
        .keys()
        // return an Array of require items
        .map((item) => req(item))
        .map((item) => {
          const parsedDate = parse(
            item.exif.CreateDate,
            "y:MM:dd HH:mm:ss",
            new Date(),
            { locale: enGB }
          );
          item.date = {
            parsedDate: parsedDate,
            day: format(parsedDate, "dd"),
            hour: format(parsedDate, "HH"),
            minute: format(parsedDate, "mm"),
          };
          return item;
        });
      return photos;
    },
  },
  methods: {
    animateLine(timestamp) {
      let currentDate = null;
      let currentDay = null;
      let times = geojson.features[0].properties.coordinateProperties.times;
      // stop if it finishes
      if (
        this.animationParams.index >=
        geojson.features[0].geometry.coordinates.length
      ) {
        let lastPos = [
          geojson.features[0].geometry.coordinates[
            geojson.features[0].geometry.coordinates.length - 1
          ][0],
          geojson.features[0].geometry.coordinates[
            geojson.features[0].geometry.coordinates.length - 1
          ][1],
        ];
        this.drawCircle(lastPos, this.animationParams.index);
        this.activity.totalDistance +=
          this.velo[this.activity.dayNumber - 1].distance;
        this.activity.totalElevation +=
          this.velo[this.activity.dayNumber - 1].elevation;
        cancelAnimationFrame(this.animation);
      } else {
        // get the next position
        let pos = [
          geojson.features[0].geometry.coordinates[
            this.animationParams.index
          ][0],
          geojson.features[0].geometry.coordinates[
            this.animationParams.index
          ][1],
        ];
        // append new coordinates to the lineString
        emptyGeoJson.features[0].geometry.coordinates.push(pos);
        if (
          this.animationParams.index > 88029 &&
          this.animationParams.index < 88704
        ) {
          this.animationParams.index += 3;
        } else {
          this.animationParams.index += this.animationParams.speedFactor;
        }
        currentDate = new Date(times[this.animationParams.index]);
        currentDay = currentDate.getDate();

        const photo = find(this.photos, (photo) => {
          return (
            Number(photo.date.day) === currentDay &&
            Number(photo.date.hour) === currentDate.getHours() &&
            inRange(
              currentDate.getMinutes(),
              Number(photo.date.minute) - 9,
              Number(photo.date.minute) + 9
            )
          );
        });

        if (photo) {
          if (!photosOnMap.includes(photo.src)) {
            photosOnMap.push(photo.src);
            let marker = new mapboxgl.Marker();
            let coord = new mapboxgl.LngLat(
              geojson.features[0].geometry.coordinates[
                this.animationParams.index
              ][0],
              geojson.features[0].geometry.coordinates[
                this.animationParams.index
              ][1]
            );
            marker.setLngLat(coord);
            marker.setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<img src="${photo.src}" width="190px">`)
            );
            marker.addTo(map);
          }
        }

        if (this.activity.currentDay !== currentDay) {
          this.activity.currentDate = currentDate;
          this.activity.currentDay = currentDay;
          this.activity.dayNumber++;
          this.drawCircle(pos, this.animationParams.index);
          map.fitBounds(this.activity.bounds[this.activity.dayNumber - 1], {
            padding: this.isMobile ? 45 : 150,
          });
          this.activity.totalDistance +=
            this.velo[this.activity.dayNumber - 1].distance;
          this.activity.totalElevation +=
            this.velo[this.activity.dayNumber - 1].elevation;
        }
        // then update the map
        map.getSource("line").setData(emptyGeoJson);
        // Request the next frame of the animation.
        this.animation = requestAnimationFrame(this.animateLine);
      }
    },
    mapload() {
      map.addSource("line", {
        type: "geojson",
        data: emptyGeoJson,
      });

      map.addLayer({
        id: "line-animation",
        type: "line",
        source: "line",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "grey",
          "line-width": 3,
          "line-opacity": 1,
        },
      });

      map.fitBounds(this.activity.bounds[this.activity.dayNumber - 1], {
        padding: this.isMobile ? 60 : 300,
      });
      this.activity.totalDistance +=
        this.velo[this.activity.dayNumber - 1].distance;
      this.activity.totalElevation +=
        this.velo[this.activity.dayNumber - 1].elevation;

      map.on("click", "line-animation", (e) => {
        var coordinates = geojson.features[0].geometry.coordinates;
        var times = geojson.features[0].properties.coordinateProperties.times;
        var closestIndex = null;
        var testDistance = null;
        coordinates.forEach((coordinate, index) => {
          const PointOne = [e.lngLat.lng, e.lngLat.lat];
          const PointTwo = [coordinate[0], coordinate[1]];
          const distance = gju.pointDistance(
            { type: "Point", coordinates: PointOne },
            { type: "Point", coordinates: PointTwo }
          );
          if (!testDistance || distance < testDistance) {
            closestIndex = index;
            testDistance = distance;
          }
        });
        const testDate = new Date(times[closestIndex]);
        console.log(testDate);
      });

      // Mouse over gpx
      map.on("mouseenter", "line-animation", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Mouse out GPX
      map.on("mouseleave", "line-animation", () => {
        map.getCanvas().style.cursor = "";
      });
      // this.map.scrollZoom.disable()

      this.drawCircle(startPath, 0);
      this.animateLine();
    },
    drawCircle(pos, index) {
      this.activity.circPos.push(pos);

      const sourceName = `source-circle-${index}`;
      const id = `circle-${index}`;
      let radius = 0;
      map.addSource(sourceName, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: pos,
              },
            },
          ],
        },
      });

      map.addLayer({
        id: id,
        type: "circle",
        source: sourceName,
        properties: {
          test: "huhu",
        },
        paint: {
          "circle-radius": radius,
          "circle-radius-transition": {
            duration: 0,
          },
          "circle-color": "DimGray",
          "circle-opacity": 1,
        },
      });

      map.addLayer({
        id: `${id}_border`,
        type: "circle",
        source: sourceName,
        paint: {
          "circle-radius": radius + 12,
          "circle-radius-transition": {
            duration: 0,
          },
          "circle-color": "DimGray",
          "circle-opacity": 0,
          "circle-stroke-color": "DimGray",
          "circle-stroke-width": 1,
          "circle-stroke-opacity": 0,
        },
      });

      const anim = setInterval(() => {
        map.setPaintProperty(id, "circle-radius", radius);
        radius = ++radius % 20;
        if (radius >= 10) {
          clearInterval(anim);
          map.setPaintProperty(`${id}_border`, "circle-stroke-opacity", 1);
        }
      }, 50);

      // Mouse over circle
      map.on("mouseenter", id, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Mouse out circle
      map.on("mouseleave", id, () => {
        map.getCanvas().style.cursor = "";
      });
    },
    formatToKm(value) {
      return `${Number(value).toFixed(2)} km`;
    },
    formatToElevation(value) {
      return `${Number(value).toFixed(0)} m`;
    },
  },
  mounted() {
    mapboxgl.accessToken = mapOptions.token;
    map = new mapboxgl.Map({
      container: "map", // container id
      style: mapOptions.style, // stylesheet location
      center: mapOptions.center, // starting position [lng, lat]
      zoom: mapOptions.zoom, // starting zoom
    });
    map.on("load", this.mapload);
  },
};
</script>

<style scoped lang="scss">
@import "../scss/vars";
@import "../scss/mixins";

.velo {
  position: relative;
  width: 100vw;
  height: 100vh;

  &__content {
    pointer-events: none;
    position: relative;
    z-index: 10;
    width: 100vw;
    height: 100vh;

    .title-wrap {
      position: absolute;
      top: 10vh;
      left: 10vh;
      text-align: left;
      @include small-only {
        top: 5vh;
        left: 5vh;
      }
      .title {
        margin: 0;
        padding: 0;
        font-size: 2rem;
        line-height: 1.2;
        margin-bottom: 10px;
        @include small-only {
          font-size: 1.5rem;
          margin-bottom: 5px;
        }
      }
      .subtitle {
        display: block;
        font-size: 1.25rem;
        margin: 0;
        margin-bottom: 5px;
        @include small-only {
          font-size: 1rem;
        }
      }
    }

    &-day {
      position: absolute;
      left: 25px;
      top: 25px;
      display: inline-block;
      font-weight: 500;
      margin: auto auto auto 0;
      border: 2px solid black;
      padding: 10px 15px;
      text-transform: uppercase;
      text-align: left;
    }
  }

  &__map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    #map {
      height: 100vh;
    }
    .mapboxgl-control-container {
      display: none !important;
    }
  }
}
</style>
