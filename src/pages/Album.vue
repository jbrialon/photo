<template>
  <div class="album">
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
      <img v-lazy="photo" :style="photoStyle(photo)">
      <loader class="album__loader"></loader>
    </div>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'
import MobileDetect from 'mobile-detect'
const md = new MobileDetect(window.navigator.userAgent)
import content from '../data/content'
import loader from '../components/loader'

export default {
  name: 'album',
  props: ['name'],
  metaInfo () {
    return {
      title: this.content.displayName
    }
  },
  data () {
    return {
      isMobile: md.phone() !== null,
      isTablet: md.tablet() !== null,
      content: content.albums[this.name]
    }
  },
  methods: {
    photoContainerStyle (photo) {
      const width = !this.isMobile && !this.isTablet ? photo.width : Math.round(window.innerWidth * 0.9)
      const height = !this.isMobile && !this.isTablet ? photo.height : Math.round((width * photo.height) / photo.width)
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    },
    photoStyle (photo) {
      const width = !this.isMobile && !this.isTablet ? `${photo.width}px` : '100%'
      const height = !this.isMobile && !this.isTablet ? `${photo.height}px` : 'auto'
      return {
        width: width,
        height: height
      }
    }
  },
  computed: {
    photos () {
      // create a new context to get all images in chellenge/slideshow
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
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  article {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 70vh;

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
    margin-bottom: 5vw;

    @include small-only {
      margin-bottom: 20vw;
    }

    @include ipad {
      margin-bottom: 10vw;
    }

    &:last-child {
      margin-bottom:0;
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
