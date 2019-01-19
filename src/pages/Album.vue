<template>
  <div class="album" :style="containerStyle">
    <article>
      <p>
        <span class="album__title">
          {{ this.content.displayName }}
        </span>
        <br>
        <br>
        <span v-html="this.content.text"></span>
      </p>
    </article>
    <div class="album__photo" v-for="photo in photos" :style="photoContainerStyle(photo)">
      <img v-lazy="photo" :style="photoStyle(photo)" :alt="alt">
      <loader class="album__loader"></loader>
    </div>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'
import MobileDetect from 'mobile-detect'
const md = new MobileDetect(window.navigator.userAgent)
import content from '../data/content'
import loader from '../components/Loader'

export default {
  name: 'album',
  props: ['name'],
  metaInfo () {
    return {
      title: this.content.displayName.toUpperCase(),
      meta: this.content.meta
    }
  },
  data () {
    return {
      containerStyle: null,
      isMobile: md.phone() !== null,
      isTablet: md.tablet() !== null,
      content: content.albums[this.name],
      alt: `${content.albums[this.name].displayName} - ${content.meta.author}`
    }
  },
  methods: {
    photoContainerStyle (photo) {
      let width = photo.size.width
      let height = photo.size.height

      if ((!this.isMobile && photo.size.height > photo.size.width) || (!this.isMobile && photo.size.width > window.innerWidth) || (!this.isMobile && photo.size.height > window.innerHeight)) {
        height = Math.round(window.innerHeight * 0.95)
        width = Math.round((height * photo.size.width) / photo.size.height)
      } else if (this.isMobile) {
        width = Math.round(window.innerWidth)
        height = Math.round((width * photo.size.height) / photo.size.width)
      }
      if (!this.containerStyle) {
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

      if ((!this.isMobile && photo.size.height > photo.size.width) || (!this.isMobile && photo.size.width > window.innerWidth) || (!this.isMobile && photo.size.height > window.innerHeight)) {
        height = Math.round(window.innerHeight * 0.95)
        width = `${Math.round((height * photo.size.width) / photo.size.height)}px`
        height = `${height}px`
      } else if (this.isMobile) {
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
      return this.content.shuffle ? shuffle(photos) : photos
    }
  },
  components: {
    loader
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.album {
  width:100%;
  display:flex;
  margin:auto;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

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
    // margin-left:55px;
    // margin-right:55px;
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

  img {
    position:relative;
    z-index:10;
    display:block;
    margin: 0;
    padding: 0;
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
