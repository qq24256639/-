import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, TokenKey } from '@/utils/auth'

const domain = process.env.CLIENT ? 'http://wms.showing.youheng-inc.com' : ''
// 创建axios实例
const service = axios.create({
	baseURL: domain + process.env.BASE_API, // api的base_url
	timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
	if (store.getters.token) {
		config.headers[TokenKey] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	return config
}, error => {
    // Do something with request error
	// console.log(error) // for debug
	Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
	return response
            // const res = response.data
            // if (response.status === 200) {
            //     return response.data
            // } else if (res && +res.code === 4000) {
            //     Message({
            //         message: res.data.msg,
            //         type: 'error',
            //         duration: 8 * 1000
            //     })
            //     return Promise.reject('error')
            //         //     // 50008:非法的token; 50012:其他客户端登录了;    50014:Token 过期了;
            //         //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            //         //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            //         //             confirmButtonText: '重新登录',
            //         //             cancelButtonText: '取消',
            //         //             type: 'warning'
            //         //         }).then(() => {
            //         //             store.dispatch('FedLogOut').then(() => {
            //         //                 location.reload()// 为了重新实例化vue-router对象 避免bug
            //         //             })
            //         //         })
            //         //     }
            //         //     return Promise.reject('error')
            // } else {
            //     return res
            // }
},
    (error) => {
	const res = error.response
	if (res.status === 500) {
		Message({
			message: '系统错误，请联系管理员',
			type: 'error',
			duration: 5 * 1000
		})

		return Promise.reject()
	}
  if (res.status === 504) {
    Message({
      message: '连接超时，请联系管理员',
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject()
  }
	if (res.status === 401) {
		return MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
			confirmButtonText: '重新登录',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			store.dispatch('FedLogOut').then(() => {
				location.reload() // 为了重新实例化vue-router对象 避免bug
			})
		}).catch(() => {
			// console.log(err)
		})
	}
	if (res.status === 403) {
		MessageBox.alert('您没有该权限，请联系管理员')
		return Promise.reject(res)
	}
	return Promise.reject(res)
}
)

const toDate = date => {
	const newDate = new Date(date)
	return newDate.getFullYear() + '-' +
        (newDate.getMonth() + 1 + '-') +
        newDate.getDate() + ' ' +
        newDate.getHours() + ':' +
        newDate.getMinutes() + ':' +
        newDate.getSeconds()
}

const transformDate = data => {
	if (!data) return
	if (Array.isArray(data)) {
		data.forEach(i => {
			return transformDate(i)
		})
	}
	const toString = Object.prototype.toString
	if (toString.call(data) === '[object Object]') {
		for (const key in data) {
			if (
				toString.call(data[key]) === '[object Date]' ||
				/^\d{4}-[\d]{1,2}-[\d]{1,2}\s+[\d]{1,2}:[\d]{1,2}:[\d]{1,2}$/ig.test(data[key])
			) {
				data[key] = toDate(data[key])
			}
		}
	}
	return data
}

export default function(config) {
	const data = config.data
	const params = config.params
	if (data) {
		transformDate(data)
	}
	if (params) {
		transformDate(params)
	}
	return service(config)
}
