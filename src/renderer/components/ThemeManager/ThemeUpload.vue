<template>
  <div>
    <div class="themeUpload">
      <div>
        <span for="" class="label-title">文件选择:&nbsp;</span>
        <div class="input-group width">
          <input id="Info" type="text" class="ip-group" readonly placeholder="文件信息，不可编辑">
          <span class="input-group-button">
            <button class="btn-del" @click="delFile">删除</button>
            <button class="btn-select">选择文件</button>
            <input type="file" class="file" id="FileInput" @change="getFile()">
          </span>
        </div>
      </div>
      <div class="rows">
        <span for="" class="label-title">主题名称:&nbsp;</span>
        <input type="text" class="ip-text" id="themeName">
      </div>
      <div class="rows">
        <span for="" class="label-title">主题描述:&nbsp;</span>
        <input type="text" class="ip-text" id="describe">
      </div>
      <div class="rows">
        <span for="" class="label-title">说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明:&nbsp;&nbsp;</span>
        <pre style="width: 360px;background-color: #fff" contenteditable="false">
    <code style="font-weight: bold">#</code>上传的项目结构如下
      xxx.zip(压缩包)
      ├─ xxx(文件夹)
      ├   ├─ 项目的资源文件(js/css/video/font等)
      └─ <code style="color: red">index.html</code>
    ⚠️<code style="color: #e28408">注：必须遵循以上结构！每次只能选择一个压缩包!</code>    
        </pre>
        <div class="rows">
          <button class="btn btn-info" id="upload" @click="upload()">开始上传</button>
        </div>
      </div>
    </div>
    
    <div id="FileBox" class="dragFile">
      将文件拖拽到这里
    </div>
  </div>
</template>

<script>
  
  export default {
    name: "ThemeUpload",
    data () {
      return {
        filelist: ''
      }
    },
    methods: {
      /**
       * @describe 选择文件，获取文件信息
       */
      getFile () {
        // let fd = new FormData(obj)
        let FileInput = document.getElementById('FileInput'),
            FileBox = document.getElementById('FileBox'),
            Info = document.getElementById('Info')
        let fileList =FileInput.files
        this.filelist = fileList //将文件信息存储到data中
        // Info.value = fileList[0].name 
        this.createInfo(FileBox, Info, fileList)
      },
      /**
       * @describe 拖拽本地文件，获取文件信息
       */
      dragFile () {
        let FileBox = document.getElementById('FileBox'),
          Info = document.getElementById('Info')
        let that = this
        FileBox.addEventListener('dragover', function(e) {
          e.preventDefault() //一定得阻止浏览器默认行为，否则drop将无法执行
          this.style.backgroundColor = '#aaaaab'
        }, false)
        FileBox.addEventListener('dragleave', function(e) {
          e.preventDefault()
          this.style.backgroundColor = '#b4bdc7'
        })
        FileBox.addEventListener('drop', function(e) {
          e.preventDefault()
          this.style.backgroundColor = '#b4bdc7'
          let fileList = e.dataTransfer.files //获取文件
          that.filelist = fileList //将拖拽文件的信息存储到data中
          that.createInfo(FileBox, Info, fileList)        
          return false
        }, false)
      },
      /**
       * @describe 删除选择的文件
       */
      delFile () {
        let FileBox = document.getElementById('FileBox'),
            Info = document.getElementById('Info')
        this.filelist = '' //删除data存储的文件信息    
        FileBox.innerHTML = '将文件拖拽到这里' //重置拖拽信息
        Info.value = '' //重置input信息
      },
      /**
       * @describe 检查上传文件
       * @parame file: object 
       */
      inspectFile (file) {
        if (file.length === 1) {
          if (file[0].type.indexOf('zip') === -1) {
            //错误信息发送至store
            this.$store.dispatch('pushInfo',{
              stateCode: 1,
              stateType: 'error',
              stateMsg: '请选择以zip为后缀的文件!'
            })
            return false
          }else {
            return true
          }
        }else {
          this.$store.dispatch('pushInfo',{
            stateCode: 1,
            stateType: 'error',
            stateMsg: '一次只能选择一个压缩包上传!'
          })
          this.filelist = ''
          return false
        }
      },
      /**
       * @describe 检查成功后，创建文件的信息
       * @parame FileBox: Domobject
       * @parame Info: Domobject
       * @parame file: object 
       */
      createInfo (FileBox, Info, file) {
        if (this.inspectFile(file)) {
          Info.value = file[0].name
          FileBox.innerHTML = ''
          let fileInfo = document.createElement('div'),
              fileIcon = document.createElement('img'),
              fileName = document.createElement('span'),
              fileSize = document.createElement('span'),
              filePath = document.createElement('span')
          fileIcon.src = '../../../../static/zip.png'
          fileName.innerHTML = '&nbsp;&nbsp;' + file[0].name + '&nbsp;&nbsp;&nbsp;'
          fileSize.innerHTML = Math.round(file[0].size/1024) + 'k&nbsp;&nbsp;&nbsp;' 
          filePath.innerText = file[0].path
          fileInfo.appendChild(fileIcon)
          fileInfo.appendChild(fileName)
          fileInfo.appendChild(fileSize)
          fileInfo.appendChild(filePath)
          FileBox.appendChild(fileInfo)
        }
      },
      /**
       * @describe 作最后的检查，执行上传至服务器
       */
      upload () {
        let themeName = document.getElementById('themeName'), //主题名称
            describe = document.getElementById('describe') //主题描述
        if (this.filelist === '') {
          this.$store.dispatch('pushInfo',{
            stateCode: 0,
            stateType: 'warning',
            stateMsg: '请选择文件!'
          })
        }else if (this.inspectFile(this.filelist)) {
          return false
        }else if (themeName.value === ''||describe.value === '') {
          this.$store.dispatch('pushInfo',{
            stateCode: 0,
            stateType: 'warning',
            stateMsg: '输入框不能为空!'
          })
        }else {
          //开始上传
          let url = 'www.jnoos.com/'
        }
      }
    },
    mounted () { 
      this.dragFile()
    }
  }
