<template>
  <div class="album">
    <article>
      <p>
        {{ name }}
        <br>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sollicitudin nunc vitae egestas luctus. Duis vel lectus eget sem egestas rhoncus. Sed nec sodales neque, vitae facilisis massa. Mauris eget ex vitae turpis volutpat varius. Mauris consectetur massa vel lacinia tempor. Nam egestas sem in dui suscipit malesuada. Aliquam non sapien feugiat, tincidunt dui eu, fringilla magna. Suspendisse ultrices at urna sit amet cursus.
      </p>
    </article>
    <div class="album__photo" v-for="photo in photos">
      <img v-lazy="photo" :style="photoStyle(photo)">
    </div>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'
export default {
  name: 'album',
  data () {
    return {
      name: this.$route.params.albumName
    }
  },
  methods: {
    photoStyle (photo) {
      return {
        width: `${photo.width}px`,
        height: `${photo.height}px`
      }
    }
  },
  computed: {
    photos () {
      // create a new context to get all images in chellenge/slideshow
      const req = require.context('../../static/', true, /\.jpg$/)
      return shuffle(req.keys()
      // filter them by folder name (simple check if path contains album name)
      .filter(item => item.includes(`/${this.name}/`))
      // return an Array of require items
      .map(item => req(item)))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.album {
  width:100%;
  display:flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  &__photo {
    background: #e5e5e5;
    margin-bottom:5vw;
  }

  article {
    display:flex;
    justify-content: center;
    flex-direction: column;
    height:70vh;
  }

  p {
    margin:auto;
    max-width:620px;
    font-size: 14px;
    line-height: 2em;
    text-transform: uppercase;
    letter-spacing: .15em;
    font-weight: 400;
    font-style: normal;
    padding-bottom:150px;
  }
  img {
    will-change: opacity;
    opacity:0;
    transition:opacity 1.5s ease;
    max-width:100%;
  }

  img[lazy=loaded] {
    opacity:1;
  }
}
</style>
