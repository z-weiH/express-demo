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

  export default {
    data() {
      return {
        id : `tinymce-${+ new Date()}`,
      }
    },
    mounted() {
      tinymce.init({
        selector : `#${this.id}`,
      });
    },
  }
</script>

<style lang="scss" scoped>

.components-tinymce{

}

</style>