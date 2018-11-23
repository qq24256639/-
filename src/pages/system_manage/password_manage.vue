<template>
    <page-module v-loading.fullscreen="loading" element-loading-text="加载中">
		<el-tabs v-model="activeName">
			<el-tab-pane label="用户密码变更" name="first" >
				<el-row>
					<el-col :span="9" :offset="7">
						<el-form ref="pwForm" :rules="rules" :model="pwForm" label-width="100px">
							<el-form-item label="用户" prop="search_val">
								<template>
									<el-autocomplete
										v-model="pwForm.search_val"
										:fetch-suggestions="querySearch"
										placeholder="请选择用户"
										@select="searchSelect"
										style="width:100%">
									</el-autocomplete>
									<i class="el-icon-close" v-if="pwForm.search_val" @click="clearSearch" style="position:absolute;top:12px;right:10px;cursor:pointer;"></i>
								</template>
							</el-form-item>
							<el-form-item label="新密码" prop="password">
								<el-input v-model="pwForm.password" placeholder="请输入新密码"></el-input>
							</el-form-item>
							<el-form-item label="确认新密码" prop="confirm_password">
								<el-input v-model="pwForm.confirm_password" placeholder="请再次输入新密码"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitPw('pwForm')">提交</el-button>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-table 
					:data="userData"
					:header-row-class-name='headerClass'>
					<el-table-column property="realname" label="姓名"></el-table-column>
					<el-table-column property="department" label="部门">
						<template slot-scope="scope">
							<span v-if="scope.row.department">{{scope.row.department.name}}</span>
						</template>
					</el-table-column>
					<el-table-column property="roles" label="角色">
						<template slot-scope="scope">
							<span style='padding: 0 8px 0 0;' v-for="(item, n) in scope.row.roles" :key="n">{{item.name}}</span>
						</template>
					</el-table-column>
					<el-table-column property="username" label="用户名">
					</el-table-column>
					<el-table-column property="office_code" label="工号"></el-table-column>
					<el-table-column property="report_leader.realname" label="汇报上级"></el-table-column>
					<el-table-column property="entry_time" label="入职时间"></el-table-column>
					<el-table-column property="status_code.display" label="状态"></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="变更记录" name="second">
				<el-form ref="recordForm" :model="recordForm" label-width="100px" label-position="left">
					<el-form-item label="操作人">
						<el-button type="text" class="buttons" :class="{ cur_btn : i.current }" v-for="(i, n) in status" :key="n" @click="searchFun(i)">{{i.display}}</el-button>
					</el-form-item>
					<el-form-item label="关键字搜索">
						<el-form :inline="true" class="demo-form-inline">
							<el-form-item label="">
								<el-input type="text" placeholder="搜索关键字" v-model="search" @keyup.enter.native="getPwRecord()">
									<el-button @click="getPwRecord()" icon="el-icon-search" class="search-icon" slot="append"></el-button>
								</el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary"  class="reset-button" @click="reset">重置</el-button>
							</el-form-item>
						</el-form>
					</el-form-item>
					<div class="search-result">搜索结果：共计
						<span class="result_num">{{paginData.total}}</span> 条记录
					</div>
				</el-form>
				<el-table :data="tableData"
						  :header-row-class-name='headerClass'
						  v-loading="recordListLoading" element-loading-text="加载中" style="width:100%;">
					<el-table-column property="user.realname" label="姓名">
					</el-table-column>
					<el-table-column property="user.department" label="部门">
						<template slot-scope="scope">
							<span v-if="scope.row.user">{{scope.row.user.department.name}}</span>
						</template>
					</el-table-column>
					<el-table-column property="user.roles" label="角色">
						<template slot-scope="scope" v-if="scope.row.user">
							<span style='padding: 0 8px 0 0;' v-for="(item, n) in scope.row.user.roles" :key="n">{{item.name}}</span>
						</template>
					</el-table-column>
					<el-table-column property="user.username" label="用户名">
					</el-table-column>
					<el-table-column property="user.office_code" label="工号">
					</el-table-column>
					<el-table-column property="create_time" label="密码变更时间">
					</el-table-column>
					<el-table-column property="operator.realname" label="操作人">
					</el-table-column>
				</el-table>
				<el-row class="footer">
					<div class="block">
						<el-pagination
							@size-change="pageChange"
							@current-change="curChange"
							:current-page="paginData.page"
							:page-size="paginData.per_page"
							layout="sizes, prev, pager, next"
							:total.sync="paginData.total">
						</el-pagination>
					</div>
				</el-row>
			</el-tab-pane>
		</el-tabs>
	</page-module>
</template>
<script>
import { systemGet, putPassword } from '@/api/system'
import { getConstCode } from '@/api/login'

