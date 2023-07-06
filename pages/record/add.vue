<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="content">
				<text>记一笔</text>
			</block>
		</cu-custom>

		<view>
			<view class="cu-form-group">
				<view class="title">类型：</view>
				<view class="flex-sub" @click="onTypeChange()">
					<text v-if="type == 1" class="cu-tag round bg-gradual-blue">支出</text>
					<text v-else class="cu-tag round bg-gradual-green">收入</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">账户：</view>
				<view class="flex-sub" @click="onSelectAccount()">
					<view v-if="selectedAccount">{{selectedAccount.name}}</view>
					<view v-else class="text-grey">请选择</view>
				</view>
				<text @click="goAccountPage()" class="text-blue">账户管理</text>
			</view>
			<view class="cu-form-group">
				<view class="title">分类：</view>
				<view class="flex-sub" @click="onSelectCategory()">
					<view v-if="selectedCategory">{{selectedCategory.name}}</view>
					<view v-else class="text-grey">请选择</view>
				</view>
				<text @click="goCategoryPage()" class="text-blue">分类管理</text>
			</view>
			<view class="cu-form-group">
				<view class="title">金额：</view>
				<input v-model="amount" placeholder="请输入金额" type="digit" />
			</view>
			<view class="cu-form-group">
				<view class="title">备注：</view>
				<input v-model="remark" placeholder="请输入备注" type="text" />
			</view>
			<view class="flex-direction flex padding">
				<button @click="onSave" class="cu-btn bg-blue lg">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		add
	} from '@/api/record.js'

	import {
		listAll as listCategory
	} from '@/api/category.js'

	import {
		listAll as listAccount
	} from '@/api/account.js'
	export default {
		data() {
			return {
				amount: null,
				remark: null,

				type: 1,
				accountList: [],
				categoryList: [],
				selectedAccount: null,
				selectedCategory: null
			}
		},
		onLoad() {
			this.listAccount()
			this.listCategory()

			uni.$on('refreshAccountList_recordAddPage', () => {
				this.listAccount()
			})

			uni.$on('refreshCategoryList_recordAddPage', () => {
				this.listCategory()
			})
		},
		onUnload() {
			uni.$off('refreshAccountList_recordAddPage')
			uni.$off('refreshCategoryList_recordAddPage')
		},
		methods: {
			async listCategory() {
				this.categoryList = await listCategory(this.type)
				if (this.categoryList.length) {
					this.selectedCategory = this.categoryList[0]
				}
			},
			async listAccount() {
				this.accountList = await listAccount()
				if (this.accountList.length) {
					this.selectedAccount = this.accountList[0]
				}
			},
			async onSave() {
				try {
					if (!this.selectedAccount) {
						uni.showToast({
							title: '请选择账户',
							position: 'bottom',
							icon: 'none'
						})
						return
					}

					if (!this.selectedCategory) {
						uni.showToast({
							title: '请选择分类',
							position: 'bottom',
							icon: 'none'
						})
						return
					}

					if (!this.amount) {
						uni.showToast({
							title: '请输入金额',
							position: 'bottom',
							icon: 'none'
						})
						return
					}

					uni.showLoading({
						title: '正在保存...',
						mask: true
					})
					await add({
						type: this.type,
						amount: this.amount,
						remark: this.remark,
						categoryId: this.selectedCategory.id,
						accountId: this.selectedAccount.id
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
				if (!this.accountList.length) {
					uni.showToast({
						title: '无账户，请点击右侧按钮添加',
						position: 'bottom',
						icon: 'none'
					})
					return
				}
				uni.showActionSheet({
					itemList: this.accountList.map(e => e.name),
					success: res => {
						this.selectedAccount = this.accountList[res.tapIndex]
					}
				});
			},
			onSelectCategory() {
				if (!this.categoryList.length) {
					uni.showToast({
						title: '无分类，请点击右侧按钮添加',
						position: 'bottom',
						icon: 'none'
					})
					return
				}
				uni.showActionSheet({
					itemList: this.categoryList.map(e => e.name),
					success: res => {
						this.selectedCategory = this.categoryList[res.tapIndex]
					}
				});
			},
			goAccountPage() {
				uni.navigateTo({
					url: '/pages/account/account'
				})
			},
			goCategoryPage() {
				uni.navigateTo({
					url: '/pages/category/category?type=' + this.type
				})
			},
			async onTypeChange() {
				if (this.type == 1) {
					this.type = 2
				} else {
					this.type = 1
				}
				await this.listCategory()
			},
		}
	}
</script>

<style>
	page {}

	.container {
		padding: 30rpx;
	}
</style>