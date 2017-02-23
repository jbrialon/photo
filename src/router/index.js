import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'pages/Hello'
import Album from 'pages/Album'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Album/:name',
      name: 'Album',
      component: Album,
      props: true
    }
  ]
})
