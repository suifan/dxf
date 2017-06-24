<template>
  <div v-if="isMac" class="titleBar mac" style="-webkit-app-region: drag">
  </div>
  <div v-else class="titleBar win">
    <div class="drag"></div>
    <div class="menu">
      <close-menu></close-menu>
    </div>
  </div>
  
</template>

<script>
import closeMenu from './close-menu'
export default {
  data () {
    return {
      isMac: false
    }
  },
  components: {
    closeMenu
  },
  beforeCreate () {
    const ipc = this.$electron.ipcRenderer
    ipc.send('platform', ' ')
    ipc.on('isMac', (event, arg) => {
      this.isMac = arg
      console.log(this.isMac)
    })
  }
}
</script>

<style lang="scss" scoped>
.titleBar {
  border-bottom: 1px solid #000000;
  height: 22px;
  background-color: #24292e;
  .drag {
    display: inline-block;
    width: calc(100% - 132px);
    height: 100%;
    // background-color: #24292e;
    -webkit-app-region: drag;
  }
  .menu { 
    float: right;
    width: 132px; 
    height: 100%;
  }
}

.win {
  height: 28px!important;
}

</style>
