<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="content">
				<text>记录</text>
			</block>
		</cu-custom>
		
		<button @click="onAdd()" class="cu-btn bg-blue lg add" type="primary">记一笔</button>
	</view>
</template>

<script>
	import {
		page as pageRecord
	} from '@/api/record.js'

	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				recordList: [],
				totalNum: 0,
				totalAmount: 0
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
					this.pageNum = 1
					const {
						recordList,
						totalNum,
						totalAmount
					} = await pageRecord({
						pageNum: this.pageNum,
						pageSize: this.pageSize
					})
					this.recordList = recordList
					this.totalNum = totalNum
					this.totalAmount = totalAmount
					console.log(recordList)
					uni.hideLoading()
					uni.stopPullDownRefresh()
				} catch (e) {
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}
			},
			onAdd() {
				uni.navigateTo({
					url:'/pages/record/add'
				})
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