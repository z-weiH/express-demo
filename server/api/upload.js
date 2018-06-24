import fs from 'fs'
import multer from 'multer'
import path from 'path'

let baseResult = import_module('/components/response');
let deleteFile = import_module('/components/deleteFile');
let random = import_module('/components/random');
let {
  jsonParser,
  urlencodedParser,
  multipartMiddleware,
} = import_module('/components/requestType');

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
}}).single('file'); // 定义接受 字段名称

let api = (app) => {
  /* 
    文件上传到本地 方法1
      使用 multer 中间件 ， 接口调用成功 直接上传至本地
    问题：
      无法在保存的时候做校验，需要校验的话 在文件保存至本地再去做校验 ， 如果不符合规则 删除该文件 
  */
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

  /* 
    文件上传到本地 方法2
    使用 fs.rename 将文件直接移动到本地目录
  */
  app.post('/upload2.json',multipartMiddleware,(req,res) => {
    // 可以做 文件校验逻辑

    let file = req.files.file; // .file为接收字段名称
    let fileSize = file.size;
    let fileName = file.name;
    let fileType = file.name.split('.').pop().toLowerCase();
    let filePath = file.path;

    // 定义存储文件名
    let name = `${random()}_${fileName}`;
    fs.rename(filePath,`assets/static/${name}`, (err) => {
      res.send(baseResult({
        code : 'sucess',
        result : {
          path : '/static/' + name,
        },
      }));
    });
  });
}

export default api;