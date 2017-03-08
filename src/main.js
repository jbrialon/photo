// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Meta from 'vue-meta'
import VueLazyload from 'vue-lazyload'
// import VueAnalytics from 'vue-ua'
import 'normalize.css'

// Vue.use(VueAnalytics, {
//   appName: 'completementalest',
//   appVersion: 'v1',
//   trackingId: 'UA-93234452-1',
//   debug: true,
//   vueRouter: router
// })

Vue.use(Meta)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 3
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
