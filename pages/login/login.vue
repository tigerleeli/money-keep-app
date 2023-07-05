<template>
	<view>
		<cu-custom bgColor="bg-blue">
			<block slot="content">
				<text>登录</text>
			</block>
		</cu-custom>

		<view class="container">
			<view class="text-center">
				<image src="@/static/logo.png" class="logo"></image>
			</view>

			<view class="cu-form-group solid margin-top">
				<input v-model="username" placeholder="请输入用户名" type="text" />
			</view>
			<view class="cu-form-group solid margin-top">
				<input v-model="password" password placeholder="请输入密码" type="safe-password" />
			</view>
			<view class="flex-direction flex margin-top">
				<button @click="onLogin" class="cu-btn bg-blue lg">登录</button>
			</view>
			<view class="margin-top text-center">
				<text @click="goRegisterPage()" class="text-blue">注册账号</text>
			</view>
		</view>
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
					uni.redirectTo({
						url: '/pages/index/index'
					})
				} catch (e) {
					uni.hideLoading()
				}
			},
			goRegisterPage() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		}
	}
</script>

<style>
	.logo {
		width: 160rpx;
		height: 160rpx;
	}

	.container {
		padding: 30rpx;
	}
</style>