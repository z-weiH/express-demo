import COS from 'cos-nodejs-sdk-v5'

// 创建实例
let cos = new COS({
  //AppId: '1256231135',
  SecretId: 'AKIDRkDaq32EF9xeEjtTfn7MVUYVPCrOG4Df',
  SecretKey: 'b2IoAMNJ5kFbmmdJoCSbaP3Zw9C5oNo5',
});

export default {
  /* 
    Key - 上传到cos的路径
    FilePath - 本地文件路径
    callback - 回调
  */
  upload : (Key,FilePath,callback) => {
    
    // 分片上传
    cos.sliceUploadFile({
      Bucket: 'demo-1256231135',
      Region: 'ap-chengdu',
      Key: Key,
      FilePath: FilePath,
    }, function (err, data) {
      callback(err,data);
    });
  },

  delete : (Key,callback) => {
    let params = {
      Bucket : 'demo-1256231135',                        /* 必须 */
      Region : 'ap-chengdu',                        /* 必须 */
      Objects :  [
        {
          Key : Key,                    /* 必须 */
        }
      ]
    };
    
    cos.deleteMultipleObject(params, function(err, data) {
      callback(err,data);
    });
  },
}