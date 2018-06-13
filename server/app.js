import express from 'express'
let app = express();

 // 加载所有 静态资源
app.use(express.static('./../web/dist'));

// 加载所有 router
import router from './router'
router(app); 

// 加载所有 接口
import fs from 'fs'
import connection from './mysql'
let readdir = (path,type) => {
  // 读取文件夹 以及 文件
  fs.readdir(path,(err, files,callback) => {
    files.map((v,k) => {
      if(v.indexOf('.js') === -1){
        readdir(path + '/' + v,type);
      }else{
        var file = require(path + '/' +  v);
        file(app,connection);
      }
    });
  });
};
readdir('./api','.js');




app.listen(80, function () {
  console.log('服务初始化成功');
});

