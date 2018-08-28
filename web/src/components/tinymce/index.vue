<template>
  <div class="components-tinymce">
    <textarea :style="{height : height}" :id="id"></textarea>
  </div>
</template>

<script>
  import tinymce from 'tinymce'
  // 所有插件使用 cdn url前缀
  tinymce.baseURL = 'https://cdn.staticfile.org/tinymce/4.8.1';
  // 所有插件 使用.min.js
  tinymce.suffix = '.min'

  // 引入主题
  /* import 'tinymce/themes/modern/theme.js'
  // 引入样式
  import 'tinymce/skins/lightgray/skin.min.css'
  import 'tinymce/skins/lightgray/content.min.css' */
  // 引入语言包
  import './langs/zh_CN.js'

  // 引入 异步加载插件
  let app;
  import plugins from './plugins'
  // 加载 操作栏项
  import toolbar from './toolbar'

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
      app = this;
      this.init();
    },
    methods : {
      init(callback) {
        this.id = `tinymce-${+ new Date()}`;
        this.$nextTick(() => {
          this.tinymce = tinymce.init({
            language : 'zh_CN',
            selector : `#${this.id}`,
            // 离开页面 保存提示
            focus_alert : false,
            // 配置插件
            plugins : plugins,
            // 配置操作栏
            toolbar1 : toolbar[0],
            toolbar2 : toolbar[1],
            toolbar3 : toolbar[2],
            // 设置 字体
            font_formats : `
              宋体=SimSun;
              微软雅黑=Microsoft YaHei;
              楷体=KaiTi;黑体=SimHei;
              仿宋=FangSong;
              Andale Mono=andale mono,times;
              Arial=arial, helvetica,
              sans-serif;
              Arial Black=arial black, avant garde;
              Book Antiqua=book antiqua,palatino;
              Comic Sans MS=comic sans ms,sans-serif;
              Courier New=courier new,courier;
              Georgia=georgia,palatino;
              Helvetica=helvetica;
              Impact=impact,chicago;
              Symbol=symbol;
              Tahoma=tahoma,arial,helvetica,sans-serif;
              Terminal=terminal,monaco;
              Times New Roman=times new roman,times;
              Trebuchet MS=trebuchet ms,geneva;
              Verdana=verdana,geneva;
              Webdings=webdings;
              Wingdings=wingdings,zapf dingbats`,
            // 设置 文字大小
            // fontsize_formats : '9px 10px 12px 13px 14px 16px 18px 21px 24px 28px 32px 36px',
            // 合并 原有功能
            style_formats_merge : true,
            style_formats : [
              {
                title: '首行缩进',
                block: 'p',
                styles: { 'text-indent': '2em' }
              },
              {
                title: '行高',
                items: [
                  {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
                  {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
                  {title: '1.75', styles: { 'line-height': '1.75' }, inline: 'span'},
                  {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
                  {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
                  {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
                ]
              }
            ],
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

            templates: [
              {title: '模板1', content: '<div>标题：</div><p>模板1</p>'},
              {title: '模板2', content: '<div>标题：</div><p>模板2</p>'}
            ],

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
      // 获取 html
      getContent() {
        return tinymce.get(this.id).getContent()
      },
      // 获取纯文本
      getContentText() {
        return tinymce.get(this.id).getContent({ 'format' : 'text' })
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