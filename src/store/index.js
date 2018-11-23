/**
 * Created by alfred on 2018/8/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import RuleRole from './modules/rule_role'
import task from './modules/task'
import activity from './modules/activity'
import dataCenter from './modules/data_center'
import indicator from './modules/indicator'
import student from './modules/student'
import teacher from './modules/teacher'
import course from './modules/course'
import major from './modules/major'
import classes from './modules/classes'



Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    RuleRole,
    task,
    activity,
    dataCenter,
    indicator,
    student,
    teacher,
    course,
    major,
    classes
  },
  getters
})

export default store
