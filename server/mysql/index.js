import mysql from 'mysql'

let connection = mysql.createConnection({
  host     : '118.24.106.102',
  user     : 'root', // 用户名
  password : '123456', // 密码
  database : 'demo', // 数据库名
});

connection.connect();

let query = connection.query.bind(connection);
connection.query = (sql,callback) => {
  query(sql,(err,result,fields) => {
    let str = JSON.stringify(result);
    let data = JSON.parse(str);
    callback(err,data,fields);
  });
};

export default connection