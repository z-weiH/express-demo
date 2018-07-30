<template>
  <div class="components-tinymce">
    <textarea :style="{height : height}" :id="id"></textarea>
  </div>
</template>

<script>
  import tinymce from 'tinymce'

  // 引入主题
  import 'tinymce/themes/modern/theme.js'
  // 引入样式
  import 'tinymce/skins/lightgray/skin.min.css'
  import 'tinymce/skins/lightgray/content.min.css'
  // 引入语言包
  import './langs/zh_CN.js'

  // 引入 异步加载插件
  import plugins from './plugins'
  Promise.all(plugins.map((v) => import(`tinymce/plugins/${v}/plugin`))).then(() => {});

  export default {
    props : {
      height : {
        type : String,
        default : '500px',
      },
    },
    data() {
      return {
        id : '',
      }
    },
    mounted() {
      this.init();
    },
    methods : {
      init(callback) {
        this.id = `tinymce-${+ new Date()}`;
        this.$nextTick(() => {
          this.tinymce = tinymce.init({
            language : 'zh_CN',
            selector : `#${this.id}`,
            focus_alert : false,
            plugins : plugins,
            // 文件本地上传 ， 增加此方法
            images_upload_handler : (blobInfo, success, failure) => {
              let formData = new FormData();
              formData.append('file',blobInfo.blob());
              this.$http({
                url : '/upload.json',
                method : 'post',
                data : formData,
                mheaders : true,
              }).then((res) => {
                success(res.result.staticPath);
              });
            },
          });
          callback && callback();
        });
      },

      // 富文本 相关方法 start
      
      // 销毁
      destroyTinymce() {
        tinymce.get(this.id).destroy();
      },
      // 设置
      setContent(value) {
        tinymce.get(this.id).setContent(value)
      },
      // 获取
      getContent() {
        return tinymce.get(this.id).getContent()
      },
      // 在光标处 设置数据
      execCommand(value) {
        tinymce.execCommand("mceInsertContent", false, value);
      },


      // 富文本 相关方法 end
    },
  }
</script>

<style lang="scss" scoped>

.components-tinymce{
  /* height: calc(100vh - 120px);
  textarea{
    display: inline-block;
  } */
}

</style>