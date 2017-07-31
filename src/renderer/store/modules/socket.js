const state = {
  socket: null,
  scoketConnect: false,
  totalData: ''
}

const getters = {}

const mutations = {
  getsocket (state, socket) {
    state.socket = socket
  },
  setConn(state) {
    state.scoketConnect = true
  },
  getData(state, data) {
    state.totalData = data
  }
}

const actions = {
  getsocket({commit}, socket) {
    commit('getsocket', socket)
  },
  setConn({commit}) {
    commit('setConn')
  },
  getData({commit}, data) {
    commit('getData', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
