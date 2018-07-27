<template>
  <div class="components-tinymce">
    <textarea :id="id"></textarea>
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

  export default {
    
    data() {
      return {
        id : `tinymce-${+ new Date()}`,
      }
    },
    mounted() {
      tinymce.init({
        language : 'zh_CN',
        selector : `#${this.id}`,
      });
    },
  }
</script>

<style lang="scss" scoped>

.components-tinymce{

}

</style>