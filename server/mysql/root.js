export default (database = 'demo') => {
  return {
    host     : '118.24.106.102', // 主机 ip
    user     : 'root', // 用户名
    password : '123456', // 密码
    database : database, // 数据库名
  }
}