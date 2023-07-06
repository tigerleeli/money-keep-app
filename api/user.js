import {
	request
} from '@/util/request'

export function login(data) {
	return request('/user/login', data, 'post')
}

export function register(data) {
	return request('/user/register', data, 'post')
}

export function get() {
	return request('/user/get', {}, 'get')
}