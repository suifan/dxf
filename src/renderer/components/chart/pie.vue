<template>
  <div class="pie-echarts" :id="id">
  </div>
</template>

<script>
   export default {
     props: ['id'],
     data() {
       return {
         myChart: {},
         option: {},
         heapUsed: ''
       }
     },
     methods: {
       ByteFormat(bytes, num) {
         return (bytes / 1024 / 1024).toFixed(num) + ' MB';
       }
     },
     mounted() {
       let that = this
       this.myChart = echarts.init(document.getElementById(this.id))
       let dataStyle = {
         normal: {
           label: {
             show: false
           },
           labelLine: {
             show: false
           },
           shadowBlur: 40,
           shadowColor: 'rgba(40, 40, 40, 0.5)',
         }
       };
       let placeHolderStyle = {
         normal: {
           color: 'rgba(44,59,70,1)', //未完成的圆环的颜色
           label: {
             show: false
           },
           labelLine: {
             show: false
           }
         },
         emphasis: {
           color: 'rgba(44,59,70,1)' //未完成的圆环的颜色
         }
       };
       this.option = {
         title: {
           text: '75MB',
           subtext: '程序消耗内存',
           x: 'center',
           y: 'center',
           textStyle: {
             fontWeight: 'normal',
             color: "#fb358a", //#fb358a
             fontSize: 40
           },
           subtextStyle: {
             fontSize: 18
           }
         },
         color: ['#eb644b', '#313443', '#fff'],
         tooltip: {
           show: false,
           formatter: "{a} <br/>{b} : {c} ({d}%)"
         },
         legend: {
           show: false,
           itemGap: 12,
           data: ['01', '02']
         },
         toolbox: {
           show: false,
           feature: {
             mark: {
               show: true
             },
             dataView: {
               show: true,
               readOnly: false
             },
             restore: {
               show: true
             },
             saveAsImage: {
               show: true
             }
           }
         },
         series: [{
           name: 'consume',
           type: 'pie',
           clockWise: false,
           radius: [95, 100],
           itemStyle: dataStyle,
           hoverAnimation: false,
  
           data: [{
               value: 75,
               name: '01'
             }, {
               value: 25,
               name: 'invisible',
               itemStyle: placeHolderStyle
             }
  
           ]
         }, {
           name: 'Line 2',
           type: 'pie',
           animation: false,
           clockWise: false,
           radius: [120, 118],
           itemStyle: dataStyle,
           hoverAnimation: false,
           tooltip: {
             show: false
           },
           data: [{
             value: 100,
             name: '02',
             itemStyle: {
               emphasis: {
                 color: '#313443'
               }
             }
           }, {
             value: 0,
             name: 'invisible',
             itemStyle: placeHolderStyle
           }]
         }, ]
       }
       this.myChart.setOption(this.option)
  
       setInterval(function() {
  
         let heapUsed = process.memoryUsage().heapUsed / (1024 * 1024)
         that.myChart.setOption({
           title: {
             text: heapUsed.toFixed(0) + 'MB'
           },
           series: [{
             name: 'consume',
             data: [{
                 value: heapUsed.toFixed(0)
               },
               {
                 value: 200 - heapUsed.toFixed(0)
               }
             ]
           }]
         })
       }, 1000)
     },
     updated() {
       // this.option.series.data.value = this.heapUsed
     }
   }
</script>

<style lang="scss" scoped>
  .pie-echarts {
    width: 100%;
    height: 100%;
  }
</style>
