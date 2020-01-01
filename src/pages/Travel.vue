<template>
  <div>
    <c-header></c-header>
    <div class="travel" :style="containerStyle" :class="{'grid': grid}">
      <article>
        <p>
          <span class="travel__title">
            {{ album.displayName }}
          </span>
          <br>
          <br>
          <span v-html="album.text"></span>
        </p>
      </article>
      <div class="travel__photo" v-for="(photo, index) in photos" :key="index" :style="photoContainerStyle(photo)">
        <img v-lazy="photo" :style="photoStyle(photo)" :alt="alt">
        <loader class="travel__loader"></loader>
      </div>
      <div class="travel__discover" v-if="false">
        <router-link 
          class="travel__discover-item" 
          :to="{ name: 'Album', params: { name: album.name }}" 
          v-for="(album, index) in albums" 
          :key="index"
          v-lazy:background-image="album.cover"
        >
          <h2>
            {{ album.displayName }}
          </h2>
        </router-link>
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

export default {
  name: 'album',
  props: ['name'],
  metaInfo () {
    return {
      title: this.album.displayName.toUpperCase(),
      meta: this.album.meta
    }
  },
  data () {
    return {
      containerStyle: null,
      isMobile: md.phone() !== null,
      isTablet: md.tablet() !== null,
      album: content.albums[this.name],
      albums: pickBy(content.albums, item => !item.hidden),
      alt: `${content.albums[this.name].displayName} - ${content.meta.author}`,
      grid: content.albums[this.name].grid
    }
  },
  methods: {
    photoContainerStyle (photo) {
      let width = photo.size.width
      let height = photo.size.height

      if ((!this.isMobile && !this.isTablet && photo.size.height > photo.size.width) || (!this.isMobile && !this.isTablet && photo.size.width > window.innerWidth) || (!this.isMobile && !this.isTablet && photo.size.height > window.innerHeight)) {
        height = Math.round(window.innerHeight * 0.95)
        width = Math.round((height * photo.size.width) / photo.size.height)
      } else if (this.isTablet) {
        width = Math.round(window.innerWidth - 30)
        height = Math.round((width * photo.size.height) / photo.size.width)
      } else if (this.isMobile) {
        width = Math.round(window.innerWidth - 20)
        height = Math.round((width * photo.size.height) / photo.size.width)
      }
      if (!this.containerStyle && width > height) {
        this.containerStyle = {
          width: `${width}px`
        }
      }
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    },
    photoStyle (photo) {
      let width = `${photo.size.width}px`
      let height = `${photo.size.height}px`

      if ((!this.isMobile && !this.isTablet && photo.size.height > photo.size.width) || (!this.isMobile && !this.isTablet && photo.size.width > window.innerWidth) || (!this.isMobile && !this.isTablet && photo.size.height > window.innerHeight)) {
        height = Math.round(window.innerHeight * 0.95)
        width = `${Math.round((height * photo.size.width) / photo.size.height)}px`
        height = `${height}px`
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
      .map(item => req(item))
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
  &.grid {
    flex-direction: row;
    justify-content: space-between;
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
    margin-bottom:55px;
    @include small-only {
      margin-left:0;
      margin-right:0;
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

  &__discover {
    display:flex;
    flex-wrap: wrap;
    width:100%;
    margin-top:140px;
    justify-content: space-between;
    &-item {
      display:block;
      position:relative;
      width:calc(25% - 15px);
      padding-bottom:16%;
      background-size:100.5%;
      background-repeat:no-repeat;
      overflow:hidden;
      background-color: $red;
      &:hover {
        h2 {
          opacity:1;
        }
      }
    }
    h2 {
      position:absolute;
      opacity:0;
      z-index:1;
      transition:opacity 400ms $easing;
      will-change:opacity;
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
      color:white;
      background:black;
      font-size: 22px;
      line-height: 1.1em;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-weight: 700;
      padding:6px 10px;
      display: inline-block;
      margin:0;
      max-width: 70%;

      @include small-only {
        opacity:1;
        font-size: 26px;
      }

      @include ipad {
        opacity:1;
        font-size: 32px;
      }
    }
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
