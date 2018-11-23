import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
	state: {
		token: getToken(),
		user_info: null,
		roles: [],
		oss: {}
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USER_INFO: (state, info) => {
			state.user_info = info
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_OSS: (state, oss) => {
			delete oss.file
			oss['x:creator'] = state.user_info.id
			Object.assign(state.oss, oss)
		}
	},
	actions: {
		// 登录
		Login({ commit }, userInfo) {
			const username = userInfo.username.trim()
			return new Promise((resolve, reject) => {
				login(username, userInfo.password).then(res => {
					const data = res.data
					if (data && data.code === '2000') { // code2000 为登录成功的状态码
						const info = data.data
						setToken(info.token)
						commit('SET_TOKEN', info.token)
						resolve()
					}
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 获取用户信息
		GetInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				getInfo().then(response => {
					const data = response.data
					commit('SET_ROLES', data.modules)
					commit('SET_USER_INFO', data)
					resolve(response)
				}).catch(error => {
					return reject(error)
				})
			})
		},

		// 登出
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					removeToken()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 前端 登出
		FedLogOut({ commit }) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		}
	}
}

export default user
