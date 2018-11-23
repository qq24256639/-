/**
 * Created by jyn on 2018/3/14.
 */

import fetch from '@/utils/fetch'
// const mock = process.env.mock

export function getNotifies(url, params = {}) {
	return fetch({
		url: `/v1/messages/${url}`,
		method: 'get',
		params
	})
}
export function getSet(url, params = {}) {
	return fetch({
		url: `/v1/message_config/${url}`,
		method: 'get',
		params
	})
}
export function putSet(id, data = {}) {
	return fetch({
		url: `/v1/message_config/${id}`,
		method: 'put',
		data: data
	})
}
export function putNotice(id) {
	return fetch({
		url: `/v1/messages/notices/${id}`,
		method: 'put'
	})
}
