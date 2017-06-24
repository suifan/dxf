const state = {
  noRunTheme: true,  //
  themeList: [
    {
      "id": 1,
      "src": "http://www.jnoos.com/DXF/index.html",
      "memberId": 1,
      "name": "全渠道"
    },
    {
      "id": 2,
      "src": "http://www.jnoos.com",
      "memberId": 1,
      "name": "智能智造"
    }
  ]
}

const getters = {
  isTheme: state => {   
    return state.themeList.length === 0 ? true : false
  }
}

const mutations = {
  pushThemeList (state, data) {
    state.themeList = data
  }
}

const actions = {
  pushThemeList ({ commit }, data) {
    commit('pushThemeList', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
