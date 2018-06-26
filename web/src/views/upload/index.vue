<template>
  <div class="upload">
    <p>文件上传：</p>
    <el-upload
      class="avatar-uploader"
      action="/upload.json"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="img01" :src="img01" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="mt-20">
      <upload ref="upload1" :img.sync="img01"></upload>
      <el-button @click="handleUpload1">提交</el-button>
    </div>
    
    <div class="mt-20">
      <upload ref="upload2" :img.sync="img02"></upload>
      <el-button @click="handleUpload2">提交</el-button>
    </div>
  </div>
</template>

<script>
  import upload from '@/components/upload.vue'
  export default {
    components : {
      upload,
    },
    data() {
      return {
        img01 : '',
        img02 : '',
      };
    },
    mounted() {
      this.$http({
        method : 'get',
        url : '/user/queryUserImgs.json',
      }).then((res) => {
        this.img01 = res.result.img01 || '';
        this.img02 = res.result.img02 || '';
      });
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.img01 = res.result.path;
      },
      handleUpload1() {
        let file = this.$refs.upload1.getFile();
        if(!file && !this.img01){
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

        });
      },
      handleUpload2() {
        let file = this.$refs.upload2.getFile();
        if(!file && !this.img02){
          return;
        }
        let formData = new FormData();
        formData.append('file',file);
        this.$http({
          method : 'post',
          url : '/upload2.json',
          data : formData,
          mheaders : true,
        }).then((res) => {

        });
      },
    }
  }
</script>

<style lang="scss">

.upload{
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    display: block;
  }
}

</style>