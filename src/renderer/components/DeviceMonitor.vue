<template>
  <div class="themeView">
    <!-- 大屏终端 -->
    <div class="panel">
      <div class="panel-body progress-panel">
        <div class="panel-task">
          <span class="iconfont icon-mac"></span> 大屏终端
        </div>
        <div class="counter">
          设备数量: {{ maxScreenList.length }}
        </div>
      </div>
      <table class="table table-hover personal-task">
        <tbody>
          <tr>
            <td>序号</td>
            <td>主机ip</td>
            <td>备注</td>
            <td>操作系统</td> 
            <td>设备状态</td>
          </tr>
          <template v-for="list,index in maxScreenList">
            <tr>
              <td>{{ list.id }}</td>
              <td>{{ list.ip }}</td>
              <td>{{ list.note }}</td>
              <td>{{ list.device }}</td>
              <td>{{ list.connect ? "在线" : "离线" }}</td>
            </tr>
          </template>
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
          设备数量: {{ controlList.length }}
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
          </tr>
          <template v-for="list,index in controlList">
            <tr>
              <td>{{ list.id }}</td>
              <td>{{ list.ip }}</td>
              <td>{{ list.device }}</td>
              <td>{{ list.note }}</td>
              <td>{{ list.connect ? "在线" : "离线" }}</td>
            </tr>
          </template>
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
          <ul v-if="!isDevice" class="Device-list">
            <template v-for="list in maxScreenList">
              <li @click="readThemeList($event, list)">{{ list.note ? list.note : list.ip }}</li>
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
                  <!--<img :src="item.img" :alt="item.name" width="120">-->
                  <span>{{ item.name }}</span>
                  <el-button @click="preview">预览</el-button>
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
                  <!--<img :src="item.img" :alt="item.name" width="120">-->
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
  // var os = require('os');
  // var IPv4, hostName;
  // hostName = os.hostname();
  // for (var i = 0; i < os.networkInterfaces().en0.length; i++) {
  //   if (os.networkInterfaces().en0[i].family == 'IPv4') {
  //     IPv4 = os.networkInterfaces().en0[i].address;
  //   }
  // }
  export default {
    data () {
      return {
        isDevice: this.$store.getters.isScreenDevice,
        isSelectDevice: false, //是不是选择了设备
        maxScreenList: this.$store.state.Device.maxScreenList,
        controlList: this.$store.state.Device.controlList,
        themeList: this.$store.state.Theme.themeList.slice(0),
        runTheme: [],
        theme: [],
        sNowTheme: [],
        sRunTheme: [],
        selectdevice: ''
      }
    },
    methods: {
      /**
       * 读取主题列表
       * @params  e: 当前元素
       * @params  ip: 读取的设备IP
       **/
      readThemeList (e, item) {
        let children = e.target.parentNode.children
        if (e.target.className === 'select') {
          this.isSelectDevice = false
          e.target.className = ''
          this.selectdevice = ''
          this.runTheme = ''
          this.theme = ''
        }else {
          this.isSelectDevice = true
          this.selectdevice = item
          for (let i of children) {
            i.className = ''
          }
          e.target.className = 'select'
          for (let i of this.ScreenRunTheme) {
            if(item.ip === i.ip) {
              this.runTheme = i.runTheme
              this.theme = i.nowTheme
            }
          }
        }
      },
      /**
       * 选取现有主题列表
       * @params  e: 当前元素
       * @params  item: 选中的主题信息
       **/
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
      /**
       * 选取运行的主题列表
       * @params  e: 当前元素
       * @params  item: 选中的主题信息
       **/
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
      /**
       * 选中的主题导入运行主题列表内
       **/
      importTheme () {
        let dom = document.getElementById('nowtheme')
        let t_id = []
        for (let i of this.ScreenRunTheme) {
          let rt = _.get(i, "runTheme"),
              t = _.get(i, "nowTheme")
          if (i.ip === this.selectdevice.ip) {
            for(let i2 of this.sNowTheme) {
              _.remove(t, item => item.name === i2.name)
              rt.push(i2)
              t_id.push(i2.id)
              for(let i3 of dom.childNodes) {
                i3.className = ''
              }
            }
           
            let msg = {
              type: "changeTheme",
              data: {
                id: this.selectdevice.id,
								val: t_id.toString()
              }
            }
            this.$store.state.socket.ws.send(JSON.stringify(msg))
            this.sNowTheme = []
          }  
        } 
        
      },
      /**
       * 选中的主题导出到现有主题中
       **/
      exportTheme () {
        let dom = document.getElementById('runtheme')
        for (let i of this.ScreenRunTheme) {
          let rt = _.get(i, "runTheme"),
              t = _.get(i, "nowTheme")
          if (i.ip === this.selectdevice.ip) {
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
      },
      preview (item) {
        
      }
    },
    computed: {
      //大屏终端将药运行的主题列表
      ScreenRunTheme () {
        let arr = []
        for (let i of this.maxScreenList) {
          arr.push({
            ip: i.ip,
            runTheme: [],
            nowTheme: this.themeList.slice(0)
          })
        }
        return arr
      }
    },
    mounted () {
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
