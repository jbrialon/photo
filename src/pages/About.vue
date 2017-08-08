<template>
  <div class="about">
    <article class="about__article">
      <div v-lazy:background-image="content.cover" class="about__background">
        <div class="about__content">
          <h1 class="about__title">
            {{ this.content.displayName }}
          </h1>
          <br>
          <br>
          <br>
          <br>
          <br>
          <span class="about__text" v-html="this.content.text"></span>
        </div>
      </div>
      <p class="about__links">
        <template v-for="link in links">
          <a :href="link.link" rel="noopener" target="_blank"> {{ link.title }} </a> <br>
        </template>
      </p>
    </article>
  </div>
</template>

<script>
import content from '../data/content'

export default {
  name: 'about',
  metaInfo: {
    title: content.about.displayName.toUpperCase(),
    titleTemplate: `%s //`
  },
  data () {
    return {
      links: content.social,
      content: content.about
    }
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.about {
  width:100%;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height:80vh;

  @include small-only {
    padding-top:5vw;
  }

  &__article {
    width:calc(100vw - 30px);
    height: 60vh;

    @include small-only {
      width:90%;
      height:auto;
      padding: 5vw 0 25vw 0;
    }
  }

  &__background {
    display:flex;
    opacity:0;
    flex-direction: column;
    justify-content: center;
    width:100%;
    padding:0 45px;
    height:45vh;
    background-size:cover;
    background-position:center;
    transition:opacity 400ms $easing;
    &[lazy=loaded] {
      opacity: 1;
    }
  }

  &__title {
    display:inline;
    text-transform: uppercase;
    font-size:32px;
    letter-spacing: 0.45em;
    // margin-right: -1.45em;
    padding:5px 0px 5px 20px;
    color:white;
    background:black;
    box-shadow: -10px 0 0 0 #000, 10px 0 0 0 #000;
    @include small-only {
      font-size:20px;
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
    color:white;
    background:black;
    padding:5px 5px 5px 5px;
    box-shadow: -10px 0 0 0 #000, 10px 0 0 0 #000;
    @include small-only {
      font-size:15px;
    }
  }

  &__links {
    margin:70px auto;
  }
  &__links a {
    position:relative;
    text-decoration: none;
    text-transform: uppercase;
    color:black;
    display:inline-flex;
    align-items: center;
    font-size: 15px;
    line-height: 2.2em;
    letter-spacing: .08em;
    font-weight: 400;

    &:after {
      display:block;
      position:absolute;
      content:'';
      background:black;
      width:0;
      bottom:4px;
      height:2px;
      transition:width 500ms ease-in-out;
    }
    &:hover:after {
      width:100%;
    }
  }
}
</style>
