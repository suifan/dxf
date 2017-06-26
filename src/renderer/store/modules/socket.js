const state = {
  ws: '',
  scoketConnect: false,
  totalData: ''
}

const getters = {}

const mutations = {
  getws (state, ws) {
    console.log(ws)
    state.ws = ws
  },
  setConn(state) {
    state.scoketConnect = true
  },
  getData(state, data) {
    state.totalData = data
  }
}

const actions = {
  getws({commit}, ws) {
    commit('getws', ws)
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
