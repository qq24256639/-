<template>
  <page-module v-loading.fullscreen="loading" element-loading-text="加载中">
    <div class="pannel-wrapper">
      <el-form label-width="100px" label-position="right">
        <el-form-item label="院系">
          <el-button type="text"
                     :class="{ cur_btn : n === cur_college }"
                     v-for="(i, n) in colleges"
                     :key="n"
                     @click="searchFun('cur_college', n)">{{i.name}}</el-button>
        </el-form-item>
        <el-form-item label="专业">
          <el-button type="text"
                     :class="{ cur_btn : n === cur_major }"
                     v-for="(i, n) in majorsList"
                     :key="n"
                     @click="searchFun('cur_major', n)">{{i.ProfessionInfoName}}</el-button>
        </el-form-item>
        <el-form-item label="入学年份">
          <el-button type="text"
                     :class="{ cur_btn : n === cur_year }"
                     v-for="(i, n) in enrollYears"
                     :key="n"
                     @click="searchFun('cur_year', n)">{{i.name}}</el-button>
        </el-form-item>
        <el-form-item label="班级" v-if="cur_major > 0 || cur_year > 0 || cur_college > 0">
          <el-button type="text"
                     :class="{ cur_btn : n === cur_class }"
                     v-for="(i, n) in classList"
                     :key="n"
                     @click="searchFun('cur_class', n)">{{i.ClassInfoName}}</el-button>
        </el-form-item>
        <el-form-item label="在校状态">
          <el-button type="text"
                     :class="{ cur_btn : n === cur_status }"
                     v-for="(i, n) in status"
                     :key="n"
                     @click="searchFun('cur_status', n)">{{i}}</el-button>
        </el-form-item>
        <el-form-item label="关键字搜索">
          <el-form :inline="true">
            <el-form-item label="">
              <el-input type="text"
                        placeholder="搜索关键字"
                        v-model="search"
                        @keyup.enter.native="getStudent">
                <el-button @click="getStudent" icon="el-icon-search" class="search-icon" slot="append"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  class="reset-button" @click="reset">重置</el-button>
            </el-form-item>
          </el-form> 
        </el-form-item>
      </el-form>
      <search-result :stripNum="studentPagin.total"/>
    </div>
    <div class="list-wrapper">
      <el-table
        :data="students"
        border
        :row-class-name="tableRowClassName"
        :header-row-class-name='headerClass'>
        <el-table-column
          width="70"
          :formatter="formatter"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="StudentName"
          width="100"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="CertificateNo"
          width="50"
          align="center"
          :formatter="getSex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="CertificateNo"
          label="身份证号">
        </el-table-column>
        <el-table-column
          prop="iname"
          label="院系">
        </el-table-column>
        <el-table-column
          prop="ProfessionInfoName"
          label="专业">
        </el-table-column>
        <el-table-column
          prop="ClassInfoName"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="EnrollYear"
          width="60"
          align="center"
          label="入学年份">
        </el-table-column>
        <el-table-column
          prop="Enrollment"
          width="80"
          label="招收方式">
        </el-table-column>
        <el-table-column
          prop="StudentStatus"
          label="学籍在校状态">
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="查看详情">
          <template slot-scope="scope">
            <router-link :to="'/student/' + scope.row.SMBasicInfoID">
              <el-button
                size="mini"
                icon="el-icon-search"
                @click="$store.commit('SET_CURRENT_STUDENT', scope.row)"
                circle></el-button>
            </router-link>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <el-row class="footer">
      <div class="block">
        <el-pagination
          @size-change="pageChange"
          @current-change="curChange"
          :current-page="studentPagin.page"
          :page-size="studentPagin.per_page"
          layout="sizes, prev, pager, next"
          :total.sync="studentPagin.total">
        </el-pagination>
      </div>
    </el-row>
  </page-module>
