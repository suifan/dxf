<template>
  <div class="datamg" v-cloak>
    <div class="wrap">
      <div>
        <div class="navWrap" v-if="data">
          <div class="nav" :style="show.nav? 'left:0' : 'left:-40%' ">
            <!-- ***************导航栏其他模块******************* -->
            <el-tooltip content="返回其他模块" placement="right" effect="light">
              <div class="backItem pointer" onclick="javascript:history.go(-1);">
                <i class="el-icon-arrow-left"></i>
                <i class="el-icon-menu"></i>
                <span v-text="data.theme.name"></span>
              </div>
            </el-tooltip>
  
            <!-- ***************数据表格打开导航栏******************* -->
            <i class="el-icon-caret-right caretRight pointer" v-show="!show.nav" @click="show.nav = true"></i>
            <!-- <div class="leftMask pointer" v-on:mouseover="show.nav = true"></div> -->
            <!-- ***************导航栏数据源******************* -->
            <div class="itemList">
              <div class="itemWrap">
                <span v-text="data.item.name"></span>
                <!-- ***************导航栏新增******************* -->
                <el-dropdown @command="addDb" class="addDb" menu-align="start">
                  <el-button :plain="true" type="info">新增</el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='db'>数据库接入</el-dropdown-item>
                    <el-dropdown-item command='view'>数据视图</el-dropdown-item>
                    <el-dropdown-item command='interface'>接口接入(Get)</el-dropdown-item>
                    <el-dropdown-item command='table'>填入表格</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- ***************导航栏搜索******************* -->
              <div class="searchWrap">
                <input placeholder="请输入内容" @input="db_search($event.target.value)" />
                <i class="el-icon-search"></i>
              </div>
              <!-- <el-row class="center operation">
                                      <el-col :span="8">查看数据表格</el-col>
                                      <el-col :span="6" class="orderWrap">
                                          <div @click="orderAsc('onz')">开启状态</div>
                                          <div v-if="order.order"><i class="el-icon-arrow-up" v-if="order.desc" @click="orderDesc('onz')"></i><i class="el-icon-arrow-down" v-if="!order.desc" @click="orderAsc('onz')"></i></div>
                                      </el-col>
                                      <el-col :span="6">编辑参数</el-col>
                                      <el-col :span="4">删除</el-col>
                                  </el-row>
                                  <div v-for="i in data.db">
                                      <el-row class="db pointer center">
                                          <el-col :span="8"><span v-text="i.name" @click="seeData(1,i);show.nav=false;db.edit=false;db.add=false;db.table=false;"></span></el-col>
                                          <el-col :span="6">
                                              <el-switch off-color="#13ce66" on-color="#ff4949" v-model="i.onz" on-value=1 off-value=0 :disabled="i.onz == '1' ? true : false" @change="db_onz(i.id)"></el-switch>
                                          </el-col>
                                          <el-col :span="6"><el-button icon="edit" @click="dbEdit(i)"></el-button></el-col>
                                          <el-col :span="4"><el-button icon="delete" @click="db.delete=true;db.db=i"></el-button></el-col>
                                      </el-row> 
                                  </div> -->
              <el-table class="dbWrap" :data="data.db" height="450">
  
                <el-table-column prop="name" label="查看数据表" sortable>
                  <template scope="scope">
                    <div class="pointer" @click="seeData(1,scope.row);show.nav=false;db.edit=false;db.add=false;db.table=false;" v-text="scope.row.name"></div>
                  </template>
                </el-table-column>
  
                <el-table-column label="开启状态" prop="onz" sortable>
                  <template scope="scope">
                    <el-switch off-color="#13ce66" on-color="#ff4949" v-model="scope.row.onz" on-value=1 off-value=0 :disabled="scope.row.onz == '1' ? true : false" @change="db_onz(id)">
                    </el-switch>
                  </template>
                </el-table-column>
  
                <el-table-column label="编辑参数">
                  <template scope="scope">
                    <el-button icon="edit" @click="dbEdit(scope.row)">
                    </el-button>
                  </template>
                </el-table-column>
  
                <el-table-column label="删除">
                  <template scope="scope">
                    <el-button icon="delete" @click="db.delete=true;db.db=scope.row">
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- ***************表单编辑数据源参数******************* -->
          <div class="editDb" v-if="db.edit || db.add">
            <div class="close">
              <i class="el-icon-close pointer" @click="db.edit=false;db.add=false"></i>
            </div>
            <el-form :model="db.db" ref="dbEdit" label-width="150px">
              <!-- :rules="dbRules" -->
              <el-form-item label="名称" prop="name">
                <el-input v-model="db.db.name" auto-complete="off" ref="dbName"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="type">
                <el-select v-model="db.db.type" placeholder="请选择类型" ref="type">
                  <el-option-group label="数据库连接类">
                    <el-option label="Mysql" value="mysql"></el-option>
                  </el-option-group>
                  <el-option-group label="接口连接类">
                    <el-option label="Webservice(Get)" value="interface"></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
              <el-form-item label="ip地址" prop="ip">
                <el-input v-model="db.db.ip" auto-complete="off" ref="ip"></el-input>
              </el-form-item>
              <el-form-item label="频率" prop="frequency">
                <el-select v-model="db.db.frequency" placeholder="请选择" ref="frequency">
                  <el-option label="分钟/次" value="60"></el-option>
                  <el-option label="天/次" value="8640"></el-option>
                  <el-option label="无" value=" "></el-option>
                </el-select>
              </el-form-item>
              <!-- <div class="hr"></div> -->
              <div v-if="db.db.type != 'interface'">
                <el-form-item label="端口号" prop="port">
                  <el-input v-model="db.db.port" auto-complete="off" ref="port"></el-input>
                </el-form-item>
                <el-form-item label="数据库名称" prop="db">
                  <el-input v-model="db.db.db" auto-complete="off" ref="db"></el-input>
                </el-form-item>
                <el-form-item label="表名" prop="tb">
                  <el-input v-model="db.db.tb" auto-complete="off" ref="tb"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="user">
                  <el-input v-model="db.db.user" auto-complete="off" ref="user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="psw">
                  <el-input type="password" v-model="db.db.psw" auto-complete="off" ref="psw"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="虚拟数据" prop="actual">
                <el-radio class="radio" v-model="db.db.actual" label='0'>是</el-radio>
                <el-radio class="radio" v-model="db.db.actual" label='1'>否</el-radio>
              </el-form-item>
              <div v-if="db.add">
                <el-form-item label="开启数据源" prop="onz">
                  <el-radio class="radio" v-model="db.db.onz" label='1'>是</el-radio>
                  <el-radio class="radio" v-model="db.db.onz" label='0'>否</el-radio>
                </el-form-item>
              </div>
              <el-form-item>
                <el-button v-if="db.add" type="primary" @click="db_add">提交</el-button>
                <el-button v-if="!db.add" type="primary" @click="db_edit">提交</el-button>
                <el-button @click="db.edit=false;db.add=false">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- ***************新增数据源-表格******************* -->
          <div class="dbTableWrap" v-if="db.table">
            <table class="dbTable table">
              <tr>
                <th v-for="(i,index) in data.item.field.split(',')" v-html="i+'&nbsp;&nbsp;<'+data.item.eg.split(',')[index]+'>'"></th>
              </tr>
              <tr v-for="(i,index) in tableCount">
                <td v-for="(x,xindex) in data.item.field.split(',').length">
                  <input class="input" @input="addingTable($event.target.value,index,xindex)" />
                </td>
              </tr>
              <tr>
                <td>
                  <el-button type="success" @click="addTableRow">Add Row</el-button>
                </td>
              </tr>
            </table>
            <div class="center">
              <el-button type="primary" @click="db.addTable = true">提交</el-button>
              <el-button @click="db.table=false">取消</el-button>
            </div>
          </div>
          <el-dialog title="请填入表格的其他信息" :visible.sync="db.addTable">
            <el-form :model="db.db">
              <el-form-item label="名称" prop="name">
                <el-input v-model="db.db.name" auto-complete="off" ref="dbName"></el-input>
              </el-form-item>
              <el-form-item label="表名" prop="tb">
                <el-input v-model="db.db.tb" auto-complete="off" ref="tb"></el-input>
              </el-form-item>
              <el-form-item label="频率" prop="frequency">
                <el-select v-model="db.db.frequency" placeholder="请选择" ref="frequency">
                  <el-option label="分钟/次" value="60"></el-option>
                  <el-option label="天/次" value="8640"></el-option>
                  <el-option label="无" value=" "></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="虚拟数据" prop="actual">
                <el-radio class="radio" v-model="db.db.actual" label='0'>是</el-radio>
                <el-radio class="radio" v-model="db.db.actual" label='1'>否</el-radio>
              </el-form-item>
              <div v-if="db.addTable">
                <el-form-item label="开启数据源" prop="onz">
                  <el-radio class="radio" v-model="db.db.onz" label='1'>是</el-radio>
                  <el-radio class="radio" v-model="db.db.onz" label='0'>否</el-radio>
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer">
              <el-button type="primary" @click="db_add">确 定</el-button>
              <el-button @click="db.addTable = false">取 消</el-button>
            </div>
          </el-dialog>
          <!-- ***************遮罩层******************* -->
          <div class="mask" v-show="show.nav" @click="show.nav = false"></div>
        </div>
      </div>
  
      <!-- .navWrap -->
      <div>
        <div class="mainWrap">
  
          <!-- ***************数据表格******************* -->
          <div class="tableWrap" v-if="dbData">
            <table class="table dataTable">
              <tr>
                <th v-if="table.db && table.db.editable">
                  <el-checkbox :indeterminate="false" @change="allDataCheckd"></el-checkbox>
                </th>
                <th v-for="(i,index) in data.item.field.split(',')" v-html="i+'&nbsp;&nbsp;['+data.item.eg.split(',')[index].split('（')[0]+']'"></th>
                <th v-if="table.db && table.db.editable">编辑</th>
              </tr>
              <tr v-for="(i,index) in dbData">
                <td v-if="table.db && table.db.editable">
                  <el-checkbox @change="oneDataChecked($event.target.checked,i.id)"></el-checkbox>
                </td>
                <td v-for="(x,xindex) in i" v-show="xindex != 'id'">
                  <el-input :class="table.edit?'':'notinput'" :value="x"></el-input>
                </td>
                <td v-if="table.db && table.db.editable">
                  <i class="el-icon-edit pointer" @click="table.edit = !table.edit"></i>
                </td>
              </tr>
            </table>
            <div class="flex padding">
              <el-button type="danger" icon="delete"></el-button>
              <el-button type="success">Add Row</el-button>
            </div>
            <!-- ***************数据表格分页******************* -->
            <div class="page">
              <el-pagination layout="prev, pager, next" :page-size="10" :total="table.total" @current-change="dataPage"></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <!-- mainWrap -->
    </div>
    <!-- .wrap -->
    <el-dialog title="提示" :visible.sync="db.delete" size="tiny">
      <span>确定删除此数据源？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="db.delete=false">取 消</el-button>
        <el-button type="primary" @click="db_delete(db.db);db.delete=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  props: [
    'id'
  ],
  data() {
    return {
      data: null,
      show: {
        nav: true
      },
      dbData: null,
      table: {
        db: null,
        total: 1,
        edit: false
      },
      db: {
        delete: false,
        db: {
          id: null,
          themeId: this.id.themeId,
          itemId: this.id.itemId,
          field: "",
          name: "",
          type: "",
          ip: "",
          frequency: "",
          port: "",
          db: "",
          tb: "",
          user: "",
          psw: "",
          actual: "",
          editable: "",
          onz: ""
        },
        edit: false,
        add: false,
        table: false,
        addTable: false
      },
      dbRules: {
        name: {
          required: true
        },
        type: {
          required: true
        },
        ip: {
          required: true
        },
        frequency: {
          required: true
        },
        port: {
          required: true
        },
        db: {
          required: true
        },
        tb: {
          required: true
        },
        user: {
          required: true
        },
        psw: {
          required: true
        }
      },
      delete: true,
      tableCount: null,
      socket: ''
    }
  },
  methods: {
    seeData(curr, e) {
      console.log("<<<<seeData")
      this.socket.emit("seeData", {
        current: curr,
        db: e
      })
      this.table.db = e;
    },
    db_delete(e) {
      console.log("<<<<deleteDb")
      this.socket.emit("deleteDb", e)
    },
    dbEdit(e) {
      this.db.db.id = e.id;
      this.db.db.name = e.name;
      this.db.db.type = e.type;
      this.db.db.ip = e.ip;
      this.db.db.frequency = e.frequency;
      this.db.db.port = e.port;
      this.db.db.db = e.db;
      this.db.db.tb = e.tb;
      this.db.db.user = e.user;
      this.db.db.psw = e.psw;
      this.db.db.onz = e.onz;
      this.db.db.actual = e.actual;
      this.db.db.field = e.field;
      this.db.db.editable = e.editable;
      this.db.edit = true;
      this.db.add = false;
      this.db.table = false;
    },
    db_edit() {
      console.log("<<<<editDb")
      this.socket.emit("editDb", this.db.db)
    },
    db_onz(id) {
      console.log("<<<<onzDb")
      this.socket.emit("onzDb", {
        id: id,
        itemId: this.itemId,
        themeId: this.themeId
      })
    },
    refresh() {
      this.socket.emit("seeItem", {
        item: this.itemId,
        theme: this.themeId
      })
    },
    addDb(command) {
      var newDb = {
        id: null,
        themeId: this.themeId,
        itemId: this.itemId,
        field: this.data.item.field,
        name: "",
        type: "",
        ip: "",
        frequency: "",
        port: "",
        db: "",
        tb: "",
        user: "",
        psw: "",
        actual: "0",
        editable: "",
        onz: "0"
      }
      switch (command) {
        case "db":
          this.db.add = true;
          this.db.table = false;
          newDb.editable = '1';
          newDb.type = "mysql";
          break;
        case "view":
          this.db.add = true;
          this.db.table = false;
          newDb.editable = '0';
          newDb.type = "mysql";
          break;
        case "interface":
          this.db.add = true;
          this.db.table = false;
          newDb.editable = '0';
          newDb.type = "interface";
          break;
        case "table":
          this.tableCount = 1;
          this.db.table = true;
          this.db.add = false;
          newDb.val = [];
          newDb.val[this.tableCount - 1] = []
          for (var i = 0; i < this.data.item.field.split(',').length; i++) {
            newDb.val[this.tableCount - 1][i] = "-";
          }
          newDb.editable = '1';
          newDb.type = "mysql";
          break;
      }
      this.db.db = newDb
    },
    db_add() {
      if (this.db.table) {
        socket.emit("addDb", {
          type: "table",
          db: this.db.db
        })
      } else {
        this.socket.emit("addDb", this.db.db)
      }
    },
    db_search(val) {
      this.socket.emit("searchDb", {
        val: val,
        themeId: this.themeId,
        itemId: this.itemId
      })
    },
    data_delete(e) {
      console.log(e, "data_delete")
    },
    oneDataChecked(event, id) {
      console.log(event, id)
    },
    allDataCheckd(event) {
      console.log(event.target.checked, "allDataChecked")
    },
    addTableRow() {
      //新增表格-行-默认值
      this.tableCount++;
      this.db.db.val[this.tableCount - 1] = [];
      for (var i = 0; i < this.data.item.field.split(',').length; i++) {
        this.db.db.val[this.tableCount - 1][i] = "-";
      }
    },
    addingTable(val, i, x) {
      //新增表格-输入框-改变
      this.db.db.val[i][x] = val
      console.log(this.db.db.val)
    },
    dataPage(e) {
      this.seeData(e, this.table.db);
    }
  },
  mounted() {
  },
  created() {
    var itemId = this.id.itemId
    var themeId = this.id.themeId
    var socket = io.connect('http://192.168.99.191:8077');
    this.socket = socket
    socket.emit("seeItem", {
      item: itemId,
      theme: themeId
    });
    var init = 0;
    socket.on('seeItem',  e => {
      console.log("seeItem>>>>", e)
      this.data = e;
      console.log(e.db)
      if (init < 1) {
        if (e.db.length > 0) {
          socket.emit("seeData", {
            current: 1,
            db: e.db[0]
          })
          this.table.db = e.db[0]
        }
        init = 1;
      }
    });
    socket.on('seeData',  e => {
      console.log("seeData>>>>", e)
      this.dbData = e.data;
      this.table.total = e.count;
    })
    socket.on('deleteDb',  e => {
      console.log("deleteDb>>>>", e)
      this.refresh();
    })
    socket.on('editDb',  e => {
      console.log("editDb>>>>", e)
    })
    socket.on('addDb',  e => {
      console.log("addDb>>>>", e)
      this.refresh();
    })
    socket.on('onzDb',  e => {
      console.log("onzDb>>>>", e)
      this.refresh();
    })
    socket.on('searchDb',  e => {
      console.log("searchDb>>>>", e)
      this.data.db = e.data;
      // console.log(app.data.db)
    })
    socket.on('deleteData',  e => {
      console.log("deleteData>>>>", e)
      // app.data.db=e.data;
      // console.log(app.data.db)
    })
  }
}
</script>

