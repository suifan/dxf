<template>
  <div class="login">
    <video id="video" src="../../../static/video/map4.mov" 
    autoplay="autoplay" loop="loop" muted></video>
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
		
  </div>
</template>

<script>
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const os = require('os')
  export default {
    name: 'login',
    data () {
      return {
        name: '',
        pwd: ''
      }
    },
    methods: {
      login () {
        console.log(os.platform())
        console.log(process.platform)
        if (this.name == 'admin' && this.pwd == 123) {
          this.$store.dispatch('doLogin')
          BrowserWindow.win.setSize(1000, 692)
          BrowserWindow.win.center()
          this.$router.options.routes[0].meta.requireAuth = false
          this.$router.push('/')
        }
      }
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
      top: -6%;
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
