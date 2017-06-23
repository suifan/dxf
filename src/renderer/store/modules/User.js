const CLIENT_THEME = 0 //主题客户端
const CLIENT_BACKSTAG = 1 //后台客户端
const CLIENT_CONTROL = 2 //控制台

const state = {
  loginState: false,
  flag: CLIENT_BACKSTAG,
  userID: ''
}

const getters = {

}

const mutations = {
  doLogin (state, id) {
    state.loginState = true
    state.userID = id
  },
  signOut (state) {
    state.loginState = false
  }
}

const actions = {
  doLogin ({ commit }, id) {
    commit('doLogin', id)
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
