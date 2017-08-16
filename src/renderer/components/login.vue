<template>
  <div class="login">
    <div class="bg"></div>
    <img src="../assets/img/user.jpg" alt="">
    <div class="jn-text"><span>Administrator</span></div>
    <div class="jn-input">
      <i class="fa fa-user"></i>
      <input type="text" v-model="name" placeholder="please enter username...">
      <span class="jn-input-check"></span>
      <div class="jn-input-line"></div>
    </div>
    <div class="jn-input" style="margin-top: 40px;">
      <i class="fa fa-lock"></i>
      <input type="password" v-model="pwd" placeholder="please enter password...">
      
      <div class="jn-input-line"></div>
    </div>
    <div class="jn-button">
      <button @click="login">sign in</button>
    </div>

    <div class="jn-popup jn-popup-right" v-if="loginEorror">
      用户名或密码错误
    </div>
    <!-- <close-menu></close-menu> -->
  </div>
</template>

<script>
  const closeMenu = require('../components/menu/close-menu')
  export default {
    name: 'login',
    data() {
      return {
        name: '',
        pwd: '',
        win: this.$electron.remote.BrowserWindow.win,
        loginEorror: false
      }
    },
    watch: {
      loginEorror (val) {
        if (val) {
          setTimeout(() => {
            this.loginEorror = false
          }, 2000)
        }
      }
    },
    components: {
      closeMenu
    },
    methods: {
      login() {
        this.$http.get(`http://www.jnoos.com:7676/login?user=${this.name}&psw=${this.pwd}`)
          .then(response => {
            if (response.data.code == 1005) {
              this.loginEorror = true
            }
            if (response.data.code == 1000) {
              console.log(response.data.data.id)
              let user = {}
              user.name = this.name
              user.pwd = this.pwd
              this.$router.push('/Home')
              localStorage.setItem('id', response.data.data.id)
              localStorage.setItem('user', JSON.stringify(user))
              this.$store.dispatch('signin')
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted() {
  
    }
  }
</script>

<style lang="scss">
  .login {
    width: 100%;
    height: 100%;
    .bg {
      position: absolute;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: url('../assets/img/dr_18.jpg');
      background-size: 100% 100%;
      filter: blur(3px);
      opacity: .93;
    }
    img {
      position: relative;
      top: 100px;
      display: block;
      margin: 0 auto 10px;
      border-radius: 10px;
      box-shadow: 2px 2px 2px 1px rgba(132, 132, 132, 0.55);
    }
    .jn-text {
      position: relative;
      top: 100px;
      display: block;
      width: inherit;
      margin: auto;
      text-align: center;
      span {
        font-size: 1.5rem;
        color: #FFFFFF;
        font-weight: normal;
      }
    }
    .jn-input {
      position: relative;
      top: 120px;
      width: 300px;
      margin: auto;
      i {
        position: absolute;
        top: 0px;
        left: 10px;
        color: #FFFFFF;
        font-size: 1.4rem;
      }
      input {
        position: relative;
        right: 0;
        display: block;
        width: 234px;
        background: transparent;
        border: none;
        margin: auto;
      }
      .jn-input-check {
        position: absolute;
        top: 9px;
        right: 9px;
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #00C853;
        animation: checkTrue 2s both infinite alternate;
      }
      .check-true {
        animation: checkTrue 2s infinite forwards;
      }
      @keyframes checkTrue {
        from {
          background-color: rgba(0,200,83,1);
          transform: scale(1)
        }
        to {
          background-color: rgba(0,200,83,.6);
          transform: scale(1.2)
        }
      }
      .jn-input-line {
        border-bottom: 1px solid #fff;
      }
    }
    .jn-button {
      position: relative;
      top: 165px;
      text-align: center;
      button {
        width: 120px;
        padding: 10px;
        border: 1px solid #FFF;
        border-radius: 5px;
        background: transparent;
        color: #fff;
        transition: box-shadow 1.2s;
        &:hover {
          box-shadow: 0 0 10px 3px #fff;
        }
      }
    }
    .jn-popup {
      position: fixed;
      top: 40px;
      right: 20px;  
      width: 240px;
      padding: 10px;
      border-radius: 3px;
      background-color: rgba(233, 233, 233, 0.76);
      text-align: center;
      font-size: 1rem;
      color: #fff;
      animation: popupEnter 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    @keyframes popupEnter {
      from {
        transform: translate(100%, 0)
      }
      to {
        transform: translate(0, 0)
      }
    }
  }
</style>
