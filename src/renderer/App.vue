<template>
  <div id="app">
    <div class="top">
      <!-- 控制中心 -->
      <div class="center">
        <span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
      </div>
      <!-- 导航栏 -->
      <div class="nav">
        <!-- 显示系统／其他的一些信息 -->
        <div class="message">
        </div>
        <!-- 右侧的信息、设置、头像-->
        <div class="setting">
          <span class="glyphicon glyphicon-bell"></span>
          <span class="glyphicon glyphicon-asterisk"></span>
          <span class="glyphicon glyphicon-user"></span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <!-- 侧边栏菜单 -->
      <div class="sidebar">
        <ul>
          <li><span class="glyphicon glyphicon-chevron-down" title="主题管理"></span></li>
          <li><span class="glyphicon glyphicon-open" title="主题上传"></span></li>
          <li><span class="glyphicon glyphicon-indent-left" title="主题信息"></span></li>
          <li><span class="glyphicon glyphicon-eye-open" title="主题视图"></span></li>
          <li><span class="glyphicon glyphicon-scale" title="性能监测"></span></li>
          <li><span class="glyphicon glyphicon-object-align-horizontal" title="控制台"></span></li>
        </ul>
      </div>
      <!-- 主内容区域 -->
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  body, html {
    width: 100%;
    height: 100%;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    font-size: 15px;
  }
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .top {
    flex: 1;
    display: flex;
    .center { 
      flex: 1;
      background-color: #01A6EF;
      color: white;
      text-align: center;
      line-height: 2.2;
      font-size: 1.2rem;
    }
    .nav {
      flex: 22;
      display: flex;
      background-color: #2A3542;
      .message {
        flex: 8;
      }
      .setting {
        flex: 1.5;
        color: white;
        text-align: center;
        font-size: 1.2rem;
        span {
          width: 30%;
          line-height: 2.2;
        }
      }
    } 
  }
  .bottom {
    flex: 17;
    display: flex;
    .sidebar {
      flex: 1;
      background-color: #2A3542;
      color: white;
      ul {
        text-align: center;
        li {
          padding: 13px 0;
        }
      }
    }
    .main {
      flex: 22;
      background-color: #CCC;
    }
  }
</style>
