import axios from 'axios'
import store from '../store'
import {getToken} from '@/utils/auth'
import {Message, MessageBox} from 'element-ui'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8082',
  timeout: 16000
})

// request拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken()
  }
  console.info(config.url + ', d: ' +
    JSON.stringify(config.data) + ', p: ' +
    JSON.stringify(config.params))
  return config
}, error => {
  console.log(error)
  Message({
    message: error.message,
    type: 'error',
    duration: 8 * 1000
  })
  return Promise.reject(error)
})

// response拦截器
request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      const code = error.response.status
      console.log(code + ', ' + error)// for debug
      // 401:未登录;
      if (code === 401 || code === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('logout').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {

      }
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 8 * 1000
    })
    return Promise.reject(error)
  }
)

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    request.post(url, data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export const fetch = (url, param) => {
  return new Promise((resolve, reject) => {
    request.get(url, {
      params: param
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export default request
