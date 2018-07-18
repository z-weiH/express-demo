<template>
  <div class="layout-box">
    <div class="menu-container">
      <main-menu></main-menu>
    </div>
    <div class="layout-container">
      <main-Navbar></main-Navbar>
      
      <div class="m-scrollbar-box">
        <el-scrollbar :native="false">
          <transition name="el-fade-in-linear" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-scrollbar>
      </div>
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

<style lang="scss">

.layout-box{
  position: absolute;
  height: 100%;
  width: 100%;
  /* 左侧 menu  */
  .menu-container{
    width: 180px;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;

  }
  .layout-container{
    position: absolute;
    left: 180px;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0 20px;
    padding-right: 0;
  }
  // 设置滚动条 样式
  .m-scrollbar-box{
    height: calc(100% - 70px);
    overflow: hidden;
    .el-scrollbar{
      height: 100%;
    }
    .el-scrollbar__wrap{
      height: 100%;
      overflow-x: auto;
    }
    .el-scrollbar__view{
      padding-bottom: 50px;
      padding-right: 20px;
    }
  }
}

</style>