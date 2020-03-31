/*
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-03-31 09:57:31
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-03-31 17:47:34
 */
export default () => ({
  tooltip: {
    trigger: 'axis'
  },
  dataset: {
    dimensions: null,
    source: null
  },
  grid: {
    top: '15%',
    left: '5%',
    right: '5%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    data: null,
    axisTick: {
      show: false
    },
    axisLabel: {
      rotate: 45,
      color: '#777',
      fontSize: '0.12rem',
      fontWeight: 'bold'
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#333',
      fontSize: '0.15rem',
      fontWeight: 'bold'
    }
  },
  visualMap: {
    // 左下角的颜色区域
    type: 'piecewise', // 定义为分段型 visualMap
    min: 0,
    max: 500,
    show: false,
    pieces: [
      {
        gt: 0,
        lte: 100,
        color: 'rgb(251,145,88)'
      },
      {
        gt: 100,
        lte: 500,
        color: 'rgb(240,99,97)'
      }
    ]
  },
  series: null
})
