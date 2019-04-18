import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/store'

Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login')
const register = r => require.ensure([], () => r(require('@/page/register/register')), 'register')

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {authRequired: true}
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
    {//404 notfound
      path: '/*',

      name: '404notfound'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    //if there is not token, it means unauthorized, or has logout
    if (!store.getters.token) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next() // 一定要调用 next()
    }
  }
  next() // 一定要调用 next()
})

export default router
