<template>
  <div v-if="this.$store.state.User.loginState" id="app" onselectstart="return false">
    <!--token: 04c1bbb660650da6fb970b46b66aa973e6774959-->
    <!--gistID: 70fc2d799d4e0bfb499919c3875c2843-->
    <titleBar></titleBar>
    <div id="info-op0">{{ this.$store.state.InfoBar.info }}</div>
    <nav>
      <!-- 控制中心 -->
      <div class="center">
        <router-link to="/" active-class="link-active">
          <span class="iconfont icon-voice curzz"></span>
        </router-link>
      </div>
      <!-- 导航栏 -->
      <div class="nav">
        <!-- 信息栏：显示系统／其他的一些信息 -->
        <div class="infoBar" id="infoBar">
          <!-- 即时信息 -->
          <div id="imsg" class=""></div>
          <!-- 长久信息 -->
          <div id="ltmsg"></div>
        </div>
        <!-- 右侧的信息、设置、头像-->
        <div class="setting">
          <div class="cell">
            <span class="iconfont icon-message vertical-middle"></span>
          </div>
          <div class="">
            <span class="iconfont icon-setting vertical-middle"></span>
          </div>
          <div class="user">
            <span @click="signOut" class="glyphicon glyphicon-user vertical-middle"></span>
          </div>
        </div>
      </div>
    </nav>
    <!-- 侧边栏菜单 -->
    <div class="sidebar" id="sidebar">
      <ul>
        <!--<li>
          <span class="iconfont icon-menu bule"></span>
        </li>-->
        <li>
          <router-link to="/TM/ThemeUpload" active-class="link-active">
            <span class="iconfont icon-upload" title="主题上传"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/TM/ThemeInfo" active-class="link-active">
            <span class="iconfont icon-manager" title="主题信息"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/DeviceMonitor" active-class="link-active">
            <span class="iconfont icon-watch" title="设备监控"></span>
          </router-link>  
        </li>
        <li>
          <router-link to="/DataImport" active-class="link-active">
            <span class="iconfont icon-import" title="数据导入"></span>
          </router-link>  
        </li>
        <li>
          <router-link to="/DataUpdate" active-class="link-active">
            <span class="iconfont icon-update" title="数据修改"></span>
          </router-link>  
        </li>
      </ul>
    </div>
    <!-- 主内容区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
  <div v-else id="app" onselectstart="return true">
    <titleBar></titleBar>
    <div class="mainLogin">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import titleBar from './components/menu/titleBar'
export default {
  name: 'app',
  data () {
    return {
      baseURI: '', //存储组件的路径
      win: this.$electron.remote.BrowserWindow.win
    }
  },
  components : {
    titleBar
  },
  methods: {
    //创建信息栏infobar上的即时信息
    createIMsg (state) {
      let BarMsg = document.createElement('span'),
          progress = document.createElement('div'),
          progressBar = document.createElement('div'),
          imsg = document.getElementById('imsg') 
      switch (state.stateCode) {
        case 0:
          BarMsg.className = 'iconfont icon-warning ib-imsg-warning ib-imsg-active-leave'
          BarMsg.id = 'warning'
          BarMsg.innerHTML = '：' + state.stateMsg
          imsg.appendChild(BarMsg)
          break;
        case 1:
          BarMsg.className = 'iconfont icon-error ib-imsg-error ib-imsg-active-leave'
          BarMsg.id = 'error'
          BarMsg.innerHTML = '：' + state.stateMsg
          imsg.appendChild(BarMsg)
          break;
        case 2:
          BarMsg.className = 'iconfont icon-success ib-imsg-success ib-imsg-active-leave'
          BarMsg.id = 'success'
          BarMsg.innerHTML = '：' + state.stateMsg
          imsg.appendChild(BarMsg)
          break; 
        case 3:
          progress.className = 'ib-imsg-progress'
          progressBar.className = 'ib-imsg-progress-font progress-bar progress-bar-striped active'
          progressBar.innerHTML = state.stateMsg
          progressBar.style.width = state.stateMsg
          progress.appendChild(progressBar)
          imsg.appendChild(progress)
          break;    
      }
    },
    //清除信息栏的即时信息
    clearIMsg (state) {
      let imsg = document.getElementById('imsg') 
      let imsg_id = document.getElementById(state.stateType)
      if (imsg_id) {
        setTimeout(() => {
          imsg.removeChild(imsg_id)
          this.$store.dispatch('pushIMsg', '')
        },2300)
      }
    },
    signOut () {
      this.$store.dispatch('signOut')
      this.win.setSize(800, 600)
      this.win.center()
      this.$router.options.routes[0].meta.requireAuth = true
      this.$router.push('Login')
    }
  },
  mounted () {
    
  },
  updated () {
    let state = this.$store.state
    if (this.baseURI === this.$el.baseURI) {
      //路径对比,路由跳转的时候会改变路径
        this.createIMsg(state.InfoBar.info.imsg)
        this.clearIMsg(state.InfoBar.info.imsg) 
    }
    this.baseURI = this.$el.baseURI
  }
}
</script>

<style lang="scss">
@import './assets/scss/app.scss';
#app {
  width: 100%;
  height: 100%;
}

.mainLogin {
  width: 100%;
  height: 100%;
  background-color: rgb(51, 56, 66);
}
#info-op0 {
  display: none
}
nav {
  // position: relative;
  // top: 22px;
  height: 44px;
  .center {
    width: 52px;
    height: inherit;
    float: left;
    background-color: #24292e;
    border-bottom: 1px solid #000000;
    border-right: 1px solid #000000;
    text-align: center;
    span {
      color: #ffffff;
      font-size: 1.4rem;
      line-height: 44px;
    }
    a {
      text-decoration: none;
      outline: none;
    }
  }
  .nav {
    display: flex;
    background-color: #24292e;
    .infoBar {
      flex: 8;
      position: relative;
      width: 80%;
      height: 44px;
      text-align: center;
      line-height: (44/16);
      div {
        height: 100%;
      }
      #imsg {
        position: relative;
      }
      #ltmsg {
        position: absolute;
        top: 0;
        width: 100%;
        color: #fff;
      }
    }
    .setting {
      flex: 2;
      color: #F3F3F3;
      text-align: center;
      div {
        display: inline-block;
        width: 30%;
        height: 40px;
        span {
          font-size: 1.3rem;
          line-height: 44/(16*1.3)
        }
      }
    }
  }
}


.sidebar {
  width: 52px;
  height: calc(100% - 44px);
  float: left;
  background-color: #24292e;
  color: #AEB9C2;
  transition: all .8s;
  ul {
    text-align: center;
    li {
      padding: 9px 2px;
      a {
        padding: 6px 12px;
        color: #aeb1b3;
        &:hover {
          background-color: #35404d;
          color: #FF6C60;
          border-radius: 4px;
          text-decoration: none;
          outline: none;
        }
      }
      .link-active {
        border-radius: 4px;
        background-color: #35404d;
        color: #FF6C60;
        text-decoration: none;
      }
      .bule {
        &:hover {
          cursor: pointer;
        }
      }
      span {
        font-size: 1.2rem;
      }
      .title {
        font-size: .9rem;
      }
    }
  }
}

.main {
  position: relative;
  width: auto;
  height: calc(100% - 44px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f1f2f7;
}
</style>
