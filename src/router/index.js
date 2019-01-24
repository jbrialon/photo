import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'pages/Hello'
import Album from 'pages/Album'
import About from 'pages/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
