import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    features: [
      { id: 1, name: "类型注解", version: "2.0" },
      { id: 2, name: "接口", version: "1.0" },
      { id: 3, name: "泛型", version: "3.0" }
    ]
  },
  getters: {
    featuresLength(state: any) {
      return state.features.length
    }
  },
  mutations: {
    addFeatureMutation(state: any, featureName: string) {
      state.features.push({ id: state.features.length + 1, name: featureName, version: '2.0' })
    }
  }, actions: {
    addFeatureAction({ commit }, featureName: string) {
      commit('addFeatureMutation', featureName)
    }
  }
})