<template>
  <div class="highlight">
    <textarea v-model="textarea"></textarea>
    <el-button @click="handle">写入代码</el-button>
    <div class="code" :key="key">
      <pre>
        <code>{{code}}</code>
      </pre>
    </div>
  </div>
</template>

<script>
  import hljs from 'highlight.js'
  import 'highlight.js/styles/monokai-sublime.css' //样式文件


  export default {
    data() {
      return {
        code : '',
        textarea : '',
        key : + new Date(),
      }
    },
    mounted() {
      
    },
    methods : {
      handle() {
        this.code = this.textarea;
        this.key = + new Date();
        this.$nextTick(() => {
          let code = document.querySelectorAll('.code code');
          code.forEach((v,k) => {
            hljs.highlightBlock(v);
          });
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.highlight{
  textarea{
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 120px);
    height: 37px;
  }
}

</style>