import fs from 'fs'
import multer from 'multer'
import path from 'path'

let baseResult = import_module('/components/response');
let deleteFile = import_module('/components/deleteFile');
let random = import_module('/components/random');

let storage = multer.diskStorage({
  // 配置文件 存放目录
  destination: function (req, file, cb) {
    cb(null, app_path('/assets/static'))
  },
  // 配置文件名
  filename: function (req, file, cb) {
    cb(null, `${random()}_${file.originalname}`)
  },
})
// 配置校验参数 以及一些其他参数
let upload = multer({ storage: storage , limits : {
  // fieldSize : 1024 * 20,
}}).single('file');

let api = (app) => {
  app.post('/upload.json',upload,(req,res) => {
    let fileSize = req.file.size;
    let fileName = req.file.filename;
    let fileType = req.file.filename.split('.').pop().toLowerCase();
    // 文件删除
    //deleteFile(`/assets/static/${req.file.filename}`);
    res.send(baseResult({
        code : 'sucess',
        result : {
          path : '/static/' + req.file.filename,
        },
      }));
    });
  }

export default api;