</template>
<script>
  import { getStudents } from '@/api/student'
  import { mapGetters } from 'vuex'
  import { getClasses } from '@/api/classes'
  import { getMajors } from '@/api/major'
  export default {

  	data() {
      return {
      	loading: false,
        cur_college: 0,
        cur_major: 0,
        cur_class: 0,
        cur_year: 0,
        cur_status: 0,
        search: '',
      	status: ['全部', '在籍在校', '在籍不在校', '不在籍不在校'],
        colleges: [
        	{
            name: '全部',
            instituteId: ''
          },
          {
            name: '护理学院',
            instituteId: '202A5FA3-E22D-4332-B849-16A8DF9A821B'
          },
          {
          	name: '医学技术学院',
            instituteId: '78BFEB94-DCC3-4A14-95EB-98FA7C53DB48'
          },
          {
          	name: '口腔学院',
            instituteId: '8E0FD838-D389-4C6E-825C-04A496E6C67E'
          },
          {
          	name: '健康管理系',
            instituteId: 'F38ADC83-3EAB-4C82-9314-5EADCDECA4F2'
          },
          {
          	name: '临床医学系',
            instituteId: '3B28A140-4914-4830-927F-B5948910DEFD'
          },
          {
          	name: '药学系',
            instituteId: '72FB9C6C-DC82-44E2-829C-5DF9FF6F178D'
          }]
      }
    },
    computed: {
    	...mapGetters([
    		'students',
        'studentPagin',
        'majors',
        'classes'
      ]),
      enrollYears() {
        let years = [{
        	name: '全部',
          year: ''
        }]
        let cur_yaar = (new Date(Date.now())).getFullYear()
        let begin = 2009
        for (let i = 0; (begin + i) < cur_yaar; i++) {
        	years.push({
            name: cur_yaar - i,
            year: String(cur_yaar - i)
        	})
        }

        return years
    	},
      majorsList() {
        return [{
          ProfessionInfoName: '全部',
          TRProfessionInfoID: ''
        }].concat(this.majors.filter( (item) => {
        	return this.cur_college > 0 ? item.TRInstituteID ===  this.colleges[this.cur_college].instituteId : true
        }))

      },
      classList() {
        return [{
          ClassInfoName: '全部',
          TRClassInfoID: ''
        }].concat(this.classes.filter( (item) => {
        	let isMajor = this.cur_major > 0 && this.cur_major < this.majorsList.length ? item.TRProfessionInfoID === this.majorsList[this.cur_major].TRProfessionInfoID : true
          let isCollege = this.cur_college > 0 ? item.TRInstituteID ===  this.colleges[this.cur_college].instituteId : true
          let isYear = this.cur_year> 0 ? item.EntranceYear === this.enrollYears[this.cur_year].year : true
          return isMajor && isCollege && isYear
        }))
      }
    },

    watch: {
  		cur_college: 'resetCurrentClass',
      cur_major: 'resetCurrentClass',
      cur_year: 'resetCurrentClass'
    },

    methods: {
      curChange(page) {
        this.$store.commit('SET_STUDENT_PAGIN', {
        	page: page
        })
        this.getStudent()
      },
      pageChange(num) {
        this.$store.commit('SET_STUDENT_PAGIN', {
        	per_page: num
        })
        this.getStudent()
      },
      tableRowClassName({row, rowIndex}) {
        // 把每一行的索引放进row
        row.rowIndex = rowIndex
      },
      formatter(row, column, cellValue, index) {
        const per_page = this.studentPagin.per_page
        const page = this.studentPagin.page
        //放回索引值
        return per_page * (page - 1)  + 1 + row.rowIndex;
      },
      getSex(row, column, cellValue, index) {
      	//返回性别
      	return cellValue.split('')[16] % 2 > 0 ? '男' : '女'
      },
      getStudent() {
      	const per_page = this.studentPagin.per_page
        const page = this.studentPagin.page
        getStudents({
          pageSize: per_page,
          current: page,
          instituteId: this.colleges[this.cur_college].instituteId,
          professionId: this.cur_major < this.majorsList.length ? this.majorsList[this.cur_major].TRProfessionInfoID : '',
          enrollYear: this.enrollYears[this.cur_year].year,
          classId: this.classList[this.cur_class].TRClassInfoID ,
          studentName: this.search,
          studentStatus: this.cur_status > 0 ? this.status[this.cur_status] : ''
        }).then( ({ data }) => {
          console.log(data);
          this.$store.commit('SET_STUDENTS', data.data.list)
          this.$store.commit('SET_STUDENT_PAGIN', {
          	total: data.data.total
          })
          this.loading = false
        }, () => {
          this.loading = false
        }).catch(err => {
        	this.$error(err)
          this.loading = false
        })
      },
      getMajor() {
      	//获取所有专业，以提供过滤
        getMajors(9999, 1).then(({ data }) => {
          this.$store.commit('SET_MAJORS', data.data.list)
        }).catch(err => {
          this.$error(err)
        })

      },
      getClass() {
      	//获取所有课程，以提供过滤
        getClasses(9999, 1).then(({ data }) => {
        	this.$store.commit('SET_CLASSES', data.data.list)
        }).catch(err => {
        	this.$error(err)
        })
      },
      headerClass({ row, rowIndex }) {
        return 'wms_table_header'
      },
      searchFun(key, vaule) {
      	// 如果选择学院时已经选过专业，先置为全部，以免报错
        if (key === 'cur_college' && this.cur_major > 0) {
        	this.cur_major = 0
        }

        this[key] = vaule
        this.$nextTick(this.getStudent)

      },
      resetCurrentClass() {
        if (this.cur_college === 0 && this.cur_major === 0 && this.cur_year === 0) {
        	this.cur_class = 0
        } else {
          this.$store.commit('SET_STUDENT_PAGIN', {
            page: 1
          })
        }
      },
      reset() {
      	this.search = ''
        this.cur_college = 0
        this.cur_major = 0
        this.cur_class = 0
        this.cur_year = 0
        this.cur_status = 0
      },

    },
    created() {
  		this.loading = true
      this.getStudent()
      this.getMajor()
      this.getClass()
    }
  }
</script>
<style scoped>
.pannel-wrapper {
  margin-top: 10px;
}

button span {
  font-weight: normal;
}
</style>
