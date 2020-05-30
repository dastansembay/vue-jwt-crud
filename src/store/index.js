import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: false
  },
  modules: {
    auth
  },
  mutations: {
    loader (state, payload) {
      state.loader = payload
    }
  }
})
