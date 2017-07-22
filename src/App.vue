<template>
  <div id="app" v-cloak>
    <header>
      <h1>
        <router-link to="/">
          {{ title }}
        </router-link>
      </h1>
      <ul>
        <li v-for="item in menu">
          <a :href="item.link" target="_blank" rel="noopener"> {{ item.title }} </a>
        </li>
        </li>
      </ul>
    </header>
    <transition name="page" mode="out-in" @before-enter="beforeEnter">
      <router-view class="page"></router-view>
    </transition>
    <footer>
      <p>© {{new Date().getFullYear()}} //</p>
    </footer>
  </div>
</template>

<script>
import content from 'data/content'

export default {
  name: 'app',
  metaInfo: {
    title: content.meta.title,
    titleTemplate: `%s - ${content.meta.title}`
  },
  data () {
    return {
      title: content.meta.title,
      menu: content.menu
    }
  },
  methods: {
    beforeEnter () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
@import 'scss/main';

#app {
  overflow:hidden;
  width:100%;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  header {
    display:flex;
    height:15vh;
    padding:15px;

    h1 {
      font-weight:400;
      margin:auto auto auto 0;
      border: 3px solid black;
      padding:15px 20px;

      @include small-only {
        font-size:22px;
        margin:auto;
      }

      a {
        color:black;
        text-decoration: none;
      }
    }

    ul {
      list-style:none;
      margin:auto 0 auto auto;
      font-size:17px;

      @include small-only {
        display:none;
      }


      li {
        display:inline-block;
        margin-right:15px;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-weight: 400;
        line-height: 1em;

        a {
          text-decoration:none;
          color:black;
          transition:color 300ms $easing;

          &:hover {
            color:$red;
          }
        }

        &:after {
          content: '//'
        }

        &:last-child {
          margin-right:0;
        }

        &:last-child:after {
          // content:'';
        }
      }
    }
  }

  .page {
    will-change:transform, opacity;
  }

  footer {
    display:flex;
    text-transform:uppercase;
    height:5vh;
    padding:15px;

    p {
      font-weight: 400;
      font-size:12px;
      margin:auto 0 auto auto;
    }
  }

  .page-enter-active, .page-leave-active {
    transition: transform 750ms $easing, opacity 750ms $easing;
  }
  .page-enter, .page-leave-to {
    opacity:0;
    transform:translateY(-25px);
  }
}
</style>
