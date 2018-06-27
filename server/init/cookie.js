// 获取 用户 cookie 中间件
import cookieParser from 'cookie-parser'

export default (app) => {
  app.use(cookieParser());
}