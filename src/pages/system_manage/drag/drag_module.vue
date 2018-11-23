<template>
    <div class="module">
        <div class="btn_wrap">
            <button class="add_dep" @click="add_department = !!1"><i class="el-icon-plus"></i> 新增部门</button>
            <button class="delete_dep" @click="deleteDepartment"><i class="el-icon-delete"></i> 删除部门</button>
        </div>
        <div class="btn_wrap" align="right" style="margin-top:20px;" v-if="droped">
            <el-button type="success" size="mini" @click="saveDrop"><i class="el-icon-check"></i> 保存组织架构</el-button>
            <el-button type="danger" size="mini" @click="cancelDrop">取消</el-button>
        </div>
        <vue-drag-tree :model="data" 
        @edit="edit"
        @select="select"
        @cancelSelect="cancelSelect"
        @userDrop="triggerDrop"></vue-drag-tree>
        <el-dialog title="新增部门" :visible.sync="add_department">
            <el-form label-width="100px" ref="addDepartment" :rules="add_department_rules" :model="department">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="department.name" type="text" placeholder="请输入部门名称" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="直属上级" prop="parent">
                    <vue-drag-tree :model="data"
                    @select="addSelect"
                    @cancelSelect="addCancelSelect"
                    :editor="false"></vue-drag-tree>
                </el-form-item>
                <el-form-item align="right">
                    <el-button type="primary" @click="addDepartment">确认</el-button>
                    <el-button @click="add_department=!1">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="修改部门" :visible.sync="edit_department">
            <el-form label-width="100px" ref="addDepartment" :rules="add_department_rules" :modal="edit_department_info">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="edit_department_info.name" type="text" placeholder="请输入部门名称" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="直属上级" prop="parent">
                    <template v-if="edit_department_info.parent">
                        {{edit_department_info.parent.name}}
                    </template>
                    <vue-drag-tree :model="data"
                    @select="editSelect"
                    @cancelSelect="editCancelSelect"
                    :editor="false"></vue-drag-tree>
                </el-form-item>
                <el-form-item align="right">
                    <el-button type="primary" @click="editDepartment">确认</el-button>
                    <el-button @click="edit_department=!1">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import { getTopOrganizations, putReconstruct, deleteOrganizations, postOrganizations, putOrganizations } from '@/api/system'
    export default {
    	data() {
    		return {
    			data: [],
    			add_department: false,
    			edit_department: false,
    			department: {},
    			add_department_rules: {
    				name: [
    					{ required: true, message: '请输入部门名称', trigger: 'submit' }
    				]
    			},
    			droped: false,
    			drop_ret: [],
    			cancel_drop: [],
    			children_cancel: [],
    			select_item: null,
    			add_select_item: null,
    			edit_select_item: null,
    			edit_department_info: {}
    		}
    	},
    	methods: {
    		initData(data) {
    			data.forEach(i => {
    				this.$set(i, 'show', false)
    				this.$set(i, 'selected', false)
    				this.$set(i, 'select_show', false)
    				i['__has_sub'] = i.has_sub
    			})
    			return data
    		},
    		edit(item) {
    			this.edit_department_info = Object.assign({}, item)
    			this.edit_department_data = item
    			this.edit_department = true
    		},
    		select(item) {
    			this.$emit('select', item)
    			this.select_item = item
    		},
    		cancelSelect(item) {
    			this.select_item = null
    			this.$emit('cancelSelect', item)
    		},
    		triggerDrop() {
    			this.droped = !!1
    		},
    		findDroped(rootData) {
    			let i = 0
    			for (; i < rootData.length; i++) {
    				if (rootData[i].droped) {
    					const push = {
    						id: rootData[i].id,
    						order: i
    					}
    					if (rootData[i].parent) {
    						push.parent_id = rootData[i].parent.id
    					} else {
    						push.parent_id = -1
    					}
    					this.drop_ret.push(push)
    				} else if (rootData[i].children && rootData[i].children.length > 0) {
    					this.findDroped(rootData[i].children)
    				}
    			}
    		},
    		saveDrop() {
    			this.findDroped(this.data)
    			putReconstruct({
    				changes: this.drop_ret
    			}).then(res => {
    				this.droped = false
    				this.drop_ret.length = 0
    				return location.reload()
    			})
    		},
    		cancelDrop() {
    			this.data = this.cancel_drop.slice()
    			this.restoreDrop(this.data)
    			this.droped = !1
    		},
    		restoreDrop(data) {
    			data.forEach(i => {
    				if (i.__children) {
    					i.children = i.__children.slice()
    					i.has_sub = i.__has_sub
    					i.parent = i.__parent
    					i.show = false
    					this.restoreDrop(i.__children)
    				}
    				i.droped = false
    			})
    		},
    		deleteDepartment() {
    			const item = this.select_item
    			if (!item) {
    				return this.$message('请选择部门')
    			}
    			if (item.has_user) {
    				return this.$message('该部门下有员工，不可删除！')
    			}
    			if (item.has_sub || item.children && item.children.length > 0) {
    				return this.$message('该部门下有子部门，不可删除！')
    			}
    			this.$confirm(`确认删除${item.name}部门`, '确认框', {
    				confirmButtonText: '确定',
    				cancelButtonText: '取消',
    				type: 'warning'
    			}).then(() => {
    				deleteOrganizations(item.id).then(res => {
    					return location.reload()
    				})
    			}).catch(() => {
    
    			})
    		},
    		addDepartment() {
    			this.$refs.addDepartment.validate(i => {
    				if (!i) return this.$message('请输入必填选项')
    				const data = {
    					name: this.department.name,
    					parent_id: -1,
    					order: this.data.length
    				}
    				const item = this.add_select_item
    				if (item) {
    					data.parent_id = this.add_select_item.id
    					if (item.parent) {
    						data.order = item.parent.children.length
    					} else {
    						data.order = this.data.length
    					}
    				}
    				postOrganizations(data).then(res => {
    					// let i = res.data
    					// this.$set(i, 'show', false)
    					// this.$set(i, 'select_show', false)
    					// this.$set(i, 'selected', false)
    					// this.$set(i, '__has_sub', false)
    					// this.$set(i, 'has_sub', false)
    					// if(i){
    					//     if(!i.children){
    					//         this.$set(i, 'children',[])
    					//     }
    					//     i.children = i.children.push(i)
    					//     this.$set(i, 'has_sub', true)
    					//     this.$set(i, '__has_sub', true)
    					//     this.data.splice()
    					//     i.parent = i
    					//     i.__parent= i
    					// }else{
    					//     this.data.push(i)
    					// }
    					// this.add_department = !1
    					// this.department.name = ''
    					return location.reload()
    				})
    			})
    		},
    		addSelect(item) {
    			this.add_select_item = item
    		},
    		addCancelSelect() {
    			this.add_select_item = null
    		},
    		editDepartment() {
    			const data = {
    				name: this.edit_department_info.name,
    				parent_id: this.edit_department_info.parent_id
    			}
    			if (this.edit_select_item) {
    				data.parent_id = this.edit_select_item.id
    			}
    			putOrganizations(this.edit_department_info.id, data).then(res => {
    				Object.assign(this.edit_department_data, res.data)
    				this.edit_department = !1
    				return location.reload()
    			}).catch(err => {
    				this.$error(err)
    			})
    		},
    		editCancelSelect() {
    			this.edit_select_item = null
    		},
    		editSelect(item) {
    			this.edit_select_item = item
    		}
    	},
    	created() {
    		getTopOrganizations().then(res => {
    			this.data = this.initData(res.data)
    			this.cancel_drop = res.data.slice()
    		})
    	}
    }
</script>
<style scoped>
.btn_wrap{
    margin-left:20px;
}
.add_dep,.delete_dep{
    background: #fff;
    -webkit-appearance: none;
    padding:5px;
    border-radius: 0;
    font-size: 14px;
    cursor: pointer;
    outline: none;
}
.delete_dep{
    margin-left:6px;
}
.module{
    margin-top:10px;
    margin-right:10px;
}
.department_select{
    line-height: 1;
}
</style>
