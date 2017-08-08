<template>
  <div v-if="this.$store.state.User.loginState" id="app" onselectstart="return false">
    <!--token: 04c1bbb660650da6fb970b46b66aa973e6774959-->
    <!--gistID: 70fc2d799d4e0bfb499919c3875c2843-->
    <titleBar></titleBar>
    <div class="box">
      <!-- 侧边栏菜单 -->
      <div class="sidebar" id="sidebar">
        <div @click="signout" class="user">
          <div class="vertical-middle">
            <div></div>
          </div>
        </div>
        <!--<div class="change">
          <span class="fa fa-hand-o-right fa-rotate-180 vertical-middle"></span>
        </div>-->
        <div class="router">
          <div class="router-active"></div>
          <div class="router-hover"></div>
          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/Home" active-class="link-active">
            <div class="mask"></div>
            <span class="fa fa-home fa-lg"></span>
            <div class="title"><div class="triangle"></div> DashBoard</div>
          </router-link>
          
          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/DistributeUser"  active-class="link-active">
            <div class="mask"></div>
            <span class="iconfont icon-distribute" order="2"></span>
            <div class="title"><div class="triangle"></div> 分配账号</div>
          </router-link>

          <!--<router-link to="/TM/ThemeInfo" active-class="link-active">
            <span class="iconfont icon-manager" title="主题信息"></span>
          </router-link>-->
  
          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/DeviceMonitor" active-class="link-active">
            <div class="mask"></div>
            <span class="iconfont icon-watch"></span>
            <div class="title"><div class="triangle"></div> 设备监控</div>
          </router-link>
  
          <!--<router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/DataImport" active-class="link-active">
            <div class="mask"></div>
            <span class="iconfont icon-import"></span>
            <div class="title"><div class="triangle"></div> 数据导入</div>
          </router-link>-->
  
          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/DataUpdate" active-class="link-active">
            <div class="mask"></div>
            <span class="iconfont icon-update"></span>
            <div class="title"><div class="triangle"></div> 数据修改</div>
          </router-link>
          
          <router-link @click.native="clicks($event)" @mouseover.native="mouseover($event)" 
            @mouseout.native="mouseout($event)" to="/TM/ThemeUpload" active-class="link-active">
            <div class="mask"></div>
            <span class="fa fa-upload fa-lg"></span>
            <div class="title"><div class="triangle"></div> 文件上传</div>
          </router-link>
        </div>
  
        <div class="setting">
          <!--<nav id="gooey-v">
            <input type="checkbox" class="menu-open" name="menu-open4" id="menu-open4" />
            <label class="open-button" for="menu-open4">
              <span class="burger burger-1"></span>
              <span class="burger burger-2"></span>
              <span class="burger burger-3"></span>
            </label>
            <a href="#" class="gooey-menu-item"> <i class="fa fa-train"></i> </a>
            <a href="#" class="gooey-menu-item"> <i class="fa fa-bicycle"></i> </a>
          </nav>-->
        </div>
  
      </div>
      <!-- 主内容区域 -->
      <div class="main">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
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
  import './assets/js/jquery-2.1.3.min.js'
  import './assets/js/gooey.min.js'
  export default {
    name: 'app',
    data() {
      return {
        win: this.$electron.remote.BrowserWindow.win,
        activeTop: 0, //激活的路由距离顶部的距离
        tid: Number,//当鼠标悬停超过800ms就显示title
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
      titleBar
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
        for(let i of a) {
          i.style.color = '#737578'
        }
        clearInterval(this.tid)
        this.order = Number(e.target.getAttribute('order'))
        this.activeTop = e.currentTarget.offsetTop
        e.currentTarget.style.color = '#ffffff'
        // div.style.width = e.target.offsetWidth + 'px'
        // div.style.height = e.target.offsetHeight + 'px'
        active.style.top = e.currentTarget.offsetTop + 'px'
        hover.style.top = e.currentTarget.offsetTop + 'px'
      },
      mouseover (e) {
        let hover = jnoos.$('.router-hover'),
            current = e.currentTarget
        if (e.target.className != 'mask') {
          return
        }
        if (jnoos.isNull(e.currentTarget.className)) {
          e.currentTarget.style.color = '#FF6C60'
        }
        hover.style.top = e.currentTarget.offsetTop + 'px'
        this.tid = setInterval(() => {
          if (current.children[2].classList.length === 1) {
            current.children[2].style.display = 'block'
            current.children[2].classList.add('fadeInRight')
            clearInterval(this.tid)
          }
        },400)    
        
      },
      mouseout (e) {
        let hover = jnoos.$('.router-hover'),
            current = e.currentTarget
        clearInterval(this.tid)
        if (jnoos.isNull(e.currentTarget.className)) {
          e.currentTarget.style.color = '#737578'
        }
        hover.style.top = this.activeTop + 'px'
        if (e.currentTarget.children[2].classList.length === 1 ) {
          return
        }
        e.currentTarget.children[2].classList.remove('fadeInRight')
        e.currentTarget.children[2].classList.add('fadeOutRight')
        setTimeout(() => {
          current.children[2].style.display = 'none'
          current.children[2].classList.remove('fadeOutRight')
        }, 500)
        
      }
    },
    mounted() {
      // $("#gooey-v").gooeymenu({
      //   bgColor: "#68d099",
			// 	contentColor: "white",
			// 	style: "vertical",
			// 	horizontal: {
			// 		menuItemPosition: "glue"
			// 	},
			// 	vertical: {
			// 		menuItemPosition: "spaced",
			// 		direction: "up"
			// 	},
			// 	circle: {
			// 		radius: 70
			// 	},
			// 	margin: "small",
			// 	size: 40,
			// 	bounce: true,
			// 	bounceLength: "small",
			// 	transitionStep: 300,
			// 	hover: "#68d099"
      // })
    },
    updated() {
      // let state = this.$store.state
      // if (this.baseURI === this.$el.baseURI) {
      //   //路径对比,路由跳转的时候会改变路径
      //   this.createIMsg(state.InfoBar.info.imsg)
      //   this.clearIMsg(state.InfoBar.info.imsg)
      // }
      // this.baseURI = this.$el.baseURI
    }
  }
