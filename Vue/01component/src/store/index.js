import Vue from 'vue'
import Vuex from 'vuex'
import count from './count/count'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 把count命名为grenade
    grenade: count
  }
})
