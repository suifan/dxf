<template>
  <div id="app">
    <div class="nav">
    
    </div>
    <div class="sidebar">
      <button class="btn btn-primary">Default</button>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  

  export default {
    name: 'app'
  }
</script>

<style  type="scss">
  body, html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    width: 100%;
    height: 100%
  }
  .nav {
    width: 100%;
    height: 10%;
    background-color: #373D41;
  }
  .sidebar {
    width: 10%;
    height: 90%;
    background-color: #373D41;
  }      
</style>
