import {
  buildVisualMap
} from './map-visualMap'

export const buildMixin = function (province, data) {
  const legendData = ['治愈', '死亡', '治疗']
  const yAxisData = []
  const curdData = []
  const deadData = []
  const currentConfirmedData = []

  data.sort((a, b) => a.value < b.value ? -1 : 1)
  // console.log(data)
  data.forEach(city => {
    yAxisData.push(city.name)
    curdData.push(Math.abs(city.curedCount))
    deadData.push(Math.abs(city.deadCount))
    currentConfirmedData.push(Math.abs(city.currentConfirmedCount))
  })

  const option = {
    // baseOption: {
    tooltip: {
      show: true,
      trigger: 'item'
    },
    grid: [{
      top: 10,
      width: '95%',
      left: 10,
      right: 10,
      containLabel: true
    }],
    xAxis: [{
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    }],
    yAxis: [{
      data: yAxisData,
      type: 'category',
      axisLabel: {
        show: true,
        interval: 0
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    }],
    series: [{
        type: 'map',
        map: province,
        name: '累计确诊',
        center: province === '海南' ? [109.844902, 19.0392] : province === 'china' ? [104.114129, 37.550339] : undefined,
        zoom: province === '海南' ? 6 : 1,
        left: province === 'china' ? '30%' : 'center',
        label: {
          normal: {
            show: true,
            position: 'inside',
            align: 'center'
          }
        },
        tooltip: {
          formatter(params) {
            if (!params.value) {
              return `地区: ${params.name}
                  <br/>暂无数据`
            }
            return `地区: ${params.name}
              <br/>累计确诊: ${params.value}
              <br/>现存确诊: ${params.data.currentConfirmedCount}
              <br/>累计治愈: ${params.data.curedCount}
              <br/>累计死亡: ${params.data.deadCount}`
          }

        },
        z: 1000,
        data
      },
      {
        name: '治愈',
        type: 'bar',
        stack: '人数',
        color: 'rgb(64,141,39)',
        label: {
          show: true,
          position: 'inside',
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
        stack: '人数',
        color: 'gray',
        label: {
          show: true,
          position: 'inside',
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
        stack: '人数',
        color: 'rgb(224,144,115)',
        label: {
          show: true,
          position: 'inside',
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
    ],
    visualMap: [{
      // 左下角的颜色区域
      type: 'piecewise', // 定义为分段型 visualMap
      min: 0,
      max: 100000,
      itemWidth: 40,
      bottom: 60,
      right: 20,
      pieces: buildVisualMap(province),
      left: 'auto',
      seriesIndex: 0
    }]
  }
  return option
}
