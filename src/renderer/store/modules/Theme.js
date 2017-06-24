const state = {
  noRunTheme: true,  //
  themeList: [
    {
      imgSrc: '',
      name: '集团信息',
      describe: '',
      uploadTime: '2017/6/12'
    },
    {
      imgSrc: '',
      name: '全渠道大屏',
      describe: '关于集团产品全渠道销售详情',
      uploadTime: '2017/6/12'
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
