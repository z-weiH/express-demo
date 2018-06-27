import express from 'express'

// 加载所有 静态资源
export default (app) => {
   // 路径不知道为毛 是以app.js 为目录
  app.use(express.static('./../web/dist'));
  app.use(express.static('./assets'));
}