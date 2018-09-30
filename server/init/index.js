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

// gzip 压缩静态文件
import compression from 'compression'

export default (app) => {
  // 尽量在其他中间件前使用compression
  app.use(compression());

  session(app);
  cookie(app);
  assets(app);
  router(app);
  api(app);
}