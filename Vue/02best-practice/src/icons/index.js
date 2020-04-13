import Vue from "vue";
import Icon from "@/components/Icon.vue";

// 图标自动导入
// 利用webpack 的require.context自动导入
// 返回的req是只去加载svg目录中的模块的函数
// ./svg 上下文路径
// false 不要递归
// /\.svg$/ 在上下文路径要查找的文件
const req = require.context("./svg", false, /\.svg$/)
console.log('图标数组', req.keys())
req.keys().map(req)

// Icon组件全局注册
Vue.component("Icon", Icon);