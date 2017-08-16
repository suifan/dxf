import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      component: require('@/components/Home')
    },
    {
      path: '/login',
      name: 'login_0',
      component: require('@/components/login')
    },
    {
      path: '/Home',
      name: 'home_1',
      component: require('@/components/Home')
    },
    {
      path: '/usermg',
      name: 'usermg_2',
      component: require('@/components/usermg')
    },
    {
      path: '/cut',
      name: 'cut_3',
      component: require('@/components/cut')
    },
    {
      path: '/videomg',
      name: 'videomg_4',
      component: require('@/components/videomg')
    },
    {
      path: '/log',
      name: 'log_5',
      component: require('@/components/log')
    },
    {
      path: '/setting',
      name: 'setting_6',
      component: require('@/components/setting')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
