import fs from 'fs'
import multer from 'multer'
import path from 'path'
import formidable from 'formidable'

let baseResult = import_module('/components/response');
let deleteFile = import_module('/components/deleteFile');
let random = import_module('/components/random');

// multer 配置项 start
let storage = multer.diskStorage({
  // 配置文件 存放目录
  destination: function (req, file, cb) {
    cb(null, app_path('/assets/upload'))
  },
  // 配置文件名
  filename: function (req, file, cb) {
    cb(null, `${random()}_${file.originalname}`)
  },
})
// 配置校验参数 以及一些其他参数
let upload = multer({ storage: storage , limits : {
  fileSize : 200 * 1024 * 1024,
}}).single('file'); // 定义接受 字段名称
// multer 配置项 end

let api = (app) => {
  /* 
    文件上传到本地 方法1
      使用 multer 中间件 直接保存文件，再做逻辑校验
    问题：
      无法在保存的时候做校验，需要校验的话 在文件保存至本地再去做校验 ， 如果不符合规则 删除该文件 
  */
  app.post('/upload.json',(req,res) => {
    // 请求总大小 req.headers['content-length'] 不能判断某一个文件的大小

    // 文件上传至本地事件
    upload(req, res, function (err) {
      if (!err) {
        let file = req.file;
        let fileSize = file.size;
        let fileName = file.filename;
        let fileType = file.filename.split('.').pop().toLowerCase();
        // 逻辑校验 校验不通过 删除文件

        // 文件删除
        //deleteFile(`/assets/upload/${fileName}`);
        // 返回 文件ulr
        res.send(baseResult({
          code : 'success',
          result : {
            path : '/upload/' + fileName,
          },
        }));
      }else{
        console.log(err);
      }
    });
  });

  /* 
    文件上传到本地 方法2 和方法1类似
    使用 formidable 中间件 直接保存文件，再做逻辑校验
    问题：
      无法在保存的时候做校验，需要校验的话 在文件保存至本地再去做校验 ， 如果不符合规则 删除该文件 
  */
  app.post('/upload2.json',(req,res) => {
    // 请求总大小 req.headers['content-length'] 不能判断某一个文件的大小

    let form = new formidable.IncomingForm();
    // 文件是否包含 文件后缀
    form.keepExtensions = true;
    // 文件上传 目录
    form.uploadDir = app_path('/assets/upload');
    // 文件限制 大小 200M
    form.maxFileSize  = 200 * 1024 * 1024;
    // 文件上传至本地事件
    form.parse(req, function(err, fields, files) {
      if(!err){
        let file = files.file;
        let fileSize = file.size;
        let fileName = file.name;
        let fileType = file.name.split('.').pop().toLowerCase();
        // 逻辑校验 校验不通过 删除文件

        // 文件删除
        //deleteFile(`/assets/upload/${fileName}`);

        // 文件重命名
        let name = `${random()}_${fileName}`;
        fs.rename(file.path,`assets/upload/${name}`, (err) => {
          // 返回 文件ulr
          res.send(baseResult({
            code : 'success',
            result : {
              path : '/upload/' + name,
            },
          }));
        });
      }else{
        console.log(err);
      }
    });
  });
}

export default api;