<template>
  <div class="album">
    <div class="album__photo" v-for="(photo, index) in photos" :key="index" :class="getClass(photo)"> 
      <div class="album__inner" :style="photoStyle(photo)" >
        <intersect @enter="enter(photo)">
          <img ref="photo" v-lazy="photo" :style="photoStyle(photo)">
        </intersect>
        <loader class="album__loader"></loader>
      </div>
      <div class="album__description" v-if="photo.exif.Description" :style="photoStyle(photo)">
        <p>{{ photo.exif.Description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '../services/Utils.js'
import mediumZoom from 'medium-zoom'
import loader from '../components/Loader'
import Intersect from 'vue-intersect'
import MobileDetect from 'mobile-detect'
const md = new MobileDetect(window.navigator.userAgent)

export default {
  name: 'album',
  props: ['destination', 'map', 'marker'],
  data () {
    return {
      isMobile: md.phone() !== null,
      isTablet: md.tablet() !== null
    }
  },
  components: {
    loader,
    Intersect
  },
  computed: {
    photos () {
      // create a new context to get all images in assets/photos
      const req = require.context('../assets/photos', true, /\.jpg$/)
      const photos = req.keys()
      // filter them by folder name (simple check if path contains album name)
      .filter(item => item.includes(`/${this.destination.name}/`))
      // return an Array of require items
      .map(item => req(item))
      return photos
    }
  },
  methods: {
    photoStyle (photo) {
      const landscape = photo.size.width > photo.size.height
      const portraitRatio = this.isTablet ? 3.1 : 2.7
      const width = landscape ? Math.round(window.innerWidth / 2.5) : Math.round(window.innerHeight / portraitRatio)
      const height = Math.round((width * photo.size.height) / photo.size.width)

      return {
        width: `${width}px`,
        height: `${height}px`
      }
    },
    getClass (photo) {
      let landscape = photo.size.width > photo.size.height
      return landscape ? 'landscape' : 'portrait'
    },
    getLatitude (gps) {
      return gps ? gps.lat : ''
    },
    getLongitude (gps) {
      return gps ? gps.lng : ''
    },
    enter (photo) {
      if (photo.exif.GPS) {
        console.log(photo.src, photo.exif.GPS)
        const destinationGPS = new mapboxgl.LngLat(photo.exif.GPS.lng, photo.exif.GPS.lat)
        this.marker.setLngLat(destinationGPS)
        this.map.easeTo({
          center: destinationGPS,
          zoom: 11,
          duration: 1600,
          offset: Utils.getMarkerOffset(),
          pitch: 60
        })
      }
    }
  },
  mounted () {
    mediumZoom(this.$refs.photo, {
      margin: 40
    })
  }
}
</script>

<style lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.album {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  &__photo {
    position: relative;
    margin-bottom: 7vw;
    &:nth-child(even) {
      &.landscape {
        margin-left: 15vw;
      }
      &.portrait {
        margin-top: 15vh;
      }
    }
    img {
      display: block;
      width: 100%;
      will-change: opacity;
      opacity: 0;
      transition:opacity 1500ms $easing;
      cursor: zoom-in;
    }
    img[lazy=loaded] {
      opacity: 1;
    }
    img[lazy=loaded] + .loader {
      opacity:0;
    }
  }
  &__inner {
    position: relative;
    &:before {
      position: absolute;
      content: '';
      top: -15px;
      left: -15px;
      bottom: -15px;
      right: -15px;
      background: white;
      z-index: -1;
      @include ipad {
        top: -10px;
        left: -10px;
        bottom: -10px;
        right: -10px;
      }
    }
  }
  &__description {
    height: auto !important;
    p {
      font-family: 'Libre Baskerville';
      width: 100%;
      text-align: center;
      padding: 30px;
      font-size: 1rem;
      line-height: 1.625em;
      font-style: normal;
      color: black;
    }
  }
  &__loader {
    position:absolute;
    z-index:5;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    transition:opacity 600ms $easing;
  }
}
</style>
