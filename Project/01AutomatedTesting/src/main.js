import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
// import axios from 'axios'
import TestGlobalComp from './components/TestGlobalComp.vue'

Vue.config.productionTip = false
// Vue.prototype.$axios = axios
Vue.component('TestGlobalComp', TestGlobalComp)

new Vue({
  render: h => h(App),
}).$mount('#app')
