<template>
	<view class="container">
		<image src="@/static/logo.png" class="logo"></image>

		<uni-easyinput v-model="username" type="text" placeholder="请输入用户名" class="username" />

		<uni-easyinput v-model="password" type="password" placeholder="请输入密码" class="password" />

		<button @click="onLogin()" type="primary" class="login">登录</button>
	</view>
</template>

<script>
	import {
		login
	} from '@/api/user.js'
	export default {
		data() {
			return {
				username: null,
				password: null
			}
		},
		methods: {
			async onLogin() {
				try {
					uni.showLoading({
						title: '正在登录...',
						mask: true
					})
					const {
						token
					} = await login({
						username: this.username,
						password: this.password
					})
					uni.hideLoading()
					uni.showToast({
						title: '登录成功'
					})
					uni.setStorageSync('token', token)
					uni.navigateTo({
						url: '/pages/index/index'
					})
				} catch (e) {
					uni.hideLoading()
				}
			}
		}
	}
</script>

<style>
	.logo {
		width: 200rpx;
		height: 200rpx;
	}

	.container {
		padding: 30rpx;
		text-align: center;
	}

	.username {
		margin-top: 30rpx;
	}

	.password {
		margin-top: 30rpx;
	}

	.login {
		margin-top: 30rpx;
	}
</style>