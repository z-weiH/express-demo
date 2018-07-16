import { Message } from 'element-ui';
import $router from '@/router'

/**
 * @param {string} url
 *  请求url
 * @param {object} data
 *  请求参数
 */

let exportFile = (obj) => {
  let {url , data} = obj;
  let iframe = document.createElement('iframe');
  let name = `iframe-${+ new Date()}`;
  iframe.name = name;
  iframe.style.display = 'none';
  let arr = [];

  for(let key in data) {
    data[key] && arr.push(`${key}=${data[key]}`);
  };
  iframe.src = url + '?' + arr.join('&');

  iframe.onload = function() {
    // 获取 iframe window对象
    let i_window = window.frames[name];
    // 获得body
    let body = i_window.document.body;
    // 获得body后台返回的参数
    let html = body.innerText;
    console.log(html,'iframe导出-后台返回值');
    let data = JSON.parse(html);
    Message.error(data.message);

    // 登录超时
    if(data.code === '1008'){
      $router.push(`/login?renderurl=${$router.history.current.path}`);
      // 清除 用户信息
      localStorage.removeItem('loginInfo');
    // 用户未登录
    }else if(data.code === '1007') {
      $router.push(`/login?renderurl=${$router.history.current.path}`);
      // 清除 用户信息
      localStorage.removeItem('loginInfo');
    }

  };

  document.body.appendChild(iframe);

}

export default exportFile;
