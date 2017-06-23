import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
     {
      path: '/',
      meta: {
        requireAuth: true
      },
      component: require('@/components/Home')
    },
    {
      path: '/Home/:userID',
      name: 'Home',
      meta: {
        requireAuth: true
      },
      component: require('@/components/Home')
    },
    {
      path: '/TM/ThemeInfo',
      name: 'ThemeInfo',
      component: require('@/components/ThemeManager/ThemeInfo')
    },
    {
      path: '/TM/ThemeUpload',
      name: 'ThemeUpload',
      component: require('@/components/ThemeManager/ThemeUpload')
    },
    {
      path: '/DeviceMonitor',
      name: 'DeviceMonitor',
      component: require('@/components/DeviceMonitor')
    },
    {
      path: '/DataImport',
      name: 'DataImport',
      component: require('@/components/dataImport')
    },
    {
      path: '/DataUpdate',
      name: 'DataUpdate',
      component: require('@/components/dataImport')
    },
    {
      path: '/Login',
      name: 'Login',
      component: require('@/components/login')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
