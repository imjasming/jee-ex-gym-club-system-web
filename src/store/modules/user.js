import {getToken, setToken, removeToken} from '@/utils/auth'
import {getStore, setStore} from '@/utils/localStorage'
import request from '@/utils/request'

const user = {
  state: {
    username: '',
    token: getToken(),
    userInfo: {},
    trainerList: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_INFO: (state, info) => {
      state.userInfo = info
      setStore('userInfo', info)
    },
    SET_TRAINER_LIST: (state, list) => {
      state.trainerList = list
      setStore('trainerList', list)
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
          url: '/register'/*?username=' + username + '&password=' + password + '&email=' + email*/,
          method: 'post',
          data: {
            username,
            email,
            password
          }
        }).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    logout ({commit, state}) {
      return new Promise((resolve, reject) => {
        //clear token
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    getInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        request({
          url: '/user/get-info',
          method: 'get'
        }).then(response => {
          const data = response.data
          commit('SET_INFO', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTrainerList ({commit, state}) {
      return new Promise((resolve, reject) => {
        request({
          url: '/user/get-list',
          method: 'get'
        }).then(response => {
          const data = response.data
          commit('SET_INFO', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUserProfile ({commit, state}, profileForm) {
      return new Promise((resolve, reject) => {
        const email = profileForm.email
        const username = state.userInfo.username
        request({
          url: '/user/' + username + '/update-profile',
          method: 'post',
          data: {
            email
          }
        }).then(response => {
          const data = response.data
          commit('SET_INFO', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
