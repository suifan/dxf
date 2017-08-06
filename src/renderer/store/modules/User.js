const CLIENT_THEME = 0 //主题客户端
const CLIENT_BACKSTAG = 1 //后台客户端
const CLIENT_CONTROL = 2 //控制台

const state = {
  loginState: false,
  user: '',
  flag: CLIENT_BACKSTAG
}

const getters = {

}

const mutations = {
  signin (state) {
    state.loginState = true
  },
  signout (state) {
    state.loginState = false
  },
  initUser (state, payload) {
    state.user = payload.user
  },
  addUser (state, payload) {
    state.user.push(payload.user) 
  },
  delUser (state, payload) {
    state.user = payload.user
  },
  editUser (state, payload) {
    state.user = payload.user
  }
}

const actions = {
  signin ({ commit }) {
    commit('signin')
  },
  signout ({ commit }) {
    commit('signout')
  },
  initUser ({ commit }, payload) {
    commit('initUser', payload)
  },
  addUser ({ commit }, payload) {
    commit('addUser', payload)
  },
  delUser ({ commit }, payload) {
    commit('delUser', payload)
  },
  editUser ({ commit }, payload) {
    commit('editUser', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
