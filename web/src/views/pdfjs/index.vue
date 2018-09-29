<template>
  <div class="pdfjs-box">
    <a href="/static/generic/web/viewer.html?file=http://image.cache.timepack.cn/nodejs.pdf" target="_blank">新窗口打开pdf</a> 
    <iframe src="/static/generic/web/viewer.html?file=http://image.cache.timepack.cn/nodejs.pdf"></iframe>
  </div>
</template>

<script>
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