<template>
  <page-module v-loading.fullscreen="loading" element-loading-text="加载中">
    <workbench-header :total_data="header_data"></workbench-header>

    <div class="diagno-structure">
      <div class="structure-title">
        “五横五纵一平台”基本框架
      </div>
      <!--五横-->
      <el-row :gutter="gutter">
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="4"><div class="col-title"><icon-svg icon-class="tubiaozhizuomoban-"></icon-svg>学校</div></el-col>
        <el-col :span="4"><div class="col-title"><icon-svg icon-class="zhuanye-xuanzhong"></icon-svg>专业</div></el-col>
        <el-col :span="4"><div class="col-title"><icon-svg icon-class="kecheng"></icon-svg>课程</div></el-col>
        <el-col :span="4"><div class="col-title"><icon-svg icon-class="jiaoshifengcai"></icon-svg>教师</div></el-col>
        <el-col :span="4"><div class="col-title"><icon-svg icon-class="xuexiao"></icon-svg>学生</div></el-col>
      </el-row>
      <!--目标体系-->
      <el-row :gutter="gutter">
        <el-col :span="3"><div class="row-title"><icon-svg icon-class="mubiao"></icon-svg>目标体系</div></el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.学校整体发展目标</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.院（系）、部发展目标</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.其它部门目标</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>专业建设目标</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.课程建设目标</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.课程教学目标</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.师资队伍建设目标</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.教师自身发展目标</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>学生全面发展目标</a>
          </div>
        </el-col>
      </el-row>
      <!--标准体系-->
      <el-row :gutter="gutter">
        <el-col :span="3"><div class="row-title"><icon-svg icon-class="kujialeqiyezhan_guanlibiaozhunhua"></icon-svg>标准体系</div></el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.各部门、各岗位工作职责、工作标准</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.各质量保证工作组岗位职责、工作标准</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>专业建设标准</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>课程建设标准</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.师资队伍建设标准</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.教师聘用标准</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.教师发展标准</a>
          </div></el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>学生全面发展标准</a>
          </div>
        </el-col>
      </el-row>
      <!--资源保障-->
      <el-row :gutter="gutter">
        <el-col :span="3">
          <div class="row-title">
            <icon-svg icon-class="ziyuan"></icon-svg>资源保障
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-row>
              <a href="javascript:;" class="ib"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.人力资源</a>
              <a href="javascript:;" class="ib"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.财务支持</a>
            </el-row>
            <el-row>
              <a href="javascript:;" class="ib"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.校企合作</a>
              <a href="javascript:;" class="ib"><icon-svg icon-class="dianjichufa-copy"></icon-svg>4.教学资源</a>
            </el-row>
            <el-row>
              <a href="javascript:;" class="ib"><icon-svg icon-class="dianjichufa-copy"></icon-svg>5.安全保障</a>
              <a href="javascript:;" class="ib"><icon-svg icon-class="dianjichufa-copy"></icon-svg>6.生活保障</a>
            </el-row>
            <el-row>
              <a href="javascript:;" class="ib"><icon-svg icon-class="dianjichufa-copy"></icon-svg>7.文化保障</a>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.校内外实训基地建设管理与校外实习的管理</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.教学资源建设与管理</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.教学条件</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.实训条件</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.资源使用</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.教学设施</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.专家工作室</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.工作设施</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>4.生活设施</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.学习设施</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.生活设施</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.校园环境</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>4.文化营造</a>
          </div>
        </el-col>
      </el-row>
      <!--制度保障-->
      <el-row :gutter="gutter">
        <el-col :span="3">
          <div class="row-title">
            <icon-svg icon-class="wenjianzhidu"></icon-svg>制度保障
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.学校发展规划管理规定</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.院(系)、部及其它部门质量保证制度、质量事故分类、分等的认定管理办法</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.学校、院(系)、部及其它部门绩效考核办法、管理制度、工作流程</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>4.智能校园建设管理制度</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>5.与人才培养质量相关的制度</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.院系专业设置与调整管理办法</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.院系专业建设经费管理制度</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.校企合作管理制度</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>4.毕业生跟踪调研制度</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.课程实施过程管理</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.课程实施环境管理</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.教师培养制度</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.教师职称评聘制度</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.教师业绩考核制度</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.学业管理</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.就业管理</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.生活保障</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>4.安全保障</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>5.学生行为规范</a>
          </div>
        </el-col>
      </el-row>
      <!--数据体系-->
      <el-row :gutter="gutter">
        <el-col :span="3"><div class="row-title"><icon-svg icon-class="shuju"></icon-svg>数据体系</div></el-col>
        <el-col :span="4">
          <div class="grid-content">
            <router-link to="/data/source"><icon-svg icon-class="dianjichufa-copy"></icon-svg>各部门工作数据采集</router-link>
        </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>专业建设数据采集</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>课程建设数据采集</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>1.师资队伍建设数据采集</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>2.教师聘用数据采集</a>
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>3.教师发展数据采集</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>学生全面发展数据采集</a>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="gutter">
        <el-col :span="3"><div class="row-title"><icon-svg icon-class="daizhenduan"></icon-svg>诊断改进</div></el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>学校、院(系)、部及其它部门自我诊改工作机制（时间、内容、方法、形成循环）</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>专业诊改机制</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>课程诊改机制</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>师德师风、教学能力、服务能力科研能力等诊改机制</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>学习能力、学习风气、学业水平、品行等诊改机制</a>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="gutter">
        <el-col :span="3"><div class="row-title"><icon-svg icon-class="zhihui"></icon-svg>智慧平台</div></el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>学校、院(系)、部及其它部门自我诊改报告</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>专业诊改报告</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>课程诊改报告</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>师资建设诊改报告</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <a href="javascript:;"><icon-svg icon-class="dianjichufa-copy"></icon-svg>学生全面发展诊改报告</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </page-module>
