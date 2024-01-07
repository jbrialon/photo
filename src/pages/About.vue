<template>
  <div class="about">
    <c-header></c-header>
    <article class="about__article">
      <div class="about__bottom">
        <div
          class="about__background"
          v-lazy:background-image="content.cover"
        ></div>
        <div class="about__content">
          <h1 class="about__title">
            {{ $t("about.displayName") }}
          </h1>
          <br />
          <br />
          <br />
          <br />
          <br />
          <span class="about__text" v-html="$t('about.text')"></span>
        </div>
      </div>
      <p class="about__links">
        <template v-for="(link, index) in links" :key="index">
          <a :href="link.link" rel="noopener" target="_blank">
            {{ link.title }}
          </a>
        </template>
      </p>
    </article>
    <c-footer></c-footer>
  </div>
</template>

<script>
import content from "../data/content.js";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "about",
  // metaInfo() {
  //   return {
  //     title: this.$t("about.displayName").toUpperCase(),
  //     titleTemplate: `%s //`,
  //     meta: content.about.meta,
  //   };
  // },
  data() {
    return {
      links: content.social,
      content: content.about,
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

.about {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100vh;
  header.header {
    width: calc(100vw - 15px);
    // height: 10vh;
    padding: 15px;
  }
  @include small-only {
    padding-top: 5vw;
  }
  &__article {
    position: relative;
    width: calc(100vw - 45px);
    height: 76vh;

    @include small-only {
      width: 90%;
      height: auto;
      padding: 5vw 0 25vw 0;
    }
  }
  &__bottom {
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    background: $grey;
    padding: 0 45px;
    height: 38vh;
    bottom: 0;
  }
  &__content {
    position: relative;
    z-index: 1;
  }
  &__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    opacity: 0;
    background-size: cover;
    background-position: top;
    transition: opacity 400ms $easing;
    &[lazy="loaded"] {
      opacity: 1;
    }
  }
  &__title {
    display: inline;
    text-transform: uppercase;
    font-size: 32px;
    letter-spacing: 0.45em;
    margin-right: -0.45em;
    padding: 5px;
    color: white;
    background: black;
    box-shadow: -25px 0 0 0 #000, 10px 0 0 0 #000;
    @include small-only {
      font-size: 20px;
    }
  }
  &__text {
    margin: auto;
    max-width: 620px;
    font-size: 18px;
    line-height: 2.2em;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 400;
    font-style: normal;
    color: white;
    background: black;
    padding: 5px 5px 5px 5px;
    box-shadow: -10px 0 0 0 #000, 10px 0 0 0 #000;
    @include small-only {
      font-size: 15px;
    }
  }
  &__links {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    height: 38vh;
    margin: 0;
    padding: 50px;
  }
  &__links a {
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
    display: inline-flex;
    align-items: center;
    font-size: 15px;
    line-height: 2.2em;
    letter-spacing: 0.08em;
    font-weight: 400;
    &:after {
      display: block;
      position: absolute;
      content: "";
      background: black;
      width: 0;
      bottom: 4px;
      height: 1px;
      transition: width 350ms ease-in-out;
    }
    &:hover:after {
      width: 99%;
    }
  }
}
</style>
