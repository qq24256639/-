<template>
	<section>
		搜索结果：共计<span class="stripNum">{{stripNum}}</span>条记录
		<slot></slot>
	</section>	
</template>
<script>
export default {
	name: 'SearchResult',
	props: {
		stripNum: {
			type: Number,
			default: 0
		}
	}
}
</script>
<style scoped>
	section{
		margin-top: 25px;
		margin-bottom: 16px;
		font-size: 14px;
		color: #999999;
	}
	.stripNum{
		font-size: 14px;
		color: #409EFF;
		line-height: 20px;
		margin-left: 2px;
		margin-right: 2px;
	}
</style>
