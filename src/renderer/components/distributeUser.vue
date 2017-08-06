<template>
  <div class="distribute">
    <div class="table">
      <el-table
      :data="tableData"
      border
      :default-sort = "{prop: 'order', order: 'ascending'}"
      style="width: 100%;text-align: center;">
      <el-table-column
        prop="order"
        label="序号"
        sortable
        width="90"
        style="text-align: center;">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pwd"
        label="密码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="describe"
        label="描述"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="130">
        <template scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    
    <div class="create">
      <span>用&nbsp;&nbsp;户&nbsp;&nbsp;名:</span><el-input v-model="name" placeholder="请输入英文或者数字"></el-input><br>
      <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span><el-input v-model="pwd"></el-input><br>
      <span>分配描述:</span><el-input v-model="describe" placeholder="例如:董事长、大厅大屏"></el-input>
      <el-button v-if="state == 'add'" type="primary" @click="addUser">添加</el-button>
      <el-button v-else type="primary" @click="editUser">修改</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      pwd: '',
      describe: '',
      state: 'add',
      currentData: Object,
      tableData: this.$store.state.User.user
    }
  },
  mounted () {
    console.log( jnoos.isNull(this.name))
   
  },
  methods: {
    edit (data) {
      this.state = 'edit'
      this.currentData = data
      this.name = data.name
      this.pwd = data.pwd 
      this.describe = data.describe
    },
    del (data) {
      let _tableData = this.tableData.slice(0),
          _maxScreenList = this.$store.state.Device.maxScreenList.slice(0),
          count = 0
      _.remove(_tableData, item => item.order === data.order)
      _.remove(_maxScreenList, item => item.id === data.id)
      for(let i of _tableData) {
        count++
        i.order = count
      }
      for(let i of _maxScreenList) {
        count++
        i.order = count
      }
      this.$store.dispatch('delUser',{user: _tableData})
      this.$store.dispatch('pushMaxScreenList', _maxScreenList)
      this.tableData = _tableData
      this.$root.socket.emit("changeTheme",{id: data.id,type:"delete"})
    },
    addUser () {
      let _maxScreenList = this.$store.state.Device.maxScreenList.slice(0)
      if (jnoos.isNull(this.name) || jnoos.isNull(this.pwd) || jnoos.isNull(this.describe)) {
        alert('不能为空')
      }else {
        
        this.$root.socket.emit('addUser', {
          name: this.name,
          psw: this.pwd,
          note: this.describe
        })
        this.$root.socket.on('addUser', e => {
          let user = {
            id: e.data.id,
            order: this.tableData.length + 1,
            name: this.name,
            pwd: this.pwd,
            describe: this.describe
          }
          // this.tableData.push(user)
          _maxScreenList.push(e.data)
          console.log(e)
          this.name = ''
          this.pwd = ''
          this.describe = ''
          this.$store.dispatch('addUser', {user: user})
          this.$store.dispatch('pushMaxScreenList', _maxScreenList)
        })
      }
    },
    editUser () {

      let _tableData = this.tableData.slice(0),
          _editData = jnoos.deepcopy(this.currentData),
          _maxScreenList = this.$store.state.Device.maxScreenList.slice(0),
          count = 0
      let index = _.findIndex(_maxScreenList, item => item.id === _editData.id)    
      console.log(_maxScreenList[index])
      if (this.name != this.currentData.name) {
        _editData.name = this.name
        _maxScreenList[index].name = this.name
        this.$root.socket.emit("changeTheme",{id: this.currentData.id,type:"name",val:this.name})
        count ++
      }
      if (this.pwd != this.currentData.pwd) {
        _editData.pwd = this.pwd
        _maxScreenList[index].pwd = this.pwd
        this.$root.socket.emit("changeTheme",{id: this.currentData.id,type:"psw",val:this.pwd})
        count ++
      }
      if (this.describe != this.currentData.describe) {
        _editData.describe = this.describe
        _maxScreenList[index].note = this.describe
        this.$root.socket.emit("changeTheme",{id: this.currentData.id,type:"note",val:this.describe})
        count ++
      }
      if (count != 0) {
        _tableData[_editData.order - 1] = _editData
        this.$store.dispatch('editUser',{user: _tableData})
        this.$store.dispatch('pushMaxScreenList', _maxScreenList)
        this.tableData = _tableData
      }
      this.name = ''
      this.pwd = ''
      this.describe = ''
      this.state = 'add'
      _tableData = []
      _editData = []
    }
  },
}
</script>

<style lang="scss" scoped>
  .distribute {
    width: 100%;
    .table {
      width: 61%;
      margin: 50px auto;
    }
    .create {
      width: 70%;
      margin: 50px auto;
      span {
        display: inline-block;
        width: 90px;
        color: #fff;
      }
      .el-input {
        width: calc(100% - 90px);
        margin-bottom: 20px;
        input {
          width: 100%;
        }
      }
    }
  }
</style>
