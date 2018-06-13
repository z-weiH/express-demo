
import sql from './../sql/user'

import {
  jsonParser,
  urlencodedParser,
  multipartMiddleware,
} from './../components/requestType'

import resFn from './../components/response'

let api = (app,connection) => {
  // 根据 用户名 和 密码 查询 用户
  app.post('/login.json',urlencodedParser,function(req,res) {
    let {userName , passWord} = req.body;
    connection.query(`SELECT * FROM user WHERE userName="${userName}" AND passWord="${passWord}";`,(err,result) => {
      let obj = {
        code : result.length > 0 ? 'success' : 'notFound',
        message : result.length > 0 ? '' : '用户名或密码错误',
      };
      res.send(resFn(obj));
    });
  });

  // 用户新增
  app.post('/userInset.json',urlencodedParser,function(req,res) {
    let {userName,passWord} = req.body;
    // 查询用户是否 存在
    connection.query(`SELECT * FROM user WHERE userName="${userName}";`,(err,result) => {
      if(result.length > 0){
        let obj = {
          code : 'error',
          message : '用户已存在',
        };
        res.send(resFn(obj));
        return;
      }
      connection.query(`INSERT INTO user (userName,passWord)  VALUES ("${userName}","${passWord}");`,(err,result) => {
        let obj = {
          code : 'success',
          message : '用户新增成功',
        };
        res.send(obj);
      });
    });
  });

  // 用户修改
  app.post('/userUpdata.json',urlencodedParser,function(req,res) {
    let {userName,passWord} = req.body;
    connection.query(`UPDATE user SET userName="${userName}",passWord="${passWord}" WHERE userName="${userName}" AND passWord="${passWord}";`,(err,result) => {
      console.log(result,'lalal');
      let type = result.affectedRows === 1 ? true : false;
      let obj = {
        code : type ? 'success' : 'error',
        message : type ? '用户修改成功' : '用户未找到',
      };
      res.send(obj);
    });
  });

  // 用户修改
  app.post('/userDelete.json',urlencodedParser,function(req,res) {
    let {userName,passWord} = req.body;
    connection.query(`DELETE from user WHERE userName='${userName}' AND passWord="${passWord}";`,(err,result) => {
      let type = result.affectedRows === 1 ? true : false;
      let obj = {
        code : type ? 'success' : 'error',
        message : type ? '删除成功' : '用户未找到',
      };
      res.send(obj);
    });
  });

  // 查询所有用户
  app.post('/queryUserList.json',function(req,res) {
    connection.query(`SELECT * FROM user;`,(err,result) => {
      let obj = {
        result : result,
      };
      res.send(resFn(obj));
    });
  });

};

module.exports = api;