<template>
  <div class="pie-echarts" :id="id">
  </div>
</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        myChart: {}
      }
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById(this.id))
      let option = {
        title: {
          text: '60MB',
          subtext: '程序消耗内存',
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#fb358a',
            fontSize: 40,
          }
        },
        series: [{
          name: 'consume',
          type: 'pie',
          radius: ['60%', '61%'],
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
            }
          },
          data: [{
            value: 66,
            itemStyle: {
              normal: {
                color: '#fb358a',
                shadowBlur: 10,
                shadowColor: '#fb358a'
              }
            }
          }, {
            value: 37,
          }]
        }]
      }
      this.myChart.setOption(option)
    }
  }
</script>

<style lang="scss" scoped>
  .pie-echarts {
    width: 100%;
    height: 100%;
  }
</style>
