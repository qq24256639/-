<template>
    <div class="gray-page" v-loading.fullscreen="loading" element-loading-text="加载中">
      <kanban-board></kanban-board>
    </div>
</template>
<script>

export default{
	props: {
	},
	components: {
	},
  methods: {
  },
	data() {
		return {
			loading: false
		}
	},
	created() {
	}
}
</script>
<style lang="scss" scoped>

</style>
