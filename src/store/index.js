import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import { financeRequests } from './financeRequests.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: false
  },
  modules: {
    auth,
    financeRequests
  },
  mutations: {
    loader (state, payload) {
      state.loader = payload
    }
  }
})
