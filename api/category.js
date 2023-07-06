import {
	request
} from '@/util/request'

export function add(data) {
	return request('/category/add', data, 'post')
}

export function removeById(id) {
	return request('/category/removeById?id=' + id, {}, 'get')
}

export function listAll(type) {
	return request('/category/listAll?type=' + type, {}, 'get')
}