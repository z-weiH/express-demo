import Vue from 'vue'
import Router from 'vue-router'

// 页面

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
      component : resolve => require(['@/views/login'], resolve), 
    },
    {
      path: '/404',
      component : resolve => require(['@/views/404'], resolve), 
    },
    {
      path : '*',
      redirect : '/404',
    },
    {
      path : '',
      component : resolve => require(['@/views/layout'], resolve), 
      children : [
        {
          path : '/list',
          component : resolve => require(['@/views/list'], resolve), 
          meta : {
            name : '/list',
          },
        },
      ],
    },
  ]
})
