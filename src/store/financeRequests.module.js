import FinanceRequestService from '../services/financeRequests.service'

const initialState = {
  items: []
}

export const financeRequests = {
  namespaced: true,
  state: initialState,
  actions: {
    fetchItems ({ commit }) {
      return FinanceRequestService.get().then(
        data => {
          commit('setItems', data)
        },
        error => {
          console.log(error)
          return Promise.reject(error)
        }
      )
    },
    postItem ({ commit }, item) {
      return FinanceRequestService.post(item).then(
        data => {
          commit('updateItem', data)
        },
        error => {
          console.log(error)
          return Promise.reject(error)
        }
      )
    },
    deleteItem ({ commit }, item) {
      return FinanceRequestService.delete(item.id).then(
        () => {
          commit('deleteItem', item.id)
        },
        error => {
          console.log(error)
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    setItems (state, financeRequests) {
      state.items = financeRequests
    },
    updateItem (state, item) {
      const storedItem = state.items.find(i => i.id === item.id)
      if (storedItem === undefined) {
        state.items.push(item)
      } else {
        Object.assign(storedItem, item)
      }
    },
    deleteItem (state, id) {
      const index = state.items.findIndex(i => i.id === id)
      state.items.splice(index, 1)
    }
  }
}
