import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/store'

Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login')
const register = r => require.ensure([], () => r(require('@/page/register/register')), 'register')
const profile = r => require.ensure([], () => r(require('@/page/profile/profile')), 'profile')

import layout from '@/page/layout/layout'
import {getToken} from '@/utils/auth'
import NProgress from 'nprogress'
import {Message} from 'element-ui'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/login',
      component: login,
      name: 'login'
    },
    {
      path: '/register',
      component: register,
      name: 'register',
      //redirect: '/login'  //redirect不能这样用，这样会一直重定向到 /login
    },
    {
      path: '/v1',
      component: layout,
      redirect: '/v1/profile',
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: profile,
          meta: {
            title: '个人中心'
          }
        },
      ]
    },
    {//404 notfound
      path: '*',

      name: '404notfound'
    }
  ]
})

const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  NProgress.start()
  // authorized, permit all
  if (getToken()) {
    if (to.path === '/login') {
      next('/v1')
      NProgress.done()
    } else {
      if (store.getters.userInfo.length === 0) {
        store.dispatch('getInfo').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('logOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({path: '/login'})
          })
        })
      } else {
        next()
      }
    }
  } else {// unauthorized
    if (whiteList.indexOf(to.path) === -1) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
      NProgress.done()
    } else {// to the path in white list
      next()// 一定要调用 next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
