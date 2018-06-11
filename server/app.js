import express from 'express'
let app = express();


app.use(express.static('./../web/dist')); // 加载所有 静态资源
import router from './router'
router(app); // 加载所有 router



app.listen(80, function () {
  console.log('服务初始化成功');
});

