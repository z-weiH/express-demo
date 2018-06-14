import axios from 'axios'
import qs from 'qs' //formdata序列化
import { Message } from 'element-ui';



// 超时时间
axios.defaults.timeout = 10000;
// post 默认请求方式 (貌似有 axios bug 设置并没有效果)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 请求拦截
axios.interceptors.request.use((rqs) => {
  // post 默认 formData格式 提交
  if (rqs.method === 'post' && rqs.mheaders !== true) {
    rqs.data = qs.stringify(rqs.data);
  }
  return rqs;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use((res) => { // 状态码 200 回调
  if(res.data.code !== '0000'){
    Message.error(res.data.message);
    return Promise.reject(res);
  }
  return res.data;

}, (err) => { // 状态码不是200 回调
  if (err.response) {
    Message.error('网络出错');
  }
  return Promise.reject(err);
});




export default axios
