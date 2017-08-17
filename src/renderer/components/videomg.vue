<template>
  <div class="videoList">
    <div class="jn-text">
      <span class="an-add"><i class="fa fa-heart"></i></span>
      <span>视频: {{this.$store.state.video.videoList.length}} </span>
    </div>
    <div class="jn-button" @click="openupload">
      <button class="">
            <i class="fa fa-cloud-upload"></i> 上传视频
      </button>
      
    </div>
    <div class="pocket">
      <div class="pagings">
        <span class="prev" :class="{cannot: currentPage === 1}" @click="prev(currentPage, currentPage - 1)">prev</span>
        <!-- <span class="active"></span> -->
        <span v-for="num in pageNum" :key="num" @click="pagination(currentPage, num)"
          class="pageNum" :class="{current: num === 1}">
          {{num}}
        </span>
        <span class="next" :class="{cannot: currentPage === pageNum}" @click="next(currentPage, currentPage + 1)">next</span>
      </div>
      <!--
        1 - 0~4
        2 - 5~9
        3 - 10～14
        4 - 15～19
        5 - 20～24
        -->
      <template v-for="num in pageNum">
        <div :key="num" class="page" :class="{opacity: num > 1}" :style="{'zIndex': -(num-1)}">
          <template v-for="(item, index) in videoList">
            <div :key="index" v-if="index >= (num - 1)*5 && index < num*5" class="card">
              <div class="box-card">
                <div class="card-img">
                  <img :src="index < 10
                    ? ['static/video/video' + (index+1) + '.png'] 
                    : ['static/video/video' + ((index - (10 * (Math.ceil(index/10) - 1))) + 1) + '.png']" >
                  <i class="fa fa-play" @mouseover="over" @mousemove="position" @mouseout="out" @click="play(item)"> </i>
                  <!-- <div class="circleProgress_wrapper">
                    <div class="wrapper right">
                        <div class="circleProgress rightcircle"></div>
                    </div>
                    <div class="wrapper left">
                        <div class="circleProgress leftcircle"></div>
                    </div>
                  </div> -->
                </div>
                <div class="card-content">
                  <h1>{{item.name}}</h1>
                  <div>
                    <span>上传时间: {{item.time.split("T")[0]}}</span>
                    <button @click="delVideo(item, index)"><i class="fa fa-trash-o"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
      
    </div>

    <div class="mask" v-if="mask"></div>
    <div class="videoUpload" >
      
      <span class="popup-close" @click="closeUpload"><i class="fa fa-times"></i></span>
      <div class="rows">
        <span class="label-title">文件选择:&nbsp;</span>
        <form  enctype="multipart/form-data">
          <input type="file" id="openFile" class="fileSl" name="video" @change="getFile($event)"/>
          <el-input style="width: 38.3%;" disabled  name="filename" v-model="filelist.name" placeholder="文件名称"></el-input>
          <el-button type="primary" @click="clickInput">选择文件</el-button>
        </form>
      </div>
      <div class="rows">
        <span class="label-title">视频名称:&nbsp;</span>
        <el-input style="width: 59%;"  name="filename" v-model="filename" placeholder="请输入视频名称"></el-input>
      </div>
      <div class="rows" style="margin-left: 13px;">
        <el-button type="primary" @click="submitUpload">
          <i v-if="uploading" class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
          <span v-else>开始上传</span>
        </el-button>
        <span class="error" :class="{opacity: errorText == ''}">{{errorText}}</span>
      </div>
    </div> 
    <div class="seeVideo">
      <span class="popup-close" @click="closeVideo"><i class="fa fa-times"></i></span>
      <video :src="src" autoplay controls></video>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ThemeUpload",
    data() {
      let videoList = this.$store.state.video.videoList.slice(0)
      return {
        filename: '',
        filelist: '',
        pnX: '',
        pnY: '',
        mask: false,
        videoList: videoList,
        pageNum: Math.ceil(this.$store.state.video.videoList.length/5),
        currentPage: 1,
        src: '',
        uploading: false,
        deleteId: '',
        errorText: ''
      }
    },
    watch: {
      videoList (val) {
        this.pageNum = Math.ceil(val.length/5)
      },
      errorText (val) {
        setTimeout(() => {
          this.errorText = ''
        }, 1000);
      }
    },
    mounted() {
      let pagings = document.querySelector('.pagings'),
          p = document.querySelector('.pocket .page')
      pagings.style.top = p.offsetHeight + p.offsetTop + 'px'
      let videoUpload = document.querySelector('.videoUpload')
      videoUpload.addEventListener('animationend', e => {
        if (e.animationName == 'zoomOut') {
          this.mask = false
          videoUpload.classList.remove('zoomOut')
        }
      })
      let page = document.querySelectorAll('.pocket .page')
      for(let i of page) {
        i.addEventListener('animationend', e => {
          if (e.animationName.match(/Out/)) {
            i.classList.add('opacity')
            i.style.zIndex = -1
          }
          i.classList.remove(e.animationName)
        })
      }
      let an = document.querySelector('.an-add')
      an.addEventListener('animationend', e => {
        if (e.animationName == 'moveup') {
          an.classList.remove('moveup')
        }
      })
      let card = document.querySelectorAll('.page .card')
      for(let i of card) {
        i.addEventListener('animationend', e => {
          if (e.animationName == 'shake') {
            let _videoList = this.videoList.slice(0)
            _.remove(_videoList, i => i.id === this.deleteId)
            this.videoList = _videoList
            this.$store.dispatch('delVideo', this.deleteId)
            i.classList.remove(e.animationName)
          }
        })
      }
    },
    methods: {
      //获取鼠标放在图片上移动的位置，并计算图片移动的距离
      position (e) {
        e.target.previousElementSibling.style.marginLeft = (e.offsetX - this.pnX)*.14 + 'px'
        e.target.previousElementSibling.style.marginTop = (e.offsetY - this.pnY)*.14 + 'px'
      },
      //鼠标离开
      out (e) {
        e.target.style.opacity = 0
        e.target.previousElementSibling.style.transition="all .8s ease"
        e.target.previousElementSibling.style.marginLeft = '0px'
        e.target.previousElementSibling.style.marginTop = '0px'
      },
      //鼠标放在图片上获取鼠标在图片上的起始位置
      over (e) {
        e.target.style.opacity = 1
        e.target.previousElementSibling.style.transition="none"
        this.pnX = e.offsetX
        this.pnY = e.offsetY
      },
      //播放视频
      play (item) {
        let seeVideo = document.querySelector('.seeVideo')
        seeVideo.style.opacity = 1
        seeVideo.style.zIndex = 10
        this.mask = true
        this.src = item.src
      },
      //关闭视频
      closeVideo () {
        let seeVideo = document.querySelector('.seeVideo')
        seeVideo.style.opacity = 0
        seeVideo.style.zIndex = -10
        this.src = ''
        this.mask = false
      },
      //打开上传窗口
      openupload () {
        let videoUpload = document.querySelector('.videoUpload')
        this.mask = true
        videoUpload.classList.add('zoomIn')
      },
      //关闭上传窗口
      closeUpload () {
        let videoUpload = document.querySelector('.videoUpload')
        videoUpload.classList.remove('zoomIn')
        videoUpload.classList.add('zoomOut')
        this.filelist = ''
        this.filename = ''
      },
      //删除视频
      delVideo (item, index) {
        let card = document.querySelectorAll('.page .card')
        this.$root.socket.emit('deleteVideo', {
          id: item.id
        })
        this.deleteId = item.id
        this.$root.socket.on('deleteVideo', e=> {
          if (e.info == "删除视频成功") {
            card[index].classList.add('shake')
          }
        })
      },
      //模拟点击原始的选择文件
      clickInput () {
        let openFile = document.getElementById('openFile')
        openFile.click()
      },
      //获取文件信息
      getFile (e) {
        this.filelist = e.target.files[0]
      },
      //开始上传
      submitUpload(e) {
        e.preventDefault()
        let an = document.querySelector('.an-add')
        let formData = new FormData()
        formData.append('filename', this.filename)
        formData.append('video', this.filelist)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        if (jnoos.isNull(this.filelist)) {
          this.errorText = '请选择文件'
          return
        }
        if (!this.filelist.type.match(/video/)) {
          this.errorText = '请选择有效的视频格式'
          return
        }
        if (jnoos.isNull(this.filename)) {
          this.errorText = '请填写视频名称'
          return
        }
        this.uploading = true
        this.$http.post(`http://192.168.99.191:3001/upload/video`, formData)
        .then( response => {
          this.uploading = false
          this.videoList.push(response.data.data)
          this.$store.dispatch('addVideoList', response.data.data)
          an.classList.add('moveup')
          this.closeUpload()
        })
        .catch( error => {
          console.log(error)
        })
      },
      //点击页码next
      next (start, end) {
        let page = document.querySelectorAll('.pocket .page'), //页面
            pageNum = document.querySelectorAll('.pocket .pagings .pageNum') //页码   
        if (end > this.pageNum) {
          return
        }
        this.currentPage = end
        start = start - 1//起始页
        end = end - 1//目标页
        if (jnoos.hasClass(page[end], 'opacity')) {
          page[end].classList.remove('opacity')
        }
        pageNum[start].classList.remove('current')
        pageNum[end].classList.add('current')
        page[end].style.zIndex = 0
        page[start].classList.add('fadeOutRight')
        page[end].classList.add('fadeInLeft')
        
      },
      //点击页码prev
      prev (start, end) {
        let page = document.querySelectorAll('.pocket .page'), //页面
            pageNum = document.querySelectorAll('.pocket .pagings .pageNum') //页码
        if (end === 0) {
          return
        }
        this.currentPage = end
        start = start - 1//起始页
        end = end - 1//目标页
        if (jnoos.hasClass(page[end], 'opacity')) {
          page[end].classList.remove('opacity')
        }
        pageNum[start].classList.remove('current')
        pageNum[end].classList.add('current')
        page[end].style.zIndex = 0
        page[start].classList.add('fadeOutLeft')
        page[end].classList.add('fadeInRight')
        
      },
      //点击页码
      pagination (start, end) {
        if (start === end) {
          return
        } 
        if (end > start) {
          this.next(start, end)
        }else {
          this.prev(start, end)
        }
        this.currentPage = end
      }
    }
  }
