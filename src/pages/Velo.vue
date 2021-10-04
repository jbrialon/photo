<template>
  <div class='velo'>
    <div class='velo__content' v-cloak>
      <transition name='fade'>
        <div class='velo__content-day'>
          Jour : {{ activity.dayNumber }}
          <br>
          <br>
          Départ : {{ velo[activity.dayNumber - 1].startLocation }}
          <br>
          <br>
          Arrivée : {{ velo[activity.dayNumber - 1].endLocation }}
        </div>
      </transition>
    </div>
    <div class='velo__map' v-cloak>
      <div id='map' ref='map'></div>
    </div>
  </div>
</template>

<script>
import content from '../data/content'
import Header from '../components/Header'
import geojson from '../assets/geojson/full.json'
import data from '../data/velo.json'
import gju from 'geojson-utils'

const startPath = [6.236866, 46.198834]
export default {
  name: 'velo',
  metaInfo () {
    return {
      title: this.$t('velo.displayName').toUpperCase(),
      titleTemplate: `%s //`,
      meta: content.velo.meta
    }
  },
  data () {
    return {
      links: content.social,
      content: content.velo,
      map: null,
      animation: null,
      startPath: startPath,
      animationParams: {
        speedFactor: 45,
        index: 0
      },
      activity: {
        currentDate: new Date(geojson.features[0].properties.coordinateProperties.times[0]),
        currentDay: new Date(geojson.features[0].properties.coordinateProperties.times[0]).getDate(),
        dayNumber: 1,
        circPos: []
      },
      velo: data.velo,
      geojson: geojson,
      emptyGeoJson: {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [startPath]
            }
          }
        ]
      },
      mapOptions: {
        token: 'pk.eyJ1IjoiamJyaWFsb24iLCJhIjoiZjJkNjkyNDNiMzU0YjAxY2FjNGZlMjU3MGFiYjYyZmQifQ.lwFTmFgGxSuvfoJdTcx7Jg',
        style: 'mapbox://styles/jbrialon/cktviax1t2amj19qooc4d32qy/draft',
        center: [8.227512, 46.818188],
        zoom: 8
      }
    }
  },
  components: {
    'c-header': Header
  },
  methods: {
    animateLine (timestamp) {
      let currentDate = null
      let times = this.geojson.features[0].properties.coordinateProperties.times
      // stop if it finishes
      if (this.animationParams.index >= this.geojson.features[0].geometry.coordinates.length) {
        let lastPos = [
          this.geojson.features[0].geometry.coordinates[this.geojson.features[0].geometry.coordinates.length - 1][0],
          this.geojson.features[0].geometry.coordinates[this.geojson.features[0].geometry.coordinates.length - 1][1]
        ]
        this.drawCircle(lastPos, this.animationParams.index)
        cancelAnimationFrame(this.animation)
      } else {
        // get the next position
        let pos = [
          this.geojson.features[0].geometry.coordinates[this.animationParams.index][0],
          this.geojson.features[0].geometry.coordinates[this.animationParams.index][1]
        ]
        // append new coordinates to the lineString
        this.emptyGeoJson.features[0].geometry.coordinates.push(pos)
        if (this.animationParams.index > 88029 && this.animationParams.index < 88704) {
          this.animationParams.index += 3
        } else {
          this.animationParams.index += this.animationParams.speedFactor
        }

        currentDate = new Date(times[this.animationParams.index])
        if (this.activity.currentDay !== currentDate.getDate()) {
          this.activity.currentDate = currentDate
          this.activity.currentDay = currentDate.getDate()
          this.activity.dayNumber++
          this.activity.circPos.push(pos)
          this.drawCircle(pos, this.animationParams.index)
        }
        // then update the map
        this.map.getSource('line').setData(this.emptyGeoJson)
        // Request the next frame of the animation.
        this.animation = requestAnimationFrame(this.animateLine)
      }
    },
    mapload () {
      this.map.addSource('line', {
        'type': 'geojson',
        'data': this.emptyGeoJson
      })

      this.map.addLayer({
        'id': 'line-animation',
        'type': 'line',
        'source': 'line',
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-color': 'grey',
          'line-width': 2,
          'line-opacity': 1
        }
      })

      this.map.on('click', 'line-animation', (e) => {
        var coordinates = this.geojson.features[0].geometry.coordinates
        var times = this.geojson.features[0].properties.coordinateProperties.times
        var closestIndex = null
        var testDistance = null
        coordinates.forEach((coordinate, index) => {
          const PointOne = [e.lngLat.lng, e.lngLat.lat]
          const PointTwo = [coordinate[0], coordinate[1]]
          const distance = gju.pointDistance(
            {type: 'Point', coordinates: PointOne},
            {type: 'Point', coordinates: PointTwo}
          )
          if (!testDistance || distance < testDistance) {
            closestIndex = index
            testDistance = distance
          }
        })
        const testDate = new Date(times[closestIndex])
        console.log(testDate)
      })

      // Mouse over gpx
      this.map.on('mouseenter', 'line-animation', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })

      // Mouse out GPX
      this.map.on('mouseleave', 'line-animation', () => {
        this.map.getCanvas().style.cursor = ''
      })
      this.map.scrollZoom.disable()

      this.drawCircle(startPath, 0)
      this.animateLine()
    },
    drawCircle (pos, index) {
      const sourceName = `source-circle-${index}`
      const id = `circle-${index}`

      this.map.addSource(sourceName, {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [{
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': pos
            }
          }]
        }
      })

      this.map.addLayer({
        'id': id,
        'type': 'circle',
        'source': sourceName,
        'paint': {
          'circle-radius': {
            stops: [
              [5, 1],
              [15, 850]
            ],
            base: 2
          },
          'circle-color': 'DimGray',
          'circle-opacity': 1
          // 'circle-translate': [30, 30]

        }
      })

      this.map.addLayer({
        'id': `${id}_border`,
        'type': 'circle',
        'source': sourceName,
        'paint': {
          'circle-radius': {
            stops: [
              [5, 1],
              [15, 1200]
            ],
            base: 2
          },
          'circle-color': 'DimGray',
          'circle-opacity': 0,
          'circle-stroke-color': 'DimGray',
          'circle-stroke-width': 1

        }
      })

      // Mouse over gpx
      this.map.on('mouseenter', id, () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })

      // Mouse out GPX
      this.map.on('mouseleave', id, () => {
        this.map.getCanvas().style.cursor = ''
      })

      this.map.on('click', id, (e) => {
        console.log(e)
      })
    }
  },
  mounted () {
    mapboxgl.accessToken = this.mapOptions.token
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: this.mapOptions.style, // stylesheet location
      center: this.mapOptions.center, // starting position [lng, lat]
      zoom: this.mapOptions.zoom // starting zoom
    })
    this.map.on('load', this.mapload)
  }
}
</script>

<style scoped lang='scss'>
@import '../scss/vars';
@import '../scss/mixins';

.velo {
  position:relative;
  width: 100vw;
  height: 100vh;

  &__content {
    pointer-events: none;
    position: relative;
    z-index: 10;
    width: 100vw;
    height: 100vh;

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
