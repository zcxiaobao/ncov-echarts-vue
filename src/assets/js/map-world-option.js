import { buildVisualMap } from './map-visualMap'
import { countryNameMap } from './country'
import { otherArea } from './config'
export const buildWorldMapOption = function(region, data) {
  const option = {
    tooltip: {
      trigger: 'item',
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
    series: [
      {
        type: 'map',
        map: region,
        name: '累计确诊',
        nameMap: countryNameMap[region],
        label: {
          normal: {
            show: false,
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
      pieces: buildVisualMap(region)
    }
  }
  return option
}
