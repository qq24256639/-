const confList = {
	name: '产品名称',
	fund_type: '基金类型',
	invest_min: '认购起点_ 万元',
	increasing_amount: '递增金额_ 万元',
	has_issue_quota: '是否具有产品规模',
	issue_quota: '产品规模',
	limit_of_customer: '投资人数上限_ 位',
	grade: '产品风险等级',
	open_date: '开放日',
	investment_horizon: '投资期限',
	scaling_factor: '折标系数',
	front_discount: '佣金系数',
	fund_manager: '基金管理人',
	fund_custodian: '基金托管人',
	raise_bank: '募集银行',
	raise_name: '开户名',
	raise_account: '募集账号',
	pay_mark: '打款备注',
	investment_strategy: '投资策略',
	investment_orientation: '投资方向'
}

const ifList = {
	true: '是',
	false: '否'
}
const keyAttr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export function transForm(key) {
	return confList[key] || null
}

export function serialize(arr) {
	arr.forEach((i, n) => {
		if (n > 25) {
			const e = n + 1
			const label = Math.floor(e / 26)
			const index = e % 26
			i['type'] = `${keyAttr[index] + label}类`
			return
		}
		i['type'] = `${keyAttr[n]}类`
	})
	arr.splice()
}

export function transIf(key) {
	return ifList[key] || null
}

