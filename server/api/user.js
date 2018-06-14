
import sql from './../sql/user'

import {
  jsonParser,
  urlencodedParser,
  multipartMiddleware,
} from './../components/requestType'

import resFn from './../components/response'
import uuid from 'node-uuid'

let api = (app,connection) => {
  // 用户登录
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
    let {userName,passWord,nickName} = req.body;
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
      connection.query(`INSERT INTO user (id,userName,passWord,nickName)  VALUES ("${uuid.v4()}","${userName}","${passWord}","${nickName}");`,(err,result) => {
        let obj = {
          code : 'success',
          message : '用户新增成功',
        };
        res.send(resFn(obj));
      });
    });
  });

  // 用户修改
  app.post('/userUpdata.json',urlencodedParser,function(req,res) {
    let {userName,passWord,nickName,id} = req.body;
    connection.query(`UPDATE user SET userName="${userName}",passWord="${passWord}",nickName="${nickName}" WHERE id="${id}";`,(err,result) => {
      let type = result.affectedRows === 1 ? true : false;
      let obj = {
        code : type ? 'success' : 'error',
        message : type ? '用户修改成功' : '用户未找到',
      };
      res.send(resFn(obj));
    });
  });

  // 用户删除
  app.post('/userDelete.json',urlencodedParser,function(req,res) {
    let {id} = req.body;
    connection.query(`DELETE from user WHERE id='${id}';`,(err,result) => {
      let type = result.affectedRows === 1 ? true : false;
      let obj = {
        code : type ? 'success' : 'error',
        message : type ? '删除成功' : '用户未找到',
      };
      res.send(resFn(obj));
    });
  });

  // 查询所有用户
  app.post('/queryUserList.json',function(req,res) {
    connection.query(`SELECT * FROM user;`,(err,result) => {
      result = result.map((v) => {
        delete v.passWord;
        return v;
      });
      let obj = {
        result : result,
      };
      res.send(resFn(obj));
    });
  });

  // 根据用户 id 查询 用户数据
  app.post('/queryUserDetail',urlencodedParser,function(req,res) {
    let {id} = req.body;
    connection.query(`SELECT * FROM user WHERE id="${id}";`,(err,result) => {
      let obj = {
        code : 'success',
        result : result[0],
      };
      res.send(resFn(obj));
    });
  });

};

module.exports = api;