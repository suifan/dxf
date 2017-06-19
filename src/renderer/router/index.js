import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
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
      path: '/Performance',
      name: 'Performance',
      component: require('@/components/Performance')
    },
    {
      path: '/ControlBoard',
      name: 'ControlBoard',
      component: require('@/components/ControlBoard')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
