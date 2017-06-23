const state = {
  scoketConnect: false,
  totalData: ''
}

const getters = {}

const mutations = {
  setConn(state) {
    state.scoketConnect = true
  },
  getData(state, data) {
    state.totalData = data
  }
}

const actions = {
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
