<template>
  <div class="login">
    <!--<video id="video" src="../../../static/video/map4.mov" 
    autoplay="autoplay" loop="loop" muted></video>-->
    <div class="title">
      <img src="../../../static/dxf.png" width="40" alt="">
      <span>数据连接世界,发现数据之美</span>
    </div>

    <div class="input vertical-middle">
      <el-input placeholder="用户名" v-model="name">
        <template slot="prepend"><span class="iconfont icon-user"></span></template>
      </el-input>
      <el-input placeholder="密码" type="password" v-model="pwd">
        <template slot="prepend"><span class="iconfont icon-password"></span></template>
      </el-input>
      <button @click="login">登录</button>
    </div>
    <!--<close-menu></close-menu>-->
  </div>
</template>

<script>
  const closeMenu = require('../components/menu/close-menu')
  export default {
    name: 'login',
    data () {
      return {
        name: '',
        pwd: '',
        win: this.$electron.remote.BrowserWindow.win
      }
    },
    components: {
      closeMenu
    },
    methods: {
      initSocket (url) {
        let ws = new WebSocket(url),
            that = this
        ws.onopen = function () { 
          console.log('连接成功！')
        }
        ws.onmessage = function (evt) {
          let user = {}
          user.name = this.name
          user.pwd = this.pwd
          let received_msg = JSON.parse(evt.data)
          if(received_msg.code === 1000){
            that.win.setSize(1024, 688)
            that.win.center()
            that.$router.push('/')
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('companyID', received_msg.data)
            that.$store.dispatch('doLogin')
            ws.close()
          }else{
            console.log('用户名或密码错误!')
          }
          console.log(evt)
          that.$store.dispatch('getData', evt)
        }
        ws.onerror = function (error) {
          console.log(error)
        }
        ws.onclose = function () {
          console.log('连接已断开!')
        }
      },
      login () {
        let flag = this.$store.state.User.flag
        let company = this.name.split("_")[0]
        let user = this.name.split("_")[1]
        let url = `${this.$store.state.url.login}?type=login&flag=${flag}&company=${company}&user=${user}&psw=${this.pwd}`
        this.initSocket(url)

       
        // this.win.setSize(1024, 688)
        // this.win.center()
        // this.$router.options.routes[0].meta.requireAuth = false
        // this.$router.push('/')
        // this.$store.dispatch('doLogin', 1)
      }
    },
    mounted () {
      
    }
  }
</script>

<style lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background-color: #000;
    
    #video {
      position: absolute;
      top: -9%;
      width: 100%;
      height: 670px;
    }
    .title {
      position: relative;
      top: 20%;
      left: 25%;
      color: #ffffff;
      font-size: 1.5em;
    }
    .input {
      width: 36%;
      margin: -10% auto;
    }
    .el-input, button {
      margin-top: 30px;
    }
    button {
      position: relative;
      width: 4em;
      height: 40px;
      border: 1px solid #FFF;
      border-radius: 5px;
      color: #fff;
      font-size: 1.2em;
      background-color: transparent;
      &:hover {
        cursor: pointer;
        color: #000;
        background-color: #fff;
      }
    }
  }
</style>
