// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// axios
import axios from 'axios'
import './axios'
Vue.prototype.$http = axios;

// element-ui
import ElementUI from 'element-ui'
if(process.env.NODE_ENV === 'development') {
  // 装载 element ui
  Vue.use(ElementUI);
  // element-ui 样式
  require('element-ui/lib/theme-chalk/index.css');
}


// 样式
import '@/assets/css/index.scss'
import '@/assets/font/iconfont/iconfont.css'

// 引入 store
import store from './store'

// loading
Vue.prototype.$mloading = ({lock = true , text = '加载中~'} = {}) => {
  return window.APP.$loading({
    lock: lock,
    text: text,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

// cookie
import cookie from 'js-cookie'
Vue.prototype.$cookie = cookie;

/* eslint-disable no-new */
window.APP = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
