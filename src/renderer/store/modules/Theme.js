const state = {
  themeList: []
}

const getters = {
}

const mutations = {
  pushThemeList(state, data) {
    state.themeList = data
  }
}

const actions = {
  pushThemeList({
    commit
  }, data) {
    commit('pushThemeList', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
