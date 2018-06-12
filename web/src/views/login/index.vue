<template>
	<div class="login-box">
		<div class="content">
			<div class="m-form">
				<div class="login-title">
					<span>账号登陆</span>
				</div>
				<el-form class="form-box" :rules="rules" ref="ruleForm" :model="ruleForm" label-width="100px">
					<el-form-item label=" " prop="loginName" class="mt-30">
						<el-input
							placeholder="输入您的账号"
							v-model.trim="ruleForm.loginName">
							<i slot="prefix" class="iconfont icon-denglu"></i>
						</el-input>
					</el-form-item>

					<el-form-item label=" " prop="passWord" class="mt-30">
						<el-input
							placeholder="输入您的登录密码"
							type="password"
							@keyup.native.13="handleSubmit"
							v-model.trim="ruleForm.passWord">
							<i slot="prefix" class="iconfont icon-mima"></i>
						</el-input>
					</el-form-item>

					<div class="mt-20">
            <el-form-item label=" ">
              <el-button @click="handleSubmit" type="warning">登录</el-button>
            </el-form-item>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm : {
					loginName : '',
					passWord : '',
				},
				rules : {
					loginName : [
						{ required : true , message : '请输入账号' , trigger : 'blur'},
						{required : true , pattern : /^\d{11}$/ , message : '手机号码长度为11位' }
					],
					passWord : [
						{ required : true , message : '请输入密码' , trigger : 'blur'},
						{ required : true , min : 6 , message : '密码长度最少为6位'}
					],
				},
			}
		},
		methods : {
			handleSubmit() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
            
          }
				});
			},
		},
	}
</script>

<style lang="scss" scoped>

</style>
