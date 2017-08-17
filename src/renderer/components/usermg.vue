<template>
  <!--账号列表 添加、修改、删除 主题分配-->
  <div class="distribute">
    <div class="title">
      <span class="active" @click="toggle($event, 1)">账号列表</span>
      <span @click="toggle($event, 2)">主题分配</span>
      <div class="bbLine"></div>
    </div>
    <div v-if="togglenav" class="list">
      <div class="adduser">
        <div class="au" id="au">
          <div class="jn-input">
            <span>用户名:</span>
            <input type="text" v-model="name" >
            <div class="jn-input-line"></div>
          </div>
          <div class="jn-input" style="margin-top: 40px;">
            <span>密&nbsp;&nbsp;&nbsp;码:</span>
            <input type="text" v-model="pwd" >
            <div class="jn-input-line"></div>
          </div>
          <div class="jn-input" style="margin-top: 40px;">
            <span>备&nbsp;&nbsp;&nbsp;注:</span>
            <input type="text" v-model="note" >
            <div class="jn-input-line"></div>
          </div>
          <div class="jn-button jn-demo-button">
            <button @click="addUser">提交</button>
          </div>
        </div>
      </div>
      <div class="jn-table">
        <div class="jn-table-btn">
          <div class="jn-text">
            <span class="an-add "><i class="fa fa-heart" aria-hidden="true"></i></span>
            <span>账号: {{userInfo.length}} Total</span>
          </div>
          <div class="jn-button" @click="openadd()">
            <!-- <jn-input type="text"></jn-input> -->
            <button class="" style="width: auto;"><i class="fa fa-plus"></i> </button>
          </div>
        </div>
        <table class="jn-table-head">
          <tr>
            <th>用户名</th>
            <th>密码</th>
            <th>备注</th>
            <th>系统名称</th>
            <th>ip</th>
            <th>状态</th>
            <th><i class="fa fa-caret-left"></i>
              <i class="fa fa-caret-right"></i></th>
          </tr>
        </table>
        <table class="jn-table-body">
          <template  v-for="(list,index) in userInfo">
            <tr :key="index" 
              :style="{animationDelay: deleting ? '0s' : (index + 1) > len ? '.3s' : (index * .2) + 's'}">
              <td><input type="text" disabled :value="list.name" @change="editUser('name', $event, list.id)"></td>
              <td><input type="text" disabled :value="list.psw" @change="editUser('pwd', $event, list.id)"></td>
              <td><input type="text" disabled :value="list.note" @change="editUser('note', $event, list.id)"></td>
              <td>{{list.os}}</td>
              <td>{{list.ip}}</td>
              <td>{{list.online}}</td>
              <!-- fa-check-square-o  -->
              <td><i class="fa fa-pencil-square-o"  @click="edit($event, list)"></i>&nbsp;&nbsp;&nbsp;
                <i class="fa fa-trash-o" @click="del(list,index)"></i></td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <div v-else class="bute">
      <bute></bute>
    </div>
  </div>
</template>

