
let sqlMap = {
  user: {
    userQuery : 'SELECT * FROM user',
    userInset : 'INSERT INTO `user` (userName,passWord)  VALUES (?,?);',
  }
};

// 查询 SELECT * FROM `user`
// 新增 INSERT INTO `user` (userName,passWord)  VALUES ('张三','张三密码');
// 修改 UPDATE `user` SET userName = '张三-修改' , passWord = '新密码-修改' WHERE userName = '张三'
// 删除 DELETE from `user` WHERE userName = '张三-修改'

export default sqlMap;