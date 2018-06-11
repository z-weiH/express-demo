import connection from './../mysql'
const fs = require('fs')
let router = (app) => {
  
  /* app.post('/logindo.htm', function(req, res) {
    console.log(connection);
    res.send('啦啦啦');
  }); */

  app.post('/userAdd',function(req,res) {
    connection.query("SELECT * FROM `user`",(err,result) => {
      console.log(result);
      //res.send('新增成功');
    });
  });

  // router 由前端 控制 ， 重定向到 index.html
  app.get('*', function(req, res) {  
    fs.readFile('./../web/dist/index.html', 'utf-8', (err, content) => {
      if (err) {
        console.log('We cannot open "index.htm" file.')
      }
  
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })
  
      res.end(content)
    })
  })

};

export default router