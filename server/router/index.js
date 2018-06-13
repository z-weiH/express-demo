import fs from 'fs'
let router = (app) => {
  
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