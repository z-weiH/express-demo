<template>
  <div class="upload">
    <p>文件上传：</p>
    <!-- <el-upload
      class="avatar-uploader"
      action="/upload.json"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="img01" :src="img01" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->
    <div class="mt-20">
      <upload @successCBK="successCBK1" ref="upload1" :img.sync="img01"></upload>
      <el-button @click="handleDownload(img01)">img01下载</el-button>
      <p>img01</p>
    </div>
    
    <div class="mt-20">
      <upload @successCBK="successCBK2" ref="upload2" :img.sync="img02"></upload>
      <el-button @click="handleDownload(img02)">img02下载</el-button>
      <p>img02</p>
    </div>
  </div>
</template>

<script>
  import upload from '@/components/upload.vue'
  import download from '@/assets/js/download'
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
        window.$dialogClose.close()
      }).catch(() => {
        window.$dialogClose.close()
      });
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.img01 = res.result.path;
      },
      // 文件下载
      handleDownload(path) {
        download({
          url : '/download.json',
          data : {path},
        });
      },
      // 文件上传成功
      successCBK1() {

      },
      successCBK2() {

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