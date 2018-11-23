<template>
	<el-breadcrumb class="app-levelbar" separator=" > ">
		<el-breadcrumb-item style="cursor: pointer;" v-for="(item,index)  in levelList" :key="item.path">
			<router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' :to="getLoca()" class="no-redirect">{{item.name || item.meta.title}}</router-link>
			<router-link v-else :to="item.redirect||item.path">{{item.name || item.meta.title}}</router-link>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
export default {
	created() {
		this.getBreadcrumb()
	},
	data() {
		return {
			levelList: null
		}
	},
	methods: {
		getLoca() {
			return location.hash.replace('#', '')
		},
		getBreadcrumb() {
			let matched = this.$route.matched.filter(item => item.name || item.meta.title)
			const first = matched[0]
			if (first && (first.name !== 'Home' || first.path !== '')) {
				matched = [{ name: '诊改工作台', path: '/' }].concat(matched)
			}
			this.levelList = matched
		}
	},
	watch: {
		$route() {
			this.getBreadcrumb()
		}
	}
}
</script>

<style lang="scss" scoped>
	.app-levelbar.el-breadcrumb {
		font-size: 14px;
		line-height: 46px;
		height: 30px;
		padding-left: 10px;
		.no-redirect {
			color: #616161;
			cursor: text;
			font-weight: normal;
		}
	}
	a{
		font-size: 12px;
		color: #616161;
		letter-spacing: 0.03px;
		line-height: 46px;
	}
</style>
