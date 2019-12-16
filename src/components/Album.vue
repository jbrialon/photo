<template>
  <div class="album">
    <div class="album__photo" v-for="(photo, index) in photos" :key="index" :style="photoContainerStyle(photo)">
      <img v-lazy="photo" :style="photoStyle(photo)">
    </div>
  </div>
</template>

<script>

export default {
  name: 'album',
  props: ['destination'],
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
    photoContainerStyle (photo) {
      let width = Math.round(window.innerWidth / 2.5)
      let height = Math.round((width * photo.size.height) / photo.size.width)

      return {
        width: `${width}px`,
        height: `${height}px`
      }
    },
    photoStyle (photo) {
      let width = Math.round(window.innerWidth / 2.5)
      let height = Math.round((width * photo.size.height) / photo.size.width)

      return {
        width: `${width}px`,
        height: `${height}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.album {
  &__photo {
    display: flex;
    position:relative;
    margin-bottom: 10vw;
    background: white;
    justify-content: center;
    align-items: center;
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
      float: right;
    }
    &:nth-child(odd) {
      float: left;
    }
  }
  img {
    display: block;
    width: 100%;
    will-change: opacity;
    opacity: 0;
    transition:opacity 1.5s $easing;
    cursor: pointer;

  }
  img[lazy=loaded] {
    opacity: 1;
  }
}
</style>
