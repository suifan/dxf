//0:警告，1:错误，2:成功
const state = {
  info: ''
}

const mutations = {
  pushInfo (state, msg) {
    state.info = msg
  }
}

const actions = {
  pushInfo ({ commit }, msg) {
    commit('pushInfo', msg)
  }
}

export default {
  state,
  mutations,
  actions
}
