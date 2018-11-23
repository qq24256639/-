import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
import { Message, MessageBox } from 'element-ui'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
	NProgress.start()
	if (getToken()) {
		if (to.path === '/login') {
			next({ path: '/' })
		} else {
			if (store.getters.roles.length === 0) {
				store.dispatch('GetInfo').then(res => {
					const roles = res.data.modules
					store.dispatch('GenerateRoutes', { roles }).then(() => {
						router.addRoutes(store.getters.addRouters)
						next({ ...to })
					})
					setTimeout(() => {
						if (res.data.need_change_password) {
							MessageBox.confirm('当前登录账号使用的是系统默认密码，建议修改', '温馨提示：', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'info'
							}).then(() => {
								window.modifyPw()
							}).catch(cancel => {
								// 无需操作
							})
						}
					}, 200)
				}).catch(() => {
					Message('网络错误请重试!')
				})
			} else {
				next()
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next('/login')
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})
