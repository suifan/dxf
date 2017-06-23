<template>
  <div class="themeInfo">
    <div class="box">
      <div class="top">
        <!--../../assets/img/theme.png-->
        <img src="../../assets/img/theme.png" width="" alt="">
      </div>
      <div class="bottom">
        <span v-if="isTheme" class="vertical-middle">还未上传主题</span>
        <span v-else class="vertical-middle">主题上传于{{ defaultTheme.uploadTime }}</span>
      </div>
    </div>
    <div class="scene">
      <span class="iconfont icon-pen" id="modify" @click="modify()"></span>
      <span class="iconfont icon-finish transparent" id="finish" @click="finish()"></span>
      <div>
        <span>主题名称:&nbsp;</span>
        <input type="text" class="ip-text ip-text-default" id="themeName" readonly :value="defaultTheme.name">
      </div>
      <div>
        <span style="vertical-align: top; display: inline-block">主题描述:&nbsp;</span>
        <textarea name="" id="describe" class="ip-text-default" readonly cols="30" rows="6">{{ defaultTheme.describe }}</textarea>
      </div>
    </div>
    <div class="timeLine">
      <p>主题运行时间线</p>
      <div v-if="noRunTheme" class="noRunTheme">
        大屏终端没有运行主题
      </div>
      <div v-else class="stateLine">
        <article class="timeline-item">
          <div class="timeline-desk">
            <div class="panel">
              <div class="panel-body">
                <span class="arrow"></span>
                <span class="timeline-icon red"></span>
                <span class="timeline-date">2017-6-11 20:25:11</span>
                <h1 class="red">主题已下线</h1>
              </div>
            </div>
          </div>
        </article>
        <article class="timeline-item alt">
          <div class="timeline-desk">
            <div class="panel">
              <div class="panel-body">
                <span class="arrow-alt"></span>
                <span class="timeline-icon green"></span>
                <span class="timeline-date">2017-6-11 08:26:11</span>
                <h1 class="green">页面加载完成</h1>
              </div>
            </div>
          </div>
        </article>
        <article class="timeline-item">
          <div class="timeline-desk">
            <div class="panel">
              <div class="panel-body">
                <span class="arrow"></span>
                <span class="timeline-icon blue"></span>
                <span class="timeline-date">2017-6-11 08:25:15</span>
                <h1 class="blue">主题渲染完成</h1>
              </div>
            </div>
          </div>
        </article>
        <article class="timeline-item alt">
          <div class="timeline-desk">
            <div class="panel">
              <div class="panel-body">
                <span class="arrow-alt"></span>
                <span class="timeline-icon purple"></span>
                <span class="timeline-date">2017-6-11 08:25:11</span>
                <h1 class="purple">主题开始渲染</h1>
              </div>
            </div>
          </div>
        </article>
  
      </div>
    </div>
  
    <div class="timer">
      <div v-if="noRunTheme" class="noRunTheme">
        大屏终端没有运行主题
      </div>
      <div v-else>
        <p>Dom加载完成：330ms </p>
        <p>页面加载完成：1min</p>
        <p>主题运行时间：12h</p>
      </div>
    </div>
    <div class="performance">
      <div class="top">
        <span class="online">
            <label class="circle" :class="{green: this.defaultDevice.connect, red: !this.defaultDevice.connect}"></label>
            <label for="">{{ defaultDevice.localIP }}</label>
          </span>
      </div>
      <div class="middle">
        <ul v-if="showList" class="">
          <li v-if="isScreenDevice">没有设备</li>
          <template v-else v-for="list in maxScreenList">
            <li :class="{hostActive: defaultDevice.localIP === list.localIP}">
              <span class="iconfont icon-mac"></span>
              &nbsp;{{ list.remark ? list.remark : list.localIP }}
              &nbsp;&nbsp;&nbsp;<el-button v-if="defaultDevice.localIP != list.localIP" type="primary" size="mini" @click="toggle('device', list)">切换</el-button>
            </li>
          </template>
        </ul>
        <ul v-else>
          <li v-if="isTheme">没有主题列表，请上传主题</li>
          <template v-else v-for="list in themeList">
            <li :class="{hostActive: defaultTheme.name === list.name}">
              <span class="iconfont icon-web-theme"></span>
              &nbsp;{{ list.name }}
              &nbsp;&nbsp;&nbsp;<el-button v-if="defaultTheme.name != list.name" type="primary" size="mini" @click="toggle('theme', list)">切换</el-button>
            </li>
          </template>
        </ul>
      </div>
      <div class="bottom">
        <span class="memory" :class="{active: showList}" @click="toggleNav($event)">设备列表</span>
        <span class="cpu" :class="{active: !showList}" @click="toggleNav($event)">主题列表</span>
      </div>
    </div>
  
  </div>

</template>

