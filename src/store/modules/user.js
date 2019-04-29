import {getToken, setToken, removeToken} from '@/utils/auth'
import {clearStore, getStore, setStore} from '@/utils/localStorage'
import request, {post} from '@/utils/request'
import {Message} from 'element-ui'

const user = {
  state: {
    username: '',
    token: getToken(),
    userInfo: getStore('userInfo'),
    trainerList: getStore('trainerList'),
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
    },

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
          commit('SET_TOKEN', token)
          setToken(token)
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
        clearStore()
        resolve()
      })
    },
    initUserData ({commit, state}) {
      return new Promise((resolve, reject) => {
        const getInfo = request.get('/user/get-info')
        const getTrainers = request.get('/user/trainers')
        request.all([getInfo, getTrainers]).then(request.spread((info, trainers) => {
            commit('SET_INFO', info.data)
            commit('SET_TRAINER_LIST', trainers.data)
            resolve()
          })
        ).catch(error => {
          if (error.response.status === 404) {
            resolve()
          }
          reject(error)
        })
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
          //commit('SET_TRAINER_LIST', data.trainers)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getMyTrainerList ({commit, state}) {
      return new Promise((resolve, reject) => {
        request({
          url: '/user/trainers',
          method: 'get'
        }).then(response => {
          const data = response.data
          commit('SET_TRAINER_LIST', data)
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
    },
    addTrainer ({commit, state}, trainerId) {
      const username = state.userInfo.username
      return post('/user/' + username + '/add-trainer' + '?trainerId=' + trainerId).then(data => {
        if (data) {
          commit('SET_TRAINER_LIST', data)
        }
      }).catch(error => {
        Message({
          message: 'add failure',
          type: 'error',
          duration: 6 * 1000
        })
      })
    }
  }
}

export default user
