const state = {
  noRunTheme: true, //
  themeList: [
    {
      ctrl: "http://192.168.99.191:3001/controller.html",
      id: 1,
      img: "http://192.168.99.191:3001/images/qqd.png",
      name: "大屏主题全球业务",
      src: "http://www.jnoos.com"
    }
  ]
}

const getters = {
  isTheme: state => {
    return state.themeList.length === 0
      ? true
      : false
  }
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
