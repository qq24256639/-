import Vue from 'vue'

Vue.prototype.$error = function(res) {
	const data = res.data || {}
	const arr = []
	if (this.isEmptyObject(data)) return
	for (const i in data) {
		if (Array.isArray(data[i])) {
			arr.push(...data[i])
		} else {
			const item = data[i]
			for (const n in item) {
				arr.push(...item[n])
			}
		}
	}
	let ret
	if (arr.length) {
		ret = arr.join('，')
	} else {
		ret = JSON.stringify(data)
	}
	this.$message({
		type: 'warning',
		message: ret
	})
}
Vue.prototype.$tip = function(res) {
	// console.log(res.data)
}

Vue.prototype.isEmptyObject = function(data) {
	for (const i in data) {
		return false
	}
	return true
}
// 全局权限获取方法
Vue.prototype.$range = function(key) {
	if (!key) return this.$store.getters.user_info.permissions
	return this.$store.getters.user_info && this.$store.getters.user_info.permissions.includes(key)
}

Vue.prototype.$promise = function(arr) {
	if (Array.isArray(arr)) {
		return Promise.all(arr)
	} else {
		return Promise.all([arr])
	}
}

Vue.directive('no-mouse', {
	inserted: function(el) {
		const input = el.querySelector('input')
		input && input.addEventListener('mousewheel', e => {
			if (e.type === 'mousewheel' && document.activeElement === e.target) {
				e.preventDefault()
			}
		}, false)
	}
})
