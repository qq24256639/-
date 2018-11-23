<template>
  <el-dialog :visible.sync="showingTaskDetail" @closed="afterClose" width="58.3%">
    <div slot="title">
      <div class="task-detail-header">
        <div class="task-detail-header-left">
          <!-- <a href="javascript:;" class="entity-project-name">{{ task.project.name }}</a>
          <span>-</span>
          <a href="javascript:;" class="entity-name">{{ task.entry_name }}</a> -->

        </div>
        <div class="task-detail-header-right">
          <a href="javascript:;" @click='uploadDivBtn'><icon-svg icon-class="fujian"></icon-svg>附件</a>
          <span class="task-detail-header-gap">|</span>
          <a href="javascript:;"><icon-svg icon-class="xiala"></icon-svg>更多</a>
          <span class="task-detail-header-gap">|</span>
        </div>
      </div>
    </div>
    <div class="crumbsDiv">     

      <p> <icon-svg icon-class="wxbzhuye"></icon-svg>父任务:围剿三沙市<a href="javascript:;" @click.stop="taskChilrenDetailShowing"><span> &lt; 回到父任务</span></a></p>
    </div>
    <div class="task-detail-main-wrapper">
      <div class="task-detail-main-left">
        <a href="javascript:;"
           @click.stop="checkTask(task.id,task.tiStatus)"
           v-bind:class="task.tiStatus == 2 ? 'task-complete' : ''"
           class="task-check"
          >
          <icon-svg v-bind:icon-class="task.tiStatus == 2 ? '_checkbox_click' : 'checkbox-no'"/>
        </a>
        <span
          class="task-title"
          @click="doTitleEdit"
          v-bind:class="task.tiStatus == 2  ? 'delTitleCss' : '' "
          v-if="!titleEditing">{{ task.tiTitle }}
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
              v-model="task.tiTitle"
              @keypress.enter.prevent="submitTitleEdit()"
              style="overflow: hidden; word-wrap: break-word; resize: none; height: 38px;"></textarea>
          </div>
          <!-- <el-button @click="submitTitleEdit" type="success" size="mini" round>确定</el-button>
          <el-button size="mini" @click="cancelTitleEdit" round>取消</el-button> -->
        </div>
      </div>
      <!-- 分配任务_截至日期 -->
      <div class="task-detail-main-right">
        <div class="attribute-handler-groups">
            <!-- 分配任务人 -->
            <el-popover
              ref="popover1"
              placement="bottom"
              slot="reference"
              width="200"
              trigger="click">
                  <el-tree
                    class="filter-tree"
                    :data="data1"
                    :props="defaultProps"
                    accordion
                    @node-click="handleNodeClick"
                    ref="tree1">
                  </el-tree>            
            </el-popover>

            <div class="attribute-handler" v-popover:popover1  >
                <div class="title">分配任务</div>
                <div v-if='task.tiMnageUserName == null'>
                  <icon-svg icon-class="profile1"></icon-svg>
                </div>
                <div v-else>
                  <div class="task-detail-participant-cont">
                    <div class="lc-avatar-24">
                      <span class="lc-avatar-def" >
                        {{task.tiMnageUserName |nameString}}
                      </span>
                    </div>                 
                  </div>
                  <div style="display:inline-block;margin-top:-20px;">
                    <span>{{task.tiMnageUserName}}</span>
                  </div>
                  
                </div>
            </div>

          <!--结束时间-->
          <div class="attribute-handler">
            <div class="title" >截止时间</div>
             <el-date-picker
              v-model="task.tiEndDate"
              type="date"
              size='small'
              value-format="timestamp"
              @change='dateFunction'
            >
           </el-date-picker>
        </div>

        </div>
      </div>
    </div>
    <!-- 详细描述 -->
    <div class="task-detail-desc-wrapper">
      <div
        v-if="!taskDescEditing"
        v-bind:class="task.tiDesc == null ? 'empty' : ''"
        class="task-detail-desc-content" @click="doTaskDescEdit">
        {{ task.tiDesc == null ? '暂无详细描述' : task.tiDesc }}
        <a v-if="task.tiDesc  !== null && !taskDescEditing" class="add-more-desc" href="javascript:;" @click="doTaskDescEdit">添加描述</a>
      </div>
      <div class="title-editor" v-if="taskDescEditing">
        <div class="form-group">
            <textarea
              ref="taskDescEditor"
              class="form-control task-desc-editor"
              placeholder="输入任务内容..."
              rows="5"
              v-model="task.tiDesc"></textarea>
        </div>
        <el-button @click="submitTaskDescEdit" type="success" size="mini" round>确定</el-button>
        <el-button size="mini" @click="cancelTaskDescEdit" round>取消</el-button>
      </div>
      <span class="desc-edit-trigger" v-if="task.tiDesc !== null && !taskDescEditing" @click="doTaskDescEdit">编辑</span>
    </div>

    <!-- 附件添加 -->
    <div class="task-detail-participant-wrapper" style='padding:10px 0;' v-show='fileList.length !== 0 || uploadDivShow'>
      <label class='modal-row-label ng-binding'>
        <a href="javascript:;" ><icon-svg icon-class="fujian"></icon-svg>附件</a>
      </label>
      <el-upload
        class="upload-demo"
        action="123"
        :before-upload='uploadUrl'
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success='handleSuccess'
        :before-remove="beforeRemove"
        multiple  
        :file-list="fileList">
        <el-button size="small"  slot="trigger" ref='uploadRef' style="width:0;height:0;display:none;"></el-button>
      </el-upload>
    </div>

    <!-- 参与人 -->
    <div class="task-detail-participant-wrapper">
      <div class="task-detail-participant-label">
        <icon-svg icon-class="team"></icon-svg>
        <span>参与人</span>
      </div>
      <div class="task-detail-participant-cont" v-for="(own,index) in participatorCheckedArray" :key="index">
        <div class="lc-avatar-24" :idKey='own.userId'>
          <a href="javascript:;" @click="participantsDel(own.userId)"><icon-svg icon-class="shanchu1" class='closeIcon' ></icon-svg></a>
          <span class="lc-avatar-def">
            {{own.userNamme | nameString}}
          </span>
        </div>
      </div>
      <a href="javascript:;" v-popover:popover4 >
        <icon-svg icon-class="jiahao" style="margin:15px 0 -7px 5px;height:24px;width:24px;"></icon-svg>
      </a>
      <!--参与人-->
      <el-popover
        ref="popover4"
        placement="right"
        width="200"
        trigger="click">
        <el-tabs v-model="popoverActiveName" @tab-click="handleClick">
          <!-- <el-tab-pane label="项目" name="first"> -->
            <el-input
              placeholder="搜索成员...."
              v-model="filterText"
              class='search'>
              <icon-svg icon-class="fangdajing" class='searchIcon'></icon-svg>
            </el-input>

            <el-tree
              class="filter-tree"
              :data="data2"
              show-checkbox
              highlight-current
              :props="defaultProps"
              @check='testArrayFun'
              :filter-node-method="filterNode"
              ref="tree2">
            </el-tree>
         <!--  </el-tab-pane>
          <el-tab-pane label="部门" name="second">
            <el-tree
              class="filter-tree"
              :data="data3"
              show-checkbox
              highlight-current
              @check='testArrayFun'
              :props="defaultProps"
              default-expand-all
              ref="tree3">
            </el-tree>
          </el-tab-pane> -->
        </el-tabs>              
      </el-popover>
    </div>

    <!-- 评论/活动 列表 -->
    <div class="task-detail-participant-wrapper">
      <div class="commentActionvDive">
        <el-tabs  @tab-click="handleClick">
          <el-tab-pane>
            <span slot="label"><icon-svg icon-class="pinglun"></icon-svg>评论</span>
            <div class="clearfix commentDiv" v-for="(item,index) in commentData" :key='index'>
              <div class="commentDivHeaderPho">
                <img src="./timg.jpg" width="30" height="30">
              </div>
              <div class="commentDivContent">
                <p>{{item.realName}} {{item.tcOprDate | formatDate}}</p>
                <p>{{item.tcDesc}}</p>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><icon-svg icon-class="gengduo-2"></icon-svg>活动</span>
            <div v-for='(item,index) in actionData' :key='index'>
              <p style="position:relative;padding: 5px 3%;">
                <icon-svg icon-class="renwu"></icon-svg>
                <span style="margin-left:15px;">{{item.userName}}</span>
                <span style="margin-left:15px;">{{item.tlOprDesc}}</span>
                <span style="float:right;">{{item.tlOprDate | formatDate}}</span>
              </p>            
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 评论/活动 文本域提交 -->
    <div class="el-dialog__footer" slot='footer'>
      <div>
        <img src="./timg.jpg">

        <div v-if="!footer_comment_zhen">
          <input class='comment-body-input' @focus="txtfocus()" placeholder="评论内容 Ctrl+Enter发送" />
        </div>    

        <div class="form-group el_dialog_footer_comment"  v-if="footer_comment_zhen">
          <textarea
                ref="taskDescEditor"
                class="form-control task-desc-editor"
                placeholder="评论内容 Ctrl+Enter发送"
                rows="5"
                @keypress.enter.prevent='submitCommentDescEdit'
                v-model="commentContent">
          </textarea>
          <el-button @click="submitCommentDescEdit" type="success" size="mini" round>确定</el-button>
          <el-button size="mini" @click="cancelCommentDescEdit" round>取消</el-button>
        </div>
          
      </div>
    </div>
  </el-dialog>
