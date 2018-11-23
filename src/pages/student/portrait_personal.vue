<template>
  <div class="page-module portrait-wrapper" v-loading.fullscreen="loading" element-loading-text="加载中...">

    <!--个人画像-->
    <div class="personal" v-if="this.$route.params.id">
      <el-row>
        <div class="portrait-item">
          <div class="portrait-header-wrapper">
            <div class="portrait-header-left">
              <div class="avatar-wrapper">
          <span class="avatar" style="background-color: rgb(78, 138, 249);" v-if="!photo">
            {{ studentDetail.StudentName.length > 2 ? studentDetail.StudentName.substr(-2) : studentDetail.StudentName }}
          </span>
                <div class="avatar" v-if="photo">
                  <img :src="photo" :alt="studentDetail.StudentName">
                </div>

              </div>

            </div>
            <div class="portrait-header-right">
              <div class="portrait-header-item">
                <p class="strong">{{ studentDetail.StudentName }}</p>
                <p>{{studentDetail.Certificatetype || '身份证'}}号: {{ studentDetail.CertificateNo }}</p>
                <p>家庭电话: {{ studentDetail.FamilyPhone }}</p>
              </div>
              <div class="portrait-header-item">
                <p>院系: {{ studentDetail.iname }}</p>
                <p>专业: {{ studentDetail.ProfessionInfoName }}</p>
                <p>班级: {{ studentDetail.ClassInfoName }}</p>
              </div>
              <div class="portrait-header-item">
                <p>性别: {{ studentDetail.Sex }}</p>
                <p>汉族: {{ studentDetail.Nation }}</p>
                <p>生源学校: {{ studentDetail.OriSchool }}</p>
              </div>
              <div class="portrait-header-item portrait-tags">
                <div class="title">学生标签: </div>
                <div class="tags">
                  <el-tag type="danger" size="mini">挂科预警</el-tag>
                  <el-tag type="danger" size="mini">疑似不在校</el-tag>
                  <el-tag type="danger" size="mini">饮食不规律</el-tag>
                  <el-tag size="mini">学习达人</el-tag>
                  <el-tag size="mini">生活规律</el-tag>
                  <el-tag size="mini">讲卫生</el-tag>
                  <el-tag size="mini">宿舍宅</el-tag>
                  <el-tag size="mini">音乐达人</el-tag>
                  <el-tag size="mini">购物达人</el-tag>
                  <el-tag size="mini">游戏达人</el-tag>
                  <el-tag size="mini">喜欢读书</el-tag>
                  <el-tag size="mini">早起鸟</el-tag>
                  <el-tag size="mini">运动健将</el-tag>
                  <el-tag size="mini">饮食规律</el-tag>
                  <el-tag size="mini">学霸</el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-row>

      <el-row type="flex" justify="space-around" :gutter="15">
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-title">学习时长</div>
            <chart :options="timeLine" :auto-resize="true" ref="timeLine" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="portrait-item">
            <div class="portrait-item-pannel">
              <div class="portrait-item-title">学习成绩</div>
              <div class="portrait-chart-pannel">
                <el-select
                  size="mini"
                  v-if="'keys' in scores && scores.keys.length > 1"
                  @change="selectTerm"
                  :default-first-option="true"
                  v-model="selectedTerm"
                  placeholder="选择学期">
                  <el-option
                    v-for="item in scores.keys"
                    :key="item"
                    :value="item"
                    :label="item">
                  </el-option>
                </el-select>
              </div>
            </div>
            <chart :options="gradeLine" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around" :gutter="15">
        <el-col :span="8">
          <div class="portrait-item">
            <div class="portrait-item-title">图书借阅</div>
            <chart :options="line" :auto-resize="true" ref="grade" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="portrait-item">
            <div class="portrait-item-title">网络行为</div>
            <chart :options="internet" :auto-resize="true" ref="internet" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="portrait-item">
            <div class="portrait-item-title">饮食规律</div>
            <chart :options="dinnings" :auto-resize="true" ref="dinnings" class="portrait-chart"></chart>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around" :gutter="15">
        <el-col :span="8">
          <div class="portrait-item">
            <div class="portrait-item-title">消费分析</div>
            <chart :options="consumes" :auto-resize="true" ref="consumes" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="portrait-item">
            <div class="portrait-item-title">宿舍逗留</div>
            <chart :options="dormitory" :auto-resize="true" ref="dormitory" class="portrait-chart"></chart>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="portrait-item">
            <div class="portrait-item-title">洗浴分析</div>
            <chart :options="baths" :auto-resize="true" ref="baths" class="portrait-chart"></chart>
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
  import { mapGetters } from 'vuex'
  import * as studentAPI from '@/api/student'
  export default {
    data() {
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
        scores: {},
        professionalScores: {},
        selectedTerm: '',
        photo: '',
        default_photo: '/static/images/student_avatar.jpeg',
        timeLine: {
          color: commonOptions.color,
          legend: {
            right: 0
          },
          xAxis: {
            boundaryGap : false,
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            axisLabel: {
              show: true
            },
            max: 24,
            type: 'value'
          },
          grid: commonOptions.grid,
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br />{a0}:{c0}<br />{a1}: {c1}'
          },
          series: [
            {
              name: '个人时长',
              data: [14, 7, 8, 6, 12, 7, 14],
              areaStyle: {
                origin: 'start'
              },
              lineStyle: {
                width: 0
              },
              barWidth: 20,
              type: 'line',
              smooth: true
            },
            {
              name: '本专业平均时长',
              data: [12, 11, 10, 14, 9, 8, 12],
              areaStyle: {},
              lineStyle: {
                width: 0
              },
              type: 'line',
              smooth: true
            }
          ]
        },
        gradeLine: {
          color: commonOptions.color,
          legend: {
            right: 0
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            axisLabel: {
              show: true
            },
            type: 'value'
          },
          grid: commonOptions.grid,
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br />{a0}:{c0}<br />{a1}: {c1}'
          },
          series: [{
            name: '个人成绩',
            data: [],
            barWidth: 20,
            type: 'bar'
          },
            {
              name: '本专业平均成绩',
              data: [],
              type: 'line',
              smooth: true
            }
          ]
        },
        internet: {
          grid: commonOptions.grid,
          color: commonOptions.color,
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
            {
              name: '网络行为',
              type: 'pie',
              radius : '80%',
              center: ['50%', '50%'],
              data:[
                {value:335, name:'文学'},
                {value:310, name:'社交'},
                {value:234, name:'音乐'},
                {value:1548, name:'视频'},
                {value:135, name:'新闻'}

              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        consumes: {
          grid: commonOptions.grid,
          color: commonOptions.color,
          legend: {
            right: 0
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            axisLabel: {
              show: true
            },
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br />{a0}:{c0}<br />{a1}: {c1}'
          },
          series: [{
            name: '消费金额',
            type: 'bar',
            barWidth: 20,
            data: []
          },
          {
            name: '校平均消费金额',
            type: 'line',
            smooth: true,
            data: []
          }]
        },
        dinnings: {
          grid: commonOptions.grid,
          color: commonOptions.color,
          legend: {
            right: 0
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            axisLabel: {
              show: true
            },
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br />{a0}:{c0}<br />{a1}: {c1}'
          },
          series: [{
            name: '消费频次',
            type: 'line',
            data: []
          },{
            name: '校平均消费频次',
            type: 'line',
            data: []
          }]
        },
        dormitory: {
          grid: commonOptions.grid,
          color: commonOptions.color,
          legend: {
            right: 0
          },
          xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            axisLabel: {
              show: true
            },
            type: 'value'
          },
          barGap: '-100%',
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br />{a0}:{c0}<br />{a1}: {c1}'
          },
          series: [{
            name: '宿舍时间',
            type: 'bar',
            barWidth: 20,
            barGap: '0',
            data: [14, 7, 8, 6, 12, 7, 14]
          },{
            name: '本专业平均',
            type: 'bar',
            stack: 'one',
            barWidth: 20,
            data: [12, 11, 10, 14, 9, 8, 12]
          }]
        },
        baths: {
          grid: commonOptions.grid,
          legend: {
            right: 0
          },
          color: commonOptions.color,
          xAxis: {
            type: 'category',
            data: []
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br />{a0}:{c0}'
          },
          yAxis: {
            axisLabel: {
              show: true
            },
            type: 'value'
          },
          series: [{
            name: '洗浴次数',
            type: 'bar',
            barWidth: 20,
            data: []
          }]
        },
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
        }
      }
    },
    computed: {
      ...mapGetters([
        'studentDetail'
      ])
    },
    components: {
      chart: ECharts
    },
    methods: {
      nameFormat(studentName) {
        return studentName.length > 3 ? studentName.split('').splice(-2, 2).join('') : studentName
      },
      getPersonalPortraitData() {
        // 专业成绩数据
        // todo 数据清洗，保证数据的完整性
        Promise.all([
          studentAPI.getProfessionalScores(this.studentDetail.TRProfessionInfoID, this.studentDetail.SMBasicInfoID),
          studentAPI.getStudentScores(this.studentDetail.SMBasicInfoID),
          studentAPI.getStudentBaths(this.studentDetail.SMBasicInfoID),
          studentAPI.getStudentDinnings(this.studentDetail.SMBasicInfoID),
          studentAPI.getStudentConsumes(this.studentDetail.SMBasicInfoID)
        ]).then(list => {
          this.parseScores(list[0].data.data.list, list[1].data.data.list)
          this.parseBaths(list[2].data.data.list)
          this.parseDinnings(list[3].data.data.list)
          this.parseConsumes(list[4].data.data.list)
          this.loading = false
        }, () => {
          this.loading = false
        }).catch(err => {
          this.$error(err)
          this.loading = false
        })

        //尝试获取本校平均消费
        studentAPI.getColledgeConsumes().then(({ data }) => {
          this.parseColledgeConsumes(data.data.list)
        }).catch(err => {
          this.$error(err)
        })

        //获取学生头像
        studentAPI.getStudentPhoto(this.studentDetail.SMBasicInfoID).then(({ data }) => {
        	this.photo = data.data.list[0].photo ? 'data:image/png;base64,' + data.data.list[0].photo : this.default_photo
        }).catch(err => {
          this.$error(err)
        })

        //获取全校饮食规律
        studentAPI.getColledgeAverageDinnings().then(({ data }) => {
        	this.parseColledgeDinnings(data.data.list)
        }).catch(err => {
          this.$error(err)
        })

      },
      parseScores(professionalScores, scores) {
        //负责把个人的成绩数据和专业的成绩数据对应起来
        this.professionalScores = professionalScores
        //
        this.scores = scores
        this.selectedTerm = this.scores.keys[0] ? this.scores.keys[0] : ''
        //设置相应学期的课程
        this.selectTerm()
      },
      selectTerm() {
        if (!this.selectedTerm) {
          return false
        }

        //本人成绩
        let xData = this.gradeLine.xAxis.data = []
        let yData = this.gradeLine.series[0].data = []
        //专业成绩
        let majorYData = this.gradeLine.series[1].data = []
        this.scores.results[this.selectedTerm].forEach((item, index) => {
          if (!item.YXScore) {
            return false
          }
          xData.push(item.CourseInfoName)
          yData.push(item.YXScore)
        })
        this.professionalScores.results[this.selectedTerm].forEach((item, index) => {
          if (!item.total) {
            return false
          }
          majorYData.push((item.total / item.stucount).toFixed(2))

        })
      },
      parseDinnings(dinnings) {
        let xData = this.dinnings.xAxis.data
        let yData = this.dinnings.series[0].data
        dinnings.forEach((item, index) => {
          xData.push(item.hourspan.split('-')[0])
          yData.push(item.diningCount)
        })
      },
      parseColledgeDinnings(dinnings) {
        let yData = this.dinnings.series[1].data
        dinnings.forEach((item, index) => {
          yData.push(item.diningCount)
        })
      },
      parseConsumes(consumes) {
        let xData = this.consumes.xAxis.data
        let yData = this.consumes.series[0].data
        consumes.forEach((item, index) => {
          xData.push(item.hourspan1)
          yData.push(item.acount)
        })
      },
      parseColledgeConsumes(consumes){
        let yDataCache = []
        let yCache = {}
        consumes.results[(new Date()).getFullYear()].forEach((item, index) => {
          yCache[item.cmonth] = item.total
        })

        this.consumes.xAxis.data.forEach((item, index) => {
        	if (item in yCache) {
            yDataCache[index] = yCache[item]
          } else {
            yDataCache[index] = 0
          }
        })
        this.consumes.series[1].data = yDataCache
      },
      parseBaths(baths) {
        let xData = this.baths.xAxis.data
        let yData = this.baths.series[0].data
        baths.forEach((item, index) => {
          xData.push(item.hourspan1)
          yData.push(item.acount)
        })
      }
    },
    created() {
      this.loading = true
      if (!this.$route.params.id) {
        //学生整体画像
        this.loading = false
      } else {
        // 学生个人画像
        // 如果读不到数据，根据id请求后端
        if (!this.studentDetail.hasOwnProperty('SMBasicInfoID')) {
          studentAPI.getStudentByID(this.$route.params.id).then( ({ data }) => {
            this.$store.commit('SET_CURRENT_STUDENT', data.data.list[0])
            this.getPersonalPortraitData()
          })
        } else {
          this.getPersonalPortraitData()
        }

        // 获取画像数据

      }
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

  .portrait-header-wrapper {
    display: flex;
    justify-content: flex-start;

    .portrait-header-left {

      .avatar-wrapper {

        .avatar {
          display: inline-block;
          width: 110px;
          height: 110px;
          line-height: 110px;
          font-size: 45px;
          border-radius: 110px;
          text-align: center!important;
          overflow: hidden;
          zoom: 1;
          vertical-align: middle;
          color: #fff!important;
          text-shadow: transparent 0 0 0;
          padding: 0!important;

          img {
            width: 110px;
            margin-top: -5px;
          }
        }
      }
    }

    .portrait-header-right {
      height: 110px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      .portrait-header-item {
        padding: 0 20px;
        border-right: solid 1px #d3d3d3;

        p {
          line-height: 30px;
        }

        p.strong {
          font-size: 16px;
          color: #000;
          font-weight: 500;
        }
      }

      .portrait-header-item.portrait-tags {
        line-height: 35px;
        display: flex;
        justify-content: flex-start;
        max-width: 550px;

        .title {
          width: 70px;
        }

        .tags {
          margin-left: 20px;
        }
      }

      :last-child {
        border-right: none;
      }

    }
  }

  .personal {
    .portrait-chart {
      width: 100%;
      height: 270px;
    }
  }

  .community {
    .portrait-chart {
      width: 100%;
      height: 330px;
    }
  }

</style>
