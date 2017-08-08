<template>
  <div class="random">
    <waterfall
      :line="h"
      :align="left"
      :line-gap="640"
      :min-line-gap="400"
      :max-line-gap="720"
      :watch="photos"
      class="random__grid"
      >
      <waterfall-slot
        v-for="(photo, index) in photos"
        :width="photo.size.width"
        :height="photo.size.height"
        :order="index"
        :key="index"
        move-class="item-move"
        transition="wf"
        class="random__item"
      >
        <div v-lazy:background-image="photo" class="random__img"></div>
      </waterfall-slot>
    </waterfall>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'
import content from '../data/content'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

export default {
  name: 'random',
  metaInfo: {
    title: content.meta.title,
    titleTemplate: `%s`
  },
  data () {
    return {
      menu: content.albums,
      alt: `random shots - ${content.meta.author}`
    }
  },
  components: {
    Waterfall,
    WaterfallSlot
  },
  computed: {
    photos () {
      // create a new context to get all images in assets/photos
      const req = require.context('../assets/photos/random', true, /\.jpg$/)
      const photos = req.keys()
      // return an Array of require items
      .map(item => req(item))
      return shuffle(photos)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.random {
  width:100%;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;

  @include small-only {
    padding-top:5vw;
  }
  &__grid {
    width:100vw;
    overflow:hidden;
    margin:0 10px;
  }
  &__img {
    position:absolute;
    cursor:pointer;
    top:5px;
    left:5px;
    bottom:5px;
    right:5px;
    z-index:0;
    opacity:0;
    transition:opacity 400ms $easing;
    will-change:opacity;
    background-repeat:no-repeat;
    background-position:center;
    background-size: cover;
    &[lazy=loaded] {
      opacity: 1;
    }
  }
}
.item-move {
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
</style>
