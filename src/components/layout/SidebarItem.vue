<template>
	<div class="menu-wrapper">
		<template v-for="(item, n) in routes">
			<router-link
			v-if="!item.hidden&&!item.top&&item.noDropdown&&item.children.length>0"
			:to="item.path+'/'+item.children[0].path"
			:key="n">
				<el-menu-item :index="item.path+'/'+item.children[0].path">
					<icon-svg v-if='item.icon' :icon-class="item.icon" />
					<span class="title">{{item.children[0].name}}</span>
				</el-menu-item>
			</router-link>
			<el-submenu :index="String(n)" v-if="!item.noDropdown&&!item.hidden" :key="n">
				<template slot="title">
					<icon-svg v-if='item.icon' :icon-class="item.icon" />
					<span>{{item.name}}</span>
				</template>
				<template v-for="(child, n) in item.children" v-show='!child.hidden&&!child.top'>
					<sidebar-item
						class='menu-indent'
						v-if='child.children&&child.children.length>0'
						:routes='[child]'
						:key="n">
					</sidebar-item>
					<router-link
						v-else class="menu-indent"
						:to="item.path+'/'+child.path"
            v-show='!child.hidden&&!child.top'
						:key="n">
						<el-menu-item :index="item.path+'/'+child.path">
							<span>{{child.name}}</span>
						</el-menu-item>
					</router-link>
				</template>
			</el-submenu>
		</template>
	</div>
</template>
<script>
export default {
	name: 'SidebarItem',
	props: {
		routes: {
			type: Array
		}
	}

}
</script>

<style lang="scss" scoped>
</style>

