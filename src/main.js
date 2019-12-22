// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Meta from 'vue-meta'
import VueLazyload from 'vue-lazyload'
import 'normalize.css'

Vue.use(Meta)
Vue.use(VueLazyload, {
  preLoad: 2,
  attempt: 3,
  observer: true,
  filter: {
    media (listener, options) {
      const filename = listener.src.split('/')[3].split('.')[0]
      console.log(filename)
      // listener.src = `https://media--completementalest.netlify.com/static/img/${filename}.jpg`
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
