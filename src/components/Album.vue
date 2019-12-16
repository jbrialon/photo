<template>
  <div class="album">
    <img v-lazy="photo" v-for="(photo, index) in photos" :key="index">
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
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.album {
  img {
    display: block;
    position:relative;
    width: 60%;
    margin-bottom: 5vw;
    cursor: pointer;
    &:hover {
      z-index: 60;
    }
    &:nth-child(even) {
      float: right;
    }
    &:nth-child(odd) {
      float: left;
    }
  }
}
</style>
