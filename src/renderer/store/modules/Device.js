const state = { 
  maxScreenList: [    //大屏列表

  ],
  controlList: [  //控制端列表

  ]
}

const getters = {
  isScreenDevice: state => {   //有没有大屏终端设备
    return state.maxScreenList.length === 0 ? true : false
  },
  isControlDevice: state => {  //有没有控制终端设备
    return state.controlList.length != 0 ? true : false
  }
}

const mutations = {
  pushMaxScreenList (state, data) {
    state.maxScreenList = data
  },
  pushControlList (state, data) {
    state.controlList = data
  },
  maxScreenGoOnline (state, ip) {
    for(let i of state.maxScreenList) {
      if(_.get(i, 'localIP') === ip) {
        i.connect = true
        i.deviceState = '在线'
      }
    }
  },
  maxScreenOffLine (state, ip) {
    for(let i of state.maxScreenList) {
      if(_.get(i, 'localIP') === ip) {
        i.connect = false
        i.deviceState = '离线'
      }
    }
  }
}

const actions = {
  pushMaxScreenList ({ commit }, data) {
    commit('pushMaxScreenList', data)
  },
  pushControlList ({ commit }, data) {
    commit('pushControlList', data)
  },
  maxScreenGoOnline ({ commit }, ip) {
    commit('goOnline', ip)
  },
  maxScreenOffLine ({ commit }, ip) {
    commit('offLine', ip)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
