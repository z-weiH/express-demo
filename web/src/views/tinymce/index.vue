<template>
  <div class="tinymce">
    <tinymce></tinymce>
  </div>
</template>

<script>
  import tinymce from '@/components/tinymce'
  export default {
    components : {
      tinymce,
    },
    mounted() {
      window.$dialogClose.close();
    },
  }
</script>

<style lang="scss" scoped>

</style>