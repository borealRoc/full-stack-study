import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import create from './utils/create'

Vue.config.productionTip = false

// 总线模式
// 给Vue的原型添加一个$bus属性，它指向一个新的Vue实例，它只用于组件间的数据传递
Vue.prototype.$bus = new Vue()

// 将动态组件实例的创建方法添加到Vue的原型上
Vue.prototype.$create = create

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