</template>

<script>
import randomColor from 'randomcolor'

export default {
  name: 'taskdetail',
  data () {
    return {
      task:{},
      testData:[],
      actionData:[],
      showingTaskDetail: false,
      titleEditing: false,
      taskDescEditing: false,
      pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
      },
      delTitle:false,
      data1:[],
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText:'',
      commentContent:'',
      popoverActiveName:'first',
      footer_comment_zhen:false,
      fileList:  [],
      newChilrenTask:[],
      newChilrenTaskIf:true,
      showIcon:false,
      participatorCheckedArray:[],
      assignment:'',
      uploadDivShow:false,
      commentData:[]
    }
  },
  computed: {
  },
  watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
  },
  filters:{  
    formatDate: function (value) {
      var val = JSON.parse(value)
      var date = new Date(val);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y+M+D+h+m+s;
    },
    nameString:function(value){
      if(value.length > 2){
          return value.substr(value.length-2);
      }else{
        return value
      }
    }
  },
  created() {
    this.$store.dispatch('getTaskDetail', {
      id: this.taskID
    })

  },
  mounted() {
    this.showingTaskDetail = true
    this.updateComment();
    this.originalData();
    this.originalDataChilren();
    this.findLogListFunc();
    this.findDeptUsersFunc();
    this.findFilesFunc();
    this.findJoinPersonsFunc();
  },
  props: [
    'taskID'
  ],
  methods: {
    getTasks(id) {
      return this.testData.filter(task => task.tiTitle);
    },
    getCompletedTasks(id) {
      return this.testData.filter(task => task.tiStatus === '2');
    },
    getPercent(id) {
      const percent = (this.getCompletedTasks(id).length / this.getTasks(id).length) * 100;
      return percent > 0 ? percent : 0
    },
    afterClose() {
      this.$emit('closed')
    },
    checkTask(id,num) {
      var that = this;
      var status = num == '2' ? '1' : '2';
      this.$http.post('/api/mytask/modifyTaskInfo',{
        "tiFkNo":that.taskID,
        "tiStatus":status
      }).then(function(res){ 
          that.task.tiStatus = status == 2 ? true : false;
          that.originalData();
      }).catch(function(error){
      })
    },
    doTitleEdit() {
      this.titleEditing = true
      let self = this
      this.$nextTick(function(){
        self.$refs.taskTitleEditor.focus()
      })
    },
    submitTitleEdit() {
      this.titleEditing = false
      var that = this;
      this.$http.post('/api/mytask/modifyTaskInfo',{
        "tiFkNo":that.taskID,
        "tiTitle":that.task.tiTitle
      }).then(function(res){ 
          that.originalData();
      }).catch(function(error){
      })
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
        this.titleEditing = false
        var that = this;
        this.$http.post('/api/mytask/modifyTaskInfo',{
          "tiFkNo":that.taskID,
          "tiDesc":that.task.tiDesc
        }).then(function(res){ 
            that.originalData();
            that.taskDescEditing = false
        }).catch(function(error){
        })
    },
    filterNode(value, data) {  // 搜索成员
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data, node, vuecomponent){  // 分配人员- 树- 选中操作__
      const that = this;
       if(node.childNodes ==''){
          this.$http.post('/api/mytask/modifyTaskInfo',{
            "tiFkNo":that.taskID,
            "tiMnageUserId":data.id
          }).then(function(res){ 
              that.task.tiMnageUserName = data.label
          }).catch(function(error){
          })
       }else{
          return false
       }
    },
    handleClick(tab, event) {
    },
    txtfocus(){
      this.footer_comment_zhen = true;
    },
    cancelCommentDescEdit(){
      this.footer_comment_zhen = false;
    },
    submitCommentDescEdit(){
      const that = this;
      this.$http.post('/api/mytask/saveTaskComment',{ 
          "tiFkNo":that.taskID,
          "tcDesc":this.commentContent
      }).then(function(res){ 
          that.$message(res.data.message);
          that.footer_comment_zhen = false;    
          that.commentContent = '';
          that.updateComment();
      }).catch(function(error){
      })

    },
    handleRemove(file, fileList) {
    },
    handlePreview(file,fileList) {
      var requestConfigHeard = {
       headers: {
        "content-disposition":"attachment;filename="+file.name,
        "content-type":"application/x-download;charset=utf-8"
       },
      }
      const that = this;
      this.$http.get('/api/downFile?fileName='+file.name+'&busType=mytask',requestConfigHeard).then(function(res){ 
          that.download(res.data,file.name);
      }).catch(function(error){
      })
    },
    handleSuccess(file,fileList){
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    doAddChilrenTask(){
      this.newChilrenTaskIf = false
      const self = this
      this.$nextTick(function(){
        self.$refs.newChilrenTask.focus()
      })
    },
    submitAddChilrenTask(){
      this.newChilrenTaskIf = true
      const that = this;
      this.$http.post('/api/mytask/saveSubTaskInfo',{ 
          "tiParentFkNo":that.taskID,
          "tiTitle":that.newChilrenTask
      }).then(function(res){ 
          that.originalDataChilren();
          that.newChilrenTaskIf = true
          that.newChilrenTask = []
      }).catch(function(error){
          that.originalDataChilren();
          that.newChilrenTaskIf = true
          that.newChilrenTask = []
      })
    },
    childrenTaskShow(){
      const self = this
      this.showIcon = true
      this.newChilrenTaskIf = this.newChilrenTaskIf === true ? false : true
      this.$nextTick(function(){
        self.$refs.newChilrenTask.focus()
      })
    },
    childrenTaskDel(id){
      var that = this;  
      that.$http.get('/api/mytask/delTask?tiFkNo='+id).then(function(res){ 
          that.originalDataChilren();
          that.$message('删除成功');
      }).catch(function(error){
      })
    },
    childrenTaskEdit(id){
      const self = this
      this.testData[id].ture = true
    },
    editTitleAddChilrenTask(id,index){
      var that = this;  
      that.$http.post('/api/mytask/modifyTaskInfo',{
        "tiFkNo":id,
        "tiTitle":that.testData[index].tiTitle
      }).then(function(res){ 
          that.originalDataChilren();
      }).catch(function(error){
      })
    },
    testArrayFun(halfCheckedKeys){
      var array1 = this.$refs.tree2.getCheckedNodes().filter(item => item.children == null);
      var array2 = array1.map(function(item){return item.id});  
      var that = this;  
      that.$http.post('/api/mytask/saveTaskJoinPersons',{
        "tiFkNo":that.taskID,
        "userId":array2
      }).then(function(res){ 
          that.findJoinPersonsFunc();
      }).catch(function(error){
      })
    },
    uploadDivBtn(){
      this.uploadDivShow = true;
      this.$refs.uploadRef.$el.click();
    },
    taskDetailShowing(id){
      this.$emit('closedTaskdetail',false)
    },
    updateComment(){
        var that = this;
        this.$http.get('/api/mytask/findTaskComments?tiFkNo='+that.taskID).then(function(res){ 
            that.commentData = res.data.data;
        }).catch(function(error){
        })
    },
    originalData(){
      var that = this;
        this.$http.get('/api/mytask/findSingleTaskInfo?tiFkNo='+this.taskID).then(function(res){ 
            that.task = res.data.data;
        }).catch(function(error){
        })
    },
    dateFunction(){
        this.titleEditing = false
        var that = this;
        this.$http.post('/api/mytask/modifyTaskInfo',{
          "tiFkNo":that.taskID,
          "tiEndDate":that.task.tiEndDate
        }).then(function(res){ 
            that.originalData();
        }).catch(function(error){
        })
    },
    originalDataChilren(){
       var that = this;
        this.$http.get('/api/mytask/findSubTaskList?tiParentFkNo='+this.taskID).then(function(res){ 
            that.testData = res.data.data.subTaskList
        }).catch(function(error){
        })
    },
    findLogListFunc(){
        var that = this;
        this.$http.get('/api/mytask/findLogList?tiFkNo='+this.taskID).then(function(res){ 
          that.actionData = res.data.data;
        }).catch(function(error){
        })
    },
    findDeptUsersFunc(){
        var that = this;
        this.$http.get('/api/dept/findDeptUsers').then(function(res){ 
          that.data1 = res.data.data;
          that.data2 = res.data.data;
        }).catch(function(error){
        })
    },
    findFilesFunc(){
        var that = this;
        this.$http.get('/api/findFiles?busNo='+this.taskID).then(function(res){ 
          var arrayData = [];
          for(let i=0;i<res.data.data.length;i++){
              let json = {};
              json.url = res.data.data[i].tfFileName;
              json.name =res.data.data[i].tfSourceFile;
              arrayData.push(json)
          }
          that.fileList = arrayData;
        }).catch(function(error){
        })
    },
    uploadUrl(file){
        var that = this;
        let fileFormData = new FormData();
        fileFormData.append('file',file,file.name);
        fileFormData.append('busNo', that.taskID);
        fileFormData.append('busType', 'mytask');
        let requestConfig = {
         headers: {
         'Content-Type': 'multipart/form-data'
         },
        }
        this.$http.post('/api/uploadFile',fileFormData,requestConfig).then(function(res){ 
          that.findFilesFunc();
          that.$message('上传成功')
        }).catch(function(error){
        })

    },
    findJoinPersonsFunc(){
        var that = this;
        this.$http.get('/api/mytask/findJoinPersons?tiFkNo='+this.taskID).then(function(res){ 
          that.participatorCheckedArray = res.data.data;
        }).catch(function(error){
        })
    },
    participantsDel(id){
        const that = this;
        this.$http.get('/api/mytask/delTaskJoinPersons?tiFkNo='+that.taskID+'&userId='+id).then(function(res){ 
          that.findJoinPersonsFunc();
          that.$message('删除参与人成功');
        }).catch(function(error){
        })
    },
    download (data,name) {
        if (!data) {
            return
        }
        var url = window.URL.createObjectURL(new Blob([data]))
        var link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()
    },
    taskChilrenDetailShowing(){
      this.$emit('closedChilrenTaskdetail',false)
    }

  
  }
}
</script>
<style coped>
.clearfix:after {  
  content: " ";
  display: block;
  clear: both;
  height: 0; 
}
.attribute-handler-groups:hover{
  cursor:pointer;
}
.el-popover .el-input__inner{
  height:30px;
}
.search{
  position:relative;
}
.searchIcon{
  position:absolute;
  top:0;
  left:0;
}
.el-dialog__body{
  border-bottom:solid 1px #dddddd;
}
.comment-body-input{
    width: 90%;
    height:40px;
    margin-left: 10px;
    flex: 1 1 0%;
    background: rgb(243, 243, 243);
    border-radius: 3px;
    padding: 1px 1px 1px 20px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    outline: 0px;
}
.el-dialog__footer{
  padding:1px;
  min-height:50px;
}
.el-dialog__footer input{
  float:right;
}
.el-dialog__footer img{
  float:left;
  width:35px;
  height:35px;
  margin-left:2%;
  margin-top:2px;
}
.el_dialog_footer_comment{}

