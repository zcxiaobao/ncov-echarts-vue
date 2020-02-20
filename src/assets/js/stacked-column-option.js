export const buildStackColumnOption = function (mapData) {
  const legendData = ['治愈', '死亡', '治疗']
  const yAxisData = []
  const curdData = []
  const deadData = []
  const currentConfirmedData = []
  mapData.forEach(city => {
    yAxisData.unshift(city.name)
    curdData.unshift(Math.abs(city.curedCount))
    deadData.unshift(Math.abs(city.deadCount))
    currentConfirmedData.unshift(Math.abs(city.currentConfirmedCount))
  })
  const option = {
    tooltip: {
      trigger: 'item',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: legendData
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: yAxisData
    },
    series: [{
        name: '治愈',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideLeft',
          formatter: function (params) {
            if (params.value > 0) {
              return params.value
            } else {
              return ''
            }
          }
        },
        data: curdData
      },
      {
        name: '死亡',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideLeft',
          formatter: function (params) {
            if (params.value > 0) {
              return params.value
            } else {
              return ''
            }
          }
        },
        data: deadData
      },
      {
        name: '治疗',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideLeft',
          formatter: function (params) {
            if (params.value > 0) {
              return params.value
            } else {
              return ''
            }
          }
        },
        data: currentConfirmedData,
        barMaxWidth: '30'
      }
    ]
  }
  return option
}
