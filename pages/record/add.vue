<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="content">
				<text>记录</text>
			</block>
		</cu-custom>

		<view class="container">
			<view class="cu-form-group solid">
				<view class="title">账户:</view>
				<view class="flex-sub" @click="onSelectAccount">
					<view v-if="selectedAccount">{{selectedAccount.name}}</view>
					<view v-else class="text-grey">请选择</view>
				</view>
				<text class="text-blue cuIcon-edit"></text>
			</view>
			<view class="cu-form-group solid margin-top-xs">
				<view class="title">分类:</view>
				<view class="flex-sub">
					<view v-if="selectedCategory">{{selectedCategory.name}}</view>
					<view v-else class="text-grey">请选择</view>
				</view>
				<text class="text-blue cuIcon-edit"></text>
			</view>
			<view class="cu-form-group solid margin-top-xs">
				<view class="title">金额:</view>
				<input v-model="amount" placeholder="请输入金额" type="digit" />
			</view>
			<view class="cu-form-group solid margin-top-xs">
				<view class="title">备注:</view>
				<input v-model="remark" placeholder="请输入备注" type="text" />
			</view>
			<view class="flex-direction flex margin-top">
				<button @click="onSave" class="cu-btn bg-blue lg">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		add
	} from '@/api/record.js'
	export default {
		data() {
			return {
				amount: null,
				remark: null,
				selectedAccount: null,
				selectedCategory: null
			}
		},
		methods: {
			async onSave() {
				try {
					uni.showLoading({
						title: '正在保存...',
						mask: true
					})
					await add({
						type: 1,
						amount: this.amount,
						remark: this.remark
					})
					uni.hideLoading()
					uni.showToast({
						title: '保存成功'
					})
					this.amount = null
					this.remark = null
				} catch (e) {
					uni.hideLoading()
				}
			},
			onSelectAccount() {
				uni.showActionSheet({
					itemList: ['A', 'B', 'C'],
					success: res => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					},
					fail: res => {
						console.log(res.errMsg);
					}
				});
			}
		}
	}
</script>

<style>
	page {}

	.container {
		padding: 30rpx;
	}
</style>