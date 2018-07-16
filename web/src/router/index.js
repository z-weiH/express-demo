import Vue from 'vue'
import Router from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

if(process.env.NODE_ENV === 'development') {
  Vue.use(Router);
}

// loading 排除的页面
import loadingExclude from './loadingExclude'
// 超时 排除页面
import overtimeExclude from './overtimeExclude'
// 权限 排除页面
import jurisdictionExclude from './jurisdictionExclude'
// 所有 页面 router
import pages from './pages'


/* 

通过npm run dev运行的程序，打印process.env.NODE_ENV显示为：development；
通过npm run build运行的程序，打印process.env.NODE_ENV显示为：production；

*/
let router = new Router({
  // 如果当前是开发环境 开启 hash模式， 否则使用 history模式
  mode: process.env.NODE_ENV !== 'development' ? 'history' : '',
  routes: pages,
});

/* 前置钩子 */
router.beforeEach((to, from, next) => {
  // 用户超时 拦截
  if( (overtimeExclude.indexOf(to.path) === -1) && (!localStorage.getItem('loginInfo')) ){
    router.push(`/login?renderurl=${to.path}`);
    return;
  }

  // 返回顶部
  window.scrollTo(0, 0);
  NProgress.start();

  // 权限判断 start
    // 环境 判断
  if(process.env.NODE_ENV === 'development') {
    next();
    // 不需要权限 页面
  }else if(jurisdictionExclude.indexOf(to.path) !== -1) {
    next();
  }else{
    next();
    // 权限拦截
    /* try {
      // 当前用户 所有权限树
      let treeList = [];
      let tree = JSON.parse(localStorage.getItem('menuInfoList'));
      // 递归
      let fn = (tree) => {
        tree.map((v, k) => {
          v.children.map((v1, k1) => {
            if (v1.children) {
              fn(v1);
            } else {
              treeList.push(v1.menuUrl);
            }
          });
        });
      }
      fn(tree);
      
    // 当前未登录
    } catch (err) {
      router.replace(`/login?returnUrl=${router.history.pending.path}`);
    } */
  }
  // 权限判断 end
});

/* 后置钩子 */
router.afterEach((to, from) => {
  NProgress.done();
  
  // loading
  if(loadingExclude.indexOf(to.path) === -1) {
    if(window.APP) {
      window.$dialogClose = window.APP.$mloading();
    }
  }
});

export default router
