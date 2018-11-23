<template>
	<section>
		<div style="text-align: right;" v-if="button_show">
			<router-link v-if="add_auth" to="/client_center/add_client?type=1">
				<el-button plain >新增项目</el-button>
			</router-link>
		</div>
		<el-row>
			<el-col :span="6" class="block">
				<el-row class="inner">
					<el-col :span="8">
						<img class="category_img" src="../../../static/images/onsale.png" alt="onsale"/>
					</el-col>
					<el-col :span="16">
						<p class="name">诊改项目数</p>
						<p class="num">29</p>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="6" class="block">
				<el-row class="inner">
					<el-col :span="8">
            <icon-svg icon-class="renwu"></icon-svg>
					</el-col>
					<el-col :span="16">
						<p class="name">任务数</p>
						<!--<p class="num">{{total_data.customer}}</p>-->
            <p class="num">496</p>

          </el-col>
				</el-row>
			</el-col>
			<el-col :span="6" class="block">
				<el-row class="inner">
					<el-col :span="8">
            <icon-svg icon-class="jiankong"></icon-svg>
					</el-col>
					<el-col :span="16">
						<p class="name">监测点数</p>
						<p class="num">1,584</p>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="6" class="block">
				<el-row class="inner">
					<el-col :span="8">
            <icon-svg icon-class="baogao1"></icon-svg>
          </el-col>
					<el-col :span="16">
						<p class="name">诊改报告数</p>
						<p class="num">{{total_data.info}}</p>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</section>
</template>
<script>
export default{
	props: {
		total_data: {
			required: true,
			type: Object
		},
		button_show: {
			type: Boolean,
			default: true

		}
	},
	data() {
		return {}
	},
	created() {
		//todo 根据权限展示不同动作太呢荣
		const permissions = this.$store.getters.user_info.permissions
		if (permissions) {
			this.add_auth = permissions.includes('route-add_costomer-73')
			this.subscribe_auth = permissions.includes('menu-sale_manage_center-6')
			this.order_auth = permissions.includes('menu-sale_manage_center-7')
			this.progress_auth = permissions.includes('field-view_product_progress-35')
			this.go_to_subscribe = permissions.includes('menu-sale_manage_center-6')
			this.go_to_buy = permissions.includes('menu-sale_manage_center-8')
		}
	}
}
</script>
<style lang="scss" scoped>
.block{
	padding:10px;
	padding-right:0;
	.inner{
		border: 1px solid #E3E3E3;
		padding:20px;
		color:#333333;
		height: 80px;
    svg {
      width: 40px;
      height: 40px;
    }
		.name{
			font-size: 14px;
			text-align: right;
			margin-bottom: 5px;
		}
		.num{
			font-size: 24px;
			color: #000;
			font-weight: 600;
			text-align: right;
		}
		.category_img{
			width: 40px;
		}
	}
}
</style>
