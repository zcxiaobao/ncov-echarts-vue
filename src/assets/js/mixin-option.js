import {
  buildVisualMap
} from './map-visualMap'

export const buildMixin = function (province, data) {
  const legendData = ['治愈', '死亡', '治疗']
  const yAxisData = []
  const curdData = []
  const deadData = []
  const currentConfirmedData = []
  data.forEach(city => {
    yAxisData.push(city.name)
    curdData.push(Math.abs(city.curedCount))
    deadData.push(Math.abs(city.deadCount))
    currentConfirmedData.push(Math.abs(city.currentConfirmedCount))
  })

  const option = {
    title: [{
      show: true,
      text: '疫情累计确诊地图',
      top: '8%',
      left: 'center'
    }],
    tooltip: [{
      trigger: 'item',
      formatter(params) {
        return `地区: ${params.name}
              <br/>累计确诊: ${params.value ? params.value : 0}`
      }
    }, {
      trigger: 'item',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
      }
    }],
    legend: {
      data: legendData
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'value'
    }],
    yAxis: [{
      type: 'category',
      data: yAxisData
    }],
    series: [{
        type: 'map',
        map: province,
        name: '累计确诊',
        center: province === '海南' ? [109.844902, 19.0392] : province === 'china' ? [104.114129, 37.550339] : undefined,
        zoom: province === '海南' ? 6 : 1,
        label: {
          normal: {
            show: true,
            position: 'inside',
            align: 'center'
          }
        },
        data
      }, {
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
    ],
    visualMap: {
      // 左下角的颜色区域
      type: 'piecewise', // 定义为分段型 visualMap
      min: 0,
      max: 100000,
      itemWidth: 40,
      bottom: 60,
      right: 20,
      pieces: buildVisualMap(province)
    }
  }
  return option
}
