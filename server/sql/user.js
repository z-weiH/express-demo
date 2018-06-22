/* 
let sqlMap = {
  userQuery : 'SELECT * FROM user WHERE userName="?" AND passWord="?";',
  userInset : 'INSERT INTO `user` (userName,passWord)  VALUES (?,?);',
};
 */
// 查询 SELECT * FROM `user`
// 新增 INSERT INTO `user` (userName,passWord)  VALUES ('张三','张三密码');
// 修改 UPDATE `user` SET userName = '张三-修改' , passWord = '新密码-修改' WHERE userName = '张三'
// 删除 DELETE from `user` WHERE userName = '张三-修改'

let connection = import_module('/mysql/index');
let sqlMap = {
  // 用户登录
  login({userName,passWord}) {
    return new Promise((resolve,reject) => {
      connection.query(`SELECT * FROM user WHERE userName="${userName}" AND passWord="${passWord}";`,(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 根据条件 查询用户是否存在
  verifyUserIs(search,verifyCBK) {
    return new Promise((resolve,reject) => {
      // 获取所有查询条件
      let condition = '';
      for(let key in search) {
        condition += `${key}="${search[key]}"`
      };
      connection.query(`SELECT * FROM user WHERE ${condition};`,(err,result) => {
        let message = verifyCBK(result);
        if(message !== true ) {
          reject({err,result,message});
        }else{
          resolve({err,result});
        }
      });
    });
  },
  // 用户新增
  userInset({uuid,userName,passWord,nickName}) {
    return new Promise((resolve,reject) => {
      connection.query(`INSERT INTO user (id,userName,passWord,nickName)  VALUES ("${uuid}","${userName}","${passWord}","${nickName}");`,(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 用户修改
  userUpdata({id,userName,passWord,nickName}) {
    return new Promise((resolve,reject) => {
      connection.query(`UPDATE user SET userName="${userName}",passWord="${passWord}",nickName="${nickName}" WHERE id="${id}";`,(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 用户删除
  userDelete({id}) {
    return new Promise((resolve,reject) => {
      connection.query(`DELETE from user WHERE id='${id}';`,(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 用户列表
  queryUserList() {
    return new Promise((resolve,reject) => {
      connection.query(`SELECT * FROM user;`,(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 用户详情
  queryUserDetail({id}) {
    return new Promise((resolve,reject) => {
      connection.query(`SELECT * FROM user WHERE id="${id}";`,(err,result) => {
        resolve({err,result});
      });
    });
  },
};


export default sqlMap;