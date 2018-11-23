import Cookies from 'js-cookie'

export const TokenKey = 'Authorization'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token) {
	return Cookies.set(TokenKey, token, { expires: 1, path: '/' })
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}
