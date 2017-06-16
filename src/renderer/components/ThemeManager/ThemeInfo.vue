<template>
  <div class="themeInfo">
    <div class="box">
      <div class="top">
        <img src="../../assets/img/theme.png" width="" alt="">
      </div>
      <div class="bottom">
        <span class="vertical-middle">主题创建于2017-5-10</span>
      </div>
    </div>
    <div class="scene">
      <span class="iconfont icon-pen" id="modify" @click="modify()"></span>
      <span class="iconfont icon-finish transparent" id="finish" @click="finish()"></span>
      <div>
        <span>主题名称:&nbsp;</span>
        <input type="text" class="ip-text ip-text-default" id="themeName" readonly value="集团信息">
      </div>
      <div>
        <span>场景名称:&nbsp;</span>
        <input type="text" class="ip-text ip-text-default" id="sceneName" readonly value="企业大学">
      </div>
      <!--<div>
        <span>屏幕分辨率:&nbsp;</span>
        <input type="text" class="ip-text" id="horizontal"> 
        <b>✖️</b>
        <input type="text" class="ip-text" id="vertical">
      </div>
      <div>
        <span>屏幕比例:&nbsp;</span>
        <input type="text" class="ip-text" id="width"> 
        <b>✖️</b>
        <input type="text" class="ip-text" id="height">
      </div>-->
      <div>
        <span style="vertical-align: top; display: inline-block">主题描述:&nbsp;</span>
        <textarea name="" id="describe" class="ip-text-default" readonly cols="30" rows="5">顺鑫控股集团的企业大学展厅里的第二个主题，集团信息主题，涵盖了集团，集团事业部的营收、利润，股票行情</textarea>
      </div>
    </div>
    <!-- 上传时间、名称 -->
    <!--场景、描述-->
    <!--分辨率、屏幕比例-->
    <!-- 是否在线、主题占用内存、页面加载时长、运行时长-->
    <div class="timeLine">
      <p>主题运行时间线</p>
      <div class="stateLine">
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
    <div class="performance">
      <div class="top">
        <span class="iconfont icon-line chartToggle"></span>
        <span class="online">
          <label class="circle"></label>
          <label for="">主题在线</label>
        </span>
        <span class="time">2017/6/10</span>
      </div>
      <div class="middle">
        <div id="pie"></div>
      </div>
      <div class="bottom">
        <span class="memory active">内存</span>
        <span class="cpu">cpu</span>
      </div>
    </div>
    <div class="timer">
      <p>Dom加载完成：330ms </p>
      <p>页面加载完成：1min</p>
      <p>主题运行时间：12h</p>
    </div>
  </div>

</template>

<script>
import echarts from 'echarts'
  export default {
    name: 'ThemeInfo',
    methods: {
      modify () {
        let themeName = document.getElementById('themeName'),
            sceneName = document.getElementById('sceneName'),
            describe = document.getElementById('describe'),
            modify = document.getElementById('modify'),
            finish = document.getElementById('finish')
        modify.style.color = '#D32E50'
        finish.className = 'iconfont icon-finish transparent show'
        themeName.removeAttribute('readonly')
        sceneName.removeAttribute('readonly')
        describe.removeAttribute('readonly') 
        themeName.className = 'ip-text ip-text-modify'
        sceneName.className = 'ip-text ip-text-modify'
        describe.className = 'ip-text-modify'
      },
      finish () {
        let themeName = document.getElementById('themeName'),
            sceneName = document.getElementById('sceneName'),
            describe = document.getElementById('describe'),
            modify = document.getElementById('modify'),
            finish = document.getElementById('finish')
        modify.style.color = '#137bd6'
        finish.className = 'iconfont icon-finish transparent hidden'
        themeName.setAttribute('readonly', 'readonly')
        sceneName.setAttribute('readonly', 'readonly')
        describe.setAttribute('readonly', 'readonly') 
        themeName.className = 'ip-text ip-text-default'
        sceneName.className = 'ip-text ip-text-default'
        describe.className = 'ip-text-default'
        this.$store.dispatch('pushIMsg',{
          stateCode: 2,
          stateType: 'success',
          stateMsg: '修改成功!'
        })
      }
    },
    mounted () {
      let pie = echarts.init(document.getElementById('pie'))
      let option = {
        title: {
            text: '60%',
            x: 'center',
            y: 'center',
            textStyle: {
                color: '#fb358a',
                fontSize: 40,
            }
        },
        series: [{
            name: 'loading',
            type: 'pie',
            radius: ['60%', '61%'],
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                }
            },
            data: [{
                value: 66,
                itemStyle: {
                    normal: {
                        color: '#fb358a',
                        shadowBlur: 10,
                        shadowColor: '#fb358a'
                    }
                }
            }, {
                value: 37,
            }]
        }]
      }
      pie.setOption(option)
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
    background-color: #fff;//bfd882
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
      .ip-text, textarea {
        width: 66.666%;
        padding: 2px 12px;
        border: 1px solid #cecccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        transition:border ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
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
      #horizontal, #vertical, #width, #height {
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
    margin: 0 15px 15px 0;
    border-radius: 5px;
    background-color: #FFFFFF;
    .top {
      display: flex;
      height: 50px;
      background-color: #afaafa;
      border-radius: 5px 5px 0 0;
      text-align: center;
      color: #fff;
      .chartToggle {
        flex: 1;
        font-size: 1.4rem;
        line-height: 50/(16*1.4);
        border-radius: 5px 0 0 0;
        background-color: #8079ea;
        &:hover {
          cursor: pointer;
        }
      }
      .online {
        flex: 3;
        font-size: 1.1rem;
        line-height: 50/(16*1.1);
        .circle {
          width: 14px;
          height: 14px;
          border-radius: 7px;
          background-color: #26f101;
        }
      }
      .time {
        flex: 2;
        font-size: 1.1rem;
        line-height: 50/(16*1.1);
        border-radius: 0 5px 0 0;
        background-color: #8079ea;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .middle {
      height: calc(100% - 100px);
      
      #pie {
        width: 100%;
        height: 100%;
      }
    }
    .bottom {
      height: 50px;
      border-radius: 0  0 5px 5px;
      background-color: #cdcdcd;
      display: flex;
      text-align: center;
      span {
        flex: 1;
        font-size: 1.2rem;
        color: #fff;
        line-height: 50/(16*1.2);
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
        // border-left: 1px solid #fff;
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
  }
}
</style>
