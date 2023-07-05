import {
	remoteUrl
} from '@/util/constant.js'

export function request(url, data, method) {
	return new Promise((resolve, reject) => {
		let header = {}
		const token = uni.getStorageSync('token')
		if (token) {
			header['Authorization'] = token
		}
		uni.request({
			url: remoteUrl + url,
			method: method,
			data: data,
			header: header,
			success: (res) => {
				if (!res.data) {
					uni.showToast({
						title: '请求出错，无数据返回',
						position: 'bottom',
						icon: 'none'
					})
					reject('请求出错，无数据返回')
				}
				if (res.data.code != 10000) {
					// 异常
					uni.showToast({
						title: res.data.msg,
						position: 'bottom',
						icon: 'none'
					})
					if (res.data.code == 20001 || res.data.code == 20002) {
						// 令牌为空 或 令牌过期
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
					reject(res.data.msg)
				}
				resolve(res.data.data)
			},
			error: (error) => {
				reject('请求出错，请检查网络或稍后再试')
			}
		});
	})
}