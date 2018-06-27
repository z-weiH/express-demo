import fs from 'fs'

export default (app) => {
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
  // 读取所有 api文件夹下的js
  readdir(app_path('/api'),'.js');
}