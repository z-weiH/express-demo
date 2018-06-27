import mysql from 'mysql'
import root from './root'

let connection = mysql.createConnection(root());

connection.connect();

// 重写query方法 解决回调result参数RowDataPacket问题
let query = connection.query.bind(connection);
connection.query = (sql,values,callback) => {
  // 当前为 占位符方式
  if(callback) {
    query(sql,values,(err,result,fields) => {
      console.log(result);
      let str = JSON.stringify(result);
      let data = JSON.parse(str);
      callback(err,data,fields);
    });
  }else{
    query(sql,(err,result,fields) => {
      let str = JSON.stringify(result);
      let data = JSON.parse(str);
      values(err,data,fields);
    });
  }


};

export default connection