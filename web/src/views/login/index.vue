<template>
	<div class="login-box">
		<div class="form-box">
			<el-form :rules="rules" ref="ruleForm" :model="ruleForm">
				<h3 class="title">系统登录</h3>
				<el-form-item label=" " prop="loginName" class="is-required-no">
					<el-input
						placeholder="username"
						v-model.trim="ruleForm.loginName">
						<i slot="prefix" class="iconfont icon-yonghu"></i>
					</el-input>
				</el-form-item>

				<el-form-item label=" " prop="passWord" class="is-required-no">
					<el-input
						placeholder="password"
						type="password"
						@keyup.native.13="handleSubmit"
						v-model.trim="ruleForm.passWord">
						<i slot="prefix" class="iconfont icon-mima"></i>
					</el-input>
				</el-form-item>

				<div class="mt-20">
					<el-form-item label=" ">
						<el-button style="width:100%;" @click="handleSubmit" type="primary">登录</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm : {
					loginName : 'admin',
					passWord : '123456',
				},
				rules : {
					loginName : [
						{ required : true , message : '请填写用户名' , trigger : 'blur'},
						/* {required : true , pattern : /^\d{11}$/ , message : '手机号码长度为11位' } */
					],
					passWord : [
						{ required : true , message : '请填写密码' , trigger : 'blur'},
						/* { required : true , min : 6 , message : '密码长度最少为6位'} */
					],
				},
			}
		},
		methods : {
			handleSubmit() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						let formData = new FormData();
						formData.append('name','张三');
            this.$http({
							method : 'post',
							url : '/login.json',
							data : {
								userName : this.ruleForm.loginName,
								passWord : this.ruleForm.passWord,
							},
						}).then((res) => {
							this.$message.success('登录成功');
							// 存用户信息
							localStorage.setItem('loginInfo',JSON.stringify(res.result));
							
							this.$router.push('/list');
						});
          }
				});
			},
		},
	}
</script>

<style lang="scss">

.login-box{
	position: flex;
	width: 100%;
	height: 100%;
	background-color: #2d3a4b;
	.form-box{
		box-sizing: border-box;
		position: fixed;
    top: 120px;
    width: 520px;
		padding: 35px 35px 15px 35px;
		left: calc(50% - 260px);
		.title{
			font-size: 26px;
			color: #eee;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
		.el-input input{
			background-color: transparent;
			border: transparent;
			padding-left: 40px;
    	color: #eee;
		}
		.el-input__prefix{
			width: 30px;
		}
		.el-form-item{
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
    	border-radius: 5px;
		}
	}
}

</style>
