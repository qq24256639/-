<template>
	<scroll-bar>
		<el-row id="logo">
			<router-link to="/">
				<img v-if="!isCollapse" src="static/images/logo_bcyz_white.png" alt="白城医专教学诊断与改进平台"/>
				<img v-else src="static/images/bcyz_mini.png" alt="白城医专教学诊断与改进平台" class="min_logo">
			</router-link>
		</el-row>
		<el-menu mode="vertical" ref="menu" :default-active="this.$route.path" :collapse="isCollapse" unique-opened @open="handleOpen">
			<h2 class="side_nav" v-if="!isCollapse">导航</h2>
			<sidebar-item :routes='permission_routers'></sidebar-item>
		</el-menu>
	</scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '../scroll_bar'
export default {
	components: { SidebarItem, ScrollBar },
	computed: {
		...mapGetters([
			'permission_routers',
			'sidebar'
		]),
		isCollapse() {
			return !this.sidebar.opened
		}
	},
  methods: {
    handleOpen(index, indexPath) {
      // 设置头部路由
      this.$store.commit('SET_NAV', this.permission_routers[index])
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables.scss";
.side_nav{
	margin:0 20px;
	text-align: left;
	font-size: 12px;
	color: #999999;
	letter-spacing: 0.03px;
	margin-top: 14px;
	margin-bottom: 6px;
}
.el-menu {
	min-height: 100%;
	z-index: 9;
	padding-right: 12px;
	box-sizing: border-box;
	margin-top: 50px;
}
#logo {
	height: 50px;
	text-align: center;
	margin:0 auto;
	left:0;
	background: $navbar;
	position: fixed;
	top:0;
	z-index:999;
	width: 220px;
}
#logo img {
	line-height: 50px;
	max-height: 50px;
	text-align: center;
}
.el-menu--collapse .side_nav {
	display: none;
}
.hideSidebar{
	#logo{
		width: 36px;
	}
}
.min_logo{
  margin-top: 10px;
	width: 30px;
	text-align: left;
}
</style>
