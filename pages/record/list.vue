<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="content">
				<text>记账记录</text>
			</block>
			<block slot="right">
				<text @click="goMyPage()" class="cuIcon-people margin-right" style="font-size: 40rpx;"></text>
			</block>
		</cu-custom>

		<view v-if="recordList.length">
			<view class="padding-sm flex justify-between">
				<view>共{{totalNum}}条记录</view>
			</view>

			<view v-for="item in recordList" :key="item.id"
				class="padding flex justify-between solid-bottom bg-white align-center">
				<view>
					<view class="text-grey">
						{{item.createTime | timeFrom}}
					</view>
					
					<view class="margin-top-sm">
						<text>{{item.accountName}}</text>
					</view>

					<view class="margin-top-sm">
						<text class="cu-tag round" :class="[item.type == 1 ? 'bg-gradual-blue':'bg-gradual-green']">
							{{item.categoryName}}
						</text>
					</view>
				</view>

				<view class="text-right">
					<view class="amount">
						<text v-if="item.type == 1">-</text>
						<text>{{item.amount}}</text>
					</view>
					<view v-if="item.remark" class="margin-top-sm">
						{{item.remark}}
					</view>
				</view>
			</view>

			<view v-if="isLoadmore" class="padding-sm text-center text-grey">正在加载...</view>

			<view style="height: 120rpx;"></view>
		</view>

		<view v-else class="padding text-center">请点击右下角记一笔</view>

		<button @click="onAdd()" class="cu-btn bg-blue lg add" type="primary">记一笔</button>
	</view>
</template>

<script>
	import {
		page as pageRecord
	} from '@/api/record.js'
	
	import timeFrom from '@/util/timeFrom.js'
	
	import moment from 'moment'
	
	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				recordList: [],
				totalNum: 0,
				totalAmount: 0,
				accountList: [],
				isLoadmore: false
			}
		},
		filters: {
			timeFrom(val) {
				return timeFrom(moment(val).valueOf())
			}
		},
		onLoad() {
			uni.showLoading({
				title: '正在加载...',
				mask: true
			})
			this.refresh()

			uni.$on('refreshRecordList', () => {
				this.refresh()
			})
		},
		onUnload() {
			uni.$off('refreshRecordList')
		},
		onPullDownRefresh() {
			this.refresh()
		},
		onReachBottom() {
			this.loadmore()
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

					uni.hideLoading()
					uni.stopPullDownRefresh()
				} catch (e) {
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}
			},
			async loadmore() {
				try {
					this.pageNum++
					this.isLoadmore = true
					const {
						recordList,
						totalNum,
						totalAmount
					} = await pageRecord({
						pageNum: this.pageNum,
						pageSize: this.pageSize
					})
					this.recordList = this.recordList.concat(recordList)
					this.totalNum = totalNum
					this.totalAmount = totalAmount
					this.isLoadmore = false
				} catch (e) {
					this.isLoadmore = false
				}
			},
			onAdd() {
				uni.navigateTo({
					url: '/pages/record/add'
				})
			},
			goMyPage() {
				uni.navigateTo({
					url: '/pages/my/my'
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

	.amount {
		font-size: 42rpx;
	}
</style>