<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="content">
				<text>个人信息</text>
			</block>
		</cu-custom>

		<view v-if="user">
			<view class="bg-white padding flex align-center">
				<image src="@/static/logo.png" class="logo"></image>

				<view class="margin-left">
					<view class="text-xxl">{{user.username}}</view>
				</view>
			</view>

			<view @click="goPage('/pages/account/account')" class="padding flex margin-top-sm bg-white justify-between">
				<text>账户管理</text>
				<text class="cuIcon-right text-grey"></text>
			</view>
			<view @click="goPage('/pages/category/category?type=1')"
				class="padding flex bg-white justify-between solid-top">
				<text>支出分类管理</text>
				<text class="cuIcon-right text-grey"></text>
			</view>
			<view @click="goPage('/pages/category/category?type=2')"
				class="padding flex bg-white justify-between solid-top">
				<text>收入分类管理</text>
				<text class="cuIcon-right text-grey"></text>
			</view>
			<view class="padding flex margin-top-sm bg-white justify-between">
				<text>记账统计</text>
				<text class="cuIcon-right text-grey"></text>
			</view>

			<view class="flex-direction flex padding margin-top-sm">
				<button @click="onLogout" class="cu-btn bg-gradual-red round">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		get as getUser
	} from '@/api/user.js'

	export default {
		data() {
			return {
				user: null
			}
		},
		onLoad() {
			uni.showLoading({
				title: '正在加载...',
				mask: true
			})
			this.refresh()
		},
		methods: {
			async refresh() {
				try {
					this.user = await getUser()
					uni.hideLoading()
					uni.stopPullDownRefresh()
				} catch (e) {
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}
			},
			goPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			onLogout() {
				// 清除所有的缓存
				uni.clearStorage()
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	.logo {
		border-radius: 16rpx;
		width: 120rpx;
		height: 120rpx;
	}
</style>