</script>

<style lang="scss" scoped>
  .videoList {
    width: 100%;
    height: 100%;
    background-color: #F4F8F9;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .jn-text {
    position: absolute;
    top: 30px;
    left: 20px;
    display: block;
    // text-align: left;
    .an-add {
      position: absolute;
      top: -5px;
      left: 33px;
      opacity: 0;
    }
    span {
      font-size: 13px;
      color: #324057;
      font-weight: normal;
    }
  }
  .jn-button {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 8;
    
    button {
      position: relative;
      width: 120px;
      padding: 7px;
      border: 1px solid #324057;
      border-radius: 5px;
      background: transparent;
      color: #324057;
      transition: all .6s ease-in;

      &:hover {
        background: rgba(50, 64, 87, .07);
      }
    }
  }
  .videoUpload {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -10;
    transform: translate(20.4%, -134.2%) scale(.235,.075);
    width: 500px;
    height: 400px;
    border-radius: 10px;
    background-color: rgba(59, 75, 103, 0.94);
    opacity: 0;
    
    .rows {
      padding-left: 50px;
      padding-top: 60px;
      .el-button {
        background-color: #7e3ffb;
        border: 1px solid #7e3ffb;
        transition: all .8s;
        &:hover {
          background-color: #ad77ff;
          border: 1px solid #ad77ff;
        }
      }
      .error {
        position: relative;
        left: 30px;
        color: #F7BA2A;
        transition: opacity .5s;
      }
    }
    .label-title {
      float: left;
      padding: 10px 12px;
      color: #fff;
    }
    .fileSl {
      display: none;
    }
  }
  .pocket {
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    overflow: hidden;
    .page {
      position: absolute;
      width: 100%;
      // top: 85px;
      // left: 20px;
      padding-right: 20px;
      padding-bottom: 5px;
      overflow: hidden;
    }
    .card:nth-child(1), .card:nth-child(2), .card:nth-child(3){
      padding-top: 0;
    }
    .card {
      width: 33.33%;
      height: 261px;
      float: left;
      border-radius: 5px;
      padding-right: 20px;
      padding-top: 20px;
      .box-card {
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 3px 1px #e4e4f4;
        .card-img {
          position: relative;
          height: 70%;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          overflow: hidden;
          img {
            position: relative;
            width: 100%;
            height: 100%;
            transform: scale(1.3);
            // transition: all .2s linear;
          }
          i {
            position: absolute;
            top: 0;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 182.69px;
            text-align: center;
            font-size: 36px;
            opacity: 0;
            background-color: rgba(226, 226, 226, 0.4);
            transition: opacity 1s;
            &:hover {
              cursor: pointer;
            }
            
          }
          .circleProgress_wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 60px;
            height: 60px;
            .wrapper{
              position: absolute;
              top: 0;
              width: 50%;
              height: 100%;
              overflow: hidden;
            }
            .right{
              right:0;
            }
            .left{
              left:0;
            }
            .circleProgress{
              width: 60px;
              height: 100%;
              border: 1px solid transparent;
              border-radius: 50%;
              position: absolute;
              top: 0;
              transform: rotate(45deg);
            }
            .rightcircle{
              border-top: 1px solid #13CE66;
              border-right: 1px solid #13CE66;
              right: 0;
              animation: circleProgressLoad_right 5s linear infinite;
            }
            .leftcircle{
              border-bottom: 1px solid #13CE66;
              border-left: 1px solid #13CE66;
              left: 0;
              animation: circleProgressLoad_left 5s linear infinite;
            }
            @keyframes circleProgressLoad_right{
              0%{
                  transform: rotate(45deg);
              }
              50%,100%{
                  transform: rotate(225deg);
              }
            }
            @keyframes circleProgressLoad_left{
                0%,50%{
                    transform: rotate(45deg);
                }
                100%{
                    transform: rotate(225deg);
                }
            }
          }
        }
        .card-content {
          height: 30%;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          background-color: #FFF;
          h1 {
            height: 60%;
            line-height: 43.19px;
            color: #1F2D3D;
            padding-left: 10px;
            font-size: 18px;
          }
          div {
            position: relative;
            height: 40%;
            line-height: 28.8px;
            span {
              font-size: 13px;
              color: #475669;
              padding-left: 10px;
            }
            button {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              background: transparent;
              border: none;
            }
          }

        }
      }
    }
    .pagings {
      position: relative;
      z-index: 8;
      height: 50px;
      line-height: 50px;
      // margin: 20px auto;
      background-color: #F9FAFC;
      box-shadow: 0px 3px 3px 2px #e4eeff;
      text-align: center;
      display: inline-flex;
      //转圈画边框开始------
        &:after {
          content: '';
          display: block;
          position: absolute;
          z-index: -1;
        }
        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: -1;
        }
        &:after,
        &:before {
          box-sizing: border-box;
          border: 1px solid transparent;
          width: 0;
          height: 0;
        }

        &:after {
          top: 0;
          left: 0;
          transition: border-color 0s ease-in 0.8s, width 0.2s ease-in 0.6s, height 0.2s ease-in 0.4s;
        }

        &:before {
          bottom: 0;
          right: 0;
          transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.2s, height 0.2s ease-in;
        }

        &:hover:after,
        &:hover:before {
          width: 100%;
          height: 100%;
        }

        &:hover:after  {
          border-width: 1px;
          border-top-color: #20A0FF;
          border-right-color: #20A0FF;
          transition: width 0.2s ease-out, height 0.2s ease-out 0.2s;
        }

        &:hover:before {
          border-bottom-color: #20A0FF;
          border-left-color: #20A0FF;
          transition: border-color 0s ease-out 0.4s, width 0.2s ease-out 0.4s, height 0.2s ease-out 0.6s;
        }
      //转圈画边框结束--------
      span:first-child, span:last-child {
        color: #20A0FF;
        flex: 1.5;
      } 
      span {
        flex: 1;
        display: inline-block;
        width: 50px;
        font-size: 14px;
        &:hover {
          cursor: pointer;
        }
        
      }
      .pagenum {
        transition: all .8s;
        color: #475669;
      }
      .cannot {
        color: #bbdefb!important;
      }
      .current {
        color: #fff;
        z-index: 2;
        background-image: linear-gradient(150deg, #ad77ff 0%, #7e3ffb 100%);
        // background-image: linear-gradient(120deg, #f78ca0 0%, #f9748f 22%, #fd868c 60%, #fe9a8b 100%);
        // background-image: linear-gradient(120deg, #4facfe 0%, #00f2fe 100%);
        // background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
      }
    }
  }
  .seeVideo {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 500px;
    background-color: #1F2D3D;
    border-radius: 5px;
    opacity: 0;
    z-index: -10;
    transform: translate(-50%,-50%);
    transition: all 1s;
    video {
      width: 100%;
      height: 100%;
    }
  }
</style>
<style lang="scss">
.popup-close {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 12px;
  height: 12px;
  z-index: 9;
  border-radius: 6px;
  text-align: center;
  background-color: #ed6b5f;
  font-size: 10px;
  line-height: 12px;
  i {
    opacity: 0;
    transition: opacity .5s;
    &:hover {
      opacity: 1;
    }
  }
}
.opacity {
  opacity: 0
}
</style>

