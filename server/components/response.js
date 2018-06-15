let fn = ({code = 'success' , message = '请求成功' , result = {}}) => {
  let Code = {
    success : '0000', // 成功
    error : '1002', // 异常
    login : '1007', // 用户未登录
    overTime : '1008', // 登录超时
  };
  return JSON.stringify({
    code : Code[code],
    message : message,
    result : result,
  });
};

export default fn