<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
      <footer class="page_footer">
        <!--@版本：1.0.1.0 技术支持:天一信-->
      </footer>
    </div>
  </div>
</template>

<script>
  import {Navbar, Sidebar, AppMain} from '.'
  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .main-container {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 0;
    flex: 1 1 0;
    -webkit-flex: 1 1 0;
    display: -webkit-box;
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
  }

  .page_footer {
    text-align: center;
    font-size: 12px;
    color: #3C3C3C;
    letter-spacing: 0.03px;
    line-height: 38px;
    bottom: 0;
    position: relative;
    background-color: inherit;
  }
</style>
