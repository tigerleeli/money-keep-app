import {
	request
} from '@/util/request'

export function add(data) {
	return request('/account/add', data, 'post')
}

export function removeById(id) {
	return request('/account/removeById?id=' + id, {}, 'get')
}

export function listAll() {
	return request('/account/listAll', {}, 'get')
}
