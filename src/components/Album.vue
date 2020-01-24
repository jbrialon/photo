<template>
  <div class="album">
    <div class="album__photo" v-for="(photo, index) in photos" :key="index" :class="getClass(photo)">
      <div class="album__inner" :style="photoStyle(photo)">
        <intersect @enter="enter(photo)">
          <img v-lazy="photo" :style="photoStyle(photo)">
        </intersect>
        <loader class="album__loader"></loader>
      </div>
      <div class="album__overlay" v-if="!hasPhoto">
        SOON
      </div>
      <div class="album__description" v-if="$te(`albums.${destination.name}.story.${index + 1}`)" :style="photoStyle(photo)">
        <p>
          {{ $t(`albums.${destination.name}.story.${index + 1}`) }}
        </p>
      </div>
    </div>
    <div class="album__link">
      <router-link :to="{ name: 'Travel', params: { name: destination.name }}" title="See Photo in Big" v-if="hasPhoto">
        album
      </router-link>
      <button @click="back('show')" title="back to map">
        {{ $t("octnov.back") }}
      </button>
    </div>
  </div>
</template>

<script>
import { getMarkerOffset } from '../services/Utils.js'
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
    },
    back: {
      type: Function,
      required: true
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
    },
    hasPhoto () {
      return this.photos.length > 3
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
          offset: getMarkerOffset(),
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
        .album__description {
          // text-align: right;
        }
      }
    }
    &:nth-child(odd) {
      &.landscape {
        .album__description {
          text-align: left;
        }    
      }
      &.portrait {
        .album__description {
          // text-align: left;
        }
      }
    }
    &.portrait {
      .album__description {
        text-align: right;
      }
    }
    &.landscape + .portrait {
      .album__description {
        text-align: left;
      }
      
    }
    img {
      display: block;
      width: 100%;
      will-change: opacity;
      opacity: 0;
      transition: opacity 1000ms $easing;
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
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 3rem;
    letter-spacing: 1.3rem;
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
      box-shadow: -15px 0 0 0 #fff, 15px 0 0 0 #fff;
      @include ipad {
        font-size: 0.8rem;
        line-height: 2rem;
        box-shadow: -10px 0 0 0 #fff, 10px 0 0 0 #fff;
      }
    }
  }
  &__link {
    width: 100%;
    button, 
    a {
      display: inline-block;
      height: auto;
      padding: 10px 25px;
      font-size: 1rem;
      line-height: 1.45rem;
      text-transform: uppercase;
      text-decoration:none;
      font-style: normal;
      font-weight: 700;
      // color: #949494;
      color: #949494;
      background: none;
      border: 2px solid #949494; 
      margin: 0;
      min-width: 165px;
      letter-spacing: 1.5px;
      transition: all 300ms ease-in-out;
      cursor: pointer;
      &:last-child {
        margin-left: 25px;
      }
      &:hover {
        color: black;
        border-color: black;
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
