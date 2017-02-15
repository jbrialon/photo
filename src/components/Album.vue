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
    <div class="album__photo" v-for="photo in photos" :style="photoStyle(photo)">
      <img v-lazy="photo" :style="photoStyle(photo)">
    </div>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'
export default {
  name: 'album',
  props: ['name'],
  metaInfo () {
    return {
      title: this.name
    }
  },
  methods: {
    photoStyle (photo) {
      return {
        width: `${photo.width}px`,
        height: `${photo.height}px`
      }
    },
    exif (photo) {
      const id = photo.src.match(/\d+/)[0]
      const exif = require(`exif-loader!../assets/photos/${this.name}/${this.name}-${id}.jpg`)
      return {
        'camera': `${exif.exif.image.Make} ${exif.exif.image.Model}`,
        'aperture': exif.exif.exif.FNumber,
        'ISO': exif.exif.exif.ISO,
        'ExposureTime': exif.exif.exif.ExposureTime,
        'Focal': exif.exif.exif.FocalLength,
        'FocalLengthIn35mmFormat': exif.exif.exif.FocalLengthIn35mmFormat
      }
    }
  },
  computed: {
    photos () {
      // create a new context to get all images in chellenge/slideshow
      const req = require.context('../assets/photos', true, /\.jpg$/)
      return shuffle(req.keys()
      // filter them by folder name (simple check if path contains album name)
      .filter(item => item.includes(`/${this.name}/`))
      // return an Array of require items
      .map(item => req(item)))
    }
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

  &__photo {
    background: $grey;
    margin-bottom: 5vw;

    @include small-only {
      margin-bottom: 20vw;
      width:90% !important;
      height: auto !important;
    }
  }

  img {
    display:block;
    margin: 0;
    padding: 0;
    will-change: opacity;
    opacity: 0;
    transition:opacity 1.5s $easing;
    max-width: 100%;

    @include small-only {
      width:100% !important;
      height: auto !important;
    }
  }

  img[lazy=loaded] {
    opacity: 1;
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
