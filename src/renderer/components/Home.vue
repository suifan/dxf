<template>
  <div id="home">
    <!-- 本机 登录时间，在线时长，内存，网络，-->
    <!-- 大屏终端 -->
    <!-- 控制终端 -->
    <div class="flex-container">
      <div class="item" @click="clickPanel('1')" style="transform: translate(-26%, 78%) scale(.48)">
        <span class="title bg-green">控制终端</span>
        <div v-if="goSeeControlDetails" class="menu">
          <ul>
            <li class="active">上线详情</li>
          </ul>
        </div>
        <div class="content">
          <div v-if="goSeeControlDetails" class="device-details">
            <el-button type="text" @click="toggleControlDetails()">切换设备</el-button>
            <div v-if="deviceToggle" class="online">
              <div class="text">
                <span>上次登录时间: 6/16 08:20:10</span>
                <span>上次离线时间: 6/16 20:12:30</span>
                <span>上次在线时长: 11小时52分钟</span>
                <span>今日登录时间: 09:18:09</span>
              </div>
              <div class="chart">
                <ec-line id="line1"></ec-line>
              </div>
            </div>
          </div>
          <div v-else class="device">
            <ul v-if="this.$store.getters.isControlDevice" class="Device-list">
              <template v-for="(list, key, index) in this.$store.state.Device.controlList">
                <li :key="key">
                  <span class="iconfont icon-ipad"></span>
                  &nbsp;{{ list.ip }}
                  &nbsp;&nbsp;&nbsp;<el-button @click="seeControlDetails(list.connect)">查看详情</el-button>
                  <el-button v-if="list.connect" type="success">{{ list.connect ? "在线" : "离线" }}</el-button>
                  <el-button v-else type="danger">{{ list.connect ? "在线" : "离线" }}</el-button>
                </li>
              </template>
            </ul>
            <div v-else class="NotDevice">
              没有连接的设备
            </div>
          </div>
        </div>
      </div>
      <div class="item" @click="clickPanel('2')" style="transform: translate(26%, 78%) scale(.48)">
        <span class="title bg-screen">大屏终端</span>
        <div v-if="goSeeDetails" class="menu">
          <ul>
            <li :class="{active: isDeviceActive}" @click="DeviceToggleActive($event)">上线详情</li>
            <li :class="{active: !isDeviceActive}" @click="DeviceToggleActive($event)">内存</li>
          </ul>
        </div>
        <div class="content">
          <div v-if="goSeeDetails" class="device-details">
            <el-button type="text" @click="toggleDetails()">切换设备</el-button>
            <div v-if="deviceToggle" class="online">
              <div class="text">
                <span>上次登录时间: 6/16 08:20:10</span>
                <span>上次离线时间: 6/16 20:12:30</span>
                <span>上次在线时长: 11小时52分钟</span>
                <span>今日登录时间: 09:18:09</span>
              </div>
              <div class="chart">
                <ec-line id="line2"></ec-line>
              </div>
            </div>
            <div v-else class="memory">
              <div class="chart">
                <div class="os-memory">
                  <ec-bar id="bar2"></ec-bar>
                </div>
                <div class="process-memory">
                  <ec-pie id="pie2"></ec-pie>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="device">
            <div v-if="this.$store.getters.isScreenDevice" class="NotDevice">
              没有连接的设备
            </div>
            <ul v-else class="Device-list">
              <template  v-for="(list,index) in this.$store.state.Device.maxScreenList">
                <li :key="index">
                  <span class="iconfont icon-mac"></span>
                  {{ list.note }} ({{ list.ip }})
                  &nbsp;&nbsp;&nbsp;<el-button @click="seeDetails(list.connect)">查看详情</el-button>
                  <el-button v-if="list.connect" type="success">{{ list.connect ? "在线" : "离线" }}</el-button>
                  <el-button v-else type="danger">{{ list.connect ? "在线" : "离线" }}</el-button>
                </li>
              </template>
            </ul>
            
          </div>
        </div>
      </div>
      <div class="item activing" @click="clickPanel(3)" style="transform: translate(0, 0) scale(1)">
        <span class="title">本机状态</span>
        <div class="menu">
          <ul>
            <li :class="{active: isLocalActive}" @click="localToggleActive($event)">上线详情</li>
            <li :class="{active: !isLocalActive}" @click="localToggleActive($event)">内存</li>
          </ul>
        </div>
        <div class="content">
          <div v-if="localToggle" class="online">
            <div class="text">
              <span>上次登录时间: 6/16 08:20:10</span>
              <span>上次离线时间: 6/16 20:12:30</span>
              <span>上次在线时长: 11小时52分钟</span>
              <span>今日登录时间: 09:18:09</span>
            </div>
            <div class="chart">
              <ec-line id="line3"></ec-line>
            </div>
          </div>
          <div v-else class="memory">
            <div class="chart">
              <div class="os-memory">
                <ec-bar id="bar3"></ec-bar>
              </div>
              <div class="process-memory">
                <ec-pie id="pie3"></ec-pie>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import line from './chart/line.vue'
  import bar from './chart/bar.vue'
  import pie from './chart/pie.vue'
  export default {
    name: 'Home',
    data() {
      return {
        items: [],  //面板切换的列表
        localToggle: true,    //本机状态导航栏切换
        deviceToggle: true,   //大屏终端导航栏切换
        isLocalActive: true,  //本机状态导航栏激活状态
        isDeviceActive: true, //大屏终端导航栏激活状态 
        goSeeDetails: false,  //查看大屏终端的详情
        goSeeControlDetails: false,  //查看控制终端详情
        initCount: 1,
        socket: null
      }
    },
    watch: {
      socket (val) {
        console.log(val)
      }
    },
    components: {
      'ec-line': line,
      'ec-bar': bar,
      'ec-pie': pie
    },
    mounted() {
      this.getItems()
      this.initSocket()
    },
    methods: {
      initSocket () {
        const addr="192.168.99.191:8072"
        const socket = io.connect("http://"+addr+"?type=client")
        this.$root.socket = socket
        socket.on('connect', () => {
          console.log('socket connect')
          this.$store.dispatch('setConn')
        })
        socket.on('disconnected', e => {
          console.log('socket close')
        })
        socket.on('changeTheme',function(e){
          console.log(e)
        })
        socket.on('client', e => {
          console.log(e)
          if(this.initCount === 1) {
            let MaxScreenList = [],
                ControlList = []
            for (let i of e.data.device[0]) {
              i.connect = false
              MaxScreenList.push(i)
            }
            for (let i of e.data.device[1]) {
              i.connect = false
              ControlList.push(i)
            }
            this.$store.dispatch('pushMaxScreenList', MaxScreenList)
            this.$store.dispatch('pushControlList', ControlList)
            this.$store.dispatch('pushThemeList', e.data.themes)
            this.initCount ++
          }
        })
      },
      /**
       * 获取面板列表，并给每个item设置order
       **/
      getItems() {
        this.items = document.querySelectorAll('.flex-container .item')
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].dataset.order = i + 1;
        }
      },
      /**
       * 点击面板进行切换查看,点击自己不做动作
       * @params  clickIndex: 面板的标号
       **/
      clickPanel(clickIndex) {
        let activeItem = document.querySelector('.flex-container .activing')
        let activeIndex = activeItem.dataset.order
        let clickItem = this.items[clickIndex - 1]
        if (activeIndex === clickIndex) {
          return
        }
        activeItem.classList.remove('activing')
        clickItem.classList.add('activing')
        this.setStyle(clickItem, activeItem)
      },
      /**
       * 激活面板与点击面板切换样式
       * @params  el1: 已激活的面板
       * @params  el2: 点击的面板
       **/
      setStyle(el1, el2) {
        let transform1 = el1.style.transform
        let transform2 = el2.style.transform
        el1.style.transform = transform2
        el2.style.transform = transform1
      },
      /**
       * 本机切换激活样式
       * @params  e: 当前元素
       **/
      localToggleActive (e) {
        if (e.target.innerHTML === '内存') {
          this.isLocalActive = false
          this.localToggle = false
          
        }else {
          this.isLocalActive = true
          this.localToggle = true 
        }
      },
      /**
       * 大屏终端切换激活样式
       * @params  e: 当前元素
       **/
      DeviceToggleActive (e) {
        if (e.target.innerHTML === '内存') {
          this.isDeviceActive = false
          this.deviceToggle = false
          
        }else {
          this.isDeviceActive = true
          this.deviceToggle = true 
        }
      },
      /**
       * 查看大屏终端详情
       **/
      seeDetails (msg) {
        if (msg) {
          this.goSeeDetails = true
        }else {
          this.$store.dispatch('pushIMsg', {
            stateCode: 0,
            stateType: 'warning',
            stateMsg: '离线状态下无法查看详情!'
          })
        }
      },
      /**
       * 查看控制终端详情
       **/
      seeControlDetails (msg) {
        if (msg) {
          this.goSeeControlDetails = true
        }else {
          this.$store.dispatch('pushIMsg', {
            stateCode: 0,
            stateType: 'warning',
            stateMsg: '离线状态下无法查看详情!'
          })
        }
        
      },
      /**
       * 切换大屏终端详情
       **/
      toggleDetails () {
        this.goSeeDetails = false
      },
      /**
       * 切换大屏终端详情
       **/
      toggleControlDetails () {
        this.goSeeControlDetails = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  #home {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 15px 0;
    .flex-container {
      position: relative; 
      width: 95%;
      height: 100%;
      margin: 0 auto;
      .item {
        position: absolute;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 64%;
        text-align: center;
        border-radius: 5px;
        background: #fff;
        transition: all 0.8s;
        .title {
          display: block;
          height: 42px;
          line-height: 42px;
          border-radius: 5px 5px 0 0;
          color: #fff;
          font-size: 1.2em;
          background-color: #37c3ca;
        }
        .bg-screen {
          background-color: #51a8f5;
        }
        .bg-green {
          background-color: #14d695 !important;
        }
        .menu {
          width: 100%;
          height: 25px;
          margin-top: 10px;
          ul {
            li {
              width: 120px;
              float: left;
              &:hover {
                cursor: pointer;
                border-bottom: 1px solid salmon;
              }
            }
          }
        }
        .active {
          border-bottom: 1px solid salmon;
        }
        .content {
          position: relative;
          height: calc(100% - 25px - 52px);
          .NotDevice {
            height: 100%;
            line-height: 20
          }
          .online {
            width: 100%;
            height: 100%;
            .text {
              width: 40%;
              height: 100%;
              float: left;
              padding: 30px;
              text-align: initial;
              span {
                display: block;
                margin-top: 20px;
              }
            }
            .chart {
              width: 60%;
              height: 100%;
              float: left;
            }
          }
          .memory {
            width: 100%;
            height: 100%;
            .chart{
              width: 100%;
              height: 100%;
              .os-memory, .process-memory {
                width: 50%;
                height: 100%;
                float: left;
              }
            }
          }
          .device {
            width: 100%;
            height: 100%;
            .Device-list {
              width: 75%;
              margin: 10% auto;
              font-size: 1.2em;
              li {
                height: 40px;
                line-height: 40px;
                margin-bottom: 30px;
              }
            }
          }
          .device-details {
            width: 100%;
            height: 100%;
            .el-button {
              position: absolute;
              top: -35px;
              right: 10px;
            }
          }
        }
      }
    }
  }
</style>