export default{
	data() {
		return {
			tableData: [],
			userData: [],
			search: null,
			status: [],
			statusData: {
				display: '全部',
				val: 0
			},
			defaultData: [],
			paginData: {
				total: 0,
				per_page: 10,
				page: 1,
				pages: 0
			},
			userId: null,
			activeName: 'first',
			listLoading: false,
			recordListLoading: false,
			pwForm: {
				search_val: null,
				password: null,
				confirm_password: null
			},
			rules: {
				search_val: [
					{ required: true, message: '请输入员工姓名', trigger: 'change' },
					{ max: 20, message: '姓名不能超过20个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'change' },
					{ message: '密码需为6~16位之间的数字和字母的组合', trigger: 'change',
						validator: (rule, value, callback) => {
							const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
							if (!reg.test(value)) {
								return callback(new Error(rule.message))
							}
							return callback()
						}
					}
				],
				confirm_password: [
					{ required: true, message: '请输入确认密码', trigger: 'blur' },
					{ min: 6, max: 16, message: '两次输入的密码不一致', trigger: 'change',
						validator: (rule, value, callback) => {
							if (value !== this.pwForm.password) {
								return callback(new Error(rule.message))
							}
							return callback()
						}
					}
				]
			},
			recordForm: {},
			loading: false
		}
	},
	methods: {
		headerClass({ row, rowIndex }) {
			return 'wms_table_header'
		},
		reset() {
			this.search = null
			this.getPwRecord()
		},
		pageChange(num) {
			this.paginData.per_page = num
			this.getPwRecord()
		},
		curChange(page) {
			this.paginData.page = page
			this.getPwRecord()
		},
		submitPw(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const params = this.pwForm
					delete params.search_val
					putPassword(this.userId, params).then(res => {
						this.$message({
							type: 'success',
							message: '成功修改密码!'
						})
						this.getPwRecord()
						this.$refs[formName].resetFields()
					}).catch(err => {
						this.$error(err)
					})
				} else {
					return false
				}
			})
		},
		querySearch(query, cb) {
			if (!query) return cb(this.search_result || [])
			const filter = {
				relationship_: 'and',
				conditions_: [
					{ status: 1 },
					{
						relationship_: 'or',
						conditions_: [
							{
								realname: {
									action: 'like',
									value: query.trim()
								}
							}, {
								office_code: {
									action: 'like',
									value: query.trim()
								}
							}
						]
					}
				]
			}
			systemGet(`users?filter=${JSON.stringify(filter)}`).then(res => {
				cb(this.filter(res.data))
			})
		},
		filter(list) {
			return list.map(i => {
				return {
					value: `${i.realname} <${i.office_code}>`,
					val: i.id
				}
			})
		},
		searchSelect(item) {
			this.listLoading = true
			this.userData = []
			this.userId = item.val
			systemGet(`users/${item.val}`).then(res => {
				this.userData.push(res.data)
				this.listLoading = false
			}).catch(err => {
				this.$error(err)
			})
		},
		clearSearch() {
			this.pwForm.search_val = null
			this.userData = null
		},
		searchFun(e) {
			const type = this[e.type]
			if (this[e.type + 'Data'] === e) return
			this[e.type + 'Data'] = e
			type.forEach(i => {
				if (i === e) {
					i.current = !0
					return
				}
				i.current = !1
			})
			this.getPwRecord()
		},
		setInit(data, type) {
			data.forEach((i, n) => { i.type = type; i.index = n; i.current = false })
			data.unshift({
				display: '全部',
				val: 0,
				current: true,
				type: type,
				index: 0
			})
			this.defaultData.push(data[0])
			return data
		},
		getPwRecord() {
			this.recordListLoading = true
			const filter = {
				self_change: this.statusData.val,
				_kw: this.search
			}
			if (this.statusData.val === 0) {
				delete filter.self_change
			}
			if (!this.search) {
				delete filter._kw
			}
			systemGet(`password_change_record`, {
				page: this.paginData.page,
				perpage: this.paginData.per_page,
				filter: filter
			}).then(res => {
				this.paginData.total = +res.headers['x-pagination-total']
				this.paginData.pages = +res.headers['x-pagination-pages']
				this.paginData.per_page = +res.headers['x-pagination-per-page']
				this.tableData = res.data
				this.recordListLoading = false
			})
		}

	},
	created() {
		const filter = {
			status: 1
		}
		systemGet(`users?filter=${JSON.stringify(filter)}`).then(res => {
			this.search_result = this.filter(res.data)
		})
		getConstCode('user_password_change_type').then(res => {
			this.status = this.setInit(res.data, 'status')
		})
		this.getPwRecord()
	}
}
</script>
<style scoped>
.footer {
	margin-top: 30px;
	margin-bottom: 30px;
	text-align: right;
}
</style>
