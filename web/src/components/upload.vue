<template>
  <div 
    :style="{width : width + 'px' , height : img ? (imgHeight ? imgHeight + 'px' : '') : height + 'px'}" 
    :class="{'upload-active' : !img , 'upload-border' : !img}" 
    class="upload-box"
  >
    <i v-if="!img" class="upload-add el-icon-plus avatar-uploader-icon"></i>
    <input v-if="!img" @change="handleChange" type="file" title=" " />
    <a v-if="img" @click="handleOpen">
      <img :style="{width : imgWidth + 'px' , height : imgHeight ? imgHeight + 'px' : ''}" :src="img" />
    </a>
    <i v-if="img" @click="handleClose" class="upload-close el-icon-circle-close-outline"></i> 
  </div>  
</template>

<script>
  /*  静态文件上传 显示的图片为 base64 
    event
      clearAll 清除图片以及文件流

    最简单示例：
      <upload ref="upload" :img.sync="img02"></upload>
  */
  export default {
    props : {
      width : {
        type : Number,
        default : 178,
      },
      height : {
        type : [Number,String],
        default : 178,
      },
      img : {
        type : String,
        default : '', // http://118.24.106.102/upload/helloWorld.jpg
        required : true,
      },
      imgWidth : {
        type : Number,
        default : this.width,
      },
      imgHeight : {
        type : Number,
        default : 0,
      },
      // 校验文件回调
      'before-upload' : {
        type : Function,
      },
      // 点击 x回调
      'upload-close' : {
        type : Function,
      },
    },
    methods : {
      // 数据清除
      clearAll() {
        // 删除文件
        this.$http({
          method : 'post',
          url : '/deleteFile.json',
          data : {
            path : this.img,
          },
        }).then(() => {
          this.$emit('update:img','');
        });
      },
      // 文件上传 change
      handleChange(event) {
        let file = event.target.files[0];
        event.target.value = '';
        // 校验规则
        if(this.beforeUpload && (this.beforeUpload(file) !== true) ){
          return;
        }
        let formData = new FormData();
        formData.append('file',file);
        this.$http({
          method : 'post',
          url : '/upload.json',
          data : formData,
          mheaders : true,
        }).then((res) => {
          this.$emit('update:img',res.result.path);
          this.$emit('successCBK',res.result.path);
        });
      },
      // x
      handleClose() {
        if( this.uploadClose && (this.uploadClose() === false) ) {
          return;
        }
        this.clearAll();
      },
      // 新窗口打开图片
      handleOpen() {
        window.open(this.img);
      },
    },
  }
</script>

<style lang="scss" scoped>

.upload-box{
  border-radius: 6px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  &.upload-active:hover{
    border-color: #409EFF;
  }
  &.upload-border{
    border: 1px dashed #d9d9d9;
  }
  input{
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 5;
    position: absolute;
  }
  .upload-add{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%); 
    font-size: 28px;
  }
  .upload-close{
    position: absolute;
    right: -5px;
    top: -10px;
    z-index: 15;
    background-color: #fff;
    border-radius: 50%;
    font-size: 15px;
    cursor: pointer;
  }
  img{
    width: 100%;
    float: left;
    border-radius: 6px;
  }
  a{
    cursor: pointer;
  }
}

</style>