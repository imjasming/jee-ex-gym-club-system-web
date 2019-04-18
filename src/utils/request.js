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
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// response拦截器
request.interceptors.response.use(
  response => {
    return response
  },
  error => {
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
    } else if (code === 400) {

    }
    Message({
      message: error.message,
      type: 'error',
      duration: 4 * 1000
    })
    return Promise.reject(error)
  })

export default request
