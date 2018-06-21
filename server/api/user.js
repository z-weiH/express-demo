
import sql from './../sql/user'

let {
  jsonParser,
  urlencodedParser,
  multipartMiddleware,
} = import_module('/components/requestType');

let resFn = import_module('/components/response')
import uuid from 'node-uuid'

let api = (app,connection) => {
  // 用户登录
  app.post('/login.json',urlencodedParser,function(req,res) {
    let {userName , passWord} = req.body;
    connection.query(`SELECT * FROM user WHERE userName="${userName}" AND passWord="${passWord}";`,(err,result) => {
      if(result.length === 0){
        let obj = {
          code : 'error',
          message : '用户名或密码错误',
        };
        res.send(resFn(obj));
      }else{
        let loginResult = {
          userName : result[0].userName,
          nickName : result[0].nickName,
        }
        let obj = {
          code : 'success',
          result : loginResult,
        };
        // 登录成功 设置 用户 id
        req.session.userId = result[0].id;
        // 设置用户 是否已经登录过
        res.cookie('isLogin','1',{ expires: new Date(Date.now() + 1000 * 60 * 30)});
        res.send(resFn(obj));
      }
      
      
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
    // 判断用户是否存在
    connection.query(`SELECT * FROM user WHERE userName="${userName}";`,(err,result) => {
      if(result.length > 0 && result[0].id !== id){
        let obj = {
          code : 'error',
          message : '用户已存在',
        };
        res.send(resFn(obj));
        return;
      }
      connection.query(`UPDATE user SET userName="${userName}",passWord="${passWord}",nickName="${nickName}" WHERE id="${id}";`,(err,result) => {
        let type = result.affectedRows === 1 ? true : false;
        let obj = {
          code : type ? 'success' : 'error',
          message : type ? '用户修改成功' : '用户未找到',
        };
        res.send(resFn(obj));
      });
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
  app.post('/queryUserList.json',urlencodedParser,function(req,res) {
    let {currentPage,pageSize} = req.body;
    connection.query(`SELECT * FROM user;`,(err,result) => {
      result = result.map((v) => {
        delete v.passWord;
        return v;
      });
      let list = [];
      // 手动 分页
      for(let i = (currentPage - 1) * pageSize ; i < (currentPage - 1) * pageSize + pageSize ; i ++ ){
        if(result[i]){
          list.push(result[i]);
        }
      }
      let obj = {
        result : {
          list : list,
          total : result.length,
        },
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

  // 用户退出 
  app.post('/signOut.json',function(req,res) {
    // 清除 cookie
    res.clearCookie('isLogin');
    // 清除 session userIn
    req.session.userId = '';
    res.send(resFn({
      code : 'success',
    }));
  });

};

module.exports = api;