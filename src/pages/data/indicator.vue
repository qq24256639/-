<template>
  <page-module class="blank indicator-page">
    <el-container class="indicator-wrapper">

      <el-container>

        <el-aside class="indicator-side">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
            <el-button slot="append" icon="el-icon-search" size="mini"></el-button>
          </el-input>

          <el-tree
            class="filter-tree"
            :data="indicators"
            :props="sideProps"
            @node-click="showIndicator"
            :filter-node-method="filterNode"
            ref="tree">
          </el-tree>
        </el-aside>

        <el-container class="indicator-content-wrapper">

          <div class="indicator-panel">
            <div class="indicator-panel-left">
              <a href="javascript:;">
               <icon-svg icon-class="zhibiaojiankong"></icon-svg>
                图表
              </a>
              <span class="gap">|</span>
              <a href="javascript:;">
                <icon-svg icon-class="table"></icon-svg>
                列表
              </a>
            </div>

            <div class="indicator-panel-right">
              <el-button type="primary" size="mini" @click="doAdd">新建指标</el-button>
              <el-button type="success" size="mini" @click="doEdit">编辑指标</el-button>
            </div>

          </div>

          <div class="indicator-content">

            <div class="indic-empty-content" v-if="selectedIndicator < 0">
              <div>
                <icon-svg icon-class="img-not-found"></icon-svg>
                <p>请在左侧选择指标</p>
              </div>
            </div>
          </div>
          <el-dialog
            closed="onEditClose"
            :visible.sync="editorShowing">
            <div slot="title">
              <div class="data-source-editor-header">
                {{ editorTitle }}
              </div>
            </div>
            <el-form :model="currentIndicator" :rules="rules" ref="editForm" label-width="100px">

            </el-form>
            <div slot="footer">
              <el-button
                v-if="isAdding"
                type="plain"
                @click="resetEdit">重置</el-button>
              <el-button type="primary" @click="submitEdit">确定</el-button>
            </div>
          </el-dialog>

        </el-container>
      </el-container>
    </el-container>
  </page-module>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      editorShowing: false,
      editorTitle: '新增指标',
      isAdding: false,
      currentIndicator: {},
    	selectedIndicator: -1,
      filterText: '',
      sideProps: {
        children: 'children',
        label: 'name'
      },
      rules: {}
    }
  },
  computed: {
    ...mapGetters([
      'indicators'
    ])
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    showIndicator(data, node, component) {
      this.selectedIndicator = data.id
      // just handle child node
      if (data.children) {
        return;
      }
      // todo 显示指标详情
    },
    doAdd() {
    	this.isAdding = true;
    	this.editorShowing = true;
    },
    doEdit() {},
    onEditClose() {},
    resetEdit() {},
    submitEdit() {},

  }
}
</script>
<style lang="scss" scoped>
  .indicator-page {
    height: calc(100% - 60px);
  }
  .indicator-wrapper {
    height: 100%;
  }
  .indicator-side {
    padding: 10px 5px;
    width: 260px!important;
    border-right: 2px solid #e9e9e9;
  }
  .filter-tree {
    margin-top: 10px;
    color: #444444
  }
  .indicator-content-wrapper {
    padding: 10px;
    display: block;
  }
  .indicator-panel {
    display: flex;
    justify-content: space-between;

    & .gap {
      color: #6c6a67;
    }

    & .indicator-panel-left {
      font-size: 14px;
      svg {
        margin-right: 0;
      }

      & a:hover, .selected {
        color: #409EFF;
      }
    }
  }
  .indicator-content {
    margin-top: 10px;
  }
  .indic-empty-content {

    position: static;
    height: 640px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      display: block;
    }

    svg {
      width: 136px;
      height: 136px;
    }
  }
</style>
