<template>
  <div id="home">
    <!-- 本机 登录时间，在线时长，内存，网络，-->
    <!-- 大屏终端 -->
    <!-- 控制终端 -->
    <div class="flex-container">
      <div class="item" @click="clickChart('1')" style="transform: translate(-26%, 80%) scale(.48)">
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
            <ul v-if="isControl" class="Device-list">
              <template v-for="list in controlList">
                <li>
                  <span class="iconfont icon-ipad"></span>
                  &nbsp;{{ list.remark ? list.remark : list.localIP }}
                  &nbsp;&nbsp;&nbsp;<el-button @click="seeControlDetails()">查看详情</el-button>
                  <el-button type="primary">连接</el-button>
                </li>
              </template>
            </ul>
            <div v-else class="NotDevice">
              没有连接的设备
            </div>
          </div>
        </div>
      </div>
      <div class="item" @click="clickChart('2')" style="transform: translate(26%, 80%) scale(.48)">
        <span class="title bg-screen">大屏终端</span>
        <div v-if="goSeeDetails" class="menu">
          <ul>
            <li :class="{active: isDeviceActive}" @click="localDeviceActive($event)">上线详情</li>
            <li :class="{active: !isDeviceActive}" @click="localDeviceActive($event)">内存</li>
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
            <ul v-if="isDevice" class="Device-list">
              <template v-for="list in hostList">
                <li>
                  <span class="iconfont icon-mac"></span>
                  
                  {{ list.remark ? list.remark : list.localIP }}
                  &nbsp;&nbsp;&nbsp;<el-button @click="seeDetails()">查看详情</el-button>
                  <el-button type="primary" :loading="true">连接</el-button>
                </li>
              </template>
            </ul>
            <div v-else class="NotDevice">
              没有连接的设备
            </div>
          </div>
        </div>
      </div>
      <div class="item activing" @click="clickChart('3')" style="transform: translate(0, 0) scale(1)">
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
        items: [],
        myChart: {},
        localToggle: true,
        deviceToggle: true,
        isLocalActive: true,
        isDeviceActive: true,
        isDevice: true,
        isControl: true,
        hostList: [
          {localIP: "127.0.0.1", remark: "前台大屏"},
          {localIP: "127.0.0.100", remark: "董事长电脑"}
        ],
        controlList: [
          {localIP: "127.0.0.100", remark: ""}
        ],
        goSeeDetails: false,
        goSeeControlDetails: false
      }
    },
    components: {
      'ec-line': line,
      'ec-bar': bar,
      'ec-pie': pie
    },
    mounted() {
      
      this._init()
    },
    methods: {
      // _resize() {
      //   this.$root.charts.forEach((myChart) => {
      //     myChart.resize()
      //   })
      // },
      _init() {
        this.items = document.querySelectorAll('.flex-container .item')
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].dataset.order = i + 1;
        }
      },
      clickChart(clickIndex) {
        let activeItem = document.querySelector('.flex-container .activing')
        let activeIndex = activeItem.dataset.order
        let clickItem = this.items[clickIndex - 1]
        if (activeIndex === clickIndex) {
          return
        }
        activeItem.classList.remove('activing')
        clickItem.classList.add('activing')
        this._setStyle(clickItem, activeItem)
      },
      _setStyle(el1, el2) {
        let transform1 = el1.style.transform
        let transform2 = el2.style.transform
        el1.style.transform = transform2
        el2.style.transform = transform1
      },
      localToggleActive (e) {
        if (e.target.innerHTML === '内存') {
          this.isLocalActive = false
          this.localToggle = false
          
        }else {
          this.isLocalActive = true
          this.localToggle = true 
        }
      },
      localDeviceActive (e) {
        if (e.target.innerHTML === '内存') {
          this.isDeviceActive = false
          this.deviceToggle = false
          
        }else {
          this.isDeviceActive = true
          this.deviceToggle = true 
        }
      },
      seeDetails () {
        this.goSeeDetails = true
      },
      seeControlDetails () {
        this.goSeeControlDetails = true
      },
      toggleDetails () {
        this.goSeeDetails = false
      },
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
    padding: 20px 0;
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
              width: 45%;
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
