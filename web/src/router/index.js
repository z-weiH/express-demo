import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import notFound from '@/views/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path : '/',
      component: HelloWorld
    },
    {
      path: '/helloWord',
      component: HelloWorld
    },
    {
      path: '*',
      component: notFound
    },
  ]
})
