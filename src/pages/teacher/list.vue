<template>
  <page-module>
    <div class="pannel-wrapper">
      <search-result :stripNum="teacherPagin.total"/>
    </div>
    <div class="list-wrapper">
      <el-table
        :data="teachers"
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
        prop="TeacherName"
        label="教师姓名">
        </el-table-column>
        <el-table-column
          prop="rname"
          label="教研室">
        </el-table-column>
        <el-table-column
          prop="iname"
          label="部门">
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="查看详情">
          <template slot-scope="scope">
            <router-link :to="'/teacher/' + scope.row.TMBasicInfoID">
              <el-button
                size="mini"
                icon="el-icon-search"
                @click="$store.commit('SET_CURRENT_TEACHER', scope.$index)"
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
          :current-page="teacherPagin.page"
          :page-size="teacherPagin.per_page"
          layout="sizes, prev, pager, next"
          :total.sync="teacherPagin.total">
        </el-pagination>
      </div>
    </el-row>
  </page-module>
</template>
<script>
  import { getTeachers } from '@/api/teacher'
  import { mapGetters } from 'vuex'
  export default {

    computed: {
      ...mapGetters([
      	'teachers',
        'teacherPagin'
      ])
    },

    methods: {
      curChange(page) {
        this.$store.commit('SET_TEACHER_PAGIN', {
        	page: page
        })
        this.getTeacher()
      },
      pageChange(num) {
        this.$store.commit('SET_TEACHER_PAGIN', {
          num: num
        })
        this.getTeacher()
      },
      tableRowClassName({row, rowIndex}) {
        // 把每一行的索引放进row
        row.rowIndex = rowIndex
      },

      formatter(row, column, cellValue, index) {
        //放回索引值
        return this.teacherPagin.per_page * (this.teacherPagin.page - 1)  + 1 + row.rowIndex;
      },
      getTeacher() {
        getTeachers(this.teacherPagin.per_page, this.teacherPagin.page).then( ({ data }) => {
          this.$store.commit('SET_TEACHERS', data.data.list)
          this.$store.commit('SET_TEACHER_PAGIN', {
          	total: data.data.total
          })
        })
      },
      headerClass({ row, rowIndex }) {
        return 'wms_table_header'
      },
    },
    created() {
      this.getTeacher()
    }
  }
</script>
<style>

</style>
