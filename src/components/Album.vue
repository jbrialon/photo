<template>
  <div class="album">
    <div class="album__photo" v-for="(photo, index) in photos" :key="index" :style="photoStyle(photo)" :class="getClass(photo)">
      <div class="album__overlay" v-if="photo.exif.Description">
        <p>{{ photo.exif.Description }}</p>
      </div>
    
      <img ref="photo" v-lazy="photo" :style="photoStyle(photo)" :data-lat="getLatitude(photo.exif.GPS)" :data-long="getLongitude(photo.exif.GPS)">
      <loader class="album__loader"></loader>
    </div>
  </div>
</template>

<script>
import mediumZoom from 'medium-zoom'
import loader from '../components/Loader'

export default {
  name: 'album',
  props: ['destination'],
  components: {
    loader
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
      let landscape = photo.size.width > photo.size.height
      let width = landscape ? Math.round(window.innerWidth / 2.5) : Math.round(window.innerHeight / 2.2)
      let height = Math.round((width * photo.size.height) / photo.size.width)

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
    }
  },
  mounted () {
    mediumZoom(this.$refs.photo, {
      margin: 60
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
    &:hover {
     .album__overlay {
       opacity :0;
     } 
    }
    p {
      margin: 19px -13px;
      font-size: 0.8rem;
      line-height: 2em;
      text-transform: uppercase;
      letter-spacing: .15em;
      font-weight: 700;
      font-style: normal;
      color:white;
    }
    &:before {
      position: absolute;
      content: '';
      top: -15px;
      left: -15px;
      bottom: -15px;
      right: -15px;
      background: white;
    }
    &:nth-child(even) {
      &.landscape {
        margin-left: 15vw;
      }
      &.portrait {
        margin-top: 15vh;
      }
      p {
        text-align: right;
        float: right;
      }
    }
    &:nth-child(odd) {
      p {
        text-align: left;
        float: left;
      }
    }
    img {
      display: block;
      width: 100%;
      will-change: opacity;
      opacity: 0;
      transition:opacity 1.5s $easing;
      cursor: zoom-in;
    }
    img[lazy=loaded] {
      opacity: 1;
    }
    img[lazy=loaded] + .loader {
      opacity:0;
    }
  }
  &__overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    text-align: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    opacity: 1;
    transition: opacity 100ms ease-in-out; 
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
