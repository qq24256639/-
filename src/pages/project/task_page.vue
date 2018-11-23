<template>
  <div class="drag-container">
    <div class="task-board">
      <draggable
        :options="{ghostClass: 'sortable-ghost-entry'}"
        class="task-board-wrapper">
        <!--task-list-->
        <div v-for="(value,key) in entries"
             :key='key'
              @end="onTaskListMoveEnd"
             class="entry-wrapper">
          <div class="entry-item"
               >
            <!-- 任务类别 -->
            <div class="entry-header">
              <span class="entry-title">
                {{ value.name }}
                <span class="completed-count"><b>{{ getCompletedTasks(key)
                  }}</b>/{{ getTasks(key)}}</span>
              </span>
              <div class="progressbar-container">
                <div class="progress">
                  <div class="progress-bar"
                       :style="{width: (getPercent(key) < 100 ? getPercent(key) : 100) + '%'}"
                       style="width: 100%;"></div>
                </div>
              </div>
            </div>
            <!-- 任务列表 -->
            <div class="entry-tasks">
              <draggable
                :options="{group: 'task', draggable: '.task-card'}"
                @end="onTaskMoveEnd"
                :data-entry-id='key'
                v-model='draggableData'
                class="entry-tasks-cont">
                <div v-for="(value,key) in getTasksData(key)" 
                     :data-tifk-no="value.tiFkNo" 
                     :key="key"                 
                     @click="showTaskDetail(value.tiFkNo)"
                     class="task-card">
                  <div class="task-main">
                    <a href="javascript:;" @click.stop="checkTask(value.tiFkNo,value.tiStatus)" class="task-check">
                      <icon-svg v-bind:icon-class="value.tiStatus == 2 ? '_checkbox_click' : 'checkbox-no'"/>
                    </a>
                    <span class="task-title">{{ value.tiTitle }}</span>
                  </div>
                </div>
                
                <div v-if="addingTask === key" class="add-composer">
                    <textarea
                      v-model="newTask.name"
                      class="form-control taskName"
                      ref="newTask"
                      @keypress.enter.prevent="submitAddTask(key)"
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
            <!-- + 添加新任务 -->
            <div class="entry-footer" v-if="addingTask !== key">
              <a href="javascript:;" class="btn-add" @click="doAddTask(key)">
                <icon-svg icon-class="add"></icon-svg>
                添加新任务
              </a>
            </div>
          </div>
        </div>

      </draggable>
    </div>
    <task-detail v-if="taskDetailShowing" :taskID="detailTaskID" @closed="onDetailClosed" v-on:closedTaskdetail='closedTaskdetailFunction'></task-detail>
    <task-chilren-detail v-if="taskChilrenDetailShowing" :taskID="transferId"  v-on:closedChilrenTaskdetail='closedChilrenTaskdetailFunction' closedChilrenTaskdetail @closed="onChilrenDetailClosed"></task-chilren-detail>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import draggable from 'vuedraggable'
  import TaskDetail from "./taskdetail"
  import TaskChilrenDetail from "./task_chilren_detail"

  export default {
    name: 'Kanban',
    components: {
      TaskDetail,
      draggable,
      TaskChilrenDetail
    },
    data() {
      return {
        entries: [
          {
            "id": "4a63b8b22c41421f878489ea4d2e75cb",
            "name": "收件箱",
            "pos": 32767.5,
            "archived": 0,
            "create_date": 1423023696970,
            "update_date": 1423023696970,
            "watched": false
          },
          {
            "id": "111d3a0d5e604a3fa6c500e9a7e5ecec",
            "name": "今天要做",
            "pos": 147454.75,
            "archived": 0,
            "create_date": 1422668227711,
            "update_date": 1422668227711,
            "watched": false
          },
          {
            "id": "780b4dffa1ba4bbfa2654ce11f5159be",
            "name": "下一步要做",
            "pos": 262142,
            "archived": 0,
            "create_date": 1423091255426,
            "update_date": 1423091255426,
            "watched": false
          },
          {
            "id": "780b4dffa1ba4bbfa2654ce11f5159be",
            "name": "以后再做",
            "pos": 262142,
            "archived": 0,
            "create_date": 1423091255426,
            "update_date": 1423091255426,
            "watched": false
          }
        ],
        tasks:{},
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
        taskDetailShowing: false,
        taskChilrenDetailShowing:false,
        draggableData:[],
        transferId:''
      };
    },
    watch:{

    },
    mounted(){
      this.originalData();
    },
    methods: {
      getTasksData(id){
        switch (id){
          case 0:
            return this.tasks.sjxList;          
            break;
          case 1:
            return this.tasks.todayList;
            break;
          case 2:
            return this.tasks.nextList;
            break;
          case 3:
            return this.tasks.afterList;
            break;
        }
      },
      getTasks(id) {
        switch (id){
          case 0:
            return this.tasks.totalSjxNum;          
            break;
          case 1:
            return this.tasks.totalTodayNum;
            break;
          case 2:
            return this.tasks.totalNextNum;
            break;
          case 3:
            return this.tasks.totalAfterNum;
            break;
        }
      },
      getCompletedTasks(id) {
        switch (id){
          case 0:
            return this.tasks.endSjxNum;
            break;
          case 1:
            return this.tasks.endTodayNum;
            break;
          case 2:
            return this.tasks.endNextNum;
            break;
          case 3:
            return this.tasks.endAfterNum;
            break;
        }
      },
      getPercent(id) {
        const percent = (this.getCompletedTasks(id) / this.getTasks(id)) * 100;
        return percent > 0 ? percent : 0
      },
      onTaskListMoveEnd(evt) {

      },
      onTaskMoveEnd(evt) {
          var toType = parseInt(evt.to.dataset.entryId)+1;
          var that = this;
          this.$http.post('/api/mytask/modifyTaskInfo',{
            "tiFkNo":evt.item.dataset.tifkNo,
            "tiType":toType.toString()
          }).then(function(res){ 
              that.originalData();
          }).catch(function(error){
          })
      },
      checkTask(val,num) {
        let that = this
        var status = num == '2' ? '1' : '2';
        this.$http.post('/api/mytask/modifyTaskInfo',{  
          "tiFkNo":val,
          "tiStatus":status
        }).then(function(res){ 
            that.originalData();
        }).catch(function(error){
        })
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
        const that = this;
        this.$http.post('/api/mytask/saveTaskInfo',{
           "tiTitle":that.newTask.name,
           "tiType":key+1
        }).then(function(res){ 
            that.cancelAddTask(key);
            that.originalData();
        }).catch(function(error){
        })
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
      },
      showTaskDetail(id) {
        this.detailTaskID = id
        this.taskDetailShowing = true
      },
      onDetailClosed() {
        this.taskDetailShowing = false
        this.originalData()
      },
      closedTaskdetailFunction(data){
        this.transferId = data.id;
        this.taskDetailShowing = false
        this.taskChilrenDetailShowing = true
      },
      onChilrenDetailClosed(){
        this.taskChilrenDetailShowing = false
      },
      closedChilrenTaskdetailFunction(data){
        this.taskDetailShowing = true
        this.taskChilrenDetailShowing = false
      },
      originalData(){
        var that = this;
        this.$http.get('/api/mytask/findMyTaskList').then(function(res){ 
            that.tasks = res.data.data;
        }).catch(function(error){
        })
      }
    }
  };
</script>

<style lang="scss" coped>
  @import "../../assets/styles/kanban";
</style>
