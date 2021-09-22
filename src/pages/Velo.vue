<template>
  <div class="velo">
    <c-header></c-header>
    <div class="velo__map" v-cloak>
      <div id="map" ref="map"></div>
    </div>
  </div>
</template>

<script>
import content from '../data/content'
import Header from '../components/Header'
import geojson from '../assets/geojson/full.json'
import gju from 'geojson-utils'

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
      animationParams: {
        speedFactor: 45,
        index: 0
      },
      geojson: geojson,
      emptyGeoJson: {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [[6.236866, 46.198834]]
            }
          }
        ]
      },
      mapOptions: {
        token: 'pk.eyJ1IjoiamJyaWFsb24iLCJhIjoiZjJkNjkyNDNiMzU0YjAxY2FjNGZlMjU3MGFiYjYyZmQifQ.lwFTmFgGxSuvfoJdTcx7Jg',
        style: 'mapbox://styles/jbrialon/ck3yg7nb807lc1co990hb80mi/draft',
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
      // stop if it finishes
      if (this.animationParams.index >= this.geojson.features[0].geometry.coordinates.length) {
        cancelAnimationFrame(this.animation)
      } else {
        // get the next position
        let pos = [
          this.geojson.features[0].geometry.coordinates[this.animationParams.index][0],
          this.geojson.features[0].geometry.coordinates[this.animationParams.index][1]
        ]
        // append new coordinates to the lineString
        this.emptyGeoJson.features[0].geometry.coordinates.push(pos)
        this.animationParams.index += this.animationParams.speedFactor
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
          'line-width': 3,
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

      this.map.on('mouseenter', 'line-animation', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })

      this.map.on('mouseleave', 'line-animation', () => {
        this.map.getCanvas().style.cursor = ''
      })
      this.map.scrollZoom.disable()

      this.animateLine()
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

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.velo {
  position:relative;
  width: 100vw;
  height: 100vh;

  &__map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    #map {
      height: 100vh;
    }
    .mapboxgl-control-container {
      display: none !important;
    }
  }
}
</style>
