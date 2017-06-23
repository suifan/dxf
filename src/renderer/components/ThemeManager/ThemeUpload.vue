<template>
  <div>
    <div class="themeUpload">
      <span class="label-title">文件选择:&nbsp;</span>
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" 
       list-type="picture" :auto-upload="false" ref="upload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
      <div class="rows">
        <span for="" class="label-title">说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明:&nbsp;&nbsp;</span>
        <pre style="width: 400px;background-color: #fff" contenteditable="false">
    <code style="font-weight: bold">#</code>上传的项目结构如下
      xxx.zip(压缩包)
      ├─ xxx(文件夹)
      ├   ├─ 项目的资源文件(js/css/video/font等)
      ├─ <code style="color: red">theme.png (主题界面的截图)</code>
      └─ <code style="color: red">index.html</code>
    ⚠️<code style="color: #e28408">注：必须遵循以上结构！一个压缩包和一张主题界面的截图!</code>    
        </pre>
        <div class="rows">
          <el-button type="info" @click="submitUpload">开始上传</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //https://jsonplaceholder.typicode.com/posts/
  export default {
    name: "ThemeUpload",
    data() {
      return {
        filelist: ''
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit()
      }
    },
    mounted() {}
  }
</script>

<style lang="scss">
  .themeUpload {
    padding: 45px 70px;
    .rows {
      margin-top: 30px;
    }
    .label-title {
      float: left;
      padding: 6px 12px;
    }
    .el-button--info {
      margin-left: 101px
    }
    input[type='file'] {
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