</script>

<style lang="scss">
  .themeUpload {
    padding: 45px 70px;
    .rows {
      margin-top: 33.333px;
    }
    .label-title {
      float: left;
      padding: 6px 12px;
    }
    .width {
      width: 66.6666%;
    }
    .ip-group {
      width: 67.666%;
      padding: 6px 12px;
      border: 1px solid #cecccc;
      border-radius: 4px 0 0 4px;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      transition:border ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
      &:focus {
        border: 1px solid rgba(74, 174, 222, 0.88);
        box-shadow: 0px 0px 3px 0px rgba(74, 174, 222, 0.88);
      }
    }
    .ip-text {
      width: 63.466%;
      padding: 6px 12px;
      border: 1px solid #cecccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      transition:border ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
      &:focus {
        border: 1px solid rgba(74, 174, 222, 0.88);
        box-shadow: 0px 0px 3px 0px rgba(74, 174, 222, 0.88);
      }
    }
    .btn-del {
      padding: 6px 12px;
      background-color: #fff;
      border: 1px solid #ccc;
      margin-left: -1px;
      &:hover {
        border: 1px solid #aaa;
        background-color: #ccc;
      }
      &:focus {
        border: 1px solid rgba(74, 174, 222, 0.68);
      }
    }
    .btn-select {
      margin-left: -6px;
      padding: 6px 12px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 0 4px 4px 0;
      &:hover {
        border: 1px solid #aaa;
        background-color: #ccc;
      }
      &:focus {
        border: 1px solid rgba(74, 174, 222, 0.68);
      }
    }
    .btn-info {
      margin-left: 101px
    }
    .file {
      display: inline-block;
      width: 90px;
      margin-left: -95px;
      padding: 6px 12px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 0 4px 4px 0;
      opacity: 0;
    }
  }
  .dragFile {
    position: fixed;
    bottom: 0;
    width: calc(100% - 52px);
    height: 100px;
    background-color: #b4bdc7;
    text-align: center;
    color: #fff;
    font-size: 1.2rem;
    line-height: 100/(16*1.2);
  }
</style>
