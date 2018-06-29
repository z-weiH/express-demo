
import path from 'path'

// 文件导入
global.import_module = (url) => {
  let data;
  // 使用 try catch 原因 window路径获取为 F:\var\www\  centOS 路径为 /var/www
  try {
    let dataPath = path.join(__dirname,'') + url.replace(/\//g,'\\');
    data = require(dataPath);
    !global.app_env && (global.app_env = 'window');
  }catch (err) {
    let dataPath = path.join(__dirname,'') + url;
    data = require(dataPath);
    !global.app_env && (global.app_env = 'centOS');
  }
  return data.default || data;
};

// 文件路径
global.app_path = (url) => {
  let position = path.join(__dirname,'');
  if(global.app_env === 'centOS') {
    position = position + url;
  }else{
    position = position + url.replace(/\//g,'\\');
  }
  return position;
}

// 用户session 时间
global.user_session = 1000 * 60 * 30;

