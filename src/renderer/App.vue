<template>
  <div id="app" v-if="this.$store.state.user.loginState" onselectstart="return false">
    <titleBar></titleBar>
    <div class="_sidebar"></div>
    <!-- <div class="_main"></div> -->
    <div  class="box" :class="[isMac ? 'mac' : 'win']">
      <!-- 侧边栏菜单 -->
      <div class="sidebar" id="sidebar">
        <div class="user">
          <img src="./assets/img/user.jpg" alt="">
          <div class="jn-text"><span>Administrator</span></div>
        </div>
        <div class="router">
          <div class="router-active"></div>
          <div class="router-hover"></div> 
          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/Home" active-class="link-active">
            <div class="mask"></div>
            <i class="fa fa-tachometer"></i>
            <span>设备面板</span>
          </router-link>
          
          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/usermg"  active-class="link-active">
            <div class="mask"></div>
            <i class="fa fa-address-book"></i>
            <span>账号管理</span>
          </router-link>

          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/datamg" active-class="link-active">
            <div class="mask"></div>
            <i class="fa fa-database"></i>
            <span>数据管理</span>
          </router-link>
          
          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/videomg" active-class="link-active">
            <div class="mask"></div>
            <i class="fa fa-film"></i>
            <span>视频管理</span>
          </router-link>
          
          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/log" active-class="link-active">
            <div class="mask"></div>
            <i class="fa fa-bell"></i>
            <span>日志信息</span>
          </router-link>

          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/setting" active-class="link-active">
            <div class="mask"></div>
            <i class="fa fa-cog"></i>
            <span>系统设置</span>
          </router-link>
        </div>
        <div class="setting">
          <i class="fa fa-bars"></i>
        </div>
      </div>
      <!-- 侧边栏菜单end -->

      <!-- 主内容区域 -->
      <div class="main">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
      <!-- 主内容区域end -->
    </div>

    
  </div>
   <div v-else id="app" onselectstart="return true">
    <titleBar></titleBar>
    <div class="mainLogin" :class="[isMac ? 'mac' : 'win']">
      <router-view></router-view>
    </div>
  </div> 
</template>

<script>
  import titleBar from './components/menu/titleBar'
  import login from './components/login'
  export default {
    name: 'app',
    beforeCreate () {
      const ipc = this.$electron.ipcRenderer
      ipc.send('platform', ' ')
      ipc.on('isMac', (event, arg) => {
        this.isMac = arg
      })
    },
    data() {
      return {
        isMac: false,
        win: this.$electron.remote.BrowserWindow.win,
        activeTop: 7, //激活的路由距离顶部的距离
        enter: 'animated slideInDown',
        leave: 'animated slideOutDown'
      }
    },
    watch: {
      '$route' (to, from) {
        const toNum = to.name.split('_')[1]
        const fromNum = from.name.split('_')[1]
        if (toNum > fromNum) {
          this.enter = 'animated inDown'
          this.leave = 'animated fadeOutDown'
        }else {
          this.enter = 'animated fadeInUp'
          this.leave = 'animated fadeOutUp'
        }
      }
    },
    components: {
      titleBar,login
    },
    methods: {
      signout() {
        // this.$store.dispatch('signout')
        // this.$router.push('Login')
      },
      clicks (e) {
        let active = jnoos.$('.router-active'),
            hover = jnoos.$('.router-hover'),
            a = document.querySelectorAll('.router a'),
            current = e.currentTarget
        this.activeTop = e.currentTarget.offsetTop + 7 
        active.style.top = e.currentTarget.offsetTop + 'px'
        hover.style.top = e.currentTarget.offsetTop + 7 + 'px'
      },
      mouseover (e) {
        let hover = jnoos.$('.router-hover'),
            current = e.currentTarget
        if (e.target.className != 'mask') {
          return
        }
        hover.style.top = e.currentTarget.offsetTop + 7 + 'px'
        current.children[2].classList.add('InRight')
      },
      mouseout (e) {
        let hover = jnoos.$('.router-hover'),
            current = e.currentTarget
        hover.style.top = this.activeTop  + 'px'
        current.children[2].classList.remove('InRight')
        current.children[2].classList.add('OutRight')
      }
    },
    mounted() {
      let span = document.querySelectorAll('.router a span')
      for(let i of span) {
        i.addEventListener('animationend', e => {
          if (e.animationName == 'OutRight' ) {
            i.classList.remove('OutRight')
          }
        })
      }
    },
    updated() {
    },
    deactivated () {
      console.log('deactivated')
    }
  }
