import { Message } from 'element-ui';

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
    Message.error(JSON.parse(html).message);
  };

  document.body.appendChild(iframe);

}

export default exportFile;
