/**
 * Created by jyn on 2017/12/25.
 */
import fetch from '@/utils/fetch'
const mock = process.env.mock

export function getWorkbench(url, params = {}) {
	return fetch({
		url: `/v1/workbench/${url}`,
		method: 'get',
		params
	})
}
export function getWorkbenchMock(url, params = {}) {
	if (!mock) return getWorkbench(url, params)
	return fetch({
		url: `/mock/workbench/${url}`,
		method: 'get',
		params
	})
}
