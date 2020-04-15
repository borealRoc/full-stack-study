// 图标自动导入
// ./svg: 上下文路径
// false: 不要递归
// /\.svg$： 上下文路径要处理的文件格式
const req = require.context('./svg', false, /\.svg$/)
// 遍历加载上下文中的选项
req.keys().map(req)

import Vue from 'vue'
import SvgIcon from '@/components/Icon/Svg.vue'
// svg-icon组件全局注册
Vue.component('svg-icon', SvgIcon)
