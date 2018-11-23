<template>
  <page-module>
    <div class="pannel">
      <el-button type="primary" @click="doAdd">添加数据源</el-button>
    </div>
    <el-table
      :data="dataSources"
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        align="center"
        type="index"
        header-align="center"
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="host"
        align="center"
        header-align="center"
        label="地址">
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        header-align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '正常' ? 'primary' : 'danger'"
            size="medium">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        width="200"
        header-align="center"
        label="数据源类型">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        width="200"
        label="修改时间">
        <template slot-scope="scope">
          {{ formatDate(scope.row.updated) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        width="120"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showDetail(scope.row)"
            icon="el-icon-search"
            circle></el-button>
          <el-button
            size="mini"
            @click="doEdit(scope.row)"
            type="primary"
            icon="el-icon-edit" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      closed="onEditClose"
      :visible.sync="editorShowing">
      <div slot="title">
        <div class="data-source-editor-header">
          {{ editorTitle }}
        </div>
      </div>
      <el-form :model="currentDataSource" :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="数据源名称" prop="name">
          <el-input v-model="currentDataSource.name">
            <el-button
              type="danger"
              v-if="!isAdding"
              slot="append"
              icon="el-icon-delete"
              @click="doDelete(currentDataSource)" circle></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="数据源类型" prop="type">
          <el-select
            placeholder="请选择数据源类型"
            v-model="currentDataSource.type">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="host">
          <el-input v-model="currentDataSource.host"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="currentDataSource.port"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="user">
          <el-input v-model="currentDataSource.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="currentDataSource.password"></el-input>
        </el-form-item>
        <el-form-item label="数据库" prop="database">
          <el-input v-model="currentDataSource.database">
            <el-select
              placeholder="请选择数据库"
              v-model="currentDataSource.database">
              <el-option
                v-for="item in currentDataSource.databases"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button slot="append">获取数据库</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="currentDataSource.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="plain"
            @click="doTestConnection(currentDataSource)">测试连接</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          v-if="isAdding"
          type="plain"
          @click="resetEdit">重置</el-button>
        <el-button type="primary" @click="submitEdit">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="detailShowing">
      <div slot="title">
        <div class="data-source-editor-header">
          数据源详情
        </div>
      </div>
      <el-form :model="currentDataSource"  label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据源名称:" prop="name">
              {{ currentDataSource.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据源类型:" prop="type">
              {{ currentDataSource.type }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="地址:" prop="host">
              {{ currentDataSource.host }}
            </el-form-item>
          </el-col>
        <el-col :span="11">
          <el-form-item label="端口:" prop="port">
            {{ currentDataSource.port }}
          </el-form-item>
        </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="用户名:" prop="user">
              {{ currentDataSource.user }}
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="密码:" prop="password">
              {{ currentDataSource.password }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="数据库:" prop="database">
              {{ currentDataSource.database }}
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="数据源状态:" prop="status">
              <el-tag
                :type="currentDataSource.status === '正常' ? 'primary' : 'danger'"
                size="medium">
                {{ currentDataSource.status }}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注:" prop="desc">
          {{ currentDataSource.desc }}
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="确认删除"
      :visible.sync="deleteShowing"
      width="30%">
      <span>请慎重处理，数据源删除后，对应监控指标将失效！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteShowing = false">确 定</el-button>
        <el-button type="primary" @click="deleteShowing = false">取 消</el-button>
      </span>
    </el-dialog>

</page-module>
</template>
<script>

import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapGetters([
      'dataSources'
    ])
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入数据源名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择数据源类型', trigger: 'blur' }
        ],
        host: [
          { required: true, message: '请输入数据源地址', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入端口', trigger: 'blur' }
        ],
        desc: [
          { required: false, message: '请填写备注', trigger: 'blur' }
        ]
      },
      type: '',
      options:[
        {
          value: 'mysql',
          label: 'MySQL'
        }, {
          value: 'mssql',
          label: 'SQL Server'
        }, {
          value: 'oracle',
          label: 'Oracle'
        }, {
          value: 'dataproxy',
          label: '数据代理服务'
        }, {
          value: 'csv',
          label: 'CSV数据'
        }
      ],
      editorShowing: false,
      detailShowing: false,
      deleteShowing: false,
      editorTitle: '新增数据源',
      isAdding: false,
      currentDataSource: {}
    }
  },
  methods: {
    doAdd() {
      this.editorTitle = '新增数据源'
      this.isAdding = true
      this.editorShowing = true
      this.currentDataSource = {}
    },
    doEdit(dataSource) {
      console.log(dataSource)
      this.editorTitle = '修改数据源'
      this.editorShowing = true
      this.currentDataSource = dataSource
    },
    resetEdit() {
      this.$refs.editForm.reset()
    },
    submitEdit() {
      //id为空即视为新增
      this.$store.dispatch('updateDataSource')
      this.editorShowing = false
    },
    onEditClose() {
      this.isAdding = false
    },
    doDelete() {
      this.deleteShowing = true
    },
    showDetail(dataSource) {
      this.currentDataSource = dataSource
      this.detailShowing = true
    },
    doTestConnection(dataSource) {
      // todo 测试数据连接
    },
    formatDate(datetime) {
      return moment(datetime*1000).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style lang="scss" scoped>
  .pannel {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
  }
</style>
