const CLIENT_THEME = 0 //主题客户端
const CLIENT_BACKSTAG = 1 //后台客户端
const CLIENT_CONTROL = 2 //控制台

const state = {
  loginState: false,
  user: {
    // username: 'admin',
    // password: '123',
    // company: 'alf',
    // flag: CLIENT_BACKSTAG,
    // ip: ''
  }
}

const getters = {
  UN: state => {   
    return state.user.company + '_' + state.user.username
  }
}

const mutations = {
  pushIP (state, ip) {
    state.user.ip = ip
  },
  doLogin (state) {
    state.loginState = true
  },
  signOut (state) {
    state.loginState = false
  }
}

const actions = {
  pushIP ({ commit }, ip) {
    commit('pushIP', ip)
  },
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
