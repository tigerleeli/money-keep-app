<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="content">
				<text v-if="type==1">支出</text>
				<text v-if="type==2">收入</text>
				<text>分类列表</text>
			</block>
			<block slot="right">
				<button @click="onAdd()" class="cu-btn shadow round line-white margin-lg">新增分类</button>
			</block>
		</cu-custom>

		<view v-if="list.length">
			<view v-for="item in list" :key="item.id" class="padding flex justify-between bg-white solid-bottom">
				<view>
					<text class="cu-tag round"
						:class="[item.type == 1 ? 'bg-gradual-blue':'bg-gradual-green']">{{item.name}}</text>
				</view>
				<view>
					<text @click="onRemove(item.id)" class="cuIcon-delete"></text>
				</view>
			</view>
		</view>
		<view v-else class="padding text-center">无分类，请添加右上角新增</view>

	</view>
</template>

<script>
	import {
		listAll,
		removeById,
		add
	} from '@/api/category.js'
	export default {
		data() {
			return {
				list: [],
				name: null,
				type: 1
			}
		},
		onLoad(option) {
			this.type = parseInt(option.type)
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
					this.list = await listAll(this.type)
					uni.hideLoading()
					uni.stopPullDownRefresh()
				} catch (e) {
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}
			},
			onAdd() {
				uni.showModal({
					title: '新增分类',
					editable: true,
					placeholderText: '请输入分类名称',
					success: async res => {
						if (res.confirm && res.content) {
							try {
								uni.showLoading({
									title: '正在保存...',
									mask: true
								})
								await add({
									type: this.type,
									name: res.content
								})
								uni.hideLoading()
								uni.showToast({
									title: '保存成功'
								})
								this.refresh()

								uni.$emit('refreshCategoryList_recordAddPage')

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
					content: '您确定删除分类吗？',
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

								uni.$emit('refreshCategoryList_recordAddPage')

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
</style>