</script>

<style lang="scss">
  @import './assets/scss/app.scss';
  @import './assets/css/font-awesome.css';
  #app {
    width: 100%;
    height: 100%;
  }
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 11;
  }
  .box {
    width: 100%;
    height: calc(100% - 22px);
  }
  
  ._sidebar {
    position: absolute;
    top: 0;
    z-index: 10;
    width: 160px;
    // width: 100%;
    height: 100%;
    box-sizing: content-box;
    // background: url('./assets/img/dr_18.jpg');
    background-color: #FFF;//373f5f
    border-right: 1px solid #EAF0F2;
    // filter: blur(3px);
    // opacity: .95;
  }
  .sidebar {
    position: relative;
    z-index: 11;
    width: 160px;
    height: 100%;
    float: left;
    color: #AEB9C2;
    transition: all .8s;
    .user {
      height: 200px;
      img {
        position: relative;
        top: 50px;
        width: 100px;
        height: 100px;
        display: block;
        border-radius: 50px;
        border: 1px solid #475669;
        margin: auto;
      }
      .jn-text {
        position: relative;
        top: 55px;
        display: block;
        width: inherit;
        margin: auto;
        text-align: center;
        span {
          font-size: 1rem;
          color: #475669;
          font-weight: normal;
        }
      }
    }

    .router {
      position: relative;
      a {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 50px;
        color: #475669;
        line-height: 50px;
        text-align: center;
        transition: all .5s;
        &:hover {
          background-color: #F4F8F9;
        }
        i {
          position: relative;
          left: -10px;
        }
        span {
          position: relative;
          left: 5px;
          font-size: .9rem;
        }
        .mask {
          position: absolute;
          top: 0;
          z-index: 99;
          width: 100%;
          height: 100%;
          background-color: rgba(255,255,255,0);
        }
        .InRight {
          animation: InRight .5s;
          animation-fill-mode: both;
        }
        .OutRight {
          animation: OutRight .5s;
          animation-fill-mode: both;
        }
        @keyframes InRight{
          from {
            left: 5px;
          }
          to {
            left: -5px;
          }
        }
        @keyframes OutRight{
          from {
            left: -5px;
          }
          to {
            left: 5px;
          }
        }
      }
      .link-active {
        color: #7E3FFB;
        background-color: #F0EEFC;
        text-decoration: none;
        transition: all 1s;
        &:hover {
          background-color: #F0EEFC;
        }
      }
       // router-link激活的样式
      .router-active {
        position: absolute;
        top: 0px;
        left: 0;
        width: 4px;
        height: 50px;
        z-index: 15;
        background-color: #7E3FFB; //5bb5b6 
        transition: all .5s;
        // #00BCD4 #009688 #E1F5FE #CDDC39 #FF9800 #FFC107 
        // #FF3D00 #607D8B #9E9E9E #4CAF50 #03A9F4 #fde204
        
      }
      .router-hover {
        position: absolute;
        top: 7px;
        left: 0;
        width: 3px;
        height: 36px;
        z-index: 14;
        background-color: #bbdefb;
        transition: all .3s;
      }
    }
    .setting {
      position: absolute;
      z-index: 2;
      bottom: 0;
      width: 100%;
      height: 45px;
      text-align: center;
      i {
        width: 45px;
        height: 100%;
        line-height: 45px;
        font-size: 1.2rem;
        color: #7E3FFB;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
 

  .main {
    position: relative;
    width: auto;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #FFF;
  }
  .mainLogin {
    width: auto;
    height: calc(100% - 22px);
    background-color: #FFF;
  }
  .mac {
    height: calc(100% - 22px) !important;
  }
  .win {
    height: calc(100% - 28px) !important;
  }
</style>
