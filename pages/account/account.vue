<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="content">
				<text>账户列表</text>
			</block>
			<block slot="right">
				<button @click="onAdd()" class="cu-btn shadow round line-white margin-lg">新增账户</button>
			</block>
		</cu-custom>

		<view v-if="list.length">
			<view v-for="item in list" :key="item.id" class="padding flex justify-between bg-white solid-bottom">
				<view>
					<view>{{item.name}}</view>
					<view class="margin-top-sm">
						<text class="amount">{{item.balance}}</text>
						<text>元</text>
					</view>
				</view>
				<view>
					<text @click="onRemove(item.id)" class="cuIcon-delete"></text>
				</view>
			</view>
		</view>
		<view v-else class="padding text-center">无账户，请添加右上角新增</view>

	</view>
</template>

<script>
	import {
		listAll,
		removeById,
		add
	} from '@/api/account.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			uni.showLoading({
				title: '正在加载...',
				mask: true
			})
			this.refresh()
		},
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			async refresh() {
				try {
					this.list = await listAll()
					console.log(this.list)
					uni.hideLoading()
					uni.stopPullDownRefresh()
				} catch (e) {
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}
			},
			onAdd() {
				uni.showModal({
					title: '新增账户',
					editable: true,
					placeholderText: '请输入账号名称',
					success: async res => {
						if (res.confirm && res.content) {
							try {
								uni.showLoading({
									title: '正在保存...',
									mask: true
								})
								await add({
									name: res.content
								})
								uni.hideLoading()
								uni.showToast({
									title: '保存成功'
								})
								this.refresh()

								uni.$emit('refreshAccountList_recordAddPage')
							} catch (e) {
								uni.hideLoading()
							}
						}
					}
				});
			},
			onRemove(id) {
				uni.showModal({
					title: '提示',
					content: '您确定删除账户吗？',
					success: async res => {
						if (res.confirm) {
							try {
								uni.showLoading({
									title: '正在删除...',
									mask: true
								})
								await removeById(id)
								uni.hideLoading()
								uni.showToast({
									title: '操作成功'
								})
								this.refresh()

								uni.$emit('refreshAccountList_recordAddPage')
							} catch (e) {
								uni.hideLoading()
							}
						}
					}
				});
			}
		}
	}
</script>

<style>
	.add {
		position: fixed;
		right: 30rpx;
		bottom: 30rpx;
	}
	
	.amount{
		font-size: 40rpx;
	}
</style>