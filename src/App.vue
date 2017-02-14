<template>
  <div id="app">
    <header>
      <h1>
        <router-link to="/">
          Complétement à l'est //
        </router-link>
      </h1>
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
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

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

    h1 {
      font-weight:400;
      margin:auto;
      border: 4px solid black;
      padding:10px 15px;

      a {
        color:black;
        text-decoration: none;
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
    transition: transform 750ms cubic-bezier(.33,0,.2,1), opacity 750ms cubic-bezier(.33,0,.2,1);
  }
  .page-enter, .page-leave-to {
    opacity:0;
    transform:translateY(-25px);
  }
}
</style>
