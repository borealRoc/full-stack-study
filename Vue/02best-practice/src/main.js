import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./permission"

Vue.config.productionTip = false

// 图标自动导入`
import "@/icons/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
