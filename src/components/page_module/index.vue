<template>
	<section class="p_module clearfix" :class="{blank:blank}">
		<slot></slot>
	</section>
</template>
<script>
	export default {
		name: 'PageModule',
		props: {
			blank: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "src/styles/variables.scss";
	.p_module {
    background: $p_module;
    border:1px solid #d3d3d3;
    margin-top: 15px;
    padding: 0 20px 20px;
    width: 100%;
	}
	.blank {
		padding: 0;
    border: 0;
	}
</style>
