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
  observer: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
