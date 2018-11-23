<template>
    <page-module v-loading.fullscreen="loading" element-loading-text="加载中">
        <el-row>
			<el-col :span="6">
				<Drag @edit="edit" @select="select" @cancelSelect="cancelSelect"/>
			</el-col>
			<el-col :span="18">
				<el-tabs v-model="activeName" style="padding-left:15px;">
					<el-tab-pane label="在职用户" name="first">
						<el-form label-width="100px" label-position="left">
							<el-form-item label="关键字搜索">
								<el-form :inline="true" class="demo-form-inline">
									<el-form-item label=" ">
										<el-input type="text" placeholder="请输入员工姓名" v-model="search" @keyup.enter.native="getUserList()">
											<el-button @click="getUserList()" icon="el-icon-search" class="search-icon" slot="append"></el-button>
										</el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="primary"  class="reset-button" @click="reset">重置</el-button>
									</el-form-item>
								</el-form>
							</el-form-item>
							<el-row>
								<el-col :span="16" class="search-result">
									搜索结果：共计
									<span class="result_num">{{paginData.total}}</span> 条记录
								</el-col>
								<el-col :span="4" :offset="4">
									<i class="el-icon-circle-plus add" @click="newUserModalVisible = true"> 
										<span class="add_word">新增</span>
									</i>
								</el-col>
							</el-row>
						</el-form>
						<el-table 
							:data="tableData"
							:header-row-class-name='headerClass'>
							<el-table-column type="index" label="序号">
							</el-table-column>
							<el-table-column property="realname" label="姓名">
							</el-table-column>
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
							<el-table-column property="office_code" label="工号">
							</el-table-column>
							<el-table-column property="report_leader.realname" label="汇报上级">
							</el-table-column>
							<el-table-column property="entry_time" label="入职时间">
							</el-table-column>
							<el-table-column property="status_code.display" label="状态">
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<span class="link" @click="editUser(scope.row)">编辑</span>
									<span>|</span>
									<span class="link" @click="deleteUser(scope.row)">删除</span>
								</template>
							</el-table-column>
						</el-table>
						<el-row class="footer">
							<div class="block">
								<el-pagination
									@size-change="pageChange"
									@current-change="curChange"
									:current-page="paginData.page"
									:page-size="paginData.per_page"
									layout="total, sizes, prev, pager, next"
									:total.sync="paginData.total">
								</el-pagination>
							</div>
						</el-row>
						<el-dialog title="新增用户" :visible.sync="newUserModalVisible">
							<el-form ref="newForm" :rules="rules" :model="newForm" label-width="110px">
								<el-form-item label="汇报上级" prop="search_val">
									<template>
											<el-autocomplete
												v-model="search_val"
												:fetch-suggestions="querySearch"
												placeholder="请输入汇报上级"
												@select="searchSelect"
												style="width:100%">
											</el-autocomplete>
											<i class="el-icon-close" v-if="search_val" @click="clearSearch" style="position:absolute;top:12px;right:10px;cursor:pointer;"></i>
									</template>
								</el-form-item>
								<el-form-item label="姓名" prop="realname">
									<el-input v-model="newForm.realname" placeholder="请输入姓名"></el-input>
								</el-form-item>
								<el-form-item label="性别" prop="sex">
									<el-radio-group v-model="newForm.sex" >
										<el-radio label="1">男</el-radio>
										<el-radio label="2">女</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="工号" prop="office_code">
									<el-input v-model="newForm.office_code" placeholder="请输入工号"></el-input>
								</el-form-item>
								<el-form-item label="部门" prop="department_name">
									<div style="display: inline-block;height: 3em;" v-if="newForm.department_name">{{department_name}}</div>
									<vue-drag-tree :model="data"
										@select="addSelect"
										@cancelSelect="addCancelSelect"
										:editor="false">
									</vue-drag-tree>
								</el-form-item>
								<el-form-item label="角色" prop="roles_id">
									<div style="height: 8em;border: 1px solid #E3E3E3; padding: .5em;overflow: scroll;">
										<el-checkbox-group
											v-model="newForm.roles_id">
											<el-checkbox v-for="role in allRoles" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</el-form-item>
								<el-form-item label="登录账号" prop="username">
									<el-input v-model="newForm.username" placeholder="登录账号"></el-input>
								</el-form-item>
								<el-form-item label="密码" prop="password">
									<el-input v-model="newForm.password" placeholder="登录密码"></el-input>
								</el-form-item>
								<el-form-item label="强制更改密码" prop="force_password">
									<el-radio-group v-model="newForm.force_password">
										<el-radio :label="1">是</el-radio>
										<el-radio :label="0">否</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="resetForm('newForm')">取 消</el-button>
								<el-button type="primary" @click="submitForm('newForm')">创 建</el-button>
							</div>
						</el-dialog>
						<!--编辑用户-->
						<el-dialog title="修改用户" :visible.sync="editUserModalVisible">
							<el-form ref="editForm" :rules="eidtRules" :model="editForm" label-width="100px">
								<el-form-item label="汇报上级" prop="search_val">
									<template>
										<el-autocomplete
											v-model="search_val_edit"
											:fetch-suggestions="querySearch"
											placeholder="请输入姓名"
											@select="searchSelectEdit"
											style="width:100%">
										</el-autocomplete>
										<i class="el-icon-close" v-if="search_val_edit" @click="clearSearch" style="position:absolute;top:12px;right:10px;cursor:pointer;"></i>
									</template>
								</el-form-item>
								<el-form-item label="姓名" prop="realname">
									<el-input v-model="editForm.realname" placeholder="请输入姓名"></el-input>
								</el-form-item>
								<el-form-item label="性别" prop="sex">
									<el-radio-group v-model="editForm.sex">
										<el-radio :label="1">男</el-radio>
										<el-radio :label="2">女</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="工号" prop="office_code">
									<el-input v-model="editForm.office_code" placeholder="请输入工号"></el-input>
								</el-form-item>
								<el-form-item label="部门" prop="department_edit_name">
									<div style="display: inline-block;height: 3em;" v-if="editForm.department_edit_name">{{department_edit_name}}</div>
									<vue-drag-tree :model="data"
										@select="addEditSelect"
										@cancelSelect="addCancelEditSelect"
										:editor="false">
									</vue-drag-tree>
								</el-form-item>
								<el-form-item label="角色" prop="roles">
									<div style="height: 8em;border: 1px solid #E3E3E3; padding: .5em;overflow: scroll;">
										<el-checkbox-group v-model="editForm.roles_id">
											<el-checkbox v-for="role in allRoles" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</el-form-item>
								<el-form-item label="登录账号" prop="username">
									<el-input v-model="editForm.username" placeholder="登录账号"></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="resetEditForm('editForm')">取 消</el-button>
								<el-button type="primary" @click="submitEditForm('editForm')">确 认</el-button>
							</div>
						</el-dialog>
					</el-tab-pane>
					<el-tab-pane label="离职用户" name="second">
					<el-form label-width="100px" label-position="left">
						<el-form-item label="关键字搜索">
							<el-form :inline="true" class="demo-form-inline">
								<el-form-item label=" ">
									<el-input type="text" placeholder="请输入员工姓名" v-model="searchLeave" @keyup.enter.native="getLeaveUserList()">
									<el-button @click="getLeaveUserList()" icon="el-icon-search" class="search-icon" slot="append"></el-button>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary"  class="reset-button" @click="resetLeave">重置</el-button>
						</el-form-item>
						</el-form>
						</el-form-item>
						<div class="search-result" :span="16">
							搜索结果：共计
							<span class="result_num">{{paginDataLeave.total}}</span> 条记录
						</div>
						</el-form>
						<el-table :data="offData"
								  :header-row-class-name='headerClass'
								  v-loading.body="offListLoading" element-loading-text="加载中" style="width:100%;">
							<el-table-column label="序号" type="index">
							</el-table-column>
							<el-table-column property="realname" label="姓名">
							</el-table-column>
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
							<el-table-column property="office_code" label="工号">
							</el-table-column>
							<el-table-column property="report_leader.realname" label="汇报上级">
							</el-table-column>
							<el-table-column property="leave_time" label="离职时间">
							</el-table-column>
							<el-table-column property="status_code.display" label="状态">
							</el-table-column>
						</el-table>
						<el-row class="footer">
							<div class="block">
								<el-pagination
									@size-change="pageChangeLeave"
									@current-change="curChangeLeave"
									:current-page="paginDataLeave.page"
									:page-size="paginDataLeave.per_page"
									layout="total, sizes, prev, pager, next"
									:total.sync="paginDataLeave.total">
								</el-pagination>
							</div>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
    </page-module>
