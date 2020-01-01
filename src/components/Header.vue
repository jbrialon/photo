<template>
  <header class="header"> 
    <h1>
      <router-link to="/">
        {{ title }}
      </router-link>
    </h1>
    <ul>
      <li>
        <router-link :to="{ name: 'Octnov'}">
          Oct+nov
        </router-link>
      </li>
      <li>
        <a href="https://www.instagram.com/jbrialon/" target="_blank" rel="noopener">
          instagram
        </a>
      </li>
      <li>
        <router-link :to="{ name: 'Travels'}">
          travels
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import content from 'data/content'

export default {
  name: 'c-header',
  data () {
    return {
      title: content.meta.title
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

header.header {
  display:flex;
  padding:15px;
  margin: auto;
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

        &.active,
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
</style>
