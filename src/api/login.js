import fetch from '@/utils/fetch'
const mock = process.env.mock

export function login(username, password) {
	return fetch({
		url: '/v1/token',
		method: 'post',
		data: {
			username,
			password
		}
	})
}

export function getInfo() {
	return fetch({
		url: '/v1/security/users/current_user',
		method: 'get'
	})
}

export function logout() {
	return fetch({
		url: '/v1/token/logout',
		method: 'post'
	})
}

export function getConstCode(type) {
	return fetch({
		url: `/v1/const_code/${type}`,
		method: 'get'
	})
}
export function getConstCodeMock(type) {
	if (!mock) return getConstCode(type)
	return fetch({
		url: `/mock/const_code/${type}`,
		method: 'get'
	})
}

export function getPathNull(type) {
	return fetch({
		url: `/v1/${type}`,
		method: 'get'
	})
}

export function getOss() {
	return fetch({
		url: '/v1/oss/posts',
		method: 'get'
	})
}
export function getMessages() {
	return fetch({
		url: '/v1/messages/summary',
		method: 'get'
	})
}
