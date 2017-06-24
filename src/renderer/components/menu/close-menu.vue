<template>
  <div class="menu">
    <span class="iconfont icon-close" @click="close"></span>
    <span class="iconfont icon-maximize" @click="maximize($event)"></span>
    <span class="iconfont icon-minimze" @click="minimize"></span>
  </div>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer
export default {
  name: 'clsoe-menu',
  data() {
    return {
      isBig: false,
      ipc: this.$electron.ipcRenderer
    }
  },
  methods: {
    close() {
      this.ipc.send('window-all-closed')
    },
    maximize(e) {
      if (this.isBig) {
        this.ipc.send('unmaximize')
        e.target.className = 'iconfont icon-maximize'
        this.isBig = false
      } else {
        this.ipc.send('maximize')
        e.target.className = 'iconfont icon-restore'
        this.isBig = true
      }
    },
    minimize() {
      ipcRenderer.send('minimize')
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  // position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: autp;
  height: 28px;
  color: #aaaaaa;
  background-color: #21252b;
  span {
    // display: inline-block;
    float: right;
    width: 44px;
    height: 100%;
    line-height: 28px;
    text-align: center;
    transition: all .8s;
    &:hover {
      color: #ffffff;
      background-color: #828282;
    }
    &:first-Child:hover {
      background-color: #ff0000;
    }
  }
}
</style>
