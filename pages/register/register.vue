<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="content">
				<text>注册</text>
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
				<button @click="onRegister" class="cu-btn bg-blue lg">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		register
	} from '@/api/user.js'
	export default {
		data() {
			return {
				username: null,
				password: null
			}
		},
		methods: {
			async onRegister() {
				try {
					uni.showLoading({
						title: '正在注册...',
						mask: true
					})
					await register({
						username: this.username,
						password: this.password
					})
					uni.hideLoading()
					uni.showToast({
						title: '注册成功'
					})
					uni.redirectTo({
						url: '/pages/login/login'
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
		border-radius: 30rpx;
		margin-top: 30rpx;
	}

	.container {
		padding: 30rpx;
	}
</style>