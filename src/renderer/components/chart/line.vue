<template>
  <div class="line-echarts" :id="id"></div>
</template>
<script>
export default {
  props: ['id'],
  data () {
    return {
      myChart: {}
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById(this.id))
    let option = {
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false
      },
      color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769'],
      calculable: true,
      xAxis: [{
        name: '时间',
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        // nameTextStyle: {
        //   color: 'rgba(255, 255, 255, 0.69)'
        // },
        axisLabel: {
          textStyle: {
            color: '#000'
          }
        },
        data: ['6/19', '6/20', '6/21', '6/22', '6/23', '6/24', '6/25']
      }],
      yAxis: [{
        axisLine: {
          show: false
        },
        nameLocation: 'end',
        nameGap: 20,
        nameRotate: 0,
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: ['rgba(230, 230, 230, 1)']
          }
        },
        axisLabel: {
          textStyle: {
            color: '#000',
            fontSize: 14
          }
        },
        name: '时长',
        type: 'value',
        nameTextStyle: {
          color: '#000'
        }
      }],
      series: [{
        name: '本机',
        type: 'line',
        data: [12, 13, 14, 15, 9, 23, 21]
      }]
    }
    this.myChart.setOption(option)
  }
}
</script>
<style lang="scss" scoped>
.line-echarts {
  width: 100%;
  height: 100%;
}
</style>