</script>

<style lang="scss">
  @import './assets/scss/app.scss';
  @import './assets/css/font-awesome.css';
  @import './assets/css/gooey.min.css';
  // @import 'animate.css';
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
  
  .box {
    width: 100%;
    height: 100%;
    display: flex;
  }
  
  .sidebar {
    position: relative;
    z-index: 1;
    flex: .55;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #2c2c31;
    box-shadow: 0 2px 10px 2px #0d0d17;
    color: #AEB9C2;
    transition: all .8s;
    .user {
      flex: .9;
      border-bottom: 1px solid #000;
      div {
        width: 34px;
        height: 34px;
        border: 1px solid red;
        border-bottom: 1px solid #2c2c31;
        border-radius: 17px;
        margin: auto;
        div {
          width: 30px;
          height: 30px;
          border-radius: 15px;
          margin-left: 1px;
          margin-top: 1px;
          background: url('./assets/img/dxf.png');
          background-size: contain;
        }
      }
    }
    .change {
      flex: .8;
      text-align: center;
      border-bottom: 1px solid #000;
    }
    .router {
      position: relative;
      flex: 6.3;
      a {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 50px;
        color: #737578;
        line-height: 50px;
        text-align: center;
        transition: all .5s;
        .mask {
          position: absolute;
          top: 0;
          z-index: 99;
          width: 100%;
          height: 100%;
          background-color: rgba(255,255,255,0)
        }
        .title {
          position: absolute;
          z-index: 100;
          top: 0;
          left: 100%;
          width: 100px;
          display: none;
          padding: 0 10px;
          color: #FFFFFF;
          opacity: 0;
          background-color: rgba(120, 134, 152, 0.89);
          .triangle {
            position: absolute;
            top: 19px;
            left: -6px;
            width: 0;
            height: 0;
            border-right: 6px solid rgba(120, 134, 152, 0.85);
            border-bottom: 6px solid transparent;
            border-top: 6px solid transparent;
          }
        }
        .fadeInRight {
          animation: fadeInRight .5s;
          animation-fill-mode: both;
        }
        .fadeOutRight {
          animation: fadeOutRight .5s;
          animation-fill-mode: both;
        }
        @keyframes fadeInRight{
          from {
            opacity: 0;
            transform: translate3d(50%, 0, 0);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes fadeOutRight{
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            transform: translate3d(50%, 0, 0);
          }
        }
      }
      .link-active {
        color: #fff;
        text-decoration: none;
        transition: all 1s;
      }
       // router-link激活的样式
      .router-active {
        position: absolute;
        top: 0;
        left: 0;
        width: 70px;
        height: 50px;
        z-index: -1;
        background-color: #5bb5b6;
        transition: all .5s;
      }
      .router-hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 70px;
        height: 50px;
        z-index: -2;
        background-color: #35404d;
        transition: all .3s;
      }
    }
    .setting {
      flex: 2;
      width: 70px;
    }
  }
 
  .en-enter-active {
    transition: all .8s ease;
  }
  .en-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .inDown {
    animation: inDown 1s;
    animation-fill-mode: both;
  }
  @keyframes inDown {   
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }


  .main {
    flex: 9.45;
    position: relative;
    width: auto;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #292a2e;
  }
</style>
