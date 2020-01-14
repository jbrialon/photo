import Vue from 'vue'
import Router from 'vue-router'
// import Octnov from 'pages/Octnov'
// import Disclaimer from 'pages/Disclaimer'
// import Travels from 'pages/Travels'
// import MobileDetect from 'mobile-detect'

// const md = new MobileDetect(window.navigator.userAgent)
// const isMobile = md.phone() !== null

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Travels',
      component: () => import(/* webpackChunkName: "travels" */ 'pages/Travels.vue'),
      props: true
    },
    {
      path: '/octnov/',
      name: 'Octnov',
      components: () => import(/* webpackChunkName: "octnov" */ 'pages/Octnov.vue'),
      props: true
    },
    {
      path: '/album/:name',
      name: 'Travel',
      component: () => import(/* webpackChunkName: "travel" */ 'pages/Travel.vue'),
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ 'pages/About.vue'),
      props: true
    }
  ]
})
