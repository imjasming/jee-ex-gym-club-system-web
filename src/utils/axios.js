import axios from 'axios'
import store from '../store'
import {getToken} from '@/utils/auth'
import {Message, MessageBox} from 'element-ui'

export const serverUrl = 'http://47.102.206.229:8050'

axios.default.timeout = 16000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = serverUrl

/*const axios = axios.create({
  //baseURL: serverUrl,
  timeout: 16000
})*/
// !!!!!!!!!!!!!!!!!!!!!!!
// 发送多个请求时，由于使用的时自己封装的 axios，以下两函数没有封装进去
// !!!!!!!!!!!!!!!!!!!!!!
//axios.all = axios.all
//axios.spread = axios.spread

// request拦截器
axios.interceptors.request.use(config => {
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
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let errorMsg = error.message
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
      errorMsg = error.response.data
    }
    Message({
      message: errorMsg,
      type: 'error',
      duration: 8 * 1000
    })
    return Promise.reject(error)
  }
)

export const del = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export const put = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export const fetch = (url, param) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export default axios
