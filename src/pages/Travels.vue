<template>
  <div class="travels">
    <c-header></c-header>
    <article v-for="(album, index) in albums" :key="index">
      <router-link :to="{ name: 'Travel', params: { name: album.name } }">
        <h2>
          {{ $t(`albums.${album.name}.displayName`) }}
        </h2>
        <div v-lazy="album.cover" class="img"></div>
      </router-link>
    </article>
    <c-footer></c-footer>
  </div>
</template>

<script>
import { pickBy } from "lodash";

import content from "../data/content.js";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "travels",
  // metaInfo: {
  //   title: content.meta.title,
  //   titleTemplate: `%s`,
  //   meta: content.meta.meta,
  // },
  data() {
    return {
      albums: pickBy(content.albums, (album) => !album.hidden),
    };
  },
  components: {
    "c-header": Header,
    "c-footer": Footer,
  },
};
</script>

<style scoped lang="scss">
@import "../scss/vars";
@import "../scss/mixins";

.travels {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  header.header {
    justify-content: center;
    width: 50%;
    height: 55vh;
    padding: 0 35px;
    @include small-only {
      width: 100%;
      height: 250px;
    }

    @include ipad {
      height: 340px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1,
      ul {
        margin: auto;
        padding: 0;
      }
    }
  }
  article {
    position: relative;
    width: 50%;
    height: 55vh;
    overflow: hidden;
    border-bottom: 2px solid white;
    cursor: pointer;
    background-color: $red;

    @include small-only {
      width: 100%;
      height: 250px;
    }

    @include ipad {
      height: 340px;
    }

    &:nth-child(even) {
      border-left: 1px solid white;
      @include small-only {
        border-left: none;
      }
    }

    &:nth-child(odd) {
      border-right: 1px solid white;
      @include small-only {
        border-right: none;
      }
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
    }

    &:hover {
      h2 {
        opacity: 1;
      }

      .img[lazy="loaded"] {
        opacity: 0.75;
      }
    }

    h2 {
      position: absolute;
      opacity: 0;
      z-index: 1;
      transition: opacity 400ms $easing;
      will-change: opacity;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      background: black;
      font-size: 42px;
      line-height: 1.1em;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 700;
      padding: 6px 10px;
      display: inline-block;
      margin: 0;
      max-width: 70%;

      @include small-only {
        opacity: 1;
        font-size: 26px;
      }

      @include ipad {
        opacity: 1;
        font-size: 32px;
      }
    }

    .img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 0;
      opacity: 0;
      transition: opacity 400ms $easing;
      will-change: opacity;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }

    .img[lazy="loaded"] {
      opacity: 1;
    }
  }
}
</style>
