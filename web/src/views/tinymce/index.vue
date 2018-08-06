<template>
  <div class="tinymce">
    <tinymce ref="tinymce" :height.sync="height"></tinymce>
    <div class="mt-20">
      <el-button @click="handleSetContent">设置</el-button>
      <el-button @click="handleGetContent">获取</el-button>
      <el-button @click="handleGetContentText">获取纯文本</el-button>
      <el-button @click="handleExecCommand">替换/插入</el-button>
    </div>
  </div>
</template>

<script>
  import tinymce from '@/components/tinymce'
  import copy from '@/assets/js/copy'
  export default {
    components : {
      tinymce,
    },
    data() {
      return {
        height : '100%',
      }
    },
    mounted() {
      // 绑定事件 页面缩放初始化 编辑器大小
      window.addEventListener('resize',this.windowResize);
      // 初始化 编辑器
      this.$refs.tinymce.init(() => {
        this.windowResize();
      });

      // 以下逻辑 用于判断编辑器是否加载完成
      let fn = () => {
        if(!document.querySelector('.tinymce .mce-tinymce')) {
          setTimeout(fn,50);
        }else{
          window.$dialogClose.close();
        }
      }
      fn();
    },
    // 销毁回调
    destroyed() {
      window.removeEventListener('resize',this.windowResize);
    },
    methods : {
      // win resize 回调
      windowResize() {
        this.$refs.tinymce.destroyTinymce();
        this.height = document.body.clientHeight - 120 - (35 * 3) - 35 - 35 - 60 + 'px';
        this.$refs.tinymce.init();
      },
      
      handleSetContent() {
        this.$refs.tinymce.setContent('设置数据');
      },
      handleGetContent() {
        this.$message.success('复制成功');
        copy(this.$refs.tinymce.getContent());
      },
      handleExecCommand() {
        this.$refs.tinymce.execCommand('插入数据');
      },
      handleGetContentText() {
        this.$message.success('复制成功');
        copy(this.$refs.tinymce.getContentText());
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>