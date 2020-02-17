import axios from '@/axios.js'

const api = {
  getNcovData() {
    const ncovData = localStorage.getItem('ncovData')
    if (ncovData) {
      return Promise.resolve(JSON.parse(ncovData))
    }
    return axios.get('http://api.tianapi.com/txapi/ncovcity/index', {
      params: {
        key: 'e82f86af9a0391032dc487dcce8f6b69'
      }
    })
  },
  getNcovDataAll() {
    const ncovDataAll = localStorage.getItem('ncovDataAll')
    if (ncovDataAll) {
      return Promise.resolve(JSON.parse(ncovDataAll))
    }
    return axios.get('http://api.tianapi.com/txapi/ncov/index', {
      params: {
        key: 'e82f86af9a0391032dc487dcce8f6b69'
      }
    })
  }
}
export default api
