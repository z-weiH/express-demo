// session 模块
import session from './session'
// cookie 模块
import cookie from './cookie'
// 静态资源
import assets from './assets'
// router 拦截
import router from './router'
// api 接口
import api from './api'

export default (app) => {
  session(app);
  cookie(app);
  assets(app);
  router(app);
  api(app);
}