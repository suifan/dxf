const state = {
  videoList: []
}

const getters = {
}

const mutations = {
  pushVideoList(state, data) {
    state.videoList = data
  },
  addVideoList(state, data) {
    state.videoList.push(data)
  },
  delVideo(state, id) {
    _.remove(state.videoList, item => item.id === id)
  }
}

const actions = {
  pushVideoList({ commit }, data) {
    commit('pushVideoList', data)
  },
  addVideoList({ commit }, data) {
    commit('addVideoList', data)
  },
  delVideo({ commit }, id) {
    commit('delVideo', id)
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
