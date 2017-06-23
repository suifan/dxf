const state = { 
  maxScreenList: [    //大屏列表
    {
      localIP: "127.0.0.1",
      remark: "前台大屏",
      systemOS: 'window 10',
      deviceState: '在线',
      connect: true
    }, {
      localIP: "127.0.0.100",
      remark: "董事长电脑",
      systemOS: 'window 7',
      deviceState: '离线',
      connect: false
    }
  ],
  controlList: [  //控制端列表
    {
      localIP: "127.0.10.100",
      remark: "",
      systemOS: 'window 7',
      deviceType: 'ipad',
      deviceState: '离线',
      useTime: '12min',
      connect: false
    }
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
    state.maxScreenList.push(data)
  },
  pushControlList (state, data) {
    state.controlList.push(data)
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
