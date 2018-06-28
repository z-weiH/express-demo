let baseResult = import_module('/components/response');

let api = (app) => {
  // 静态文件下载
  app.get('/download.json',(req,res) => {
    let {path} = req.query;
    if(!path) {
      res.send(baseResult({
        code : 'error',
        message : '文件路径为空',
      }));
    };
    res.download(app_path(`/assets${path}`),(err) => {
      if(err) {
        console.log(err,'文件下载失败');
        res.send(baseResult({
          code : 'error',
          message : '文件下载异常',
        }));
      }
    });
  });
}

export default api