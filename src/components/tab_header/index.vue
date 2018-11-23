<template>
	<section>
		<div class="sec_bottom">
			<span class="sec_title">{{title}}
			</span>
			<span class="sub_title">{{sub_title}}</span>
			<i class="el-icon-circle-plus add" v-if="is_icon_show" @click="add"></i>
			<i class="el-icon-edit add" v-if="is_edit_icon_show" @click="add"></i>
		</div>
		<slot></slot>
	</section>
</template>
<script>
export default{
	props: {
		title: {
			type: String,
			default: '模块标题',
			required: true
		},
		is_icon_show: {
			default: true,
			type: Boolean
		},
		is_edit_icon_show: {
			default: false,
			type: Boolean
		},
		sub_title: {
			type: String
		}
	},
	data() {
		return {
		}
	},
	methods: {
		add() {
			this.$emit('add')
		}
	}
}
</script>
<style scoped>
.sec_title{
	display: inline-block;
	border-radius: 4px 4px 0 0;
	padding: 5px 8px;
	background: #7E86A6;
	color: #FFFFFF;
	font-size: .9em;
}
.sec_bottom{
	position: relative;
	margin-top: 1em;
	border-bottom: 1px solid #959EC1;
	margin-bottom: 10px;
}
.add{
	cursor: pointer;
	position: absolute;
	right: 10px;
	bottom: 5px;
	color: #53E69D;
	font-size:1.5em;
}
.sub_title{
	color: #333333;
	font-size: .9em;
}
</style>
