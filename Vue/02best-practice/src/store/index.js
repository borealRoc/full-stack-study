import Vue from 'vue'
import Vuex from 'vuex'
import per from './modules/per'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {per, user},
  // 全局定义getters便于访问
  getters: {
    roles: state => state.user.roles
  }
})
