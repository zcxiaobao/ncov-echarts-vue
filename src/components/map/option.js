import { buildVisualMap } from '@/assets/js/map-visualMap'
export const buildMapOptions = function(area, data) {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter(params) {
        if (!params.value) {
          return `地区: ${params.name}
                  <br/>暂无数据`
        }
        return `地区: ${params.name}
              <br/>累计确诊: ${params.data.confirm}
              <br/>现存确诊: ${params.data.current}
              <br/>累计治愈: ${params.data.heal}
              <br/>累计死亡: ${params.data.dead}`
      }
    },
    series: [
      {
        type: 'map',
        map: area,
        name: '累计确诊',
        label: {
          normal: {
            show: true,
            position: 'inside',
            align: 'center'
          }
        },
        data
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
      pieces: buildVisualMap(area)
    }
  }
  return option
}
