const CLIENT_THEME = 0 //主题客户端
const CLIENT_BACKSTAG = 1 //后台客户端
const CLIENT_CONTROL = 2 //控制台

const state = {
  loginState: false,
  flag: CLIENT_BACKSTAG
}

const getters = {

}

const mutations = {
  doLogin (state) {
    state.loginState = true
  },
  signOut (state) {
    state.loginState = false
  }
}

const actions = {
  doLogin ({ commit }) {
    commit('doLogin')
  },
  signOut ({ commit }) {
    commit('signOut')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
