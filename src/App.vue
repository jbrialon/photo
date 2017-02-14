<template>
  <div id="app">
    <header>
      <h1>
        <router-link to="/">
          Complétement à l'est //
        </router-link>
      </h1>
      <ul>
        <li>
          <a href="https://www.instagram.com/jbrialon_/" target="_blank">
            instagram
          </a>
        </li>
        <li>
          <a href="http://vsco.co/jbrialon/" target="_blank">
            vsco
          </a>
        </li>
        <li>
          <a href="https://500px.com/jbrialon" target="_blank">
            500px
          </a>
        </li>
        <li>
          <a href="https://vimeo.com/jbrialon" target="_blank">
            vimeo
          </a>
        </li>
      </ul>
    </header>
    <transition name="page" mode="out-in">
      <router-view class="page"></router-view>
    </transition>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'app'
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

      a {
        color:black;
        text-decoration: none;
      }
    }

    ul {
      list-style:none;
      margin:auto 0 auto auto;
      font-size:17px;

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
    height:15vh;
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
