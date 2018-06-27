import mysql from 'mysql'
import root from './root'

let connection = mysql.createConnection(root());

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