<script>
  export default {
    name: 'ThemeInfo',
    data() {
      return {
        isTheme: this.$store.getters.isTheme,
        isScreenDevice: this.$store.getters.isScreenDevice,
        themeList: this.$store.state.Theme.themeList,
        maxScreenList: this.$store.state.Device.maxScreenList,
        defaultDevice: {
          localIP: "",
          remark: "",
          systemOS: '',
          deviceState: '',
          connect: false
        },
        defaultTheme: {
          imgSrc: '',
          name: '',
          describe: '',
          uploadTime: ''
        },
        showList: true,
        noRunTheme: this.$store.state.Theme.noRunTheme
      }
    },
    computed: {
      
    },
    methods: {
      /**
       * 修改主题信息
       **/
      modify() {
        let themeName = document.getElementById('themeName'),
          describe = document.getElementById('describe'),
          modify = document.getElementById('modify'),
          finish = document.getElementById('finish')
        if (!this.$store.getters.isTheme) {
          modify.style.color = '#D32E50'
          finish.className = 'iconfont icon-finish transparent show'
          themeName.removeAttribute('readonly')
          describe.removeAttribute('readonly')
          themeName.className = 'ip-text ip-text-modify'
          describe.className = 'ip-text-modify'
        }else {
          this.$store.dispatch('pushIMsg', {
            stateCode: 0,
            stateType: 'warning',
            stateMsg: '请先上传主题'
          })
        }
      },
      /**
       * 完成修改
       **/
      finish() {
        let themeName = document.getElementById('themeName'),
          describe = document.getElementById('describe'),
          modify = document.getElementById('modify'),
          finish = document.getElementById('finish')
        modify.style.color = '#137bd6'
        finish.className = 'iconfont icon-finish transparent hidden'
        themeName.setAttribute('readonly', 'readonly')
        describe.setAttribute('readonly', 'readonly')
        themeName.className = 'ip-text ip-text-default'
        describe.className = 'ip-text-default'
        this.$store.dispatch('pushIMsg', {
          stateCode: 2,
          stateType: 'success',
          stateMsg: '修改成功!'
        })
      },
      /**
       * 切换主题和设备
       **/
      toggle (type, data) {
        if(type === "theme") {
          this.defaultTheme = data
        }else {
          this.defaultDevice = data
        }
      },
      /**
       * 切换导航
       **/
      toggleNav (e) {
        let items = document.querySelectorAll('.performance .bottom span')
        if (e.target.innerHTML === '设备列表') {
          this.showList = true
        }else {
          this.showList = false
        }
      }
    },  
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .themeInfo {
    width: 100%;
    height: 100%;
    .box {
      display: inline-block;
      width: 50%;
      height: 38%;
      margin: 15px;
      border-radius: 5px;
      background-color: #fff; //bfd882
      .top {
        margin: 3% 5%;
        width: 90%;
        height: 68%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .bottom {
        position: relative;
        height: 20%;
        background-color: #7bb348;
        border-radius: 0 0 5px 5px;
        text-align: center;
        span {
          font-size: 1.1rem;
          color: #fff;
        }
      }
    }
    .scene {
      float: right;
      width: calc(50% - 45px);
      height: 38%;
      margin: 15px 15px 15px 0;
      padding: 15px;
      background-color: #ffffff;
      border-radius: 5px;
      #modify {
        position: absolute;
        right: 2%;
        top: 3%;
        width: 32px;
        height: 32px;
        text-align: center;
        line-height: 2;
        color: #137bd6;
        &:hover {
          cursor: pointer;
        }
      }
      #finish {
        position: absolute;
        right: 2%;
        top: 8%;
        width: 32px;
        height: 32px;
        text-align: center;
        line-height: 2;
        color: #13d676;
        &:hover {
          cursor: pointer;
        }
      }
      div {
        margin-bottom: 12px;
        .ip-text,
        textarea {
          width: 66.666%;
          padding: 2px 12px;
          border: 1px solid #cecccc;
          border-radius: 4px;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          transition: border ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
        }
        .ip-text-default {
          &:focus {
            border: 1px solid rgba(74, 174, 222, 0.88);
            box-shadow: 0px 0px 3px 0px rgba(74, 174, 222, 0.88);
          }
        }
        .ip-text-modify {
          &:focus {
            border: 1px solid rgba(222, 74, 74, 0.88);
            box-shadow: 0px 0px 3px 0px rgba(222, 74, 74, 0.88);
          }
        }
        #horizontal,
        #vertical,
        #width,
        #height {
          width: 31.333%;
        }
      }
    }
    .timeLine {
      width: 60%;
      height: 80%;
      float: left;
      margin: 15px;
      margin-top: 0;
      border-radius: 5px;
      background-color: #ffffff;
      p {
        color: #adaeaf;
        margin: 7px;
        text-align: center;
      }
      .noRunTheme {
        width: 100%;
        height: calc(100% - 50px);
        line-height: 20;
        font-size: 1.3em;
        text-align: center;
      }
      .stateLine {
        position: relative;
        display: table;
        width: 100%;
        height: calc(100% - 50px);
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;
        overflow: auto;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background-color: #cccccc;
        }
        .timeline-item {
          display: table-row;
          &:before {
            display: block;
            width: 50%;
            content: '';
          }
          .timeline-desk {
            display: table-cell;
            vertical-align: top;
            width: 50%;
            .panel {
              position: relative;
              display: block;
              margin-left: 25px;
              margin-right: 25px;
              margin-bottom: 5px;
              background: #F4F4F4;
              text-align: left;
              .panel-body {
                padding: 15px;
              }
              .arrow {
                position: absolute;
                top: 13px;
                left: -7px;
                display: block;
                width: 0;
                height: 0;
                border-bottom: 8px solid transparent;
                border-top: 8px solid transparent;
                border-right: 8px solid #F4F4F4 !important;
              }
              .timeline-icon {
                position: absolute;
                top: 15px;
                left: -31px;
                display: block;
                width: 12px;
                height: 12px;
                border: 3px solid #FFFFFF;
                border-radius: 50%;
                background: #C7CBD6;
                box-shadow: 0 0 0 3px #C7CBD6;
              }
              .timeline-icon.red {
                background: #EF6F66;
                box-shadow: 0 0 0 3px #EF6F66;
              }
              .timeline-icon.green {
                background: #39B6AE;
                box-shadow: 0 0 0 3px #39B6AE;
              }
              .timeline-icon.blue {
                background: #56C9F5;
                box-shadow: 0 0 0 3px #56C9F5;
              }
              .timeline-icon.purple {
                background: #8074C6;
                box-shadow: 0 0 0 3px #8074C6;
              }
              .timeline-icon.light-green {
                background: #A8D76F;
                box-shadow: 0 0 0 3px #A8D76F;
              }
              .timeline-date {
                position: absolute;
                top: 12px;
                left: -200px;
                width: 150px;
                text-align: right;
              }
              h1.red {
                color: #EF6F66;
              }
              h1.green {
                color: #39B6AE;
              }
              h1.blue {
                color: #56C9F5;
              }
              h1.purple {
                color: #8074C6;
              }
              h1.light-green {
                color: #A8D76F;
              }
            }
          }
        }
        .timeline-item.alt {
          &:before {
            display: none;
          }
          .arrow-alt {
            position: absolute;
            top: 13px;
            left: auto;
            right: -7px;
            display: block;
            width: 0;
            height: 0;
            border-bottom: 8px solid transparent;
            border-top: 8px solid transparent;
            border-left: 8px solid #F4F4F4 !important;
          }
          .timeline-icon {
            left: auto !important;
            right: -33px !important;
          }
          .timeline-date {
            left: auto !important;
            right: -200px !important;
          }
        }
      }
    }
    .performance {
      width: calc(40% - 45px);
      height: 45%;
      float: right;
      margin: 15px 15px 0 0;
      border-radius: 5px;
      background-color: #FFFFFF;
      .top {
        display: flex;
        height: 50px;
        background-color: #afaafa;
        border-radius: 5px 5px 0 0;
        text-align: center;
        color: #fff;
        .online {
          flex: 3;
          font-size: 1.1rem;
          line-height: 50/(16*1.1);
          .circle {
            width: 14px;
            height: 14px;
            border-radius: 7px;
            
          }
          .green {
            background-color: #26f101;
          }
          .red {
            background-color: #dc3333;
          }
        }
      }
      .middle {
        height: calc(100% - 100px);
        ul {
          padding: 30px;
          li {
            margin-bottom: 15px;
          }
          .hostActive {
            color: #EF6F66;
          }
        }
      }
      .bottom {
        height: 50px;
        border-radius: 0 0 5px 5px;
        background-color: #cdcdcd;
        display: flex;
        text-align: center;
        span {
          flex: 1;
          font-size: 1.2rem;
          color: #fff;
          line-height: 50/(16*1.2);
          &:hover {
            cursor: pointer;
          }
        }
        .active {
          color: #8079ea;
          background-color: #FFFFFF;
        }
        .memory {
          border-bottom-left-radius: 5px;
        }
        .cpu {
          border-bottom-right-radius: 5px;
        }
      }
    }
    .timer {
      width: calc(40% - 45px);
      height: calc(35% - 15px);
      float: right;
      margin: 0 15px 0 0;
      padding: 20px;
      border-radius: 5px;
      background-color: #FFFFFF;
      .noRunTheme {
        line-height: 10;
        text-align: center;
      }
    }
  }
</style>
