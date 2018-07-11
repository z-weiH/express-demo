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
import moment from 'moment'

let connection = import_module('/mysql/index');
let sqlMap = {
  // 用户登录
  login({userName,passWord}) {
    return new Promise((resolve,reject) => {
      connection.querypoll(`SELECT * FROM user WHERE userName=? AND passWord=?`,[userName,passWord],function(err,result){
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
      connection.querypoll(`SELECT * FROM user WHERE ${condition};`,(err,result) => {
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
      // 获取当前用户创建时间
      let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

      connection.querypoll(`INSERT INTO user (id,userName,passWord,nickName,createTime)  VALUES (?,?,?,?,?);`,
      [uuid,userName,passWord,nickName,createTime],(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 用户修改
  userUpdata({id,userName,passWord,nickName}) {
    return new Promise((resolve,reject) => {
      connection.querypoll(`UPDATE user SET userName=?,passWord=?,nickName=? WHERE id=?;`,
      [userName,passWord,nickName,id]
      ,(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 用户删除
  userDelete({id}) {
    return new Promise((resolve,reject) => {
      if(id === 'admin') {
        resolve({err : '无法删除'});
        return;
      }
      connection.querypoll(`DELETE from user WHERE id=?;`,[id],(err,result) => {
        resolve({err,result});
      });
    });
  },
  /* 
    SELECT SQL_CALC_FOUND_ROWS * FROM `user` WHERE userName like "%%"  AND nickName like "%%" LIMIT 1,1;
    SELECT FOUND_ROWS();
  */
  // 用户列表
  queryUserList({userName,nickName,currentPage,pageSize}) {
    return new Promise((resolve,reject) => {
      connection.querypoll(
        `
          SELECT SQL_CALC_FOUND_ROWS * FROM user WHERE userName like ?  AND nickName like ? order by createTime DESC LIMIT ?,? ; 
          SELECT FOUND_ROWS();
        `,
        [`%${userName}%` , `%${nickName}%` , (currentPage - 1) * pageSize , (currentPage - 1) * pageSize + +pageSize]
      ,(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 用户详情
  queryUserDetail({id}) {
    return new Promise((resolve,reject) => {
      connection.querypoll(`SELECT * FROM user WHERE id=?;`,[id],(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 根据用户 id 获取用户img
  queryUserImgs({id}) {
    return new Promise((resolve,reject) => {
      connection.querypoll(`SELECT * FROM user WHERE id=?;`,[id],(err,result) => {
        resolve({err,result});
      });
    });
  },
  // 修改用户图片
  updataUserImgs({id,img01,img02}) {
    return new Promise((resolve,reject) => {
      let i01 = `UPDATE user SET img01=? WHERE id=?;`
      let i02 = `UPDATE user SET img02=? WHERE id=?;`
      let type = img01 !== undefined ? 'img01' : 'img02';
      connection.querypoll(type === 'img01' ? i01 : i02,[type === 'img01' ? img01 : img02,id],(err,result) => {
        resolve({err,result});
      });
    });
  },
};


export default sqlMap;