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
  import axios from 'axios'
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
      login () {
        const that = this
        axios.get(`http://www.jnoos.com:7676/login?user=${this.name}&psw=${this.pwd}`)
        .then(function (response) {
          if(response.data.code == 1005) {
            alert('用户名或密码错误')
          }
          if(response.data.code == 1000) {
            let user = {}
            user.name = that.name
            user.pwd = that.pwd
            that.$router.push('/Home')
            localStorage.setItem('user', JSON.stringify(user))
            that.$store.dispatch('signin')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
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
