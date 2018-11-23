<template>
	<page-module :blank="true" v-loading.fullscreen="loading" element-loading-text="加载中">
		<el-table
			class="table_header"
			:data="set_list"
			:header-row-class-name='headerClass'>
			<el-table-column prop="action" label="操作" align="center">
			</el-table-column>
			<el-table-column prop="recipient_type_code.display" label="接收人类型">
			</el-table-column>
			<el-table-column prop="recipient_name" label="接收人">
			</el-table-column>
			<el-table-column prop="title" label="消息标题">
			</el-table-column>
			<el-table-column prop="template" label="待办内容">
			</el-table-column>
			<el-table-column prop="m_type_code.display" label="消息类型">
				<template slot-scope="scope">
					<el-tag type="warning">
						{{scope.row.m_type_code.display}}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="操作">
				<template slot-scope="scope">
					<i @click="openDialog(scope.row)" class="el-icon-edit-outline edit"></i>
				</template>
			</el-table-column>
			<el-table-column prop="enabled" label="开关">
				<template slot-scope="scope">
					<el-switch
						v-model="scope.row.enabled"
						active-color="#13ce66"
						inactive-color="#ff4949"
						@change='openChange(scope)'>
					</el-switch>
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
					layout="sizes, prev, pager, next"
					:total.sync="paginData.total">
				</el-pagination>
			</div>
		</el-row>
		<el-dialog
			title="修改接收人"
			:visible.sync="dialogVisible"
			width="60%">
			<el-row>
				<el-col :span="3">
					<span>接收人类型：</span>
				</el-col>
				<el-col :span="9">
					<el-select
						v-model="receiver_type"
						@change="handleItemChange">
						<el-option
							v-for="item in options"
							:value="item.value"
							:key="item.value"
							:label="item.label"
							>
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="2" :offset="1">
					<span>接收人：</span>
				</el-col>
				<el-col :span="9">
					<vue-drag-tree
						v-if="receiver_type === 3"
						:model="data"
						@select="select"
						@cancelSelect="cancelSelect"
						:editor="false">
					</vue-drag-tree>
					<el-select
						v-else
						v-model="receiver">
						<el-option
							v-for="item in sub_options"
							:value="item.id"
							:key="item.id"
							:label="item.name">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="reset">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</span>
		</el-dialog>
	</page-module>
</template>
<script>
import { getSet, putSet } from '@/api/notify'
import { getTopOrganizations, getRoles } from '@/api/system'
import Drag from '../../pages/system_manage/drag/drag_module'

export default{
	props: {
		type: {
			type: String,
			default: 'backlogs',
			required: true
		}
	},
	data() {
		return {
			loading: false,
			paginData: {
				total: 0,
				per_page: 10,
				page: 1,
				pages: 0
			},
			set_list: [],
			dialogVisible: false,
			options: [{
				value: 1,
				label: '所有用户'
			}, {
				value: 2,
				label: '角色'
			}, {
				value: 3,
				label: '部门'
			}, {
				value: 4,
				label: '发起人/归属人'
			}],
			sub_options: [],
			receiver_type: 1,
			receiver: null,
			roles: null,
			data: [],
			item_id: null
		}
	},
	created() {
		this.setLists()
		getRoles().then(res => {
			res.data.forEach(i => {
				this.$set(i, 'selected', false)
			})
			this.roles = res.data
		}).catch(err => {
			this.$error(err)
			this.loading = false
		})
		//	获取机构
		getTopOrganizations().then(res => {
			this.data = this.initData(res.data)
			this.cancel_drop = res.data.slice()
		}).catch(err => {
			this.$error(err)
			this.loading = false
		})
	},
	components: {
		Drag
	},
	methods: {
		headerClass({ row, rowIndex }) {
			return 'wms_table_header'
		},
		curChange(page) {
			this.paginData.page = page
			this.setLists()
		},
		pageChange(num) {
			this.paginData.per_page = num
			this.setLists()
		},
		setLists() {
			this.loading = true
			return getSet(`${this.type}`, {
				page: this.paginData.page,
				perpage: this.paginData.per_page
			}).then(res => {
				this.set_list = res.data
				this.paginData.total = +res.headers['x-pagination-total']
				this.paginData.pages = +res.headers['x-pagination-pages']
				this.paginData.per_page = +res.headers['x-pagination-per-page']
				this.loading = false
			}).catch(err => {
				this.loading = false
				this.$error(err)
			})
		},
		openChange(scope) {
			if (!!scope.row.enabled === true) {
				putSet(`${scope.row.id}/enable`).then(() => {
					this.setLists()
				}).catch(err => {
					this.$error(err)
					this.loading = false
				})
			} else {
				putSet(`${scope.row.id}/disable`).then(() => {
					this.setLists()
				}).catch(err => {
					this.$error(err)
				})
			}
		},
		openDialog(scope) {
			this.dialogVisible = true
			this.item_id = scope.id
		},
		handleItemChange() {
			if (this.receiver_type === 2) {
				this.sub_options = this.roles
				this.receiver = this.roles[this.roles.length - 1].id
			}
			if (this.receiver_type === 1 || this.receiver_type === 3 || this.receiver_type === 4) {
				this.receiver = null
				this.sub_options = null
			}
		},
		//	department part begin
		select(item) {
			this.receiver = item.id
		},
		cancelSelect(item) {
			this.receiver = null
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
		//	department part end
		submit() {
			const params = {
				recipient_type: this.receiver_type,
				recipient_value: this.receiver
			}
			if (this.receiver === null) {
				delete params.recipient_value
			}
			putSet(`${this.item_id}/recipient`, params).then(() => {
				this.setLists()
				this.reset()
				this.dialogVisible = false
			}).catch(err => {
				this.$error(err)
				this.loading = false
			})
		},
		reset() {
			this.receiver = null
			this.receiver_type = 1
			this.dialogVisible = false
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.edit{
	font-size: 24px;
	cursor: pointer;
}
.el-icon-close:before {
	content: "\E60F";
	display: none;
}
</style>
