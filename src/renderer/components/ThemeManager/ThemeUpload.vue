<template>
  <div>
    <div class="themeUpload">
      <div class="type">
        <span class="label-title">上传类型:&nbsp;</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="rows">
        <span class="label-title">文件选择:&nbsp;</span>
        <form  enctype="multipart/form-data">
          <input type="file" id="openFile" class="fileSl" name="video" @change="getFile($event)"/>
          <el-input style="width: 38.3%;" disabled=""  name="filename" v-model="filelist.name" placeholder="文件名称"></el-input>
          <el-button type="primary" @click="clickInput">选择文件</el-button>
          <!--<input name="filename" v-model="filename" placeholder="请输入视频名称"/> -->
          <!--<button @click="submitUpload($event)">提交</button>-->
        </form>
      </div>
      <div class="rows" v-if="value === 0 ? true : false" 
      style="transition: all 1.8s;">
        <span class="label-title">视频名称:&nbsp;</span>
        <el-input style="width: 49.7%;"  name="filename" v-model="filename" placeholder="请输入视频名称"></el-input>
        <!--<input name="filename" v-model="filename" placeholder="请输入视频名称"/> -->
      </div>
      <div class="rows">
        <span for="" class="label-title">说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明:&nbsp;&nbsp;</span>
        <pre style="width: 400px;background-color: #fff" contenteditable="false">
    <code style="font-weight: bold">#</code>主题上传的项目结构如下
      xxx.zip(压缩包)
      ├─ xxx(文件夹)
      ├   ├─ 项目的资源文件(js/css/video/font等)
      ├─ <code style="color: red">theme.png (主题界面的截图)</code>
      └─ <code style="color: red">index.html</code>
    ⚠️<code style="color: #e28408">注：必须遵循以上结构！一个压缩包和一张主题界面的截图!</code>    

    <code style="font-weight: bold">#</code>视频上传的格式: 所有格式都可以
        </pre>
        <div class="rows">
          <el-button type="info" @click="submitUpload($event)">开始上传</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ThemeUpload",
    data() {
      return {
        filename: '',
        filelist: '',
        options: [{
          value: 0,
          label: '视频上传'
        }, {
          value: 1,
          label: '主题上传'
        }],
        value: 0
      }
    },
    methods: {
      clickInput () {
        let openFile = document.getElementById('openFile')
        openFile.click()
      },
      getFile (e) {
        this.filelist = e.target.files[0]
      },
      submitUpload(e) {
        e.preventDefault()
        let formData = new FormData()
        if (this.value === 0) {
          formData.append('filename', this.filename)
          formData.append('video', this.filelist)
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$http.post(`http://192.168.99.191:3001/upload/video`, formData)
          .then( response => {
            console.log(response)
          })
          .catch( error => {
            console.log(error)
          })
        } else {
          formData.append('file', this.filelist)
          this.$http.post(`http://192.168.99.191:3001/upload`, formData)
          .then( response => {
            console.log(response)
          })
          .catch( error => {
            console.log(error)
          })
        }
        
      }
    },
    mounted() {}
  }
</script>

<style lang="scss">
  .themeUpload {
    padding: 45px 70px;
    .type {
      margin-bottom: 30px;
    }
    .rows {
      margin-top: 30px;
    }
    .label-title {
      float: left;
      padding: 6px 12px;
      color: #fff;
    }
    .el-button--info {
      margin-left: 101px
    }
    .fileSl {
      display: none;
    }
    .upload-demo {
      margin-left: 100px;
      ul {
        width: 80%;
      }
      .el-upload {
        width: 80%;
        .el-upload-dragger {
          width: 100%;
        }
      }
    }
  }
</style>
