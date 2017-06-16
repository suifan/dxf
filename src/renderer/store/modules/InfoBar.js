//0:警告，1:错误，2:成功
const state = {
  info: {
    imsg: '',
    ltmsg: ''
  }
}

const mutations = {
  pushIMsg (state, msg) {
    state.info.imsg = msg
  },
  pushLongTimeMsg (state, msg) {
    state.info.ltmsg = msg
  }
}

const actions = {
  pushIMsg ({ commit }, msg) {
    commit('pushIMsg', msg)
  },
  pushLongTimeMsg ({ commit }, msg) {
    commit('pushLongTimeMsg', msg)
  }
}

export default {
  state,
  mutations,
  actions
}
