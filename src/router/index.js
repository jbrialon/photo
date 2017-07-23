import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'pages/Hello'
import Album from 'pages/Album'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    }
  ]
})
