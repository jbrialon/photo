<template>
  <div>
    <c-header></c-header>
    <div class="travel">
      <article>
        <p class="travel__description">
          <span class="travel__title" :class="{ loaded: showDescription }">
            {{ $t(`albums.${album.name}.displayName`) }}
          </span>
          <br />
          <br />
          <span
            :class="{ loaded: showDescription }"
            v-html="$t(`albums.${album.name}.text`)"
          >
          </span>
        </p>
      </article>
      <div
        class="travel__container"
        v-for="(photo, index) in photos"
        :key="index"
      >
        <div
          class="travel__photo"
          :style="photoContainerStyle(photo)"
          :class="getClass(photo)"
        >
          <img v-lazy="photo.src" :style="photoStyle(photo)" :alt="alt" />
          <loader class="travel__loader"></loader>
        </div>
        <div
          class="travel__text"
          v-if="$te(`albums.${album.name}.story.${index + 1}`)"
        >
          <p>
            {{ $t(`albums.${album.name}.story.${index + 1}`) }}
          </p>
        </div>
      </div>
    </div>
    <c-footer></c-footer>
  </div>
</template>

<script>
import pickBy from "lodash/pickBy";
import shuffle from "lodash/shuffle";
import MobileDetect from "mobile-detect";
const md = new MobileDetect(window.navigator.userAgent);

import content from "../data/content.js";
import photos from "../data/photos.json";
import loader from "../components/Loader.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Album",
  props: ["name"],
  head() {
    return {
      title: this.$t(`albums.${this.album.name}.displayName`).toUpperCase(),
      meta: this.album.meta,
    };
  },
  data() {
    return {
      showDescription: false,
      isMobile: md.phone() !== null,
      isTablet: md.tablet() !== null || window.innerWidth === 1194,
      album: content.albums[this.name],
      albums: pickBy(content.albums, (item) => !item.hidden),
      alt: `${this.$t(`albums.${this.name}.displayName`)} - ${
        content.meta.author
      }`,
      grid: content.albums[this.name].grid,
      photos: photos[this.name],
    };
  },
  methods: {
    getClass(photo) {
      let landscape = photo.size.width > photo.size.height;
      return landscape ? "landscape" : "portrait";
    },
    photoContainerStyle(photo) {
      let width = photo.size.width;
      let height = photo.size.height;

      // desktop + ipad pro
      if (!this.isMobile && !this.isTablet) {
        if (photo.size.width > photo.size.height) {
          width = photo.size.width / 2;
          height = photo.size.height / 2;
        } else {
          width = photo.size.height / 3;
          height = (width * photo.size.height) / photo.size.width;
        }
      } else if (this.isTablet) {
        if (photo.size.width > photo.size.height) {
          width = window.innerWidth - 80;
          height = (width * photo.size.height) / photo.size.width;
        } else {
          height = window.innerHeight - 60;
          width = (height * photo.size.width) / photo.size.height;
        }
      } else if (this.isMobile) {
        width = window.innerWidth - 20;
        height = (width * photo.size.height) / photo.size.width;
      }
      return {
        width: `${Math.round(width)}px`,
        height: `${Math.round(height)}px`,
      };
    },
    photoStyle(photo) {
      let width = `${photo.size.width}px`;
      let height = `${photo.size.height}px`;

      if (!this.isMobile && !this.isTablet) {
        if (photo.size.width > photo.size.height) {
          width = photo.size.width / 2;
          height = photo.size.height / 2;
        } else {
          width = photo.size.height / 3;
          height = (width * photo.size.height) / photo.size.width;
        }
        width = `${Math.round(width)}px`;
        height = `${Math.round(height)}px`;
      } else if (this.isMobile || this.isTablet) {
        width = "100%";
        height = "auto";
      }

      return {
        width: width,
        height: height,
      };
    },
  },
  components: {
    loader,
    "c-header": Header,
    "c-footer": Footer,
  },
  mounted() {
    this.showDescription = false;
    setTimeout(() => {
      this.showDescription = true;
    }, 1200);
  },
};
</script>

<style scoped lang="scss">
@import "../scss/vars";
@import "../scss/mixins";

.travel {
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  max-width: 1440px;
  &.map {
    flex-direction: column;
    max-width: 40vw;
    margin: 0;
  }

  article {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-transform: uppercase;
    height: 60vh;
    margin: auto;
    min-width: 100vw;
    @include small-only {
      width: 90%;
      height: auto;
      padding: 5vw 0 15vw 0;
    }
  }
  &__title {
    display: block;
    position: relative;
    font-size: 42px;
    line-height: 1.1em;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
    color: white;
    transition: opacity 900ms ease-in-out;
    @include small-only {
      font-size: 18px;
      letter-spacing: 0.45em;
      margin-right: -0.45em;
      padding: 5px 10px;
      font-weight: 400;
      color: black;
      opacity: 0;
    }
    &.loaded {
      @include small-only {
        opacity: 1;
      }
      &:before {
        width: calc(100% + 25px);
      }
    }
    &:before {
      position: absolute;
      display: block;
      content: "";
      z-index: -1;
      top: -15px;
      left: -15px;
      bottom: -15px;
      width: 0;
      transition: width 900ms ease-in-out;
      background: black;
      @include small-only {
        display: none;
      }
    }
  }
  &__description {
    margin: auto;
    max-width: 620px;
    font-size: 14px;
    line-height: 2em;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 400;
    font-style: normal;
    @include small-only {
      padding-bottom: 0;
      max-width: 80vw;
    }

    span:last-child {
      opacity: 0;
      transition: opacity 600ms ease-in-out;
      &.loaded {
        opacity: 1;
      }
    }
  }
  &__container {
    margin-bottom: 10vh;
    @include small-only {
      margin-bottom: 5vh;
    }
    &:nth-child(even) {
      .landscape {
        // margin-left: 25vw;
      }
      .travel__photo.portrait {
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
      .landscape {
        // margin-left: 20vw;
      }
      .portrait {
      }
    }
  }

  &__photo {
    position: relative;
    background: $grey;

    @include small-only {
      margin: 0 auto 0 auto;
    }
    &:before {
      position: absolute;
      content: "";
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
        top: -10px;
        left: -10px;
        bottom: -10px;
        right: -10px;
        // display: none;
      }
    }
  }

  &__text {
    display: none;
    width: calc(100vw - 30px);
    text-align: justify;
    margin: auto;
    padding-top: 10px;
    @include small-only {
      display: block;
    }
    p {
      display: inline;
      font-family: "Libre Baskerville";
      padding: 5px;
      font-size: 0.9rem;
      line-height: 2.5;
      font-style: normal;
      color: #fff;
      background: #000;
      box-shadow: -5px 0 0 0 #000, 5px 0 0 0 #000;
    }
  }
  &__loader {
    position: absolute;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 600ms $easing;
  }
  img {
    position: relative;
    z-index: 10;
    will-change: opacity;
    opacity: 0;
    transition: opacity 1.5s $easing;
    max-width: 100%;
  }

  img[lazy="loaded"] {
    opacity: 1;
  }

  img[src^="http"] + .loader {
    opacity: 0;
  }
}
</style>
