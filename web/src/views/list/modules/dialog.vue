<template>
  <div class="login-box-dialog">
    <el-dialog
      :title="type === 'add' ? '新增用户' : '修改用户'"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
          <el-form-item label="用户名：" prop="userName">
            <el-input v-model="ruleForm.userName" />
          </el-form-item>

          <el-form-item label="昵称：" prop="nickName">
            <el-input v-model="ruleForm.nickName" />
          </el-form-item>

          <el-form-item label="密码：" prop="passWord">
            <el-input type="password" v-model="ruleForm.passWord" />
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        type : '',

        ruleForm : {
          // 用户名
          userName : '',
          // 昵称
          nickName : '',
          // 密码
          passWord : '',
          // 用户 id
          id : '',
        },
        rules : {
          userName : [
            {required : true , message : '请输入用户名' , trigger : 'blur'}
          ],
          nickName : [
            {required : true , message : '请输入昵称' , trigger : 'blur'}
          ],
          passWord : [
            {required : true , message : '请输入密码' , trigger : 'blur'}
          ],
        },
        id : '',
      }
    },
    mounted() {},
    methods : {
      show(type,row) {
        this.type = type;
        this.dialogVisible = true;
        
        if(type === 'edit'){
          this.$http({
            method : 'post',
            url : '/queryUserDetail.json',
            data : {
              id : row.id,
            },
          }).then((res) => {
            this.ruleForm = Object.assign(this.ruleForm,res.result);
          });
        }
      },

      // 点击关闭
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
      },
      // 点击 提交
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.$http({
              method : 'post',
              url : this.type === 'add' ? '/userInset.json' : '/userUpdata.json',
              data : {
                userName : this.ruleForm.userName,
                nickName : this.ruleForm.nickName,
                passWord : this.ruleForm.passWord,
                id : this.type === 'edit' ? this.ruleForm.id : '',
              },
            }).then((res) => {
              this.$message.success('操作成功');
              this.handleClose();
              this.$emit('successCBK');
            });
          }
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.login-box-dialog{

}

</style>