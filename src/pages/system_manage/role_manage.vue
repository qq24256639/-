<template>
	<page-module v-loading.fullscreen="loading" element-loading-text="加载中">
		<el-row>
			<el-col :span="6">
				<tab-header title="可选角色" :is_icon_show="add_role_auth" @add="add"></tab-header>
				<ul class="role_table">
					<li v-for="(i, n) in roleArray" :key="n" @click="selectRole(i)" :class="{selected:i.selected}">{{i.name}}</li>
				</ul>
			</el-col>
			<el-col :span="17" style="position:relative;margin-top:4px;">
				<div class="operation" v-if="active_name==='first'&&getRoleChange">
					<el-button type="success" size="mini" plain @click="roleSave">保存</el-button>
					<el-button type="danger" plain size="mini" @click="deleteRoles">删除</el-button>
				</div>
				<el-tabs v-model="active_name" style="padding-left:15px;">
					<el-tab-pane label="权限配置" name="first">
						<ul class="permissions_table">
							<li v-for="(i, n) in permissions_table" :key="n">
								<el-col :span="3">
									{{i.name}}
								</el-col>
								<el-col :span="21" class="colm">
									<div :span="4" :key="w" class="row_select_wrap" v-for="(e, w) in i.functions">
										<el-col :span="4" :key="w">
											<p>{{e.name}}</p>
										</el-col>
										<el-col :span="20">
											<role-problem :roleShowData="e" @change="change"></role-problem>
										</el-col>
									</div>
								</el-col>
							</li>
						</ul>
					</el-tab-pane>
					<el-tab-pane :label="total_num" name="second">
						<user-list :userData="select_item" @total="totalNum"></user-list>
					</el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
		<el-dialog title="新建角色" :visible.sync="dialog_form_visible" label-width="100px">
			<el-form :model="form" :rules="role_rules" label-width="100px" ref="form">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model.trim="form.name" auto-complete="off" type="text" :maxlength="10"></el-input>
				</el-form-item>
				<el-form-item label="职能描述" prop="description">
					<el-input v-model="form.description" type="text" :maxlength="20"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('form')">取 消</el-button>
				<el-button type="primary" @click="addSaveRole('form')">确 定</el-button>
			</div>
		</el-dialog>
	</page-module>