.commentDiv{
  border-bottom:1px solid #dddddd;
  width:100%;
  height:auto;
  margin:5px;
}
.commentDivHeaderPho{
  float:left;
  margin-right:3%;
}
.commentDivContent{
  float:left;
  margin-bottom:5px;
  width:90%;
}
.upload-demo{
  margin-top:10px;
}
.delTitleCss{
  text-decoration:line-through;
}
.el-dialog__body{
  height:700px;
  overflow-y:scroll;
}
.el-dialog{
  margin-top:4vh !important;
}
.task-card{
  padding:6px;
}
.entry-tasks-chidren{
  margin-top:10px;
}
.entry-tasks-chidren .task-title{
  flex:none !important;
}
.childrenTaskEdit{
  margin-left:20px;
}
.childrenTaskDel{
  margin-left:10px;
}
.editDelIcan{
  display:none;
}
.task-main:hover .editDelIcan{
    display:block;
}
.task-subtasks .task-item .task-item-wrapper .task-cell-title .add-sub-task-name, .task-subtasks .task-item .task-item-wrapper .task-cell-title .update-sub-task-name {
    resize: none;
    margin-top: 5px;
    height: 28px;
    width: 700px;
    line-height: 20px;
    padding: 4px 0px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
}
.form-control {
    display: block;
    width: 100%;
    height:35px;
    line-height: 1.5;
    color: rgb(51, 51, 51);
    background-color: rgb(255, 255, 255);
    background-clip: padding-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(238, 238, 238);
    border-image: initial;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:130px;
}
.el-tabs__nav is-top{
  width:100%;
}
#tab-first,#tab-second{
  padding: 0 20px;
  text-align:center;
}
.lc-avatar-24{
  width:25px;
  height:25px;
  border-radius:50%;
  background-color: rgb(57, 186, 93);
  position:relative;
}
.lc-avatar-24:hover .closeIcon{
  display:block;
}
.lc-avatar-24 span{
  color:white;
}
.task-detail-participant-cont{
  margin:10px 0 10px 8px;
  display:inline-block;
}
.upload-demo{
  margin-top:-20px;
}
.lc-avatar-24,.lc-avatar-def,.task-detail-participant-cont{
  cursor:pointer;
}
.closeIcon{
  position:absolute;
  top:-5px;
  right:-8px;
  display:none;
}
.crumbsDiv{
  margin-bottom:5px;
}
.crumbsDiv span{
      color: #22d7bb;
}
.upload-demo{
  margin-top:-20px;
}
</style>
