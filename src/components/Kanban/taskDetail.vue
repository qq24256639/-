<template>
  <el-dialog :visible.sync="showingTaskDetail" @closed="afterClose" width="58.3%">
    <div slot="title">
      <div class="task-detail-header">
        <div class="task-detail-header-left">
          <a href="javascript:;" class="entity-project-name">{{ task.project.name }}</a>
          <span>-</span>
          <a href="javascript:;" class="entity-name">{{ task.entry_name }}</a>

        </div>
        <div class="task-detail-header-right">
          <a href="javascript:;"><icon-svg icon-class="zhibiaojiankong"></icon-svg>监控指标</a>
          <a href="javascript:;"><icon-svg icon-class="gengduo-2"></icon-svg>子任务</a>
          <a href="javascript:;"><icon-svg icon-class="fujian"></icon-svg>附件</a>
          <span class="task-detail-header-gap">|</span>
          <a href="javascript:;"><icon-svg icon-class="xiala"></icon-svg>更多</a>
          <span class="task-detail-header-gap">|</span>
        </div>
      </div>
    </div>
    <div class="task-detail-main-wrapper">
      <div class="task-detail-main-left">
        <a href="javascript:;"
           @click.stop="checkTask(task.id)"
           v-bind:class="task.completion.is_completed ? 'task-complete' : ''"
           class="task-check">
          <icon-svg v-bind:icon-class="task.completion.is_completed ? '_checkbox_click' : 'checkbox-no'"/>
        </a>
        <span
          class="task-title"
          @click="doTitleEdit"
          v-if="!titleEditing">{{ task.title }}
          <icon-svg
            @click="doTitleEdit"
            icon-class="edit"></icon-svg>
        </span>

        <div class="title-editor" v-if="titleEditing">
          <div class="form-group">
            <textarea
              ref="taskTitleEditor"
              class="form-control"
              placeholder="输入任务标题"
              rows="1"
              v-model="task.title"
              style="overflow: hidden; word-wrap: break-word; resize: none; height: 38px;"></textarea>
          </div>
          <el-button @click="submitTitleEdit" type="success" size="mini" round>确定</el-button>
          <el-button size="mini" @click="cancelTitleEdit" round>取消</el-button>

        </div>

      </div>
      <div class="task-detail-main-right">
        <div class="attribute-handler-groups">
          <!--负责人-->
        <div class="attribute-handler">
          <div class="title">分配任务</div>
          <icon-svg icon-class="profile1"></icon-svg>
        </div>

          <!--结束时间-->
        <div class="attribute-handler">
          <div class="title">截止时间</div>
          <icon-svg icon-class="kebiao"></icon-svg>
        </div>

        </div>
      </div>
    </div>
    <div class="task-detail-desc-wrapper">
      <div
        v-if="!taskDescEditing"
        v-bind:class="task.description.length == 0 ? 'empty' : ''"
        class="task-detail-desc-content" @click="doTaskDescEdit">
        {{ task.description.length == 0 ? '暂无详细描述' : task.description }}
        <a v-if="task.description.length == 0 && !taskDescEditing" class="add-more-desc" href="javascript:;" @click="doTaskDescEdit">添加描述</a>
      </div>
      <div class="title-editor" v-if="taskDescEditing">
        <div class="form-group">
            <textarea
              ref="taskDescEditor"
              class="form-control task-desc-editor"
              placeholder="输入任务内容..."
              rows="5"
              v-model="task.description"></textarea>
        </div>
        <el-button @click="submitTaskDescEdit" type="success" size="mini" round>确定</el-button>
        <el-button size="mini" @click="cancelTaskDescEdit" round>取消</el-button>
      </div>
      <span class="desc-edit-trigger" v-if="task.description.length > 0 && !taskDescEditing" @click="doTaskDescEdit">编辑</span>
    </div>

    <div class="task-detail-participant-wrapper">
      <div class="task-detail-participant-label">
        <icon-svg icon-class="team"></icon-svg>
        <span>参与人</span>
      </div>
      <div class="task-detail-participant-cont">

      </div>
    </div>
    <div slot="footer" class="dialog-footer">
    </div>
  </el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import randomColor from 'randomcolor'

export default {
  name: 'TaskDetail',
  data () {
    return {
      showingTaskDetail: false,
      titleEditing: false,
      taskDescEditing: false
    }
  },
  computed: {
    ...mapGetters([
      'task'
    ])
  },
  created() {
    this.$store.dispatch('getTaskDetail', {
      id: this.taskID
    })
  },
  mounted() {
    this.showingTaskDetail = true
  },
  props: [
    'taskID'
  ],
  methods: {
    afterClose() {
      this.$emit('closed')
    },
    checkTask(id) {
      this.$store.dispatch('checkTask', {
        id: id
      })
    },
    doTitleEdit() {
      this.titleEditing = true
      let self = this
      this.$nextTick(function(){
        self.$refs.taskTitleEditor.focus()
      })
    },
    cancelTitleEdit() {
      this.titleEditing = false
    },
    submitTitleEdit() {

    },
    doTaskDescEdit() {
      this.taskDescEditing = true
      let self = this
      this.$nextTick(function(){
        self.$refs.taskDescEditor.focus()
      })
    },
    cancelTaskDescEdit() {
      this.taskDescEditing = false
    },
    submitTaskDescEdit() {

    }

  }
}
</script>
