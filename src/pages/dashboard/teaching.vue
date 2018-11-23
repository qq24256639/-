<template>
  <div class="gray-page" v-loading.fullscreen="loading" element-loading-text="加载中">
<div class="button-wrapper">
  <el-button plain @click="fullScreen">全屏展示</el-button>
</div>
    <iframe ref="screenWrapper" class="screen-iframe" src="http://datav.aliyun.com/share/cf327c3c251e0018eadf71bc31f6f1f1" frameborder="0"></iframe>
  </div>
</template>
<script>

  export default{
    props: {
    },
    components: {
    },
    methods: {
      fullScreen() {
          this.$refs.screenWrapper.webkitRequestFullScreen();
      }
    },
    data() {
      return {
        loading: false,
        // 顶部数据：
      }
    },
    created() {
    }
  }
</script>
<style lang="scss" scoped>
.button-wrapper {
  text-align: right;
  margin-top: -15px;
}
.screen-iframe {
  margin: 10px 0 10px 0;
  height: 100%;
  max-width: 100%;
}
</style>
