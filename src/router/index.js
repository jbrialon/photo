import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'pages/Hello'
import Albums from 'pages/Albums'
import Album from 'pages/Album'
import About from 'pages/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    console.log('ee')
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/albums/',
      name: 'Albums',
      component: Albums,
      props: true
    },
    {
      path: '/album/:name',
      name: 'Album',
      component: Album,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