</template>
<script>
import { postRoles, getRoles, getPermission, postPermission, deleteRoles } from '@/api/system'
import RoleProblem from '@/components/role_problem'
import UserList from './user_role_list'
import { mapGetters } from 'vuex'
export default{
	data() {
		return {
			active_name: 'first',
			dialog_form_visible: false,
			form: {
				name: null,
				description: null
			},
			total_num: '关联用户[0]',
			permissions_table: [],
			roleArray: [],
			loading: false,
			role_rules: {
				name: [
					{ required: true, message: '请输入角色名称', trigger: 'blur' }
				]
			},
			select_item: null,
			add_role_auth: false
		}
	},
	methods: {
		totalNum(val) {
			this.total_num = `关联用户[${val}]`
		},
		add() {
			this.dialog_form_visible = true
		},
		roleSave(lable) { // lable 代表是否需要更新返回的权限数据 true 是不需要
			if (!this.select_item) return this.$message('请选择角色')
			const ret = []
			this.permissions_table.forEach(i => {
				i.functions.forEach(e => {
					const label = e.select_ret
					const type = Array.isArray(label)
					if (type && label.length) {
						ret.push(...label)
					}
					if (!type && label) {
						ret.push(label)
					}
				})
			})
			this.loading = !!1
			return postPermission(this.select_item.id, {
				permissions: ret
			}).then(res => {
				this.loading = !1
				this.$message({
					type: 'success',
					message: '保存成功'
				})
				if (lable !== false) {
					this.setInitPermission(res.data)
				}
				return res
			}).catch(err => {
				this.loading = !!1
				this.$error(err)
			})
		},
		addSaveRole(formName) {
			this.$refs[formName].validate(i => {
				if (!i) return this.$message('红色字段为必填项')
				const data = Object.assign({}, this.form)
				this.loading = !!1
				postRoles(data).then(res => {
					this.roleArray.push(res.data)
					this.dialog_form_visible = false
					this.$refs[formName].resetFields()
					this.loading = !1
				}).catch(err => {
					this.loading = !1
					this.$error(err)
				})
			})
		},
		cancel(formName) {
			this.dialog_form_visible = false
			this.$refs[formName].resetFields()
		},
		deleteRoles() {
			if (!this.select_item) return this.$message('请选择角色')
			this.$confirm('删除角色后不可恢复，请确认删除角色？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.loading = !!1
				deleteRoles(this.select_item.id).then(res => {
					const index = this.roleArray.findIndex(i => i === this.select_item)
					this.roleArray.splice(index, 1)
					this.$message({
						type: 'success',
						message: '删除角色成功'
					})
					this.loading = !1
				}).catch(err => {
					this.loading = !1
					this.$error(err)
				})
			}).catch((e) => {
				// this.$message({
				// 	type: 'info',
				// 	message: '已取消删除'
				// })
			})
		},
		selectRole(i) {
			if (this.select_item && this.getRoleChange) { // 存在未保存的权限选择
				return this.$confirm('角色权限尚未保存是否要保存', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(res => {
					this.roleSave(false).then(res => {
						this.getPermission(i)
					})
				}).catch(() => {
					this.getPermission(i)
				})
			}
			this.getPermission(i)
		},
		setInitPermission(arr) {
			this.permissions_table.length = 0
			arr.forEach(i => {
				i['functions'].forEach(i => {
					this.$set(i, 'select_ret', null)
					const type = i['permissions'][0].input
					const select_item = i['permissions'].filter(i => {
						if (i.is_selected) return i.id
					}).map(i => {
						return i.id
					})
					i['type'] = type
					if (type === 'checkbox') {
						i.select_ret = select_item
					} else {
						i.select_ret = select_item[0]
					}
				})
			})
			this.permissions_table = this.permissions_table.concat(arr)
			this.$store.commit('setRuleRole', arr)
		},
		getPermission(item) {
			if (this.select_item) {
				this.select_item.selected = !1
			}
			this.loading = !!1
			this.select_item = item
			item.selected = !!1
			getPermission(item.id).then(res => {
				this.setInitPermission(res.data)
				this.loading = !1
			}).catch(err => {
				this.loading = !1
				this.$error(err)
			})
		},
		change() {
			this.$store.commit('roleChange', this.permissions_table)
		}
	},
	computed: {
		getRoleChange() {
			return this.role_change.change
		},
		...mapGetters(['role_change'])
	},
	components: {
		RoleProblem,
		UserList
	},
	created() {
		if (this.$range()) {
			this.add_role_auth = this.$range('route-post_role_permission-91')
		}
		this.loading = !!1
		getRoles().then(res => {
			res.data.forEach(i => {
				this.$set(i, 'selected', false)
			})
			this.roleArray = this.roleArray.concat(res.data)
			this.selectRole(res.data[0])
			this.loading = !1
		}).catch(err => {
			this.$error(err)
			this.loading = !1
		})
	}
}
</script>
<style scoped lang="scss">
	.role_table li{
		border-bottom: 1px solid #eee;
		line-height: 34px;
		padding-left: 10px;
		cursor: pointer;
		font-size: 16px;
		&.selected{
			background: #eef0f5;
		}
	}
	.permissions_table{
		overflow: hidden;
		font-size: 14px;
		border-top: 1px solid #eee;
		min-height: 200px;
		& li{
			overflow: hidden;
			border: 1px solid #eee;
			border-top: none;
			line-height: 40px;
			padding-left: 10px;
		}
	}
	.colm{
		border-left: 1px solid #eee;
		/* border-right: 1px solid #eee; */
	}
	.row_select_wrap{
		padding-left: 10px;
		border-bottom: 1px solid #eee;
		overflow: hidden;
	}
	.colm>.row_select_wrap:last-child{
		border: none;
	}
	.operation{
		position: absolute;
		right: 10px;
		top: 4px;
		z-index: 1;
	}
	section.p_module{
		padding-bottom: 50px;
	}
</style>
