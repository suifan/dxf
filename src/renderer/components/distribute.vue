<template>
  <div class="distributeTheme">
    <!-- 主题分配 -->
    
    <div class="transfer">
      <el-select v-model="selected" placeholder="请选择" @change="readThemeList">
        <el-option
          v-for="(item,index) in this.$store.state.user.userInfo"
          :key="index"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      <div class="box enter">
        <div class="title">运行列表</div>
        <div class="content">
          <template v-for="(item,index) in runTheme">
            <div :key="index" @click="selectRunTheme($event, item)">
              <input type="checkbox">
              <span>{{ item.name }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="box output">
        <div class="title">主题列表</div>
        <div class="content">
          <template v-for="(item,index) in theme">
            <div :key="index" @click="selectNowTheme($event, item)">
              <input type="checkbox">
              <span>{{ item.name }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="transfer-btn">
        <div class="jn-button" style="margin-top: -14px;">
          <button disabled :class="{disabled: source}" @click="importTheme()"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
        </div> 
        <div class="jn-button">
          <button disabled :class="{disabled: target}" @click="exportTheme()"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
        </div> 
      </div>
    </div>
    
    <!-- 主题分配结束 -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        runTheme: [],//运行列表
        theme: [], //主题列表
        sNowTheme: [], //已经选择的主题
        sRunTheme: [],
        selected: '',
        source: true,
        target: true,
      }
    },
    watch: {
      source(val) {
        let btn = document.querySelectorAll('.transfer-btn .jn-button button')
        if (val) {
          btn[0].setAttribute('disabled', true)
        }else {
          btn[0].removeAttribute('disabled')
        }
      },
      target(val) {
        let btn = document.querySelectorAll('.transfer-btn .jn-button button')
        if (val) {
          btn[1].setAttribute('disabled', true)
        }else {
          btn[1].removeAttribute('disabled')
        }
      },
      sNowTheme (val) {
        if (jnoos.isNull(val)) {
          this.source = true
        }else {
          this.source = false
        }
      },
      sRunTheme (val) {
        if (jnoos.isNull(val)) {
          this.target = true
        }else {
          this.target = false
        }
      }
    },
    mounted () {

    },
    methods: {
      readThemeList () {
        let runTheme = [],
            theme = this.$store.state.theme.themeList.slice(0) 
        for(let i of this.runList) {
          for(let i2 of i.themeid) {
            for(let i3 of theme) {
              if (this.selected.id === i.id) {
                if (i2 == i3.id) {
                  runTheme.push(i3)
                } 
              }
            }
          }
        }
        for (let i of runTheme) {
          _.remove(theme, item => item.id == i.id)
        }
        this.runTheme = runTheme
        this.theme = theme
      },
      /**
       * 选取现有主题列表
       * @params  e: 当前元素
       * @params  item: 选中的主题信息
       **/
      selectNowTheme (e, item) {
        if (e.target.nodeName === 'INPUT') {
          if (e.target.checked) {
            e.target.checked = true
            this.sNowTheme.push(item)
          }else {
            e.target.checked = false
            this.sNowTheme = this.sNowTheme.filter( value => value.name != item.name)
          }
        }else {
          if (e.currentTarget.children[0].checked) {
            e.currentTarget.children[0].checked = false
            this.sNowTheme = this.sNowTheme.filter( value => value.name != item.name)
          }else {
            e.currentTarget.children[0].checked = true
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
        if (e.target.nodeName === 'INPUT') {
          if (e.target.checked) {
            e.target.checked = true
            this.sRunTheme.push(item)
          }else {
            e.target.checked = false
            this.sRunTheme = this.sRunTheme.filter( value => value.name != item.name)
          }
        }else {
          if (e.currentTarget.children[0].checked) {
            e.currentTarget.children[0].checked = false
            this.sRunTheme = this.sRunTheme.filter( value => value.name != item.name)
          }else {
            e.currentTarget.children[0].checked = true
            this.sRunTheme.push(item)
          }
        }
      },
      /**
       * 选中的主题导入运行主题列表内
       **/
      importTheme () {
        let t_id = [],_id = []
        if (this.sNowTheme.length != 0) {
          for(let i2 of this.sNowTheme) {
            let news = _.remove(this.theme, item => item.id === i2.id)
            this.runTheme = this.runTheme.concat(news)
            t_id.push(i2)
            _id.push(i2.id)
          }
          
          this.$store.dispatch('addThemes', {
            id: this.selected.id,
            themes: _id
          })
          this.$root.socket.emit("changeTheme",{
            type: "import",
            id: this.selected.id,
            val: _id.toString(), 
            theme: t_id
          })
          this.sNowTheme = []
        }  
      },
      /**
       * 选中的主题导出到现有主题中
       **/
      exportTheme () {
        let t_id = [],_id = []
        if (this.sRunTheme.length != 0) {
          for(let i2 of this.sRunTheme) {
            let news = _.remove(this.runTheme, item => item.id === i2.id)
            this.theme = this.theme.concat(news)
            t_id.push(i2)
            _id.push(i2.id)
          }
          this.$store.dispatch('delThemes', {
            id: this.selected.id,
            themes: _id
          })
          this.$root.socket.emit("changeTheme",{
            type: "export",
            id: this.selected.id,
            val: _id.toString(), 
            theme: t_id
          })
          this.sRunTheme = []
        }  
      }
    },
    computed: {
      runList () {
        let arr = []
        for(let i of this.$store.state.user.userInfo) {
          if (i.themes == null) {
            arr.push({
              id: i.id,
              themeid: []
            })
          }else if (i.themes.length == 1) {
            arr.push({
              id: i.id,
              themeid: i.themes.split('')
            })
          }else {
            arr.push({
              id: i.id,
              themeid: i.themes.split(',')
            })
          }
          
        } 
        return arr   
      }
    }
  }
</script>

<style scoped lang="scss">
  .distributeTheme {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    .el-select {
      top: -60px;
      left: 0;
    }
    .transfer {
      position: relative;
      width: 70%;
      height: 450px;
      margin: auto;
      .transfer-btn {
        position: absolute;
        top: 0;
        left: 40%;
        width: 20%;
        height: 100%;
        text-align: center;
        .jn-button {
          position: relative;
          top: 50%;
          z-index: 7;
          transform: translateY(-50%);
          margin-bottom: 10px;
          button {
            width: 50px;
            height: 46px;
            line-height: 23px;
            font-size: 24px;
            &.disabled{
              color: #bfcbd9;
              border: 1px solid #bfcbd9;
              cursor: not-allowed;
              background: #eef1f6;
            }
          }
        }
      }
      .enter {
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 100%;
        background-color: #51a8f5;
      }
      .output {
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        height: 100%;
        background-color: #14d695;
      }
      .box {
        border: 1px solid #d1dbe5;
        // border-radius: 5px;
        background-color: #FFF;
        .title {
          height: 45px;
          line-height: 45px;
          background-color: #fbfdff;
          border-bottom: 1px solid #d1dbe5;
          text-align: center;
          color: #505a5e;
          font-size: 15px;
        }
        .content {
          height: calc(100% - 45px);
          text-align: center;
          padding: 10px 0;
          div {
            height: 40px;
            line-height: 40px;
            &:hover {
              background-color: #e4e8f1;
              cursor: pointer;
            }
            input[type="checkbox"] {
              width: 25px;
              transition: all .5s;
            }
            span {
              color: #505a5e;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>
