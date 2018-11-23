import { asyncRouterMap, constantRouterMap } from '@/router/index'

function clearRouter(roles) {
	const ret = []
	roles.forEach((role, n) => {
		if (role.is_selected === true) {
			ret.push(role)
		}
		if (role.menus && role.menus.length) {
			role.menus.forEach((i, n) => {
				if (i.is_selected === true) {
					ret.push(i)
				}
			})
		}
	})
	return ret
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	return roles.some(role => {
		const compare = route.label === role.label
		if (compare && route.name) route.name = role.name
		return compare
	})
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
	const accessedRouters = asyncRouterMap.filter(route => {
		if (!route.hasOwnProperty('label')) return true
		if (hasPermission(roles, route)) {
			if (route.children && route.children.length) {
				route.children = filterAsyncRouter(route.children, roles)
			}
			return true
		}
		return false
	})
	return accessedRouters
}

const permission = {
	state: {
		routers: constantRouterMap,
		addRouters: [],
    nav: {}
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers
			state.routers = constantRouterMap.concat(routers)
		},
    SET_NAV: (state, routers) => {
		  state.nav = routers
    }
	},
	actions: {
		GenerateRoutes({ commit }, data) {
			return new Promise(resolve => {
				const { roles } = data
				const accessedRouters = filterAsyncRouter(asyncRouterMap, clearRouter(roles))
				commit('SET_ROUTERS', accessedRouters)
				resolve()
			})
		}
	}
}

export default permission
