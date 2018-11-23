<template>
  <div class="page-module portrait-wrapper" v-loading.fullscreen="loading" element-loading-text="加载中...">

    <!--整体画像-->
    <div class="community">
      <el-row type="flex" justify="space-around" :gutter="15">
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">群体标签</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">学习时长</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around" :gutter="15">
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">成绩分析</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">图书借阅</div>
            <chart :options="library" :auto-resize="true" ref="library" class="portrait-chart"></chart>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around" :gutter="15">
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">网络行为</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">饮食规律</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around" :gutter="15">
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">消费分析</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">宿舍逗留</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
      </el-row>


    </div>

  </div>
</template>
<script>
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/legendScroll'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import 'echarts-wordcloud'
  import { mapGetters } from 'vuex'
  import { } from '@/api/student'
  import tagsAll from "@/utils/data-1482907856060-SJ_0x1brx";
  import tagsRead from "@/utils/data-1482907801586-BJzsgkbrl";
  export default {
    data() {
      let bookBg = "/static/images/data-1483079771848-B1VDlK7Bx.png";
    	let commonOptions = {
        grid: {
          top: 30,
          bottom: 20,
          left: 30,
          right: 10
        },
        color: ['rgba(78, 138, 249, 1)', 'rgba(34, 215, 187, 1)', '#2dbcff', '#66c060', '#ffd234', '#ffa415', '#4e8af9', '#18bfa4']
      }
      return {
        loading: false,
        line: {
          color: ['rgb(78, 138, 249)', 'rgb(34, 215, 187)'],
          xAxis: {
            type: 'category',
            data: ['4月', '5月', '6月', '7月', '8月', '9月', '10月']
          },
          yAxis: {
            type: 'value'
          },
          grid: {
          	top: 20,
            bottom: 20,
            right: 10,
            left: 30
          },
          series: [{
            data: [30, 32, 22, 27, 34,  30, 20],
            type: 'line',
            smooth: true
          }]
        },
        library: {
          series: [{
            type: 'wordCloud',
            gridSize: 20,
            sizeRange: [12, 45],
            rotationRange: [0, 0],
            shape: 'circle',
            data: [],
            left: 50,
            width: '45%',
            top: 60,
            height: '72%',
            textStyle: {
              normal: {
                color: '#555'
              },
              emphasis: {
                color: '#109b85'
              }
            }
          }, {
            type: 'wordCloud',
            gridSize: 20,
            sizeRange: [12, 45],
            rotationRange: [0, 0],
            shape: 'circle',
            data: [],
            left: '52%',
            width: '45%',
            top: 60,
            height: '72%',
            textStyle: {
              normal: {
                color: commonOptions.color[1]
              },
              emphasis: {
                color: '#109b85'
              }
            }
          }, {
            type: 'scatter',
            data: [],
            color: commonOptions.color,
            name: '所有读过想读的书'
          }, {
            type: 'scatter',
            data: [],
            color: commonOptions.color,
            name: '2016读过的书'
          }],
          legend: {
            data: ['所有读过想读的书', '2016读过的书'],
            show: true
          },
          xAxis: {
            type: 'value',
            show: false
          },
          yAxis: {
            type: 'value',
            show: false
          },
          graphic: {
            elements: [{
              type: 'image',
              style: {
                image: bookBg,
                width: '100%',
                x: 30,
                y: 40,
                height: '100%'
              }
            }]
          }
        },
      }
    },
    computed: {

    },
    components: {
      chart: ECharts
    },
    methods: {

    },
    created() {
    	//this.loading = true
    }

  }
</script>
<style lang="scss" scoped>
  @import "src/styles/variables.scss";
  .portrait-wrapper {
    background: #f9f9f9;
    padding: 15px 15px 0 15px;
    margin-top: 15px;
  }

  .portrait-item {
    background: #fff;
    padding: 15px;
    margin-bottom: 15px;
  }

  .portrait-item-pannel {
    height: 30px;
    display: flex;
    justify-content: space-between;
  }

  .portrait-item-title {
    line-height: 30px;
    border-left: solid 3px $border-left;
    padding-left: 5px;
  }

  .community {
    .portrait-chart {
      width: 100%;
      height: 330px;
    }
  }

</style>
