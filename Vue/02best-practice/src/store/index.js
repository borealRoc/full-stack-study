import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import per from './per'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    per,
  },
  getters: {
    roles: state => state.user.roles,
    permission_routes: state => state.per.fullRoutes,
    token: state => state.user.token,
  }
})
