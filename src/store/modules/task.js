/**
 * Created by alfred on 2018/9/12.
 * 负责从服务端获取任务列表
 */

import Vue from 'vue'

const task = {
  state: {
    "entries": [
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
        "name": "以后要做",
        "pos": 262142,
        "archived": 0,
        "create_date": 1423091255426,
        "update_date": 1423091255426,
        "watched": false
      }
    ],
    "tasks": [
      {
        "id": "7c35a646da1c41fa96936363ccf84e63",
        "entry_id": "c32f201c408d4199b10a0847c70deb4c",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 524287,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 1,
          "todo_checked_count": 0,
          "todo_count": 0,
          "file_count": 0
        },
        "todos": [],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1447682918335,
        "create_date": 1447376396845,
        "completed_date": 0,
        "fids": [],
        "entry_name": "Memo",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "7c35a646da1c41fa96936363ccf84e63",
        "entry_id": "c32f201c408d4199b10a0847c70deb4c",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 524287,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 1,
          "todo_checked_count": 0,
          "todo_count": 0,
          "file_count": 0
        },
        "todos": [],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1447682918335,
        "create_date": 1447376396845,
        "completed_date": 0,
        "fids": [],
        "entry_name": "Memo",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "ec0cdcafc41847b5ae6fff0756bc2ff3",
        "entry_id": "c32f201c408d4199b10a0847c70deb4c",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 2752511,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 1,
          "todo_checked_count": 0,
          "todo_count": 0,
          "file_count": 0
        },
        "todos": [],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1445347486102,
        "create_date": 1445251505755,
        "completed_date": 0,
        "fids": [],
        "entry_name": "Memo",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "6f633a1cdd904ffebcf27d5fd3a07620",
        "entry_id": "b5f651382d734303a018a707995a5838",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 131070,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 0,
          "todo_checked_count": 0,
          "todo_count": 2,
          "file_count": 0
        },
        "todos": [
          {
            "name": "规划路线",
            "todo_id": "56abac2089ef404f97af2c6e4e96b708",
            "checked": 0,
            "pos": 65535
          },
          {
            "name": "准备签证",
            "todo_id": "8d14a475480f4046a0d08d2fbe652733",
            "checked": 0,
            "pos": 131070
          }
        ],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1460539201044,
        "create_date": 1445085014030,
        "completed_date": 0,
        "fids": [],
        "entry_name": "SM-Travel",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "62f26b618de64a988f68e367b5d4aa7c",
        "entry_id": "780b4dffa1ba4bbfa2654ce11f5159be",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 4915193,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 1,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 2,
          "todo_checked_count": 0,
          "todo_count": 0,
          "file_count": 0
        },
        "todos": [],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1453599248664,
        "create_date": 1445348103769,
        "completed_date": 0,
        "fids": [],
        "entry_name": "Someday/Maybe",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "234f9313f52b434ba1049846555a82fc",
        "entry_id": "c32f201c408d4199b10a0847c70deb4c",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 425983,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 0,
          "todo_checked_count": 0,
          "todo_count": 0,
          "file_count": 0
        },
        "todos": [],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1506393720533,
        "create_date": 1445356995832,
        "completed_date": 0,
        "fids": [],
        "entry_name": "Memo",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "8db882de674047859ac201e53e7b8e31",
        "entry_id": "6fc4ddfce84d4236810b7e32b40eaffc",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 65535,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 1,
          "todo_checked_count": 0,
          "todo_count": 0,
          "file_count": 0
        },
        "todos": [],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1498304278589,
        "create_date": 1445511301222,
        "completed_date": 0,
        "fids": [],
        "entry_name": "SM-Research",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "62526f8a12694f5e9b6638de189bb4d5",
        "entry_id": "537a4802b33b45d8ac71b79ff9669f81",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 65535,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 0,
          "todo_checked_count": 0,
          "todo_count": 0,
          "file_count": 0
        },
        "todos": [],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1460539093094,
        "create_date": 1446378784406,
        "completed_date": 0,
        "fids": [],
        "entry_name": "SM-Shopping",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "6907acdefc7c4a518a0750f31bfe0778",
        "entry_id": "b5f651382d734303a018a707995a5838",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 65535,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 1,
          "todo_checked_count": 0,
          "todo_count": 3,
          "file_count": 0
        },
        "todos": [
          {
            "name": "办理台湾通行证",
            "todo_id": "2ff9bb4bd10d45a28ac742b4256540c8",
            "checked": 0,
            "pos": 65535
          },
          {
            "name": "路线规划",
            "todo_id": "3398f0612c2c42e9a7332069aa521cf6",
            "checked": 0,
            "pos": 131070
          },
          {
            "name": "机票酒店预订",
            "todo_id": "c847e8554249462790545a7763d8043a",
            "checked": 0,
            "pos": 196605
          }
        ],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1460539213697,
        "create_date": 1445138911060,
        "completed_date": 0,
        "fids": [],
        "entry_name": "SM-Travel",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "150f2257da7d469dac4611f2ca1d5c9b",
        "entry_id": "c32f201c408d4199b10a0847c70deb4c",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 376831,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 0,
          "todo_checked_count": 0,
          "todo_count": 0,
          "file_count": 0
        },
        "todos": [],
        "is_deleted": 0,
        "archived": 0,
        "update_date": 1506393453189,
        "create_date": 1446380729003,
        "completed_date": 0,
        "fids": [],
        "entry_name": "Memo",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      },
      {
        "id": "2ba4d6ab269b458c83f2d8472d43e916",
        "entry_id": "4a63b8b22c41421f878489ea4d2e75cb",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "name": "测试任务",
        "desc": "",
        "pos": 56851674.5,
        "labels": [],
        "uid": "8d339d389f1645bbb47b44f90032e4ec",
        "expire_date": 0,
        "completed": 0,
        "members": [],
        "badges": {
          "expire_date": 0,
          "comment_count": 0,
          "todo_checked_count": 0,
          "todo_count": 0,
          "file_count": 0
        },
        "todos": [],
        "is_deleted": 0,
        "is_locked": 0,
        "is_loop": 0,
        "archived": 0,
        "update_date": 1535696154055,
        "create_date": 1535696146058,
        "completed_date": 0,
        "fids": [],
        "entry_name": "Inbox",
        "watchers": [
          {
            "uid": "8d339d389f1645bbb47b44f90032e4ec",
            "name": "onthedesk",
            "display_name": "赵峰",
            "email": "sdzhaofeng@qq.com",
            "avatar": "7fed5eef-1b69-4607-9134-b38f9e97c9ed.jpg",
            "desc": "",
            "status": 3,
            "online": 0,
            "phone_prefix": "",
            "phone": "",
            "title": "",
            "department": ""
          }
        ]
      }
    ],
    task: {}
  },
  mutations: {
    SET_TASKS: (state, tasks) => {
      state.tasks = tasks
    },
    SET_ENTRIES: (state, entries) => {
      state.entries = entries
    },
    SET_TASK: (state, task) => {
      // state.task = task
      // todo 更新列表中的数据
      Vue.set(state, 'task', task)
    },
    MOVE_TASK: (state, data) => {
      // todo 更新任务归属

    },
    CHECK_TASK: (state, data) => {
      let task = state.tasks.find(task => task.id === data.id)
      //task.completed = task.completed === 0 ? 1 : 0
      Vue.set(task, 'completed', task.completed === 0 ? 1 : 0)
      if ('completion' in state.task) {
        state.task.completion.is_completed = state.task.completion.is_completed === 0 ? 1 : 0
      }
    },
    ADD_TASK: (state, data) => {
      state.tasks.push(data)
    },
    ADD_ENTRY: (state, data) => {
      state.entries.push(data)
    },
    SET_ENTRY: (state, data) => {

    }
  },

  actions: {
    moveTask ({commit}, data) {
      // todo 更新任务排序
      commit('MOVE_TASK', data)
    },
    checkTask ({commit}, data) {
      // todo 请求后端，complete or uncomplete
      commit('CHECK_TASK', data)
    },
    addTask ({commit}, data) {
      // todo 请求后端, add
      let example = {
        "project": "5b78d13f51ec187001bbaf04",
        "title": "这是个新任务",
        "entry": "5b78d13f51ec187001bbaf05",
        "due_date": null,
        "assignee": null,
        "parent": "",
        "visibility": 0
      }
      // todo 请求后端获取task.id

      let task = Object.assign({}, data)
      task.id = String(Math.random())
      commit('ADD_TASK', task)
    },
    addEntry ({commit}, data) {
      let example = {
        "__v": 0,
        "id": "5b9ccd5ac389d65568ba3c38",
        "archived": 0,
        "client": 1,
        "create_date": 1537002842156,
        "entry_id": "61d9f7b4fbb2477fb402fccefcc06e89",
        "is_deleted": 0,
        "name": "你好新列表",
        "pid": "489acadfb1e44efca0b3c317a12d2f5c",
        "pos": 520190,
        "status": 1,
        "update_date": 1537002842156,
        "watchers": []
      }

      // todo 请求后端获取entry id
      let entry = Object.assign({}, data)
      entry.id = String(Math.random())
      commit('ADD_ENTRY', entry)
    },
    getTaskDetail ({commit}, data) {
      let example = {
        "id": "7c35a646da1c41fa96936363ccf84e63",
        "entry": "c32f201c408d4199b10a0847c70deb4c",
        "identifier": "13",
        "title": "任务详情演示",
        "description": "任务详情。",
        "is_deleted": 0,
        "is_archived": 0,
        "type": 0,
        "priority": 0,
        "visibility": 0,
        "lock": 0,
        "badges": [],
        "created_at": 1467901920,
        "updated_at": 1537071241,
        "privileges": {
        "value": "1111111111111111111111111111111111",
          "scope": {}
        },
        "project": {
          "id": "5b78d13f51ec187001bbaf04",
            "name": "量化交易入门指南",
            "color": "#a7cfae",
            "visibility": 1
        },
        "completion": {
          "is_completed": 0
        },
        "reminders": [],
          "tags": [],
          "extensions": [],
          "extension_fields": [],
          "workload_estimated_summary": 0,
          "workload_summary": 0,
          "workload_entries": [],
          "children": [],
          "workload_deviation_summary": 0,
          "watchers": [
          {
            "uid": "c28a4a3a53e4449782c41bd97077cafa",
            "name": "alfred",
            "display_name": "赵峰",
            "avatar": "default.png",
            "mobile": "18600399682",
            "email": ""
          },
          {
            "uid": "c28a4a3a53e4449782c41bd97077cafb",
            "name": "alfred",
            "display_name": "赵峰",
            "avatar": "default.png",
            "mobile": "18600399682",
            "email": ""
          },
          {
            "uid": "c28a4a3a53e4449782c41bd97077cafc",
            "name": "alfred",
            "display_name": "赵峰",
            "avatar": "default.png",
            "mobile": "18600399682",
            "email": ""
          }
        ],
          "comments": [
          {
            "_id": "5b78d13f51ec187001bbaf25",
            "content": "创建了任务",
            "client": 1,
            "created_at": 1467901920,
            "updated_at": 1467901920,
            "created_by": {
              "uid": "c28a4a3a53e4449782c41bd97077cafa",
              "name": "alfred",
              "display_name": "赵峰",
              "avatar": "default.png",
              "mobile": "18600399682",
              "email": ""
            },
            "updated_by": {
              "uid": "c28a4a3a53e4449782c41bd97077cafa",
              "name": "alfred",
              "display_name": "赵峰",
              "avatar": "default.png",
              "mobile": "18600399682",
              "email": ""
            },
            "attachments": []
          }
        ],
          "attachments": [],
          "likes": [],
          "created_by": {
          "uid": "c28a4a3a53e4449782c41bd97077cafa",
            "name": "alfred",
            "display_name": "赵峰",
            "avatar": "default.png",
            "mobile": "18600399682",
            "email": ""
        },
        "updated_by": {
          "uid": "c28a4a3a53e4449782c41bd97077cafa",
            "name": "alfred",
            "display_name": "赵峰",
            "avatar": "default.png",
            "mobile": "18600399682",
            "email": ""
        },
        "entry_name": "Inbox",
          "entry_position": 10922.666666666666
      }
      console.log('I am getting task detail of id:' + data.id)
      // todo 请求后端获取任务详情
      let task = Object.assign({}, example)
      commit('SET_TASK', task)
    },
    updateTask ({commit}, data) {
      // todo 更新任务
      commit('')
    }
  }
}

export default task
