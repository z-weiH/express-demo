<template>
  <div class="layout-box">
    <div class="menu-container">
      <main-menu></main-menu>
    </div>
    <div class="layout-container">
      <main-Navbar></main-Navbar>
      
      <transition name="el-fade-in-linear" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import mainMenu from './modules/menu.vue'
  import mainNavbar from './modules/navbar.vue'
  export default {
    components : {
      mainMenu,
      mainNavbar,
    },
  }
</script>

<style lang="scss" scoped>

.layout-box{
  position: relative;
  height: 100%;
  width: 100%;
  /* 左侧 menu  */
  .menu-container{
    width: 180px;
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    overflow: hidden;

  }
  .layout-container{
    position: absolute;
    left: 180px;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0 20px;
  }
}

</style>