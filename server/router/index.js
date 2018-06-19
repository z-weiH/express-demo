import fs from 'fs'
import resFn from './../components/response'
import {ENV} from './../env'
let router = (app) => {
  
  // router 由前端 控制 ， 重定向到 index.html
  app.get('*', function(req, res) {
    // 重定向逻辑 start
    let userId = req.session.userId;
    // 不需要校验的请求
    let requestUrl = ['/login'];
    let isLogin = req.cookies.isLogin === '1';
    // 当前 请求不需要校验
    if((requestUrl.indexOf(req.url) !== -1)){
    // 用户未登录
    }else if(!isLogin){
      res.redirect(302,'/login'); 
      return;
    // 登录超时      
    }else if(!userId) {
      res.clearCookie('isLogin');
      res.redirect(302,'/login'); 
      return;
    }else{
    }
    // 重定向逻辑 end
    
    fs.readFile('./../web/dist/index.html', 'utf-8', (err, content) => {
      if (err) {
        console.log('We cannot open "index.htm" file.')
      }
  
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })
  
      res.end(content)
    })
  });

  // 请求拦截器
  app.all('/*', function(req, res, next){
    if(ENV === 'dev'){
      next();
      return;
    }
    let userId = req.session.userId;
    // 不需要校验的请求
    let requestUrl = ['/login.json','/signOut.json'];
    let isLogin = req.cookies.isLogin === '1';
    // 当前 请求不需要校验
    if((requestUrl.indexOf(req.url) !== -1)){
      next();
    // 用户未登录
    }else if(!isLogin){
      res.send(resFn({
        code : 'login',
        message : '请登录',
      }));
    // 登录超时      
    }else if(!userId) {
      res.clearCookie('isLogin');
      res.send(resFn({
        code : 'overTime',
        message : '请重新登录',
      }));
    }else{
      next();
    }
  });

};

export default router