import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: {
      login: 'ws://192.168.147.108',
      client: 'ws://192.168.147.108:7171'
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
