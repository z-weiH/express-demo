import Vue from 'vue'
import Router from 'vue-router'

// 页面
import login from '@/views/login'
import HelloWorld from '@/components/HelloWorld'
import notFound from '@/views/404'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path : '/',
      redirect: '/login',
    },
    {
      path : '/login',
      component: login,
    },
    {
      path: '/404',
      component: notFound,
    },
    {
      path: '*',
      redirect: '/404',
    },


    {
      path: '/helloWord',
      component: HelloWorld,
    },
  ]
})