<script>
  import bute from './distribute'

  var adding = false //正在添加
  export default {
    data() {
      let len = this.$store.state.user.userInfo.length
      let userInfo = this.$store.state.user.userInfo.slice(0)
      return {
        name: '',pwd: '', note: '',
        togglenav: true,//导航切换
        len: len,//用户数据长度
        deleting: false,//正在删除
        bufferData: '',//缓存已删除的用户数据
        userInfo: userInfo,
        index: ''//删除的索引
      }
    },
    components: {bute},
    mounted() {
      
      let tr = document.querySelectorAll('.jn-table-body tr')
      for(let i of tr) {
        i.classList.add('bounceIn')
        i.addEventListener('animationend', e => {
          if (e.animationName == 'bounceIn') {
            i.classList.remove('bounceIn')
          }
        })
      }
      let an = document.querySelector('.an-add')
      an.addEventListener('animationend', e => {
        if (e.animationName == 'moveup') {
          an.classList.remove('moveup')
        }
      })
      let adduser = document.querySelector('.adduser')
      adduser.addEventListener('animationend', e => {
        if (e.animationName == 'fadeOutUp') {
          adduser.style.zIndex = -1
          adduser.children[0].classList.remove('fadeOutUp')
        }
      })

      this.$root.socket.on('addUser', e => {
        console.log(e)
        if (e.code == 1005) {
          alert('重名')
        }else {
          this.closeadd()
          an.classList.add('moveup')
          this.userInfo.push(e.data)
          this.$store.dispatch('addUser', e.data)
        }
      })
      this.$root.socket.on("changeTheme", e => {
        console.log(e)
        if (e.info == '删除用户成功') {
          let ntr = document.querySelectorAll('.jn-table-body tr')
          ntr[this.index].classList.add('bounceOut')
          ntr[this.index].addEventListener('animationend', e => { 
            if (e.animationName == 'bounceOut') {
              let _userInfo = this.userInfo.slice(0)
              _.remove(_userInfo, item => item.id === this.bufferData)
              this.deleting = false
              this.userInfo = _userInfo
              this.$store.dispatch('delUser', this.bufferData)
              ntr[this.index].classList.remove('bounceOut')
            }
          })            
        }
      })
    },
    updated () {
      if (adding) {
        let tr = document.querySelectorAll('.jn-table-body tr')
        tr[tr.length - 1].classList.add('bounceIn')
        tr[tr.length - 1].addEventListener('animationend', e => {
          if (e.animationName == 'bounceIn') {
            adding = false
            tr[tr.length - 1].classList.remove('bounceIn')
          }
        })
      }
    },
    methods: {
      toggle (e, val) {
        let bbLine = document.querySelector('.bbLine')
        let span = document.querySelectorAll('.title span')
        if (val === 1) {
          bbLine.style.left = 0
        }else {
          bbLine.style.left = '100px'
        }
        if (e.target.classList[0] != 'active') {
          e.target.classList.toggle('active')
          if (val === 1) {
            span[1].classList.toggle('active')
          }else {
            span[0].classList.toggle('active')
          }
        }
        this.togglenav = !this.togglenav
      },
      openadd() {
        let au = document.querySelector('.au')
        let adduser = document.querySelector('.adduser')
        let dom = document.querySelector('.jn-table .jn-table-btn .jn-button button')
        if (jnoos.hasClass(dom, 'closed')) {
          this.closeadd()
          dom.classList.remove('closed')
          
        }else {
          dom.classList.add('closed')
          adduser.style.zIndex = 10
          au.classList.add('fadeInDown')
        }
      },
      closeadd() {
        let au = document.querySelector('.au')
        let dom = document.querySelector('.jn-table .jn-table-btn .jn-button button')
        if (jnoos.hasClass(dom, 'closed')) {
          dom.classList.remove('closed')
        }
        au.classList.remove('fadeInDown')
        au.classList.add('fadeOutUp')
        this.name = ''
        this.pwd = ''
        this.note = ''
      },
      edit(event, data) {
        let td = event.target.parentNode.parentNode.children
        if (jnoos.hasClass(event.target, 'fa-check-square-o')) {
          event.target.classList.remove('fa-check-square-o')
          event.target.classList.add('fa-pencil-square-o')
          for(let i of [0, 1, 2]) {
            td[i].children[0].getAttribute('disabled', 'disabled')
            td[i].children[0].style.border = 'none'
          }
        }else {
          event.target.classList.remove('fa-pencil-square-o')
          event.target.classList.add('fa-check-square-o')
          for(let i of [0, 1, 2]) {
            td[i].children[0].removeAttribute('disabled')
            td[i].children[0].style.border = '1px solid #8ea2ac'
          }
        }
      },
      editUser (type, e, id) {
        let _userInfo = this.clone(this.userInfo)
        let index = _.findIndex(_userInfo, item => item.id === id)
        if (type === 'name') {
          _userInfo[index].name = e.target.value
          this.$root.socket.emit("changeTheme", {
            id: id,
            type: "name",
            val: e.target.value
          })
        }
        if (type === 'pwd') {
          _userInfo[index].psw = e.target.value
          this.$root.socket.emit("changeTheme", {
            id: id,
            type: "psw",
            val: e.target.value
          })
        }
        if (type === 'note') {
          _userInfo[index].note = e.target.value
          this.$root.socket.emit("changeTheme", {
            id: id,
            type: "note",
            val: e.target.value
          })
        }
        this.userInfo = _userInfo
        this.$store.dispatch('pushUser', _userInfo)
      },
      del(data, index) {
        let _userInfo = this.userInfo.slice(0)
        _.remove(_userInfo, item => item.id === data.id)
        this.deleting = true

        this.len = _userInfo.length
        this.bufferData = data.id
        this.index = index
        this.$root.socket.emit("changeTheme", {
          id: data.id,
          type: "delete"
        })
      },
      addUser() {
        let an = document.querySelector('.an-add')
        let tr = document.querySelectorAll('.jn-table-body tr')
        if (jnoos.isNull(this.name) || jnoos.isNull(this.pwd) || jnoos.isNull(this.note)) {
          alert('不能为空')
        } else {
          this.$root.socket.emit('addUser', {
            name: this.name,
            psw: this.pwd,
            note: this.note
          })
          adding = true
        }
      },
      clone (obj) {
        let arr=[]
        for (let i = 0; i < obj.length; i++) {
          arr[i] = jnoos.deepcopy(obj[i])
        }
        return arr
      }
    },
  }
