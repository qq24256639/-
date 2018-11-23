<template>
	<section class="login-container">
    <img src="/static/images/zhuzhanlogo.png" alt="有恒">
    <h1>教学质量诊断与改进平台</h1>
		<el-form
			:model="loginForm"
			:rules="loginRules"
			ref="loginForm"
			label-position="left"
			label-width="0px"
			class="card-box login-form"
			:show-message="false">
			<el-form-item prop="username">
				<el-input name="username" auto-complete="off" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item prop="password">
				<el-input name="password" auto-complete="off" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
				placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
				登录
				</el-button>
			</el-form-item>
			<p class="support">天一信@技术支持</p>
		</el-form>
	</section>
</template>

<script>

export default {
	name: 'login',
	data() {
		const validateUsername = (rule, value, callback) => {
			if (!(value)) {
				this.$message({
					type: 'error',
					message: '请输入正确的用户名'
				})
				callback(new Error('请输入正确的用户名'))
			} else {
				callback()
			}
		}
		const validatePass = (rule, value, callback) => {
			if (value.length < 6) {
				this.$message({
					type: 'error',
					message: '密码不能小于6位'
				})
				callback(new Error('密码不能小于6位'))
			} else {
				callback()
			}
		}
		return {
			loginForm: {
				username: '',
				password: ''
			},
			loginRules: {
				username: [{ required: true, trigger: 'submit', validator: validateUsername }],
				password: [{ required: true, trigger: 'submit', validator: validatePass }]
			},
			loading: false
		}
	},
	methods: {
		handleLogin() {
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					this.loading = true
					this.$store.dispatch('Login', this.loginForm).then(() => {
						this.loading = false
						this.$router.push({ path: '/' })
					}).catch((res) => {
						const data = res.data
						if (data.code === '4000' && data.data) {
							this.$message(data.data.msg)
						}
						this.loading = false
					})
				} else {
					return false
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
$light_gray:#eee;

.login-container {
  img {
    margin-top: 100px;
  }
  h1 {
    color: #fff;
    margin-top: 50px;
    font-family: "Microsoft YaHei"!important;
    font-size: 42px;
    font-weight: 400;
  }
	@include relative;
	height: 100vh;
	background-image: url(/static/images/login_bg2.jpg);
	background-size:100%;
	text-align: center;
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
		-webkit-text-fill-color: #fff !important;
	}
	input {
		background: transparent;
		border: 0;
		-webkit-appearance: none;
		border-radius: 0;
		padding: 12px 5px 12px 15px;
		color: $light_gray;
		height: 47px;
	}
	.login-form {
		position: absolute;
		left: 0;
		right: 0;
		width: 320px;
		margin: 80px auto 0;
	}
	.support{
		font-size: 12px;
		color: #FFFFFF;
		margin-top: -6px;
	}
}
</style>
