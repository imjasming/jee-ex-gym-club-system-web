import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '../store'

Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login')
const register = r => require.ensure([], () => r(require('@/page/register/register')), 'register')
const profile = r => require.ensure([], () => r(require('@/page/profile/profile')), 'profile')
const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home')
const myTrainers = r => require.ensure([], () => r(require('@/page/myTrainer/myTrainer')), 'myTrainers')

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
      path: '/home',
      component: layout,
      redirect: '/home/center',
      meta: {
        name: '主页',
      },
      children: [
        {
          path: 'center',
          name: 'center',
          component: home,
          meta: {
            title: '健身中心'
          }
        },
      ]
    },
    {
      path: '/me',
      component: layout,
      redirect: '/me/profile',
      meta: {
        name: '我的',
      },
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: profile,
          meta: {
            title: '个人中心'
          }
        },
        {
          path: 'trainer',
          name: 'myTrainers',
          component: myTrainers,
          meta: {
            title: '私人教练'
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
  // authorized, permit all
  if (getToken()) {
    if (to.path === '/login') {
      next('/home')
    } else {
      if (!store.getters.userInfo || store.getters.userInfo.length === 0 || !store.getters.trainerList) {
        store.dispatch('initUserData').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('logout').then(() => {
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
        //query: {redirect: to.fullPath}
      })
    } else {// to the path in white list
      next()// 一定要调用 next()
    }
  }
})

router.afterEach(() => {
})

export default router
