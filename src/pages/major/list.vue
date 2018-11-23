<template>
  <page-module>
    <div class="pannel-wrapper">
      <search-result :stripNum="majorPagin.total"/>
    </div>
    <div class="list-wrapper">
      <el-table
       :data="majors"
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
          prop="ProfessionInfoName"
          label="专业名称">
        </el-table-column>
        <el-table-column
          prop="LearnLen"
          label="学制">
        </el-table-column>
        <el-table-column
          prop="EducationLevel"
          label="学历">
        </el-table-column>
        <el-table-column
          prop="ProfessionInfoType"
          label="专业类型">
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="查看详情">
          <template slot-scope="scope">
            <router-link :to="'/major/' + scope.row.TRProfessionInfoID">
              <el-button
                size="mini"
                icon="el-icon-search"
                @click="$store.commit('SET_CURRENT_MAJOR', scope.$index)"
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
          :current-page="majorPagin.page"
          :page-size="majorPagin.per_page"
          layout="sizes, prev, pager, next"
          :total.sync="majorPagin.total">
        </el-pagination>
      </div>
    </el-row>
  </page-module>
</template>
<script>
import { getMajors } from '@/api/major'
import { mapGetters } from 'vuex'
export default {

  computed: {
    ...mapGetters([
    	'majors',
      'majorPagin'
    ])
  },

  methods: {
    curChange(page) {
      this.$store.commit('SET_MAJOR_PAGIN', {
        page: page
      })
      this.getMajor()
    },
    pageChange(num) {
      this.$store('SET_MAJOR_PAGIN', {
        num: num
      })
      this.getMajor()
    },
    tableRowClassName({row, rowIndex}) {
      // 把每一行的索引放进row
      row.rowIndex = rowIndex
    },

    formatter(row, column, cellValue, index) {
      //放回索引值
      return this.majorPagin.per_page * (this.majorPagin.page - 1)  + 1 + row.rowIndex;
    },
    getMajor() {
      getMajors(this.majorPagin.per_page, this.majorPagin.page).then( ({ data }) => {
        this.$store.commit('SET_MAJORS', data.data.list)
        this.$store.commit('SET_MAJOR_PAGIN', {
          total: data.data.total
        })
      })
    },
    headerClass({ row, rowIndex }) {
      return 'wms_table_header'
    },
  },
  created() {
    this.getMajor()
  }
}
</script>
<style>

</style>
