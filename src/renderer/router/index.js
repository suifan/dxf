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
      path: '/TM/themeInfo',
      name: 'ThemeInfo',
      component: require('@/components/ThemeManager/ThemeInfo')
    },
    {
      path: '/TM/themeUpload',
      name: 'ThemeUpload',
      component: require('@/components/ThemeManager/ThemeUpload')
    },
    {
      path: '/TM/themeView',
      name: 'ThemeView',
      component: require('@/components/ThemeManager/ThemeView')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
