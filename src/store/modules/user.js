import {getToken, setToken, removeToken} from '@/utils/auth'
import request from '@/utils/request'

const user = {
  state: {
    username: '',
    token: getToken(),
    userInfo: {},

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    login ({commit}, loginForm) {
      return new Promise((resolve, reject) => {
        const username = loginForm.username
        const password = loginForm.password
        request({
          url: '/login',
          method: 'post',
          data: {
            username,
            password
          }
        }).then(response => {
          const data = response.data
          const token = data.tokenHead + data.token
          setToken(token)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default user
