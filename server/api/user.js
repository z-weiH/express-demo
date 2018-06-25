import express from 'express';
const router = express.Router();

import uuid from 'node-uuid'

let {
  jsonParser,
  urlencodedParser,
  multipartMiddleware,
} = import_module('/components/requestType');
let baseResult = import_module('/components/response');
let sqlMap = import_module('/sql/user.js');
let validate = import_module('/components/validate.js');

let api = (app) => {
  // 用户登录
  router.post('/login.json',urlencodedParser,function(req,res) {
    let {userName , passWord} = req.body;
    let ruleForm = {
      userName,
      passWord,
    };
    let rules = {
      userName : [
        {required : true , message : '请输入用户名'}
      ],
      passWord : [
        {required : true , message : '请输入密码'}
      ],
    };
    validate(ruleForm,rules,(message) => {
      if(message !==  true) {
        res.send(baseResult({
          code : 'error',
          message : message,
        }));
      }else{
        sqlMap.login({userName,passWord}).then( ({err,result}) => {
          if(result.length === 0){
            let obj = {
              code : 'error',
              message : '用户名或密码错误',
            };
            res.send(baseResult(obj));
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
            res.send(baseResult(obj));
          }
        });
      }
    });
  });

  // 用户新增
  router.post('/userInset.json',urlencodedParser,function(req,res) {
    let {userName,passWord,nickName} = req.body;
    let ruleForm = {
      userName,
      passWord,
      nickName,
    };
    let rules = {
      userName : [
        {required : true , message : '请输入用户名'}
      ],
      passWord : [
        {required : true , message : '请输入密码'}
      ],
      nickName : [
        {required : true , message : '请输入昵称'}
      ],
    };
    validate(ruleForm,rules,(message) => {
      if(message !==  true) {
        res.send(baseResult({
          code : 'error',
          message : message,
        }));
      }else{
        // 查询用户是否存在
        sqlMap.verifyUserIs({userName},(result) => {
          return result.length > 0 ? '用户已存在' : true ;
        // 添加用户
        }).then(({err,result}) => {
          return sqlMap.userInset({
            uuid : uuid.v4(),
            userName,
            passWord,
            nickName,
          });
        // 新增用户 成功
        }).then(({err,result}) => {
          res.send(baseResult({
            code : 'success',
            message : '用户新增成功',
          }));
        // error
        }).catch(({message}) => {
          res.send(baseResult({
            code : 'error',
            message : message,
          }));
        });
      }
    });
  });

  // 用户修改
  router.post('/userUpdata.json',urlencodedParser,function(req,res) {
    let {userName,passWord,nickName,id} = req.body;
    let ruleForm = {
      id,
      userName,
      passWord,
      nickName,
    };
    let rules = {
      id : [
        {required : true , message : 'id为空'}
      ],
      userName : [
        {required : true , message : '请输入用户名'}
      ],
      passWord : [
        {required : true , message : '请输入密码'}
      ],
      nickName : [
        {required : true , message : '请输入昵称'}
      ],
    };
    validate(ruleForm,rules,(message) => {
      if(message !== true){
        res.send(baseResult({
          code : 'error',
          message : message,
        }));
      }else{
        // 查询用户是否存在
        sqlMap.verifyUserIs({id},(result) => {
          return result.length > 0 ? true : '用户不存在';
        // 查询用户名 是否重复
        }).then(() => {
          return sqlMap.verifyUserIs({userName},(result) => {
            return result.length > 0 && result[0].id !== id ? '用户已存在' : true;
          });
        // 修改用户
        }).then(({err,result}) => {
          return sqlMap.userUpdata({userName,passWord,nickName,id});
        // 修改用户 成功
        }).then(({err,result}) => {
          res.send(baseResult({
            code : 'success',
            message : '修改成功',
          }));
        }).catch(({message}) => {
          res.send(baseResult({
            code : 'error',
            message : message,
          }));
        });
      }
    });
  });
  
  // 用户删除
  router.post('/userDelete.json',urlencodedParser,function(req,res) {
    let {id} = req.body;
    let ruleForm = {
      id,
    };
    let rules = {
      id : [
        {required : true , message : 'id为空'}
      ],
    };
    validate(ruleForm,rules,(message) => {
      if(message !==  true) {
        res.send(baseResult({
          code : 'error',
          message : message,
        }));
      }else{
        // 查询用户 是否存在
        sqlMap.verifyUserIs({id},(result) => {
          return result.length > 0 ? true : '用户未找到';
        // 删除用户
        }).then(() => {
          return sqlMap.userDelete({id});
        // 删除用户 成功
        }).then((err,result) => {
          res.send(baseResult({
            code : 'success',
            message : '删除成功',
          }));
        }).catch(({message}) => {
          res.send(baseResult({
            code : 'error',
            message : message,
          }));
        });
      }
    });
  });

  // 查询所有用户
  router.post('/queryUserList.json',urlencodedParser,function(req,res) {
    let {currentPage,pageSize} = req.body;
    sqlMap.queryUserList().then(({err,result}) => {
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
      res.send(baseResult(obj));
    });
  });

  // 用户详情
  router.post('/queryUserDetail.json',urlencodedParser,function(req,res) {
    let {id} = req.body;
    let ruleForm = {
      id,
    };
    let rules = {
      id : [
        {required : true , id : 'id为空'}
      ],
    };
    validate(ruleForm,rules,(message) => {
      if(message !== true){
        res.send(baseResult({
          code : 'error',
          message : message,
        }));
      }else{
        sqlMap.verifyUserIs({id},(result) => {
          return result.length > 0 ? true : 'id未找到';
        // 获取用户详情
        }).then(() => {
          return sqlMap.queryUserDetail({id});
        // 获取 成功
        }).then(({err,result}) => {
          res.send(baseResult({
            code : 'success',
            result : result[0],
          }));
        }).catch(({message}) => {
          res.send(baseResult({
            code : 'error',
            message : message,
          }));
        });
      }
    });
  });

  // 用户退出 
  router.post('/signOut.json',function(req,res) {
    // 清除 cookie
    res.clearCookie('isLogin');
    // 清除 session userIn
    req.session.userId = '';
    res.send(baseResult({
      code : 'success',
    }));
  });

  app.use('/user',router);
};

export default api