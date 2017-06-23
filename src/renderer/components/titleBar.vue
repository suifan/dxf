<template>
  <div class="titleBar win">
    <button class="iconfont icon-close"  @click.prevent="close"></button>
    <span class="iconfont icon-maximize" @click.prevent="maximize"></span>
    <span class="iconfont icon-minimze" @click.prevent="minimize"></span>
  </div>
</template>

<script>
let ipcRenderer = require('electron').ipcRenderer

export default {
  data() {
    return {
      isBig: false
    }
  },
  methods: {
    close() {
      console.log(ipcRenderer)
      ipcRenderer.send('window-all-closed')
    },
    maximize() {
      this.isBig ? ipcRenderer.send('unmaximize') : ipcRenderer.send('maximize');
    },
    minimize() {
      ipcRenderer.send('minimize')
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.titleBar {
  width: 100%;
  height: 22px;
  line-height: 22px;
  color: rgb(157, 165, 180);
  background-color: rgb(33, 37, 43);
  font-size: 12px;
  -webkit-app-region: drag;
  span {
    display: inline-block;
    // float: right;
    width: 44px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    &:hover {
      color: #ffffff;
      background-color: #6b6b6b;
    }
  }
}

// .win {
//   height: 28px!important;
// }
</style>
