//获取模块
import bodyParser from 'body-parser'
// 创建 application/json 解析
var jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 处理 form-data格式 模块
import multipart from 'connect-multiparty'
// 创建 form-data 解析
let multipartMiddleware = multipart();

export {
  jsonParser,
  urlencodedParser,
  multipartMiddleware,
}