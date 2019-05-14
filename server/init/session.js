// 使用 session 中间件 存储用户 session
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
let mysqlOptions = import_module('/mysql/root.js')();
let sessionStore = new MySQLStore(mysqlOptions);

export default (app) => {
  app.use(session({
    secret :  'fjdkr_9527', // 对session id 相关的cookie 进行签名
    //name : 'testId', // cookie 别名
    resave : false,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
      maxAge : user_session, // 设置 session 的有效时间，单位毫秒
      // 处理 CSRF 攻击
      sameSite : 'strict',
    },
    store : sessionStore, // session 存储到mysql 如果不使用会存储到内存中，node重启 ， 会重置session
  }));
}