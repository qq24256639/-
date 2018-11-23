<template>
  <page-module>
    <div class="temp">
      <el-row type="flex" justify="space-around" :gutter="15">    
        <el-col :span="12"> 
          <div class="portrait-item">
              <div class="portrait-item-title">项目任务统计</div>
              <div class="portrait-item-borderDiv">
                <el-progress type="circle" :percentage="statistics.completion" color="#8e71c7" style='margin:20px 10%'></el-progress>
                <el-progress type="circle" :percentage="statistics.delay" color="#8e71c7" style='margin:20px 10%;'></el-progress>
              </div>
          </div> 
        </el-col> 
        <el-col :span="12"> 
          <div class="el-col-24 portrait-number" >
            <div class="el-col-6">
              <p>待完成</p>
              <p class="P_2">{{statistics.beCompletionNum}}</p>
            </div>
            <div class="el-col-6">
              <p>延期</p>
              <p class="P_2">{{statistics.delayNum}}</p>
            </div>
            <div class="el-col-6">
              <p>已完成</p>
              <p class="P_2">{{statistics.completionNum}}</p>
            </div>
            <div class="el-col-6">
              <p>任务总数</p>
              <p class="P_2">{{statistics.completionAllNum}}</p>
            </div>
          </div>      
        </el-col> 
      </el-row>
       

       <el-row type="flex" justify="space-around" :gutter="15">
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">项目燃尽图</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">新增任务和完成任务</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
      </el-row>
      <el-row type='flex' justify="space-around" :gutter="15">
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">任务列表</div>
            <chart :options="list" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span='12'>
          <div class="portrait-item">
            <div class="portrait-item-title">标签</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </page-module>

</template>
<script>
  import ECharts from 'vue-echarts/components/ECharts'
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
        statistics:{
          completion:48,
          delay:6,
          beCompletionNum:15,
          delayNum:2,
          completionNum:14,
          completionAllNum:29
        },
        line: {
            title: {
                text: '剩\n余\n任\n务\n数',
                y:'center', 
                texgtRotate:-90
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}'
            },
            legend: {
                left: 'right',
                data: ['参考线', '实际线']
            },
            xAxis: {
                type: 'category',
                name: '',
                splitLine: {show: true},
                data: ['9月17日','9月18日','9月19日','9月20日','9月21日','9月22日','9月23日']
            },
            grid: {
                left: '8%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                name: ''
            },
            series: [
                {
                    name: '参考线',
                    type: 'line',
                    right:'right',
                    data: [2,1,0,5,7,1,5]
                },
                {
                    name: '实际线',
                    type: 'line',
                    right:'right',
                    data: [4,5,4,7,1,6,2]
                }
            ]
        },
        list:{
         xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          legend: {
              left: 'right',
              data: ['未完成', '已完成']
          },
          grid: {
              left: '8%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          series: [
            {
                name:'未完成',
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                color:commonOptions.color[0]
            },
            {
                name:'已完成',
                data: [180, 150, 190, 120, 150, 90, 125],
                type: 'bar',
                color:commonOptions.color[3]
            }
          ]
        }
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
  .portrait-item-borderDiv{
    border-right: solid 1px #DEDEDE;
  }
  .portrait-number div{
    padding:15% 30px;
  }
  .portrait-number .el-col-6 P{
    font-size:14px;
    text-align:center;
    color:#B5B5B5;
  }
  .portrait-number .el-col-6 .P_2{
    font-size:38px !important;
    color:#66c060;
  }
</style>
