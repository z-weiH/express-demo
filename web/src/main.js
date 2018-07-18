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

// 国际化
import i18n from './lang' 

// element-ui
import ElementUI from 'element-ui'
if(process.env.NODE_ENV === 'development') {
  // 装载 element ui
  Vue.use(ElementUI,{
    i18n: (key, value) => i18n.t(key, value),
  });
  // element-ui 样式
  require('element-ui/lib/theme-chalk/index.css');
// 增加else 为了， element-国际化 生效 ， 但是并没有增加文件大小
}else{
  Vue.use(ElementUI,{
    i18n: (key, value) => i18n.t(key, value),
  });
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
  i18n,
  components: { App },
  template: '<App/>'
})
