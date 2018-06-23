import fs from 'fs'


let deleteFile = (path,callback) => {
  fs.unlink(app_path(path));
  callback && callback();
}

export default deleteFile