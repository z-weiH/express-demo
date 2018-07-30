<template>
  <div class="tinymce">
    <tinymce ref="tinymce" :height.sync="height"></tinymce>
  </div>
</template>

<script>
  import tinymce from '@/components/tinymce'
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
      window.$dialogClose.close();

      window.addEventListener('resize',this.windowResize);
      this.$refs.tinymce.init(() => {
        this.windowResize();
      });
    },
    // 销毁回调
    destroyed() {
      window.removeEventListener('resize',this.windowResize);
    },
    methods : {
      windowResize() {
        this.$refs.tinymce.destroyTinymce();
        this.height = document.body.clientHeight - 120 - 70 - 35 + 'px';
        this.$refs.tinymce.init();
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>