<style lang="scss">
.datamg, 
.wrap,
.navWrap {
  width: 100%;
  height: 100%;
}

[v-cloak] {
  display: none;
}

.pointer {
  cursor: pointer;
}

.defalut {
  cursor: default;
}

.center {
  text-align: center;
}


/* .hr{width:100%; height:1px; box-shadow: 0 2px 2px #e4e4e4;} */

.wrap>div {
  width: 100%;
  height: 100%;
  position: absolute
}

.navWrap {
  position: relative;
}

.nav,
.mask {
  position: absolute;
  height: 100%;
}

.nav {
  left: 0;
  top: 0;
  width: 40%;
  z-index: 2;
  background: #fff;
  transition: left 1s;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(57, 70, 78, .2);
}

.backItem {
  padding: 1rem;
}

.backItem>i {
  font-size: 1.4em;
}

.mask {
  width: 100%;
  background: rgba(255, 255, 255, .5);
  z-index: 1;
}

.db:hover {
  background: #ddd;
}

.mainWrap {
  width: 100%;
  height: 100%;
  position: relative;
}

.caretRight {
  position: absolute;
  left: 100%;
  display: block;
  color: rgba(49, 188, 66, 0.5);
  font-size: 1.8rem;
  border-radius: 50%;
  padding: .5rem;
}

