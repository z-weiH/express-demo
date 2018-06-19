<template>
  <div class="navbar-box">
    <div class="fr">
      <el-dropdown trigger="click" @command="handleClick">
        <span class="user-text">
          {{nickName}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nickName : '',
      }
    },
    mounted() {
      try{
        this.nickName = JSON.parse(localStorage.getItem('loginInfo')).nickName
      }catch(err) {}
    },
    methods : {
      handleClick(val) {
        if(val === 'signOut'){
          this.$http({
            method : 'post',
            url : '/signOut.json',
          }).then((res) => {
            localStorage.removeItem('loginInfo');
            this.$router.push('/login');
          });
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

.navbar-box{
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  .fr{
    .user-text{
      color: #ffd04b;
      padding: 0 20px;
      height: 40px;
      display: inline-block;
      line-height: 40px;
      text-align: center;
      background-color: #545c64;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}

</style>