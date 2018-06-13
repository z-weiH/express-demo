let fn = ({code = 'success' , message = '接口调用成功' , result = {}}) => {
  let Code = {
    success : '0000', // 成功
    notFound : '1001', // 查询不到
    error : '1002', // 异常
  };
  return JSON.stringify({
    code : Code[code],
    message : message,
    result : result,
  });
};

export default fn