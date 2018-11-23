<template>
  <div class="drag-container">
    <div class="task-board">
      <draggable
        :options="{ghostClass: 'sortable-ghost-entry'}"
        class="task-board-wrapper">
        <!--task-list-->
        <div v-for="(entry, key) in entries"
             :key="key" @end="onTaskListMoveEnd"
             class="entry-wrapper">
          <div class="entry-item"
               :class="{['drag-column-' + entry.id]: true}">
            <div class="entry-header">
              <span class="entry-title">
                {{ entry.name }}
                <span class="completed-count"><b>{{ getCompletedTasks(entry.id).length
                  }}</b>/{{ getTasks(entry.id).length }}</span>
              </span>
              <div class="progressbar-container">
                <div class="progress">
                  <div class="progress-bar"
                       :style="{width: (getPercent(entry.id) < 100 ? getPercent(entry.id) : 100) + '%'}"
                       style="width: 100%;"></div>
                </div>
              </div>
            </div>
            <div class="entry-tasks">
              <draggable
                :options="{group: 'task', draggable: '.task-card'}"
                @end="onTaskMoveEnd"
                class="entry-tasks-cont">
                <div v-for="(task, index) in getTasks(entry.id)"
                     :data-task-id="task.id"
                     :data-entry-id="entry.id"
                     :key="index"
                     v-bind:class="task.completed ? 'task-complete' : ''"
                     @click="showTaskDetail(task.id)"
                     class="task-card">
                  <div class="task-main">
                    <a href="javascript:;" @click.stop="checkTask(task.id)" class="task-check">
                      <icon-svg v-bind:icon-class="task.completed ? '_checkbox_click' : 'checkbox-no'"/>
                    </a>
                    <span class="task-title">{{ task.name }}</span>
                  </div>
                  <!--<div class="task-summary clearfix">-->
                  <!--<div class="task-assignee lc-avatar ">-->
                  <!--<div class="lc-avatar-24">-->
                  <!--<span class="lc-avatar-def" style="background-color: rgb(78, 138, 249);">-->
                  <!--<div class="">赵峰</div>-->
                  <!--</span>-->
                  <!--</div>-->
                  <!--</div>-->
                  <!--<div class="task-metadata">-->
                  <!--<span class="task-badge">-->
                  <!--<i class="lcfont lc-project-private-o"></i>-->
                  <!--</span>-->
                  <!--<span class="task-badge task-badge-inline-block">-->
                  <!--<i class="lcfont lc-desc-o"></i>-->
                  <!--</span><span class="task-badge">-->
                  <!--<i class="lcfont lc-comment-o"></i>-->
                  <!--</span>-->
                  <!--</div>-->
                  <!--</div>-->
                </div>
                <div v-if="addingTask === key" class="add-composer">
                    <textarea
                      v-model="newTask.name"
                      class="form-control taskName"
                      ref="newTask"
                      @keypress.enter.prevent="submitAddTask(key)"
                      :data-entry-id="entry.id"
                      placeholder="请输入任务内容"
                      style="overflow: hidden; word-wrap: break-word; resize: none; height: 59px;">
                    </textarea>
                  <div class="add-composer-actor clearfix">
                    <div class="add-composer-footer">
                      <el-button @click="submitAddTask(key)" type="success" size="mini" round>确定</el-button>
                      <el-button size="mini" @click="cancelAddTask(key)" round>取消</el-button>
                    </div>
                  </div>
                </div>
              </draggable>
            </div>
            <div class="entry-footer" v-if="addingTask !== key">
              <a href="javascript:;" class="btn-add" @click="doAddTask(key)">
                <icon-svg icon-class="add"></icon-svg>
                添加新任务
              </a>
            </div>
          </div>
        </div>
        <!--create task-list-->
        <div class="ignore-item entry-new">
          <div v-if="addingList">
            <div class="form-group entry-new-input">
              <input
                ref="newEntry"
                class="form-control"
                name="newEntryName"
                v-model="newEntry.name"
                @keypress.enter.prevent="submitAddList"
                placeholder="列表名">
              <div>
                <el-button @click="submitAddList" type="success" size="mini" round>确定</el-button>
                <el-button size="mini" @click="cancelAddList" round>取消</el-button>
              </div>
            </div>
          </div>
          <div v-if="!addingList" class="link-panel">
            <a href="javascript:;" @click="doAddList" class="btn-add">
              <icon-svg icon-class="add"></icon-svg>
              新建列表
            </a>
          </div>
        </div>
      </draggable>
    </div>
    <task-detail v-if="taskDetailShowing" :taskID="detailTaskID" @closed="onDetailClosed"></task-detail>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import draggable from 'vuedraggable'
  import TaskDetail from "./taskDetail";

  export default {
    name: 'Kanban',

    computed: {
      ...mapGetters([
        'entries',
        'tasks'
      ])
    },
    components: {
      TaskDetail,
      draggable
    },
    data() {
      return {
        newTask: {
          name: '',
          project: '',
          entry_id: '',
          parent: '',
          completed: 0
        },
        newEntry: {
          name: '',
        },
        addingList: false,
        addingTask: -1,
        detailTaskID: 0,
        taskDetailShowing: false
      };
    },

    methods: {
      getTasks(id) {
        return this.tasks.filter(task => task.entry_id === id);
      },
      getCompletedTasks(id) {
        return this.tasks.filter(task => task.entry_id === id & task.completed === 1);
      },
      getPercent(id) {
        const percent = (this.getCompletedTasks(id).length / this.getTasks(id).length) * 100;
        return percent > 0 ? percent : 0
      },
      onTaskListMoveEnd(evt) {

      },
      onTaskMoveEnd(evt) {
        let itemEl = evt.item;
        let newIndex = evt.newIndex;

        this.$store.dispatch('moveTask', {
          taskId: itemEl.dataset.taskId,
          entryId: itemEl.dataset.entryId,
          index: newIndex
        })
      },
      checkTask(id) {
        this.$store.dispatch('checkTask', {
          id: id
        })
        this.$nextTick()
      },
      doAddTask(key) {
        let self = this;
        this.newTask.name = '';
        this.addingTask = key;
        // set focus
        setTimeout(function () {
          self.$refs.newTask[0].focus()
          self.$refs.newTask[0].parentNode.scrollIntoView()
        }, 100)
      },
      cancelAddTask(key) {
        this.addingTask = -1;
      },
      submitAddTask(key) {
        let newTask = this.newTask
        newTask.entry_id = this.$refs.newTask[0].dataset.entryId
        this.$store.dispatch('addTask', newTask)
        this.doAddTask(key)
      },
      doAddList() {
        this.addingList = true
        const self = this
        this.newEntry.name = ''
        setTimeout(() => {
          self.$refs.newEntry.focus()
          self.$refs.newEntry.parentNode.scrollIntoView()
        }, 100)
      },
      cancelAddList() {
        this.addingList = false
      },
      submitAddList() {
        let newEntry = this.newEntry
        if (trim(newEntry.name).length == 0) {
            return;
        }
        this.$store.dispatch('addEntry', newEntry)
        this.doAddList()
      },
      showTaskDetail(id) {
        this.detailTaskID = id
        this.taskDetailShowing = true
      },
      onDetailClosed() {
        this.taskDetailShowing = false
      }
    }
  };
</script>

<style lang="scss">
  @import "../../assets/styles/kanban";
</style>