</template>
<script>
import { postUser, systemGet, putUser, getTopOrganizations } from '@/api/system'
// import { getCustomers } from '@/api/client'
import Drag from './drag/drag_module'
export default{
	data() {
		return {
			loading: false,
			data: [],
			activeName: 'first',
			paginData: {
				total: 0,
				per_page: 10,
				page: 1,
				pages: 0
			},
			paginDataLeave: {
				total: 0,
				per_page: 10,
				page: 1,
				pages: 0
			},
			search: '',
			searchLeave: '',
			tableData: [],
			offData: [],
			listLoading: false,
			offListLoading: false,
			newUserModalVisible: false,
			editUserModalVisible: false,
			search_val: null,
			search_val_edit: null,
			search_result: null,
			newForm: {
				report_leader_id: null,
				realname: null,
				sex: null,
				office_code: null,
				department_id: null,
				roles_id: [],
				username: null,
				password: null,
				department_name: null,
				force_password: 1
			},
			department_name: null,
			editForm: {
				report_leader_id: null,
				realname: null,
				sex: null,
				office_code: null,
				department_id: null,
				roles_id: [],
				username: null,
				password: null,
				department_edit_name: null
			},
			department_edit_name: null,
			allRoles: [],
			rules: {
				realname: [
					{ required: true, message: '请输入员工姓名', trigger: 'blur' },
					{ max: 20, message: '姓名不能超过20个字符', trigger: 'blur' }
				],
				sex: [
					{ required: true, message: '请选择员工性别', trigger: 'change' }
				],
				office_code: [
					{ required: true, message: '请输入员工工号', trigger: 'change' },
					{ max: 50, message: '工号不能超过50个字符', trigger: 'blur' }
				],
				department_name: [
					{ required: true, message: '请选择部门', trigger: 'change' }
				],
				roles_id: [
					{ type: 'array', required: true, message: '请选择角色', trigger: 'change' }
				],
				username: [
					{ required: true, message: '请输入账号', trigger: 'change' },
					{ max: 20, message: '账号不能超过20个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'change' },
					{ message: '密码需为6~16位之间的数字或字母的组合', trigger: 'blur',
						validator: (rule, value, callback) => {
							const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
							if (!reg.test(value)) {
								return callback(new Error(rule.message))
							}
							return callback()
						}
					}
				]
			},
			eidtRules: {
				department_edit_name: [
					{ required: true, message: '请选择部门', trigger: 'change' }
				],
				realname: [
					{ required: true, message: '请输入员工姓名', trigger: 'blur' },
					{ max: 20, message: '姓名不能超过20个字符', trigger: 'blur' }
				],
				office_code: [
					{ required: true, message: '请输入员工工号', trigger: 'change' },
					{ max: 50, message: '工号不能超过50个字符', trigger: 'blur' }
				],
				roles_id: [
					{ type: 'array', required: true, message: '请选择角色', trigger: 'change' }
				],
				username: [
					{ required: true, message: '请输入账号', trigger: 'change' },
					{ max: 20, message: '账号不能超过20个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'change' },
					{ min: 6, max: 16, message: '密码需为6~16位之间的数字和字母的组合', trigger: 'submit',
						validator: (rule, value, callback) => {
							const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
							if (!reg.test(value)) {
								return callback(new Error(rule.message))
							}
							return callback()
						}
					}
				]
			},
			userId: null,
			department_id: null
		}
	},
	methods: {
		headerClass({ row, rowIndex }) {
			return 'wms_table_header'
		},
		addSelect(item) {
			this.newForm.department_id = item.id
			this.newForm.department_name = item.name
			this.department_name = item.name
			this.test('newForm', 'department_name')
		},
		addCancelSelect() {
			this.newForm.department_id = null
			this.newForm.department_name = null
			this.department_name = null
		},
		addEditSelect(item) {
			this.editForm.department_id = item.id
			this.editForm.department_edit_name = item.name
			this.department_edit_name = item.name
			this.test('editForm', 'department_edit_name')
		},
		addCancelEditSelect() {
			this.editForm.department_id = null
			this.editForm.department_edit_name = null
			this.department_edit_name = null
		},
		edit(item) {
			// console.log(item)
		},
		select(item) {
			this.department_id = item.id
			this.getUserList()
			this.getLeaveUserList()
		},
		cancelSelect(item) {
			this.department_id = null
			this.getUserList()
			this.getLeaveUserList()
		},
		reset() {
			this.search = ''
			this.getUserList()
		},
		resetLeave() {
			this.searchLeave = ''
			this.getLeaveUserList
		},
		editUser(row) {
			if (row.report_leader_id && row.report_leader) {
				this.search_val_edit = `${row.report_leader.realname} <${row.office_code}>`
			}
			for (const key in this.editForm) {
				this.editForm[key] = row[key]
			}
			this.userId = row.id
			this.editUserModalVisible = true
			// 获取用户角色数据
			this.editForm.roles_id = []
			for (const key in row.roles) {
				this.editForm.roles_id.push(row.roles[key].id)
			}
			this.editForm.department_edit_name = row.department.name
			this.department_edit_name = row.department.name
		},
		deleteUser(row) {
			this.$confirm('删除员工后不可恢复，请确认删除该员工？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				putUser(`${row.id}/leave`).then(res => {
					this.$message({
						type: 'success',
						message: '删除员工成功'
					})
					this.getUserList()
					this.getLeaveUserList()
				}).catch(err => {
					this.$error(err)
				})
			}).catch((e) => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
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
			this.newForm.report_leader_id = item.val
		},
		searchSelectEdit(item) {
			this.editForm.report_leader_id = item.val
		},
		clearSearch() {
			this.search_val = null
			this.search_val_edit = null
		},
		test(formName, field) {
			this.$refs[formName].validateField(field, (error) => {
				if (!error) {
					// console.log('OK')
				} else {
					return false
				}
			})
		},
		submitEditForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 有汇报上级变为无汇报上级情况
					if (!this.search_val_edit) {
						this.editForm.report_leader_id = null
					}
					if (this.editForm.department_id == null) {
						return 	this.$message({
							type: 'info',
							message: '请选择部门!'
						})
					}
					delete this.editForm.department_edit_name
					putUser(this.userId, this.editForm).then(res => {
						this.getUserList()
						this.editUserModalVisible = false
						this.$refs[formName].resetFields()
						this.search_val_edit = null
						this.department_edit_name = null
						this.editForm.department_id = null
					}).catch(err => {
						this.$error(err)
					})
				} else {
					return false
				}
			})
		},
		resetEditForm(formName) {
			this.$refs[formName].resetFields()
			this.search_val_edit = null
			this.editUserModalVisible = false
			this.editForm.department_edit_name = null
			this.department_edit_name = null
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.newForm.department_id == null) {
						return 	this.$message({
							type: 'info',
							message: '请选择部门!'
						})
					}
					delete this.newForm.department_name
					this.loading = !!1
					postUser(this.newForm).then(res => {
						this.getUserList()
						this.$message({
							type: 'success',
							message: '成功添加用户!'
						})
						this.loading = !1
						this.$refs[formName].resetFields()
						this.newForm.department_id == null
						this.department_name = null
						this.search_val = null
						this.initUsers()
					}).catch(err => {
						this.newUserModalVisible = true
						this.loading = !!1
						this.$error(err)
					})
				} else {
					return false
				}
				this.newUserModalVisible = false
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
			this.newForm.report_leader_id = null
			this.newForm.department_id = null
			this.search_val = null
			this.search_val_edit = null
			this.newForm.department_name = null
			this.department_name = null
			this.newUserModalVisible = false
		},
		getUserList() {
			this.listLoading = true
			const filter = {
				realname: {
					action: 'like',
					value: this.search.trim()
				},
				status: 1,
				department_id: this.department_id
			}
			//	去掉null的情况
			if (!this.department_id) {
				delete filter.department_id
			}
			systemGet(`users`, {
				page: this.paginData.page,
				perpage: this.paginData.per_page,
				filter: filter
			}).then(res => {
				this.tableData = res.data
				this.paginData.total = +res.headers['x-pagination-total']
				this.paginData.page = +res.headers['x-pagination-page']
				this.paginData.per_page = +res.headers['x-pagination-per-page']
				this.listLoading = false
			}).catch(err => {
				this.$error(err)
			})
		},
		getLeaveUserList() {
			this.listLoading = true
			const filter = {
				realname: {
					action: 'like',
					value: this.searchLeave.trim()
				},
				status: 2,
				department_id: this.department_id
			}
			if (!this.department_id) {
				delete filter.department_id
			}
			systemGet(`users`, {
				page: this.paginDataLeave.page,
				perpage: this.paginDataLeave.per_page,
				filter: filter
			}).then(res => {
				this.offData = res.data
				this.paginDataLeave.total = +res.headers['x-pagination-total']
				this.paginDataLeave.page = +res.headers['x-pagination-page']
				this.paginDataLeave.per_page = +res.headers['x-pagination-per-page']
				this.listLoading = false
			}).catch(err => {
				this.$error(err)
			})
		},
		pageChange(num) {
			this.paginData.per_page = num
			this.getUserList()
		},
		curChange(page) {
			this.paginData.page = page
			this.getUserList()
		},
		pageChangeLeave(num) {
			this.paginDataLeave.per_page = num
			this.getLeaveUserList()
		},
		curChangeLeave(page) {
			this.paginDataLeave.page = page
			this.getLeaveUserList()
		},
		initData(data) {
			data.forEach(i => {
				this.$set(i, 'show', false)
				this.$set(i, 'selected', false)
				this.$set(i, 'select_show', false)
				i['__has_sub'] = i.has_sub
			})
			return data
		},
		initUsers() {
			const filter = {
				status: 1
			}
			systemGet(`users?filter=${JSON.stringify(filter)}`).then(res => {
				this.search_result = this.filter(res.data)
			})
		}
	},
	components: {
		Drag
	},
	created() {
		systemGet(`roles?perpage=10000`).then(res => {
			this.allRoles = res.data
		})
		this.initUsers()
		this.getUserList()
		this.getLeaveUserList()
		//	获取机构
		getTopOrganizations().then(res => {
			this.data = this.initData(res.data)
			this.cancel_drop = res.data.slice()
		})
	}
}
</script>
<style lang="scss" scoped>
.el-checkbox{
	width: 8em;
	margin-left: 15px;
}
.cur {
	cursor: pointer;
	color:#409EFF;
	font-size: 1.2em;
}
.footer {
	margin-top: 30px;
	margin-bottom: 30px;
	text-align: right;
}
.add {
	cursor: pointer;
	position: absolute;
	right: 10px;
	bottom: 5px;
	color: #53E69D;
	font-size: 30px;
	.add_word {
		font-size: 14px;
		color: #333;
		display: inline-block;
		vertical-align: middle;
		margin-left: 10px;
	}
}

</style>
