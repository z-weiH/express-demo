import Vue from 'vue'
import Router from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router);
/* 

通过npm run dev运行的程序，打印process.env.NODE_ENV显示为：development；
通过npm run start运行的程序，打印process.env.NODE_ENV显示为：production；

*/

let router = new Router({
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
        {
          path : '/demo',
          component : resolve => require(['@/views/demo'], resolve), 
          meta : {
            name : '/demo',
          },
        },
      ],
    },
  ]
});

/* 前置钩子 */
router.beforeEach((to, from, next) => {
  // 返回顶部
  window.scrollTo(0, 0);
  NProgress.start();
  next();
});

/* 后置钩子 */
router.afterEach((to, from) => {
  NProgress.done();
});

export default router
