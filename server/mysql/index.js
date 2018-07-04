import mysql from 'mysql'
import root from './root'

//连接池查询
let querypoll = function(sql,params,callback){
  // 使用连接池，提升性能
  let poolConn = mysql.createPool(root());
  poolConn.getConnection(function(err,conn){
    if(err) {
      console.log('err',err);
      callback ? callback(err,null,null) : params(err,null,null);
    }else{
      // 参数判断
      if(callback) {
        let query = conn.query(sql,params,function(err,result,fields){
          //释放连接
          conn.release();
          // 数据处理
          let str = JSON.stringify(result);
          let data = JSON.parse(str);
          //事件驱动回调
          callback(err,data,fields);
        });
      }else{
        let query = conn.query(sql,function(err,result,fields){
          //释放连接
          conn.release();
          // 数据处理
          let str = JSON.stringify(result);
          let data = JSON.parse(str);
          //事件驱动回调
          params(err,data,fields);
        });
      }
    }
  });
};


//不使用连接池
let query = function (sql,params,callback) {
  let conn = mysql.createConnection(root());
    //连接错误，2秒重试
    conn.connect(function (err) {
      if(err) {
        console.log("error when connecting to db:", err);
        setTimeout(query , 2000);
      }else{
        // 参数判断
        if(callback) {
          let query = conn.query(sql,params,function(err,result,fields){
            // 关闭连接
            conn.end();
            // 数据处理
            let str = JSON.stringify(result);
            let data = JSON.parse(str);
            //事件驱动回调
            callback(err,data,fields);
          });
        }else{
          let query = conn.query(sql,function(err,result,fields){
            // 关闭连接
            conn.end();
            // 数据处理
            let str = JSON.stringify(result);
            let data = JSON.parse(str);
            //事件驱动回调
            params(err,data,fields);
          });
        }
      }
    });
    conn.on("error",function (err) {
      console.log("db error", err);
      // 如果是连接断开，自动重新连接
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        query();
      } else {
        throw err;
      }
    });
  }

export default {
  querypoll,
  query,
}