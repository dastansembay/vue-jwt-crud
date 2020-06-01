import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import { financeRequests } from './financeRequests.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: false,
    snackmessage: '',
    snackbar: false
  },
  modules: {
    auth,
    financeRequests
  },
  mutations: {
    loader (state, payload) {
      state.loader = payload
    },
    snackbar (state, message) {
      state.snackmessage = message
      state.snackbar = true
    }
  }
})
