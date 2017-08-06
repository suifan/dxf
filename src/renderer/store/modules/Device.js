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
  //为账户添加主题
  addThemes (state, data) {
    for (let i of state.maxScreenList) {
      let arr
      if (i.themes == null) {
        arr = []
      }else if (i.themes === '' || i.themes.length === 1) {
        arr = i.themes.split('')
      }else {
        arr = i.themes.split(',')
      }
      if (i.id == data.id) {
        i.themes = arr.concat(data.themes).toString()
      }
    }
  },
  //删除已添加的主题
  delThemes (state, data) {
    for (let i of state.maxScreenList) {
      let arr
      if (i.themes == null) {
        arr = []
      }else if (i.themes === '' || i.themes.length === 1) {
        arr = i.themes.split('')
      }else {
        arr = i.themes.split(',')
      }
      if (i.id == data.id) {
        for (let i2 of data.themes) {
          _.remove(arr, n => n == i2)
        }
        
        i.themes = arr.toString()
      }
    }
  },
  //
  maxScreenGoOnline (state, ip) {
    for(let i of state.maxScreenList) {
      if(_.get(i, 'ip') === ip) {
        i.connect = true
      }
    }
  },
  maxScreenOffLine (state, ip) {
    for(let i of state.maxScreenList) {
      if(_.get(i, 'ip') === ip) {
        i.connect = false
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
  addThemes ({ commit }, data) {
    commit('addThemes', data)
  },
  delThemes ({ commit }, data) {
    commit('delThemes', data)
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
