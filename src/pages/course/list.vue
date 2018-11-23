<template>
  <page-module>
    <div class="pannel-wrapper">
      <search-result :stripNum="coursePagin.total"/>
    </div>
    <div class="list-wrapper">
      <el-table
        :data="courses"
        border
        :row-class-name="tableRowClassName"
        :header-row-class-name='headerClass'>
        <el-table-column
          width="70"
          align="center"
          :formatter="formatter"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="CourseInfoSimpleName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="LessonType"
          label="课程类型">
        </el-table-column>
        <el-table-column
          prop="ExamMethod"
          label="考核方式">
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="查看详情">
          <template slot-scope="scope">
            <router-link :to="'/course/' + scope.row.TPCourseInfoID">
              <el-button
                size="mini"
                icon="el-icon-search"
                @click="$store.commit('SET_CURRENT_COURSE', scope.$index)"
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
          :current-page="coursePagin.page"
          :page-size="coursePagin.per_page"
          layout="sizes, prev, pager, next"
          :total.sync="coursePagin.total">
        </el-pagination>
      </div>
    </el-row>
  </page-module>
</template>
<script>
  import { getCourses } from '@/api/course'
  import { mapGetters } from 'vuex'
  export default {

    computed: {
      ...mapGetters([
      	'courses',
        'coursePagin'
      ])
    },

    methods: {
      curChange(page) {
        this.$store.commit('SET_COURSE_PAGIN', {
        	page: page
        })
        this.getCourse()
      },
      pageChange(num) {
        this.$store.commit('SET_COURSE_PAGIN', {
          num: num
        })
        this.getCourse()
      },
      tableRowClassName({row, rowIndex}) {
        // 把每一行的索引放进row
        row.rowIndex = rowIndex
      },

      formatter(row, column, cellValue, index) {
        //放回索引值
        return this.coursePagin.per_page * (this.coursePagin.page - 1)  + 1 + row.rowIndex;
      },
      getCourse() {
        getCourses(this.coursePagin.per_page, this.coursePagin.page).then( ({ data }) => {
          this.$store.commit('SET_COURSES', data.data.list)
          this.$store.commit('SET_COURSE_PAGIN', {
            total: data.data.total
          })
        })
      },
      headerClass({ row, rowIndex }) {
        return 'wms_table_header'
      },
    },
    created() {
      this.getCourse()
    }
  }
</script>
<style>

</style>
