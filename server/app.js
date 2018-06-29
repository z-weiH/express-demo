import express from 'express'
let app = express();
// 加载所有 公共方法
import './global'

/* 
// 使用 session 中间件 存储用户 session
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
let mysqlOptions = import_module('/mysql/root.js')();
let sessionStore = new MySQLStore(mysqlOptions);
app.use(session({
  secret :  'fjdkr_9527', // 对session id 相关的cookie 进行签名
  //name : 'testId', // cookie 别名
  resave : false,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
    maxAge : user_session, // 设置 session 的有效时间，单位毫秒
  },
  store : sessionStore, // session 存储到mysql 如果不使用会存储到内存中，node重启 ， 会重置session
}));

// 获取 用户 cookie
import cookieParser from 'cookie-parser'
app.use(cookieParser());

 // 加载所有 静态资源
app.use(express.static('./../web/dist'));
app.use(express.static('./assets'));

// 加载所有 router
import router from './router'
router(app); 

// 加载所有 api 接口
import fs from 'fs'
let readdir = (path,type) => {
  // 读取文件夹 以及 文件
  fs.readdir(path,(err, files,callback) => {
    files.map((v,k) => {
      if(v.indexOf('.js') === -1){
        readdir(path + '/' + v,type);
      }else{
        let file = require(path + '/' +  v);
        file.default ? file.default(app) : file(app);
      }
    });
  });
};
readdir('./api','.js');
*/

import init from './init'
init(app);


app.listen(80, function () {
  console.log('服务初始化成功');
});

