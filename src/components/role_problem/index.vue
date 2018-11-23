<template>
	<div class="problem_wrap">
        <template v-if="roleShowData.type === 'checkbox'">
            <el-checkbox-group v-model="roleShowData.select_ret" @change="change">
                <el-checkbox v-for="(i, n) in roleShowData.permissions" :key="n" :label="i.id">{{i.name}}</el-checkbox>
            </el-checkbox-group>
        </template>
        <template v-else>
            <el-radio-group v-model="roleShowData.select_ret" @change="change">
                <el-radio v-for="(i, n) in roleShowData.permissions" 
                :key="n" 
                :label="i.id" 
                @click.native="radioChange">{{i.name}}</el-radio>
            </el-radio-group> 
        </template>
	</div>
</template>
<script>
export default{
	name: 'RoleProblem',
	props: {
		roleShowData: {
			type: Object,
			required: true
		}
	},
	methods: {
		radioChange(e) {
			const val = e.target.value
			if (!val) return
			if (+val === this.changed) {
				this.roleShowData.select_ret = this.changed = null
				return this.$emit('change')
			}
			this.changed = +val
		},
		change(e) {
			this.$emit('change')
		}
	},
	data() {
		return {
			changed: null
		}
	},
	created() {
		if (this.roleShowData.type !== 'checkbox' && this.roleShowData.select_ret) {
			this.changed = this.roleShowData.select_ret
		}
	}
}
</script>
<style scoped>
    .problem_wrap{
        border-left: 1px solid #eee;
    }
    .el-checkbox,.el-radio{
        margin-left: 15px;
        line-height: 36px;
    }
</style>
