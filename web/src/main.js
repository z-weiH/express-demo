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
// 装载 element ui
Vue.use(ElementUI);

// 样式
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.scss'
import '@/assets/font/iconfont/iconfont.css'

// 引入 store
import store from './store'


/* eslint-disable no-new */
window.APP = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
