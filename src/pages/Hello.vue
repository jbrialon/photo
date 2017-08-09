<template>
  <div class="hello">
    <article v-for="item in menu">
      <router-link :to="{ name: 'Album', params: { name: item.name }}">
        <h2>
          {{ item.displayName }}
        </h2>
        <div v-lazy:background-image="item.cover" class="img"></div>
      </router-link>
    </article>
  </div>
</template>

<script>
import content from '../data/content'

export default {
  name: 'hello',
  metaInfo: {
    title: content.meta.title,
    titleTemplate: `%s`,
    meta: content.meta.meta
  },
  data () {
    return {
      menu: content.albums
    }
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.hello {
  width:100%;
  display:flex;
  flex-wrap: wrap;

  @include small-only {
    padding-top:5vw;
  }

  article {
    position:relative;
    width: 50%;
    height:55vh;
    overflow:hidden;
    border-bottom: 2px solid white;
    cursor:pointer;
    background-color: $red;

    @include small-only {
      width: 100%;
      height:250px;
    }

    @include ipad {
      height:340px;
    }

    &:nth-child(even) {
      border-left: 1px solid white;
      @include small-only {
        border-left:none;
      }
    }

    &:nth-child(odd) {
      border-right: 1px solid white;
      @include small-only {
        border-right:none;
      }
    }

    a {
      display:block;
      width:100%;
      height:100%;
    }

    &:hover {
      h2 {
        opacity:1;
      }

      .img[lazy=loaded] {
        opacity:0.75;
      }
    }

    h2 {
      position:absolute;
      opacity:0;
      z-index:1;
      transition:opacity 400ms $easing;
      will-change:opacity;
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
      color:white;
      background:black;
      font-size: 42px;
      line-height: 1.1em;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-weight: 700;
      padding:6px 10px;
      display: inline-block;
      margin:0;
      max-width: 70%;

      @include small-only {
        opacity:1;
        font-size: 26px;
      }

      @include ipad {
        opacity:1;
        font-size: 32px;
      }
    }

    .img {
      position:absolute;
      top:0;
      left:0;
      bottom:0;
      right:0;
      z-index:0;
      opacity:0;
      transition:opacity 400ms $easing;
      will-change:opacity;
      background-repeat:no-repeat;
      background-position:center;
      background-size: cover;
    }

    .img[lazy=loaded] {
      opacity: 1;
    }
  }
}
</style>
