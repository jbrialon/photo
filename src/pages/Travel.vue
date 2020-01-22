<template>
  <div>
    <c-header></c-header>
    <div class="travel" :class="{'grid': grid}">
      <article>
        <p>
          <span class="travel__title">
            {{ $t(`albums.${album.name}.displayName`) }}
          </span>
          <br>
          <br>
          <span v-html="$t(`albums.${album.name}.text`)">
          </span>
        </p>
      </article>
      <div class="travel__photo" v-for="(photo, index) in photos" :key="index" :style="photoContainerStyle(photo)" :class="getClass(photo)">
        <img v-lazy="photo" :style="photoStyle(photo)" :alt="alt">
        <loader class="travel__loader"></loader>
      </div>
    </div>
    <c-footer></c-footer>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'
import MobileDetect from 'mobile-detect'
const md = new MobileDetect(window.navigator.userAgent)
import content from '../data/content'
import loader from '../components/Loader'
import { pickBy } from 'lodash'
import Header from '../components/Header'
import Footer from '../components/Footer'

const removeEmpty = obj =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([k, v]) => v !== null)
      .filter(([k, v]) => v !== '')
      .map(([k, v]) => (typeof v === 'object' ? [k, removeEmpty(v)] : [k, v]))
  )

export default {
  name: 'album',
  props: ['name'],
  metaInfo () {
    return {
      title: this.$t(`albums.${this.album.name}.displayName`).toUpperCase(),
      meta: this.album.meta
    }
  },
  data () {
    return {
      isMobile: md.phone() !== null,
      isTablet: md.tablet() !== null || window.innerWidth === 1194,
      album: content.albums[this.name],
      albums: pickBy(content.albums, item => !item.hidden),
      alt: `${this.$t(`albums.${this.name}.displayName`)} - ${content.meta.author}`,
      grid: content.albums[this.name].grid
    }
  },
  methods: {
    getClass (photo) {
      let landscape = photo.size.width > photo.size.height
      return landscape ? 'landscape' : 'portrait'
    },
    photoContainerStyle (photo) {
      let width = photo.size.width
      let height = photo.size.height

      // desktop + ipad pro
      if ((!this.isMobile && !this.isTablet)) {
        if (photo.size.width > photo.size.height) {
          width = photo.size.width / 2
          height = photo.size.height / 2
        } else {
          width = photo.size.height / 3
          height = (width * photo.size.height) / photo.size.width
        }
      } else if (this.isTablet) {
        if (photo.size.width > photo.size.height) {
          width = window.innerWidth - 80
          height = (width * photo.size.height) / photo.size.width
        } else {
          height = window.innerHeight - 60
          width = (height * photo.size.width) / photo.size.height
        }
      } else if (this.isMobile) {
        width = window.innerWidth - 20
        height = (width * photo.size.height) / photo.size.width
      }
      return {
        width: `${Math.round(width)}px`,
        height: `${Math.round(height)}px`
      }
    },
    photoStyle (photo) {
      let width = `${photo.size.width}px`
      let height = `${photo.size.height}px`

      if ((!this.isMobile && !this.isTablet)) {
        if (photo.size.width > photo.size.height) {
          width = photo.size.width / 2
          height = photo.size.height / 2
        } else {
          width = photo.size.height / 3
          height = (width * photo.size.height) / photo.size.width
        }
        width = `${Math.round(width)}px`
        height = `${Math.round(height)}px`
      } else if (this.isMobile || this.isTablet) {
        width = '100%'
        height = 'auto'
      }

      return {
        width: width,
        height: height
      }
    }
  },
  computed: {
    photos () {
      // create a new context to get all images in assets/photos
      const req = require.context('../assets/photos', true, /\.jpg$/)
      const photos = req.keys()
        // filter them by folder name (simple check if path contains album name)
        .filter(item => item.includes(`/${this.name}/`))
        // return an Array of require items
        .map(item => removeEmpty(req(item)))
      return this.album.shuffle ? shuffle(photos) : photos
    }
  },
  components: {
    loader,
    'c-header': Header,
    'c-footer': Footer
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.travel {
  width:100%;
  margin:auto;
  display:flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  &.grid {
    flex-direction: row;
    justify-content: space-around;
  }
  article {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 60vh;
    margin:auto;

    @include small-only {
      width:90%;
      height:auto;
      padding: 5vw 0 25vw 0;
    }
  }
  &__title {
    font-size:18px;
    letter-spacing: 0.45em;
    margin-right: -1.45em;
    padding:5px 10px;
  }
  &__photo {
    position:relative;
    background: $grey;
    margin-bottom:10vh;
    @include small-only {
      margin-left:0;
      margin-right:0;
    }
    &:before {
      position: absolute;
      content: '';
      top: -15px;
      left: -15px;
      bottom: -15px;
      right: -15px;
      background: $grey;
      z-index: -1;
      @include small-only {
        display: none;
      }
      @include ipad {
        display:none;
      }
    }
    &:nth-child(even) {
      &.landscape {
        // margin-left: 25vw;
      }
      &.portrait {
        margin-top: 20vh;
        @include ipad {
          margin-top: 0;
        }
        @include small-only {
          margin-top: 0;
        }
      }
    }
    &:nth-child(odd) {
      &.landscape { 
        // margin-left: 20vw;
      }
      &.portrait {
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
  img {
    position:relative;
    z-index:10;
    will-change: opacity;
    opacity: 0;
    transition:opacity 1.5s $easing;
    max-width: 100%;
  }

  img[lazy=loaded] {
    opacity: 1;
  }

  img[src^="http"] + .loader {
    opacity:0;
  }

  p {
    margin: auto;
    max-width: 620px;
    font-size: 14px;
    line-height: 2em;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 400;
    font-style: normal;
    padding-bottom: 150px;
    @include small-only {
      padding-bottom:0;
    }
  }
}
</style>
