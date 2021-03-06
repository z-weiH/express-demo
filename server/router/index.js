import fs from 'fs'
import baseResult from './../components/response'
import jurisdictionExclude from './jurisdictionExclude'

let router = (app) => {
  
  // router 由前端 控制 ， 重定向到 index.html
  app.get('*', function(req, res,next) {
    // 重定向逻辑 start （页面刷新router拦截）
    /* if(req.originalUrl.indexOf('.json') !== -1) {
      let userId = req.session.userId;
      // 不需要校验的请求
      let requestUrl = ['/login'];
      let isLogin = req.cookies.isLogin === '1';
      // 当前 请求不需要校验
      if((requestUrl.indexOf(req.url) !== -1)){
      // 用户未登录
      }else if(!isLogin){
        //res.redirect(302,'/index.html'); 
        res.send(baseResult({
          code : 'login',
          message : '请登录',
        }));
        return;
      // 登录超时      
      }else if(!userId) {
        res.clearCookie('isLogin');
        //res.redirect(302,'/index.html'); 
        res.send(baseResult({
          code : 'overTime',
          message : '请重新登录',
        }));
        return;
      }else{
      }
    }
    // 重定向逻辑 end */
    // 判断当前请求 如果是页面请求 重定向到 index页面
    if(req.originalUrl.indexOf('.json') === -1){
      fs.readFile('./../web/dist/index.html', 'utf-8', (err, content) => {
        if (err) {
          console.log('We cannot open "index.htm" file.')
        }
    
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
        })
    
        res.end(content)
      })
    }else{
      next();
    }
  });

  // 请求拦截器
  app.all('*', function(req, res, next){
    // 接口不进行缓存
    res.header('Cache-Control','no-store');
    let userId = req.session.userId;
    let isLogin = req.cookies.isLogin === '1';
    // 当前 请求不需要校验
    if((jurisdictionExclude.indexOf(req.url) !== -1)){
      next();
    // 用户未登录
    }else if(!isLogin){
      res.send(baseResult({
        code : 'login',
        message : '请登录',
      }));
    // 登录超时      
    }else if(!userId) {
      res.clearCookie('isLogin');
      res.send(baseResult({
        code : 'overTime',
        message : '请重新登录',
      }));
    }else{
      next();
    }
  });

};

export default router