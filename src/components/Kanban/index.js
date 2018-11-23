/**
 * Created by alfred on 2018/9/2.
 */
import Kanban from './kanban';
import Vue from 'vue'

export default {
  install(Vue) {
    Vue.component('kanban-board', Kanban);
  },
};
