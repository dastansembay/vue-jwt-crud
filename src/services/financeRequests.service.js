import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env.VUE_APP_BASE_URL + '/api/financerequests'
class FinanceRequestService {
  get () {
    return axios
      .get(API_URL,
        {
          headers: authHeader(),
          params: {
            offset: 0,
            fetch: 100
          }
        })
      .then(response => {
        return response.data
      })
  }

  post (item) {
    return axios
      .post(API_URL, item,
        {
          headers: authHeader()
        })
      .then(response => {
        return response.data
      })
  }

  delete (id) {
    return axios
      .delete(API_URL + '/' + id,
        {
          headers: authHeader()
        })
      .then(response => {
        return response.data
      })
  }
}

export default new FinanceRequestService()
