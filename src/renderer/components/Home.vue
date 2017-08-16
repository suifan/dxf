<template>
  <div class="grid grid-pad home">
    <div class="memory col-1-1">
      <div class="c">
        <div class="title">
          <h1>内存消耗情况</h1>
          <i class="fa fa-ellipsis-h"></i>
        </div>
        <div class="content"><Jnline></Jnline> </div>
      </div>
    </div>
    <div class="connect col-6-12">
      <div class="c">
        <div class="title">
          <h1>控制台连接状况</h1>
          <i class="fa fa-ellipsis-h"></i>
        </div>
        <div class="content">
          <div class="ipad">
            <i class="fa fa-tablet"></i>
          </div>
          <div class="line">
            <i class="fa fa-ellipsis-h"></i>
          </div>
          <div class="computer">
            <i class="fa fa-television"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="control col-3-12">
      <div class="c">
        <div class="not-title">
          <i class="fa fa-ellipsis-h"></i>
        </div>
        <div class="not-content">
          <i class="fa fa-user-plus"></i>
          <span class="number">{{ this.$store.state.user.userInfo.length }}</span>
          <span class="text">主题客户端账号</span>
        </div>
      </div>
    </div>
    <div class="control col-3-12">
      <div class="c">
        <div class="not-title">
          <i class="fa fa-ellipsis-h"></i>
        </div>
        <div class="not-content">
          <i class="fa fa-snowflake-o"></i>
          <span class="number">{{ this.$store.state.theme.themeList.length }}</span>
          <span class="text">主题</span>
        </div>
      </div>
    </div>
    <div class="control col-3-12">
      <div class="c">
        <div class="not-title">
          <i class="fa fa-ellipsis-h"></i>
        </div>
        <div class="not-content">
          <i class="fa fa-video-camera"></i>
          <span class="number">{{ this.$store.state.video.videoList.length }}</span>
          <span class="text">宣传视频</span>
        </div>
      </div>
    </div>
    <div class="control col-3-12">
      <div class="c">
        <div class="not-title">
          <i class="fa fa-ellipsis-h"></i>
        </div>
        <div class="not-content">
          <i class="fa fa-commenting"></i>
          <span class="number">{{ this.$store.state.user.userInfo.length }}</span>
          <span class="text">新日志信息</span>
        </div>
      </div>
    </div>
    <div class="memory col-6-12">
      <div class="c">
        <div class="title">
          <h1>cpu消耗情况</h1>
          <i class="fa fa-ellipsis-h"></i>
        </div>
        <div class="content"><Jnline></Jnline> </div>
      </div>
    </div>
    <div class="memory col-6-12">
      <div class="c">
        <div class="title">
          <h1>网络使用情况</h1>
          <i class="fa fa-ellipsis-h"></i>
        </div>
        <div class="content"><Jnline></Jnline> </div>
      </div>
    </div>
  </div>
</template>

<script>
import Jnline from './chart/line'
import io from 'socket.io-client'
export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  components: {Jnline},
  mounted() {
    this.initSocket()
  },
  methods: {
    initSocket() {
      const id = localStorage.getItem('id')
      const addr = "192.168.99.191:8072"
      const socket = io.connect(`http://${addr}?type=client&id=${id}`)
      this.$root.socket = socket
      socket.on('connect', () => {
        console.log('socket connect')
        socket.emit("receive", {})
      })
      socket.on('disconnected', e => {
        console.log('socket close')
      })
      socket.on('loseLogin', e => {
        this.$router.push('login')
      })
      // socket.on('changeTheme', e => {
      //   console.log(e)
      // })
      socket.on('deviceMsg', e => {
        console.log(e)
        // for (let i of this.$store.state.Device.maxScreenList) {
        //   if (e.data.id == i.id) {
        //     i.online = e.data.online
        //   }
        // }
      })
      socket.on('themeConn', e => {
        console.log(e)
      })
      socket.on('client', e => {
        console.log(e)
        this.$store.dispatch('pushUser', e.data.themeCtrl)
        this.$store.dispatch('pushThemeList', e.data.theme)
        this.$store.dispatch('pushVideoList', e.data.video)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/grid.css';
.home {
  width: 100%;
  height: 100%;
  background-color: #F4F8F9;
  overflow: auto!important;
  [class*='col-'] {
    .title {
      height: 50px;
      padding-top: 25px;
      padding-left: 25px;
      padding-right: 25px;
      h1 {
        display: inline-block;
        width: 100%;
        color: #1F2D3D;
        font-size: 20px;
        font-weight: normal;
        line-height: 25px;
      }
      i {
        position: relative;
        top: -21px;
        width: 100%;
        text-align: right;
        font-size: 18px;
      }
    }
    .content {
      height: calc(100% - 50px);
      
    }

    .not-title {
      height: 30px;
      padding-top: 15px;
      padding-left: 15px;
      padding-right: 15px;
      i {
        width: 100%;
        text-align: right;
        font-size: 18px;
      }
    }
    .not-content {
      position: relative;
      height: calc(100% - 30px);
      padding-left: 15px;
      padding-right: 15px;
      i {
        position: absolute;
        top: 25px;
        left: 30px;
        color: #7e3ffb;
        font-size: 20px;
      }
      .number {
        position: absolute;
        top: 0px;
        left: 60px;
        display: inline-block;
        color: #1F2D3D;
        font-size: 48px;
      }
      .text {
        position: absolute;
        top: 65px;
        left: 65px;
        display: inline-block;
        color: #8492A6;
        font-size: 14px;
      }
    }
    
  }
  .memory {
    height: 400px;
  }
  .control {
    height: 180px;
  }
  .battery {
    height: 180px;
  }
  .connect {
    height: 360px;
    .ipad {
      width: 33.33%;
      height: 100%;
      // display: inline-block;
      float: left;
      i {
        color: #7e3ffb;
        font-size: 48px;
      }
    }
    .line {
      width: 33.33%;
      height: 100%;
      float: left;
      // display: inline-block;
      i {
        color: #7e3ffb;
        font-size: 48px;
      }
    }
    .computer {
      width: 33.33%;
      height: 100%;
      float: left;
      // display: inline-block;
      i {
        color: #2196f3;
        font-size: 48px;
      }
    }
  }
}
</style>
