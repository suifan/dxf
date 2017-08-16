import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./assets/js/jnoos')
import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Element)
  
if (localStorage.getItem('user')) {
  store.dispatch('signin')
  router.push('/Home')
}else {
  router.push('/login')
}


// router.push('/login')
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  data () {
    return {
      socket: null
    }
  },
  mounted() {
  }
}).$mount('#app')
