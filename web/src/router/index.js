import Vue from 'vue'
import Router from 'vue-router'

// 页面
import login from '@/views/login'
import notFound from '@/views/404'
import List from '@/views/list'

Vue.use(Router);
/* 

通过npm run dev运行的程序，打印process.env.NODE_ENV显示为：development；
通过npm run start运行的程序，打印process.env.NODE_ENV显示为：production；

*/
export default new Router({
  // 如果当前是开发环境 开启 hash模式， 否则使用 history模式
  mode: process.env.NODE_ENV !== 'development' ? 'history' : '',
  routes: [
    {
      path : '/',
      redirect : '/login',
    },
    {
      path : '/login',
      component : login,
    },
    {
      path: '/404',
      component : notFound,
    },
    {
      path : '*',
      redirect : '/404',
    },
    {
      path : '/list',
      component : List,
    },
  ]
})
