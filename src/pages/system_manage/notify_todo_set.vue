<template>
	<page-module>
		<el-tabs v-model="activeName">
			<el-tab-pane label="待办事项" name="first">
				<info-set type="backlogs"></info-set>
				
			</el-tab-pane>
			<el-tab-pane label="消息提醒" name="second">
				<info-set type="notices"></info-set>
			</el-tab-pane>
		</el-tabs>
	</page-module>
</template>
<script>
import InfoSet from '@/components/info_set'

export default {
	components: {
		InfoSet
	},
	data() {
		return {
			activeName: 'first'
		}
	}
}
</script>
