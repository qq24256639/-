const getRoleRet = function(roleArr) {
	const ret = Object.create(null)
	roleArr.forEach(i => {
		const functions = i.functions
		functions.forEach(e => {
			const permissions = e.permissions
			permissions.forEach(w => {
				ret[w.id] = w.is_selected
			})
		})
	})
	return ret
}

const setSelected = function(permis, swich) {
	permis.forEach(q => {
		if (q.id === swich) {
			q.is_selected = true
		} else {
			q.is_selected = false
		}
	})
}

const setRoleRet = function(roleArr) {
	roleArr.forEach(i => {
		const functions = i.functions
		functions.forEach(e => {
			const type = e.type
			if (type === 'checkbox') {
				e.permissions.forEach(w => {
					w.is_selected = false
					e.select_ret.forEach(q => {
						if (w.id === q) {
							w.is_selected = true
						}
					})
				})
			} else {
				setSelected(e.permissions, e.select_ret)
			}
		})
	})
	return roleArr
}

const getContrast = function(oldRet, newRet) {
	const ret = []
	for (const i in oldRet) {
		if (newRet[i] !== oldRet[i]) {
			ret.push({
				[i]: newRet[i]
			})
		}
	}
	return ret
}

const rule_role = {
	state: {
		role: null,
		change: false
	},
	mutations: {
		setRuleRole(state, ployload) {
			state.role = getRoleRet(ployload)
			state.change = !1
		},
		roleChange(state, newRoleArr) {
			const newRole = setRoleRet(newRoleArr)
			const newRet = getRoleRet(newRole)
			const changeRet = getContrast(state.role, newRet)
			state.change = changeRet.length > 0
		}
	},
	actions: {

	}
}

export default rule_role
