<template>
  <page-module v-loading.fullscreen="listLoading" element-loading-text="加载中">
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-table
            class="table_header"
            :data="todo_list"
            :header-row-class-name='headerClass'
            :row-style="todoStyle"
            @row-click="goTodoDetail">
            <el-table-column prop="title" label="待办事项">
            </el-table-column>
            <el-table-column prop="create_time" label="时间">
            </el-table-column>
            <el-table-column prop="content" label="待办内容">
            </el-table-column>
            <el-table-column prop="finished" label="状态">
              <template slot-scope="scope">
							<span v-if="scope.row.finished === true">
								已完成
							</span>
                <span v-else>
								待完成
							</span>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="footer">
            <div class="block">
              <el-pagination
                @size-change="pageChange"
                @current-change="curChange"
                :current-page="paginData.page"
                :page-size="paginData.per_page"
                layout="sizes, prev, pager, next"
                :total.sync="paginData.total">
              </el-pagination>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="消息提醒" name="second">
          <el-button @click='allRead' id="all_button">全部已读</el-button>
          <el-table
            class="table_header"
            :data="info_list"
            :row-style="rowStyle"
            @row-click="rowClick"
            :header-row-class-name='headerClass'>
            <el-table-column prop="title" label="消息提醒">
            </el-table-column>
            <el-table-column prop="create_time" label="时间">
            </el-table-column>
            <el-table-column prop="content" label="消息内容">
            </el-table-column>
            <el-table-column prop="viewed" label="状态">
              <template slot-scope="scope">
							<span v-if="scope.row.viewed === true">
								已读
							</span>
                <span v-else>
								未读
							</span>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="footer">
            <div class="block">
              <el-pagination
                @size-change="infoPageChange"
                @current-change="infoCurChange"
                :current-page="infoPaginData.page"
                :page-size="infoPaginData.per_page"
                layout="sizes, prev, pager, next"
                :total.sync="infoPaginData.total">
              </el-pagination>
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
  </page-module>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getNotifies, putNotice } from '@/api/notify'

  export default {
    name: 'inbox',
    data() {
      return {
        activeName: 'first',
        todo_list: [],
        listLoading: false,
        paginData: {
          total: 0,
          per_page: 10,
          page: 1,
          pages: 0
        },
        infoPaginData: {
          total: 0,
          per_page: 10,
          page: 1,
          pages: 0
        },
        info_list: []
      }
    },
    methods: {
      rowStyle({ row, rowIndex }) {
        if (row.viewed === true) {
          return {
            color: '#999999'
          }
        } else {
          return {
            cursor: 'pointer'
          }
        }
      },
      rowClick(row, event, column) {
        let path
        if (row.viewed === false) {
          path = `${row.id}/viewed`
        } else {
          path = `${row.id}/not_viewed`
        }
        return putNotice(path).then(res => {
          this.getNotifies()
          window.getPollingMessage && window.getPollingMessage()
        }).catch(err => {
          this.$error(err)
        })
      },
      todoStyle({ row, rowIndex }) {
        if (row.finished === false) {
          return {
            cursor: 'pointer'
          }
        } else {
          return {
            cursor: 'auto',
            color: '#999999'
          }
        }
      },
      goTodoDetail(row, event, column) {
        if (row.finished === false && !!row.url) {
          // this.$router.push(`${row.url}`)
          // todo go taskdetail
        } else {
          return
        }
        return
      },
      allRead() {
        putNotice(`all_viewed`).then(res => {
          this.getNotifies()
          window.getPollingMessage && window.getPollingMessage()
        }).catch(err => {
          this.$error(err)
        })
      },
      headerClass({ row, rowIndex }) {
        return 'wms_table_header'
      },
      curChange(page) {
        this.paginData.page = page
        this.getTodos()
      },
      pageChange(num) {
        this.paginData.per_page = num
        this.getTodos()
      },
      getTodos() {
        this.listLoading = true
        return getNotifies('backlogs', {
          page: this.paginData.page,
          perpage: this.paginData.per_page
        }).then(res => {
          this.todo_list = res.data
          this.paginData.total = +res.headers['x-pagination-total']
          this.paginData.pages = +res.headers['x-pagination-pages']
          this.paginData.per_page = +res.headers['x-pagination-per-page']
          this.listLoading = false
        })
      },
      getNotifies() {
        this.listLoading = true
        return getNotifies('notices', {
          page: this.infoPaginData.page,
          perpage: this.infoPaginData.per_page
        }).then(res => {
          this.info_list = res.data
          this.infoPaginData.total = +res.headers['x-pagination-total']
          this.infoPaginData.pages = +res.headers['x-pagination-pages']
          this.infoPaginData.per_page = +res.headers['x-pagination-per-page']
          this.listLoading = false
        })
      },
      infoPageChange(num) {
        this.infoPaginData.per_page = num
        this.getNotifies()
      },
      infoCurChange(page) {
        this.infoPaginData.page = page
        this.getNotifies()
      },
      getActiveTab() {
        const activeTab = this.$route.query.tab
        if (activeTab) {
          switch (true) {
            case activeTab === 'first':
              this.activeName = 'first'
              break
            case activeTab === 'second':
              this.activeName = 'second'
              break
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'user_info'
      ])
    },
    created() {
      this.getTodos()
      this.getNotifies()
      this.getActiveTab()
    }
  }
</script>

<style lang="scss" scoped>
  #all_button{
    margin-bottom: 20px;
  }
</style>
