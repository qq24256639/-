import Vue from 'vue'
import IconSvg from '@/components/Icon-svg'// svg组件
import './icon-font/iconfont'
// register globally
Vue.component('icon-svg', IconSvg)

const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('./svg', false, /\.svg$/)
const req = require.context('!svg-sprite-loader?{"symbolId":"icon-[name]"}!./svg', false, /\.(svg)$/)

requireAll(req)
