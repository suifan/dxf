const state = { 
  loginState: false,
  userInfo: [ ]
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
  pushUser (state, data) {
    state.userInfo = data
  },
  addUser (state, data) {
    state.userInfo.push(data)
  },
  delUser (state, id) {
    _.remove(state.userInfo, item => item.id === id)
  }
  
}

const actions = {
  signin ({ commit }) {
    commit('signin')
  },
  signout ({ commit }) {
    commit('signout')
  },
  pushUser ({ commit }, data) {
    commit('pushUser', data)
  },
  addUser ({ commit }, data) {
    commit('addUser', data)
  },
  delUser ({ commit }, id) {
    commit('delUser', id)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
