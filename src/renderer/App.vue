<template>
  <div id="app">
    <div id="info-op0">{{ this.$store.state.InfoBar.info }}</div>
    <nav>
      <!-- 控制中心 -->
      <div class="center">
        <span class="iconfont icon-voice vertical-middle"></span>
      </div>
      <!-- 导航栏 -->
      <div class="nav">
        <!-- 信息栏：显示系统／其他的一些信息 -->
        <div class="infoBar" id="infoBar">
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
            <span class="glyphicon glyphicon-user vertical-middle"></span>
          </div>
        </div>
      </div>
    </nav>
    <!-- 侧边栏菜单 -->
    <div class="sidebar">
      <ul>
        <li>
          <span class="iconfont icon-menu bule"></span>
        </li>
        <li>
          <router-link to="/TM/themeUpload" active-class="link-active">
            <span class="iconfont icon-upload" title="主题上传"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/TM/themeInfo" active-class="link-active">
            <span class="iconfont icon-manager" title="主题信息"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/TM/themeView" active-class="link-active">
            <span class="iconfont icon-view" title="主题视图"></span>
          </router-link>  
        </li>
        <li>
          <router-link to="/performance" active-class="link-active">
            <span class="iconfont icon-watch" title="性能监测"></span>
          </router-link>  
        </li>
        <li>
          <router-link to="/controlBoard" active-class="link-active">
            <span class="iconfont icon-phone" title="控制台"></span>
          </router-link>  
        </li>
      </ul>
    </div>
    <!-- 主内容区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      baseURI: '' //存储组件的路径
    }
  },
  methods: {
    //创建信息栏infobar上的即时信息
    createBarMsg (state) {
      let BarMsg = document.createElement('span'),
          progress = document.createElement('div'),
          progressBar = document.createElement('div'),
          infoBar =document.getElementById('infoBar') 
      switch (state.stateCode) {
        case 0:
          BarMsg.className = 'iconfont icon-warning infobar-warning infobar-leave'
          BarMsg.id = 'warning'
          BarMsg.innerHTML = '警告：' + state.stateMsg
          infoBar.appendChild(BarMsg)
          break;
        case 1:
          BarMsg.className = 'iconfont icon-error infobar-error infobar-leave'
          BarMsg.id = 'error'
          BarMsg.innerHTML = '错误：' + state.stateMsg
          infoBar.appendChild(BarMsg)
          break;
        case 2:
          BarMsg.className = 'iconfont icon-success infobar-success infobar-leave'
          BarMsg.id = 'success'
          BarMsg.innerHTML = '成功：' + state.stateMsg
          infoBar.appendChild(BarMsg)
          break; 
        case 3:
          progress.className = 'infobar-progress'
          progressBar.className = 'infobar-progress-font progress-bar progress-bar-striped active'
          progressBar.innerHTML = state.stateMsg
          progressBar.style.width = state.stateMsg
          progress.appendChild(progressBar)
          infoBar.appendChild(progress)
          break; 
           
      }
      
    },
    //清除信息栏的即时信息
    clearInfoBar () {
      let infoBar =document.getElementById('infoBar') 
      setTimeout(() => {
        infoBar.removeChild(infoBar.childNodes[0])
      },2300)
    },
    
  },
  mounted () {
  },
  updated () {
    let state = this.$store.state
    if (this.baseURI === this.$el.baseURI) {
      //路径对比,路由跳转的时候会改变路径
        this.createBarMsg(state.InfoBar.info)
        this.clearInfoBar() 
    }
    this.baseURI = this.$el.baseURI
  }
}
</script>

<style lang="scss">
@import './assets/font/iconfont.css';
@import './assets/scss/app.scss';
#app {
  width: 100%;
  height: 100%;
}
#info-op0 {
  display: none
}
nav {
  height: 44px;
  .center {
    width: 52px;
    height: inherit;
    float: left;
    background-color: #01A6EF;
    color: #F3F3F3;
    text-align: center;
    span {
      font-size: 1.4rem;
    }
  }
  .nav {
    display: flex;
    background-color: #2A3542;
    .infoBar {
      flex: 8;
      position: relative;
      width: 80%;
      height: 44px;
      text-align: center;
      line-height: (44/16);
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
  background-color: #2A3542;
  color: #AEB9C2;
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
    }
  }
}

.main {
  position: relative;
  left: 52px;
  width: calc(100% - 52px);
  height: calc(100% - 44px);
  background-color: #EFEFEF;
}

.infobar-progress {
  display: inline-block;
  width: 70%;
  height: 10px;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
}
.infobar-progress-bar {
  float: left;
  width: 0;
  height: 100%;
  font-size: 10px;
  line-height: 10px;
  color: #fff;
  text-align: center;
  background-color: #337ab7;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
  transition: width .6s ease;
}
.infobar-progress-font {
  font-size: 10px;
  line-height: 10px;
}
.infobar-warning {
  display: block;
  color: #e08017;
}
.infobar-error {
  display: block;
  color: #D32E50;
}
.infobar-success {
  display: block;
  color: #2da754;
}
.infobar-leave {
  animation: leave 1s 1.5s ease; 
  @include keyframes(leave) {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-44px);
      opacity: 0; 
    }
  } 
}
</style>
