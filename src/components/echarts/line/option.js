export default () => ({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: null,
    icon: 'roundRect',
    borderRadius: 5,
    top: '3%',
    left: '5%',
    textStyle: {
      // fontWeight: 'bold',
      fontSize: '0.28rem',
      fontFamily: `-apple-system-font, system-ui, -apple-system, Segoe UI,
      Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei,
      Arial`
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
      fontFamily: `-apple-system-font, system-ui, -apple-system, Segoe UI,
      Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei,
      Arial`,
      fontSize: '0.12rem',
      fontWeight: 'bold',
      interval: 2,
      formatter: value => {
        return value.slice(5)
      }
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
      fontFamily: `-apple-system-font, system-ui, -apple-system, Segoe UI,
      Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei,
      Arial`,
      fontSize: '0.15rem',
      fontWeight: 'bold'
    }
  },
  series: null
})
