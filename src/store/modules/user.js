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
          url: '/login?username=' + username + '&password=' + password,
          method: 'post',
          /*data: {
            'username': username,
            'password': password
          }*/
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

    register ({commit}, registerForm) {
      return new Promise((resolve, reject) => {
        const username = registerForm.username
        const email = registerForm.email
        const password = registerForm.password
        request({
          url: '/register?username=' + username + '&password=' + password + '&email=' + email,
          method: 'post',
        }).then(response => {
          commit('SET_TOKEN', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    logout ({commit, state}) {
      return new Promise((resolve, reject) => {
        request({
          url: 'logout',
          method: 'post'
        }).then(() => {
          //clear token
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
