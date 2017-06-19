<template>
  <div class="themeView">
    <!-- 大屏终端 -->
    <div class="panel">
      <div class="panel-body progress-panel">
        <div class="panel-task">
          <span class="iconfont icon-mac"></span> 大屏终端
        </div>
        <div class="counter">
          设备数量: 2
        </div>
      </div>
      <table class="table table-hover personal-task">
        <tbody>
          <tr>
            <td>序号</td>
            <td>主机ip</td>
            <td>备注</td>
            <td>设备状态</td>
            <td>通信连接</td>
            <td>在线时长</td>
            <td>占用内存</td> 
          </tr>
          <tr>
            <td>1</td>
            <td>192.168.0.104</td>
            <td>前台大屏</td>
            <td>在线</td>
            <td>已连接</td>
            <td>10h</td>
            <td>340M</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 控制台终端 -->
    <div class="panel">
      <div class="panel-body progress-panel bg-green">
        <div class="panel-task">
          <span class="iconfont icon-ipad"></span> 控制终端
        </div>
        <div class="counter">
          设备数量: 1
        </div>
      </div>
      <table class="table table-hover personal-task">
        <tbody>
          <tr>
            <td>序号</td>
            <td>主机ip</td>
            <td>操作系统</td>
            <td>设备类型</td> 
            <td>设备状态</td>
            <td>通信连接</td>
            <td>使用时长</td>
          </tr>
          <tr>
            <td>1</td>
            <td>192.168.0.104</td>
            <td>ios 10.0</td>
            <td>ipad</td>
            <td>在线</td>
            <td>已连接</td>
            <td>20min</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 主题分配 -->
    <div class="panel">
      <div class="panel-body progress-panel bg-yellow">
        <div class="panel-task">
          <span class="iconfont icon-distribution"></span> 主题分配
        </div>
      </div>
      <div class="distribution">
        <div class="Device">
          <p class="title">设备列表</p> 
          <ul v-if="isDevice" class="Device-list">
            <template v-for="list in hostList">
              <li @click="readThemeList($event, list.localIP)">{{ list.remark ? list.remark : list.localIP }}</li>
            </template>
          </ul>
          <div v-else class="NotDevice">
            没有连接的设备
          </div>
        </div>

        <div v-if="isSelectDevice" class="SelectDevice">
          <div class="run-theme-list">
            <p class="title">运行的主题列表</p>
            <div class="list-content" id="runtheme">
              <template v-for="item in runTheme">
                <div @click="selectRunTheme($event, item)">
                  <img :src="item.img" :alt="item.name" width="120">
                  <span>{{ item.name }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="operation">
            <button class="btn btn-default" @click="importTheme()"><span class="iconfont icon-left"></span>导入</button>
            <button class="btn btn-default" @click="exportTheme()"><span>导出</span><span class="iconfont icon-right"></span></button>
          </div>
          <div class="theme-list">
            <p class="title">已有的主题列表</p>
            <div class="list-content" id="nowtheme">
              <template v-for="item in theme">
                <div @click="selectNowTheme($event, item)">
                  <img :src="item.img" :alt="item.name" width="120">
                  <span>{{ item.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div v-else class="NotSelectDevice"> 
          未选择设备
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  var os = require('os');
  var IPv4, hostName;
  hostName = os.hostname();
  for (var i = 0; i < os.networkInterfaces().en0.length; i++) {
    if (os.networkInterfaces().en0[i].family == 'IPv4') {
      IPv4 = os.networkInterfaces().en0[i].address;
    }
  }
  let a = {
    localIP: "127.0.0.1", 
    remark: "前台大屏",
    runTheme: [
      {img: '', name: '集团信息'}
    ],
    theme: []
  }
  export default {
    data () {
      return {
        isDevice: true,
        isSelectDevice: false,
        hostList: [
          {localIP: "127.0.0.1", remark: "前台大屏"},
          {localIP: "127.0.0.100", remark: "董事长电脑"}
        ],
        themeInfo: [
          {
            localIP: "127.0.0.1",
            runTheme: [
              {img: '', name: '集团信息'},
              {img: '', name: 'ssss'}
            ],
            theme: []
          },
          {
            localIP: "127.0.0.100", 
            runTheme: [],
            theme: [
              {img: '', name: '集团信息'},
              {img: '', name: 'ssss'},
              {img: '', name: 'aaaa'}
            ]
          }
        ],
        runTheme: [],
        theme: [],
        sNowTheme: [],
        sRunTheme: [],
        selectIP: ''
      }
    },
    methods: {
      readThemeList (e, ip) {
        let children = e.target.parentNode.children
        if (e.target.className === 'select') {
          this.isSelectDevice = false
          e.target.className = ''
          this.selectIP = ''
          this.runTheme = ''
          this.theme = ''
        }else {
          this.isSelectDevice = true
          this.selectIP = ip
          for (let i of children) {
            i.className = ''
          }
          e.target.className = 'select'
          for (let i of this.themeInfo) {
            if(ip === i.localIP) {
              this.runTheme = i.runTheme
              this.theme = i.theme
            }
          }
        }
      },
      selectNowTheme (e, item) {
        if (e.target.nodeName === "DIV") {
          if (e.target.className === 'selectTheme') {
            e.target.className = ''
            _.remove(this.sNowTheme, i => i.name === item.name)
          }else {
            e.target.className = 'selectTheme'
            this.sNowTheme.push(item)
          }
        }else {
          if (e.target.parentNode.className === 'selectTheme') {
            e.target.parentNode.className = ''
            _.remove(this.sNowTheme, i => i.name === item.name)
          }else {
            e.target.parentNode.className = 'selectTheme'
            this.sNowTheme.push(item)
          }
        }
      },
      selectRunTheme (e, item) {
        if (e.target.nodeName === "DIV") {
          if (e.target.className === 'selectTheme') {
            e.target.className = ''
            _.remove(this.sRunTheme, i => i.name === item.name)
          }else {
            e.target.className = 'selectTheme'
            this.sRunTheme.push(item)
          }
        }else {
          if (e.target.parentNode.className === 'selectTheme') {
            e.target.parentNode.className = ''
            _.remove(this.sRunTheme, i => i.name === item.name)
          }else {
            e.target.parentNode.className = 'selectTheme'
            this.sRunTheme.push(item)
          }
        }
      },
      importTheme () {
        let dom = document.getElementById('nowtheme')
        for (let i of this.themeInfo) {
          let rt = _.get(i, "runTheme"),
              t = _.get(i, "theme")
          if (i.localIP === this.selectIP) {
            for(let i2 of this.sNowTheme) {
              _.remove(t, item => item.name === i2.name)
              rt.push(i2)
              for(let i3 of dom.childNodes) {
                i3.className = ''
              }
            }
            this.sNowTheme = []
          }  
        }
      },
      exportTheme () {
        let dom = document.getElementById('runtheme')
        for (let i of this.themeInfo) {
          let rt = _.get(i, "runTheme"),
              t = _.get(i, "theme")
          if (i.localIP === this.selectIP) {
            for(let i2 of this.sRunTheme) {
              _.remove(rt, item => item.name === i2.name)
              t.push(i2)
              for(let i3 of dom.childNodes) {
                i3.className = ''
              }
            }
            this.sRunTheme = []
          }  
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .themeView {
    width: 100%;
    height: 100%;
    padding: 20px;
    .panel {
      text-align: center;
      .panel-body {
        padding: 15px;
        border-radius: 5px 5px 0 0;
        color: #fff;
        background-color: #51a8f5;
        .panel-task {
          float: left
        }
        .counter {
          float: right
        }
      }
    }
    .bg-green {
      background-color: #14d695 !important;
    }
    .bg-yellow {
      background-color: #d2a810 !important;
    }
    .distribution {
      height: 320px;
      display: flex;     
      .title {
        padding: 5px;
        border-bottom: 1px solid #ccc;
      }
      .Device {
        flex: 2;
        border-right: 1px solid #ccc;
        .NotDevice {
          line-height: 285px;
          font-size: 1.3rem;
          color: #d2a810;
        }
        .Device-list {
          height: 285px;
          li {
            padding: 5px;
            border-bottom: 1px solid #ccc;
            &:hover {
              background-color: #f5f5f5;
            }
          }
        }
        .select {
          color: #fff;
          background-color: #cecece;
          &:hover {
            background-color: #cecece!important;
          }
        }
      }
      
      .NotSelectDevice {
        flex: 8;
        line-height: 320px;
        font-size: 1.5rem;
        color: #d2a810;
      }

      .SelectDevice {
        flex: 8;
        display: flex;
        .run-theme-list {
          flex: 3;
          border-right: 1px solid #ccc;
        }
        .operation {
          flex: 2;
          border-right: 1px solid #ccc;
          button:nth-child(1) {
            display: block!important;
            margin: 115px auto 18px;
          }
        }
        .theme-list {
          flex: 3;
        }
        .list-content {
          height: 285px;
          overflow: auto;
          div {
            position: relative;
            padding: 8px;
            border-bottom: 1px solid #ccc;
          }
          .selectTheme {
            background-color: #d7e2fa;
          }
        }
      }
    }
  }
</style>