.caretRight:hover {
  background: rgba(135, 184, 78, .3)
}


/* .leftMask{position: absolute; height: 100%; width: 100px;} */

.operation {
  padding: 1rem 0;
}

.tableWrap {
  width: 100%;
  height: 100%;
  color: #fff;
  border-radius: .4em;
}

.table {
  width: 100%;
  border-spacing: 0;
  margin-bottom: 1rem;
}

.table th,
.table td {
  display: table-cell;
  text-align: center;
  padding: .9rem;
}

.table th {
  background-color: #31bc86;
  padding-top: 1rem;
  font-weight: bold;
  color: #fff;
  text-transform: capitalize;
  border-bottom: 1px solid;
  border-image: linear-gradient( green, yellow) 30 30;
}

.table td {
  color: #7c8d87;
}

.dataTable tr:nth-child(2n) {
  background: rgba(76, 175, 80, .11);
}

.dataTable tr:hover {
  background: #ddd;
}

.dataTable tr:last-child {
  background: transparent;
}

.page {
  text-align: center;
}

.editDb,
.dbTableWrap {
  height: 100%;
  overflow-y: scroll;
  width: 60%;
  margin-left: 40%;
  background: #fff;
  height: 100%;
  z-index: 2;
  position: absolute;
  border-left: 1px solid rgba(57, 70, 78, .2);
  box-sizing: border-box;
}

.editDb>form {
  padding-right: 20%;
}

.close {
  text-align: right;
  padding: 1rem 0;
  padding-right: 1rem;
}

.searchWrap {
  clear: both;
  padding: .3rem;
  padding-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.searchWrap input {
  border: none;
  border-bottom: 1px solid #4CAF50;
  width: 80%;
  font-size: 1rem;
  outline: none;
  padding-left: .5em;
}

.searchWrap i {
  font-size: 1.4em;
}

.orderWrap {
  display: flex;
}

.el-table__footer-wrapper thead div,
.el-table__header-wrapper thead div,
.el-table td,
.el-table th.is-leaf,
.el-table th,
.el-table::after,
.el-table::before,
.el-table {
  background: transparent;
  border: none;
}

.el-pager li.active {
  border-color: #13ce66;
  background-color: #13ce66;
}

.dbWrap th,
.dbWrap td {
  text-align: center;
}

.itemWrap {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.padding {
  padding: 1rem;
}

.notinput input {
  background: transparent;
  border: none;
}

.input {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  box-sizing: border-box;
  color: #1f2d3d;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%
}
</style>
