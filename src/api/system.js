/**
 * Created by jyn on 2017/11/29.
 */

import fetch from '@/utils/fetch'
const mock = process.env.mock
    // 新建用户
export function postUser(data) {
	return fetch({
		url: `/v1/security/users`,
		method: 'post',
		data
	})
}
export function postUserMock(data, headers) {
	if (!mock) return postUser(data)
	return fetch({
		url: `/mock/security/users`,
		method: 'post',
		data,
		headers
	})
}
// 获取用户列表
export function systemGet(url, params = {}) {
	return fetch({
		url: `/v1/security/${url}`,
		method: 'get',
		params: params
	})
}
export function getSet(url, params = {}) {
	return fetch({
		url: `/v1/${url}`,
		method: 'get',
		params: params
	})
}
export function putSet(url, data) {
	return fetch({
		url: `/v1/${url}`,
		method: 'put',
		data: data
	})
}
// 编辑用户
export function putUser(id, data) {
	return fetch({
		url: `/v1/security/users/${id}`,
		method: 'put',
		data: data
	})
}
export function putUserMock(id, data) {
	if (!mock) return putUser(id, data)
	return fetch({
		url: `/mock/security/users/${id}`,
		method: 'put',
		data: data
	})
}

// password修改
export function putPassword(id, data) {
	return fetch({
		url: `/v1/security/users/${id}/change_pwd`,
		method: 'put',
		data: data
	})
}
export function putPasswordMock(id, data) {
	if (!mock) return putPassword(id, data)
	return fetch({
		url: `/mock/security/users/${id}/change_pwd`,
		method: 'put',
		data: data
	})
}

export function getOrganizations(id) {
	return fetch({
		url: `/v1/security/organizations/${id}/subs`,
		method: 'get'
	})
}

export function getTopOrganizations() {
	return fetch({
		url: `/v1/security/organizations/tops`,
		method: 'get'
	})
}

export function putReconstruct(data = {}) {
	return fetch({
		url: `/v1/security/organizations/reconstruct`,
		method: 'put',
		data
	})
}

export function deleteOrganizations(id) {
	return fetch({
		url: `/v1/security/organizations/${id}`,
		method: 'delete'
	})
}
export function postOrganizations(data) {
	return fetch({
		url: `/v1/security/organizations`,
		method: 'post',
		data
	})
}
export function putOrganizations(id, data) {
	return fetch({
		url: `/v1/security/organizations/${id}`,
		method: 'put',
		data
	})
}

export function postRoles(data) {
	return fetch({
		url: `/v1/security/roles`,
		method: 'post',
		data
	})
}

export function getRoles() {
	return fetch({
		url: `/v1/security/roles?perpage=10000`,
		method: 'get'
	})
}

export function getPermission(id) {
	return fetch({
		url: `/v1/security/roles/${id}/permissions`,
		method: 'get'
	})
}

export function postPermission(id, data = {}) {
	return fetch({
		url: `/v1/security/roles/${id}/permissions`,
		method: 'post',
		data
	})
}

export function deleteRoles(id) {
	return fetch({
		url: `/v1/security/roles/${id}`,
		method: 'delete'
	})
}

export function getUsers(id, params = {}) {
	return fetch({
		url: `/v1/security/roles/${id}/users`,
		method: 'get',
		params
	})
}
export function getBanners() {
	return fetch({
		url: `/v1/sys/banners/admin`,
		method: 'get'
	})
}
export function getRecommends() {
	return fetch({
		url: `/v1/product_recommends/list`,
		method: 'get'
	})
}
export function saveBanner(data) {
	return fetch({
		url: `/v1/sys/banners/admin`,
		method: 'post',
		data
	})
}
export function modifyBanner(url, data) {
	return fetch({
		url: `/v1/sys/banners${url}`,
		method: 'put',
		data
	})
}
export function modifyRecmmend(url, data) {
	return fetch({
		url: `/v1/product_recommends/${url}`,
		method: 'put',
		data
	})
}
