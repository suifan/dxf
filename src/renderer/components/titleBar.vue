<template>
  <div class="titleBar win">
    <div class="drag"></div>
    <div class="menu">
      <close-menu></close-menu>
    </div>
  </div>
</template>

<script>
import closeMenu from './menu/close-menu'
export default {
  components: {
    closeMenu
  }
}
</script>

<style lang="scss" scoped>
.titleBar {
  border-bottom: 1px solid #000000;
  .drag {
    display: inline-block;
    width: calc(100% - 132px);
    height: 100%;
    background-color: #24292e;
    -webkit-app-region: drag;
  }
  .menu { 
    float: right;
    width: 132px; 
    height: 100%;
    background-color: #24292e;
  }
}

.win {
  height: 28px!important;
}
</style>
