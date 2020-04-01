/*
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-03-31 20:37:27
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-04-01 17:18:49
 */
export default () => ({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    itemWidth: '0.15rem',
    itemHeight: '0.10rem',
    data: null,
    icon: 'roundRect',
    borderRadius: 5,
    top: '3%',
    textStyle: {
      fontSize: '0.24rem'
    }
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
    boundaryGap: false,
    data: null,
    axisTick: {
      show: false
    },
    axisLabel: {
      rotate: 45,
      color: '#777',
      fontSize: '0.12rem',
      fontWeight: 'bold',
      interval: 2
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
  series: null
})
