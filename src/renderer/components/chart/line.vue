<template>
  <div class="Jn-line" ref="line">
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Jnline',
  components: 'jn-line',
  data() {
    return {
      myChart: {}
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.line)
    let option = {
      // backgroundColor: '#FFF',
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        icon: 'rect',
        data: ['本机'],
        // backgroundColor: '#7e3ffb',
        borderColor: 'none',
        borderWidth: 1,
        align: 'left',
        // itemWidth: 0,
        // itemHeight: 0,
        inactiveColor: '#ccc',
        textStyle: {
          color: '#475669',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
        },
      },
      toolbox: {
        show: false
      },
      color: ['#7e3ffb', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769'],
      calculable: false,
      grid: {
        top: 80,
        left: 55,
        right: 50,
        bottom: 40
      },
      xAxis: [{
        name: '',
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#475669'
          }
        },
        data: ['10:23:50', '10:23:51', '10:23:52', '10:23:53', '10:23:54', '10:23:55', '10:23:56']
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
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#475669',
            fontSize: 12
          }
        },
        name: '消耗量(kb)',
        type: 'value',
        nameTextStyle: {
          color: '#324057'
        }
      }],
      series: [
        {
          name: '本机',
          type: 'line',
          symbol: 'none',
          data: [12, 13, 14, 15, 9, 23, 21],
          smooth: true,
          lineStyle: {
            normal: {
              width: 0,
              color: '',
            }
          },
          areaStyle: {
            normal: {
              color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#ad77ff' // 0% 处的颜色
                }, {
                    offset: 1, color: '#7e3ffb' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          }
        }
      ]
    }
    this.myChart.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
.Jn-line {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>
