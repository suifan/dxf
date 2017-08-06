const state = {
  videoList: []
}

const getters = {
}

const mutations = {
  pushVideoList(state, data) {
    state.videoList = data
  }
}

const actions = {
  pushVideoList({
    commit
  }, data) {
    commit('pushVideoList', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
