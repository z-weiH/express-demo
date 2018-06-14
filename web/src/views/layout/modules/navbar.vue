<template>
  <div class="navbar-box">
    <div class="fr">
      <span>张三</span>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

.navbar-box{
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  .fr{
    & span{
      margin-right: 20px;
    }
  }
}

</style>