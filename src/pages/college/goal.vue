<template>
  <page-module>
    <div class="list-wrapper">
      <el-table
        :data="goals"
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
          prop="name"
          label="目标名">
        </el-table-column>
        <el-table-column
          prop="creator"
          width="100"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="owner"
          width="100"
          label="负责人">
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="查看详情">
          <template slot-scope="scope">
            <router-link :to="'/goal/' + scope.row.id">
              <el-button
                size="mini"
                icon="el-icon-search"
                circle></el-button>
            </router-link>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </page-module>
</template>
<script>
  import * as studentAPI from '@/api/student'

  export default {
    data() {
    	return {
        goals: [
        	{
            name: '“五工程”铸魂育人校园文化建设项目',
            desc: "“五工程”即阵地文化、行为文化、环境文化、实践文化、品牌文化建设工程。通过“五工程”建设，构建“人文医专、仁爱医专、书香医专、美丽医专、和谐医专”五大育人体系，把红色文化、优秀传统文化和先进文化贯穿学生学习生活全过程，实现立德树人、以文化人、实践育人，实现“三全育人”目标，实现学生健康成长、全面成才。",
            startDate: '2017年01月01日',
            endDate: '2019年12月31日',
            creator: '创建人',
            owner:  '负责人',
            remain: '',
            progress: '0.75'
          },
          {
            name: '“五工程”铸魂育人校园文化建设项目',
            desc: "“五工程”即阵地文化、行为文化、环境文化、实践文化、品牌文化建设工程。通过“五工程”建设，构建“人文医专、仁爱医专、书香医专、美丽医专、和谐医专”五大育人体系，把红色文化、优秀传统文化和先进文化贯穿学生学习生活全过程，实现立德树人、以文化人、实践育人，实现“三全育人”目标，实现学生健康成长、全面成才。",
            startDate: '2017年01月01日',
            endDate: '2019年12月31日',
            creator: '创建人',
            owner:  '负责人'
          },
          {
            name: '“五工程”铸魂育人校园文化建设项目',
            desc: "“五工程”即阵地文化、行为文化、环境文化、实践文化、品牌文化建设工程。通过“五工程”建设，构建“人文医专、仁爱医专、书香医专、美丽医专、和谐医专”五大育人体系，把红色文化、优秀传统文化和先进文化贯穿学生学习生活全过程，实现立德树人、以文化人、实践育人，实现“三全育人”目标，实现学生健康成长、全面成才。",
            startDate: '2017年01月01日',
            endDate: '2019年12月31日',
            creator: '创建人',
            owner:  '负责人'
          },
          {
            name: '“五工程”铸魂育人校园文化建设项目',
            desc: "“五工程”即阵地文化、行为文化、环境文化、实践文化、品牌文化建设工程。通过“五工程”建设，构建“人文医专、仁爱医专、书香医专、美丽医专、和谐医专”五大育人体系，把红色文化、优秀传统文化和先进文化贯穿学生学习生活全过程，实现立德树人、以文化人、实践育人，实现“三全育人”目标，实现学生健康成长、全面成才。",
            startDate: '2017年01月01日',
            endDate: '2019年12月31日',
            creator: '创建人',
            owner:  '负责人'
          }
        ]
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        // 把每一行的索引放进row
        row.rowIndex = rowIndex
      },
      headerClass({ row, rowIndex }) {
        return 'wms_table_header'
      },
    }
  }
</script>
<style>

</style>
