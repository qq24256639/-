// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import axios from 'axios';
import 'babel-polyfill'
import '@/icons' // icon
import '@/permission' // 权限
import './utils/tool'
import VueDragTree from '@/components/drag_tree'
import TabHeader from '@/components/tab_header'
import PageModule from '@/components/page_module'
import Kanban from '@/components/Kanban'
import SearchResult from '@/components/search_result'




import '../static/css/reset.css'

Vue.config.productionTip = false

Vue.component('vue-drag-tree', VueDragTree)
Vue.component('tab-header', TabHeader)
Vue.component('search-result', SearchResult)
Vue.component('page-module', PageModule)

//当创建实例的时候配置默认配置
var instance = axios.create({
    /** baseURL将会加到url的前面 **/
    // baseURL:'http://10.14.10.188:8089',
    /** token写入请求头 **/
    headers:{'Content-Type': 'application/json'},
});

Vue.prototype.$http = instance;

Vue.use(ElementUI)
Vue.use(Kanban)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