</script>

<style lang="scss" scoped>
  .distribute {
    width: 100%;
    height: 100%;
    background-color: #F4F8F9;
    .title {
      width: 200px;
      height: 40px;
      margin: 0 auto 20px;
      .active {
        color: #7e3ffb;
      }
      .bbLine {
        position: relative;
        top: 37px;
        left: 0px;
        width: 100px;
        border-bottom: 3px solid #7e3ffb;
        transition: left .8s;
      }
      span {
        display: block;
        float: left;
        width: 100px;
        height: 40px;
        line-height: 40px;
        color: #1F2D3D;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .list, .bute {
      width: 100%;
      height: calc(100% - 60px);
    }
    .jn-table {
      width: 100%;
      height: 100%;
      padding: 20px;
      background-color: #F4F8F9;
      overflow: hidden;
      
      .jn-table-btn {
        position: relative;
        width: 100%;
        height: 70px;
        .jn-text {
          // position: relative;
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          height: 100%;
          text-align: left;
          .an-add {
            position: absolute;
            top: -5px;
            left: 33px;
            opacity: 0;
          }
          span {
            // margin-left: 20px;
            line-height: 70px;
            font-size: 13px;
            color: #475669;
            font-weight: normal;
          }
        }
      }
      .jn-table-head {
        width: 100%;
        height: 40px;
        table-layout:fixed;
        th {
          width: 30px;
          color: #475669;
          font-size: 14px;
          text-align: center;
        }
      }
      .jn-table-body {
        display: block;
        width: 100%;
        height: calc(100% - 130px);
        overflow: auto;
        transition: all 1s;
        tr {
          display: flex;
          border-radius: 5px;
          background-color: #FFF;
          margin-bottom: 10px;
          transition: all 1s;
          &:hover {
            background-color: #F0EEFC;
          }
        }
        td {
          flex: 1;
          width: 118px;
          height: 55px;
          line-height: 55px;
          color: #505a5e;
          font-size: 13px;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis; 
          transition: all 1s;
          i {
            transition: all .5s;
            &:hover {
              cursor: pointer
            }
          }
          i.fa-check-square-o {
            color: #13CE66;
          }
          input {
            width: 90%;
            // border: 1px solid #8ea2ac;
            border: none;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis; 
            background: transparent;
            transition: all .5s;
            &:focus {
              border: 1px solid #2fa2f7!important;
              color: #2fa2f7;
            }
          }
        }
      }
    }
    .adduser {
      position: absolute;
      top: 190px;
      z-index: -1;
      width: 100%;
      height: 516px;
      padding: 0 20px;
      overflow: hidden;
      .au {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #b1c1d2;
        opacity: 0;
        .jn-input {
          position: relative;
          top: 120px;
          width: 300px;
          margin: auto;
          i {
            position: absolute;
            top: 0px;
            left: 10px;
            color: #FFFFFF;
            font-size: 1.4rem;
          }
          span {
            position: absolute;
            top: 0px;
            left: 10px;
            color: #FFFFFF;
            font-size: 1rem;
          }
          input {
            position: relative;
            left: 40px;
            display: block;
            width: 220px;
            background: transparent;
            border: none;
            margin: auto;
          }
          .jn-input-check {
            position: absolute;
            top: 9px;
            right: 9px;
            display: block;
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background-color: #00C853;
            animation: checkTrue 2s both infinite alternate;
          }
          .check-true {
            animation: checkTrue 2s infinite forwards;
          }
          @keyframes checkTrue {
            from {
              background-color: rgba(0, 200, 83, 1);
              transform: scale(1)
            }
            to {
              background-color: rgba(0, 200, 83, .6);
              transform: scale(1.2)
            }
          }
          .jn-input-line {
            border-bottom: 1px solid #fff;
          }
        }
        .jn-demo-button {
          position: relative;
          top: 30%;
          width: 100%;
          text-align: center;
        }
      }
    }
    
  }
</style>


