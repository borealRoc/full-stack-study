import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './router/router-guard'
import permission from '@/directive/permission'

// 图标自动导入
import './icons'
// 注册指令
Vue.directive('per', permission)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
