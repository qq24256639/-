<template>
	<section v-loading.fullscreen="loading" element-loading-text="加载中">
		<el-form ref="form" :model="form" label-width="100px" label-position="left">
			<el-form-item label="关键字搜索">
				<el-form :inline="true">
					<el-form-item label="">
						<el-input type="text" placeholder="搜索关键字" v-model="search" @keyup.enter.native="getClients">
							<el-button @click="getClients" icon="el-icon-search" slot="append"></el-button>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="reset-button" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</el-form-item>
			<div class="search-result">搜索结果：共计
				<span class="result_num">{{paginData.total}}</span> 条记录
			</div>
		</el-form>
		<el-table ref="singleTable" :data="tableData" element-loading-text="加载中">
			<el-table-column type="index" label="序号" align="center" >
			</el-table-column>
			<el-table-column property="realname" label="姓名" >
			</el-table-column>
			<el-table-column property="department.name" label="部门" >
			</el-table-column>
			<el-table-column property="roles" label="角色" >
                <template slot-scope="scope">
                    <template v-for="i in scope.row.roles">
                        {{i.name}}&nbsp;
                    </template>
                </template>
			</el-table-column>
			<el-table-column property="office_code" label="工号" >
			</el-table-column>
			<el-table-column property="report_leader.realname" label="汇报上级">
			</el-table-column>
			<el-table-column label="入职时间" property="entry_time"></el-table-column>
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
	</section>
</template>
<script>
    import { getUsers } from '@/api/system'
export default {
	data() {
		return {
			search: '',
			activeName: 'products',
			form: {},
			paginData: {
				total: 0,
				per_page: 10,
				page: 1,
				pages: 0
			},
			tableData: [],
			defaultData: [],
			loading: false
		}
	},
	methods: {
		reset() {
			this.paginData.page = 1
			this.paginData.per_page = 10
			this.search = ''
			this.searchDate = null
			this.getClients()
		},
		curChange(page) {
			this.paginData.page = page
			this.getClients()
		},
		pageChange(num) {
			this.paginData.per_page = num
			this.getClients()
		},
		getClients() {
			this.loading = true
			const filter = {
				realname: {
					action: 'like',
					value: this.search.trim()
				}
			}
			return getUsers(this.userData.id, {
				page: this.paginData.page,
				perpage: this.paginData.per_page,
				filter: JSON.stringify(filter)
			}).then(res => {
				this.paginData.total = +res.headers['x-pagination-total']
				this.paginData.pages = +res.headers['x-pagination-pages']
				this.paginData.per_page = +res.headers['x-pagination-per-page']
				this.tableData = res.data
    				this.loading = false
    				this.$emit('total', this.paginData.total)
			})
		}
    	},
    	props: {
    		userData: {
    			required: true
    		}
    	},
    	watch: {
    		userData(val) {
    			this.getClients()
    		}
    	}
}
</script>
<style scoped>
	.cur {
		cursor: pointer;
	}
	.hide{
		display: none;
	}
	.section{
		padding-left:15px;
		padding-top: 10px;
	}
</style>

