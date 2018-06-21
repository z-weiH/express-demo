
import path from 'path'

// 文件导入
global.import_module = (url) => {
  let data;
  // 使用 try catch 原因 window路径获取为 F:\var\www\  centOS 路径为 /var/www
  try {
    let dataPath = path.join(__dirname,'') + url;
    data = require(dataPath);
  }catch (err) {
    let dataPath = path.join(__dirname,'') + url.replace(/\//g,'\\\\');
    data = require(dataPath);
  }
  return data.default || data;
};