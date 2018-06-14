<template>
  <div class="menu-box">
    <el-scrollbar :native="false">
      <el-menu
        router
        :default-active="$route.meta.name"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="(item) in menuList">
          <template v-if="item.children && item.children.length > 0">

            <el-submenu :key="item.id" :index="item.id">
              <template slot="title">
                <i :class="[item.icon]"></i>
                <span>{{item.label}}</span>
              </template>

              <template v-for="child in item.children">
                <el-menu-item :Key="child.id" :index="child.href">
                  <i :class="[child.icon]"></i>
                  {{child.label}}
                </el-menu-item>
              </template>
            </el-submenu>

          </template>

          <template v-else>
            <el-menu-item :key="item.id" :index="item.href">
              <i :class="[item.icon]"></i>
              {{item.label}}
            </el-menu-item>
          </template>
        </template>
        
        
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 当前高亮
        active : '',

        menuList : [
          {
            label : '用户列表',
            href : '/list',
            id : 1,
            // icon : 'el-icon-location',
          },
          {
            label : '登录页',
            href : '/login',
            id : 2,
          },
          {
            label : 'Demo',
            href : '/demo',
            id : 3,
          },
        ],
      }
    },
    mounted() {
      
    },
    methods : {

    },
  }
</script>

<style lang="scss">

.menu-box{
  background-color: #545c64;
  .el-menu{
    overflow: hidden;
    border-right: none;
  }

}


/* el-scrollbar 通用样式 start */
.menu-box{
  height: 100%;
  .el-scrollbar{
    height: 100%;
  }
  .el-scrollbar__wrap{
    height: 100%;
    overflow-x: auto;
  }
}  
/* el-scrollbar 通用样式 end */

</style>