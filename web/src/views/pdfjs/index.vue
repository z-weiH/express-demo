<template>
  <div class="pdfjs-box">
    <iframe src="/static/generic/web/viewer.html?file=/demo.pdf"></iframe>
  </div>
</template>

<script>
  /* 
    pdf.js 通过github 生成代码后 ， 生成 generic/web/viewer.html 文件
    通过参数file传递服务器本地静态资源路径， 生成pdf
  
  */
  export default {
    
  }
</script>

<style lang="scss" scoped>

.pdfjs-box{
  iframe{
    width: 100%;
    height: calc(100vh - 130px);
  }
}

</style>