</template>
<script>
  import { getWorkbench, getWorkbenchMock } from '@/api/workbench'
  import 'echarts'
  import WorkbenchHeader from '../common/wb_header.vue'
  import { getMessages } from '@/api/login'

  export default{
    props: {
    },
    components: {
      WorkbenchHeader,
    },
    data() {
      return {
        loading: false,
        gutter: 10,
        // 顶部数据：
        header_data: {
          product: null,
          customer: null,
          sale: null,
          info: null
        }
      }
    },
    methods: {
      headerClass({ row, rowIndex }) {
        return 'wms_table_header'
      },
      formatDate(date) {
        let start = null
        let end = null
        if (date) {
          // 兼容英文系统
          const begin = date[0]
          start = `${begin.getFullYear()}-${begin.getMonth() + 1}-${begin.getDate()}`
          const des = date[1]
          end = `${des.getFullYear()}-${des.getMonth() + 1}-${des.getDate()}`
        }
        let search = null
        search = `start=${start}&end=${end}`
        return search
      },
      getAllStart() {

        getMessages().then((res) => {
          const data = res.data
          this.header_data.info = data.notices
        }).catch(err => {
          this.$error(err)
        })
        this.loading = false
      }
    },
    created() {
      this.loading = true
      Promise.all([

      ]).then(list => {
        return this.getAllStart()
      }).catch(err => {
        this.$error(err)
        this.loading = false
      })
    }
  }
</script>
<style lang="scss" scoped>

  .el-row {
    margin-bottom: 20px;
    display: flex;
    align-items: stretch;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    height: 100%;
    padding: 10px;
    min-height: 36px;
    justify-content: flex-start;
    flex-wrap: wrap;
    border: 1px solid #e3e3e3;
    border-top:5px solid #e3e3e3;

    .el-row {
      margin: 0;
    }

    a {
      display: block;
      line-height: 26px;

      .svg-icon {
        margin-right: 5px;
        vertical-align: -5px;
      }

    }

    a:hover {
      color: #0052CC;
      text-decoration: underline;
    }

    a.ib {
      display: inline-block;
      margin-right: 5px;

    }

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .diagno-structure {

    padding-left: 10px;

    .structure-title {
      text-align: center;
      line-height: 60px;
      font-size: 18px;
    }

    .col-title, .row-title{
      text-align: center;
      line-height: 36px;
      font-size: 16px;
      border: 1px solid #e3e3e3;

      .svg-icon {
        width: 22px;
        height: 22px;
        vertical-align: -5px;
        margin-right: 10px;
      }

    }

  }
</style>
