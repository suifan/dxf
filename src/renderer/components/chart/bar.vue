<template>
  <div class="bar-echarts" :id="id">
  </div>
</template>

<script>
  let os = require('os')
  
  export default {
    props: ['id'],
    data() {
      return {
        myChart: {}
      }
    },
    mounted() {
      let that = this
      this.myChart = echarts.init(document.getElementById(this.id))
      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: ['系统内存总量', '系统空闲内存']
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'GB',
          type: 'bar',
          barWidth: '20%',
          data: [8, 2]
        }]
      }
      this.myChart.setOption(option)
      
      setInterval(function() {
        let free = os.freemem() / (1024 * 1024 * 1024) ,
            total = os.totalmem() / (1024 * 1024 * 1024)
        that.myChart.setOption({
          series: [{
            name: 'GB',
            data: [total.toFixed(0), free.toFixed(0)]
          }]
        })
      }, 1000)
    }
  }
</script>

<style lang="scss" scoped>
  .bar-echarts {
    width: 100%;
    height: 100%;
  }
</style>
