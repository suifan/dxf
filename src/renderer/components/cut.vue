<template>
  <div v-if="togo" class="wrap">
    <div class="itemwrap left" id="left">
      <div class="itemRelative">
        <a @click="getid(1,1)" class="item" id="item1">
          <div>子公司销售详情</div>
        </a>
        <a class="item" id="item2">
          <div>今年总营收</div>
        </a>
        <a class="item" id="item3"></a>
        <a class="item" id="item4"></a>
        <a class="item" id="item5"></a>
        <a class="item" id="item6"></a>
        <a class="item" id="item7"></a>
        <a class="item" id="item8"></a>
        <a class="item" id="item9"></a>
        <a class="item" id="item10"></a>
        <a class="item" id="item11"></a>
        <a class="item" id="item12"></a>
        <a class="item" id="item13"></a>
        <a class="item" id="item14"></a>
  
        <img class="cut" src="../assets/img/t1.jpg" title="全球化" />
        
      </div>
    </div>
    <div class="itemwrap right" id="right">
      <div class="itemRelative">
        
        <a class="item" id="item16"></a>
        <a class="item" id="item17"></a>
        <a class="item" id="item18"></a>
        <a class="item" id="item19"></a>
        <a class="item" id="item20"></a>
        <a class="item" id="item21"></a>
        <a class="item" id="item22"></a>
        <a class="item" id="item16_2"></a>
        <img class="cut" src="../assets/img/t2.jpg" title="智能智造" />
      </div>
    </div>

    <div class="rightarrow pointer" @click="toright()">下一张</div>
    <div class="leftarrow pointer" @click="toleft()">上一张</div>
  </div>
  <div v-else>
    <datamg :id="id"></datamg>
  </div>
  
</template>

<script>
import datamg from './datamg'
export default {
  data () {
    return {
      togo: true,
      id: {
        themeId: Number,
        itemId: Number
      }
    }
  },
  components: {datamg},
  mounted() {
      document.onkeydown = this.keydown
  },
  methods: {
    getid (themeId, itemId) {
      this.id.themeId = themeId
      this.id.itemId = itemId
      this.togo = false
    },
    keydown (e) {
      var currKey = 0,
        e = e || event;
      currKey = e.keyCode || e.which || e.charCode;
      if (currKey == 39) {
        this.toright();
      } else if (currKey == 37) {
        this.toleft();
      }
    },
    toleft() {
      let left = document.getElementById('left'),
          right = document.getElementById('right')
      left.style.left = "0";
      right.style.left = "100%";
    },
    toright() {
      let left = document.getElementById('left'),
          right = document.getElementById('right')
      left.style.left = "-100%";
      right.style.left = "0";
    }
  }
  
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #F4F8F9;
}

.itemwrap {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.left,
.right {
  position: absolute;
  bottom: 0;
  transition: left .3s;
  z-index: 1;
}

.left {
  left: 0;
}

.right {
  left: 100%;
}

.itemRelative {
  position: relative;
  width: 100%;
}

.itemRelative>a {
  position: absolute;
  display: inline-block;
  background: rgba(0, 0, 0, .4);
  box-sizing: border-box;
  border: 1px solid #999;
}

.cut {
  width: 100%;
}

.pointer {
  cursor: pointer;
}

#item1 {
  width: 34%;
  height: 31%;
  left: 0;
}

#item2 {
  width: 32%;
  height: 31%;
  left: 35%;
}

#item3 {
  width: 32%;
  height: 31%;
  right: 0;
}

#item4 {
  width: 18%;
  height: 18%;
  top: 32%;
}

#item5 {
  width: 36%;
  height: 7%;
  left: 32%;
  top: 32%;
}

#item6 {
  width: 7.5%;
  height: 6.5%;
  top: 34.5%;
  right: 24.1%;
}

#item7 {
  width: 7.4%;
  height: 6.5%;
  top: 34.5%;
  right: 16.6%;
}

#item8 {
  width: 7.4%;
  height: 6.5%;
  top: 34.5%;
  right: 9.1%;
}

#item9 {
  width: 7.5%;
  height: 6.5%;
  top: 34.5%;
  right: 1.5%;
}

#item10 {
  width: 18%;
  height: 12%;
  left: 0;
  top: 51%;
}

#item11 {
  width: 36%;
  height: 9%;
  left: 32%;
  top: 40%;
}

#item12 {
  width: 10.5%;
  height: 6.5%;
  left: 1.5%;
  top: 67.1%;
}

#item13 {
  width: 31%;
  height: 30%;
  right: 1.2%;
  bottom: 2%;
}

#item14 {
  width: 10.5%;
  height: 6.5%;
  left: 12.1%;
  top: 67.1%;
}

#item16 {
  width: 32%;
  height: 32%;
  left: 0;
  top: 2%;
}

#item17 {
  width: 64.5%;
  height: 9%;
  top: 6%;
  right: 1%;
}

#item18 {
  width: 32%;
  height: 30%;
  top: 35%;
}

#item19 {
  width: 64.5%;
  height: 36%;
  top: 15.5%;
  right: 1%;
}

#item20 {
  width: 13%;
  height: 9.5%;
  top: 54.5%;
  right: 17%;
}

#item21 {
  width: 13%;
  height: 9.5%;
  top: 54.5%;
  right: 3.5%;
}

#item22 {
  width: 32%;
  height: 32%;
  bottom: 2%;
}

#item16_2 {
  width: 32%;
  height: 32%;
  bottom: 2%;
  left: 34%;
}

.item {
  position: relative;
}

.item>div {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  display: none;
}

.item:hover>div {
  display: flex;
}

.rightarrow,
.leftarrow {
  z-index: 3;
  position: absolute;
  right: 0;
  color: #fff;
  width: auto;
  bottom: 20%;
  width: 60px;
  color: #1F2D3D;
}

.rightarrow {
  right: 40%;
}

.leftarrow {
  left: 40%;
}
</style>
