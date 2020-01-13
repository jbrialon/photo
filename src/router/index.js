import Vue from 'vue'
import Router from 'vue-router'
import Octnov from 'pages/Octnov'
import Disclaimer from 'pages/Disclaimer'
import Travels from 'pages/Travels'
import Travel from 'pages/Travel'
import About from 'pages/About'
import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)
const isMobile = md.phone() !== null

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Travels',
      component: Travels,
      props: true
    },
    {
      path: '/octnov/',
      name: 'Octnov',
      component: isMobile ? Disclaimer : Octnov,
      props: true
    },
    {
      path: '/album/:name',
      name: 'Travel',
      component: Travel,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      props: true
    }
  ]
})
