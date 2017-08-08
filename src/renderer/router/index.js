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
      path: '/Login',
      name: 'Login_0',
      component: require('@/components/login')
    },
    {
      path: '/Home',
      name: 'Home_1',
      component: require('@/components/Home')
    },
    {
      path: '/DistributeUser',
      name: 'DistributeUser_2',
      component: require('@/components/distributeUser')
    },
    {
      path: '/DeviceMonitor',
      name: 'DeviceMonitor_3',
      component: require('@/components/DeviceMonitor')
    },
    // {
    //   path: '/DataImport',
    //   name: 'DataImport_4',
    //   component: require('@/components/dataImport')
    // },
    {
      path: '/DataUpdate',
      name: 'DataUpdate_4',
      component: require('@/components/dataUpdate')
    },
    {
      path: '/TM/ThemeUpload',
      name: 'ThemeUpload_5',
      component: require('@/components/ThemeManager/ThemeUpload')
    },
    // {
    //   path: '/TM/ThemeInfo',
    //   name: 'ThemeInfo',
    //   component: require('@/components/ThemeManager/ThemeInfo')
    // },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
