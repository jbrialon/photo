<template>
  <div class="album">
    <div class="album__photo" v-for="(photo, index) in photos" :key="index" :class="getClass(photo)"> 
      <div class="album__inner" :style="photoStyle(photo)" >
        <intersect @enter="enter(photo)">
          <img v-lazy="photo" :style="photoStyle(photo)">
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
import loader from '../components/Loader'
import Intersect from 'vue-intersect'

export default {
  name: 'album',
  props: {
    destination: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: false
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
      const width = landscape ? Math.round(window.innerWidth / 2.5) : Math.round(document.querySelector('.js-content').offsetWidth / 2.6)
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
        const destinationGPS = new mapboxgl.LngLat(photo.exif.GPS.lng, photo.exif.GPS.lat)
        this.marker.setLngLat(destinationGPS)
        this.map.easeTo({
          center: destinationGPS,
          zoom: this.destination.zoom,
          duration: 1600,
          offset: Utils.getMarkerOffset(),
          pitch: this.destination.pitch
        })
      }
    }
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
        .album__description {
          text-align: right;
        }
      }
      &.portrait {
        margin-top: 15vh;
      }
    }
    &:nth-child(odd) {
      &.landscape {
        .album__description {
          text-align: left;
        }    
      }
    }
    img {
      display: block;
      width: 100%;
      will-change: opacity;
      opacity: 0;
      transition: opacity 1000ms $easing;
      // cursor: zoom-in;
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
    padding-top: 25px;
    @include ipad {
      padding-top: 15px;
    }
    p {
      display: inline;
      font-family: 'Libre Baskerville';
      padding: 5px;
      font-size: 1rem;
      line-height: 2.45rem;
      font-style: normal;
      color: #000;
      background: #fff;
      box-shadow: -16px 0 0 0 #fff, 10px 0 0 0 #fff;
      @include ipad {
        font-size: 0.8rem;
        line-height: 2rem;
        box-shadow: -10px 0 0 0 #fff, 10px 0 0 0 #fff;
      }
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
