import {
	request
} from '@/util/request'

export function add(data) {
	return request('/record/add', data, 'post')
}

export function removeById(id) {
	return request('/record/removeById?id=' + id, {}, 'get')
}

export function page(data) {
	return request('/record/page', data, 'post')
}
