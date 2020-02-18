import {
  buildVisualMap
} from './map-visualMap'
export const buildMapOptions = function (province, data) {
  const option = {
    title: {
      show: true,
      text: '疫情累计确诊地图',
      top: '8%',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter(params) {
        return `地区: ${params.name}
              <br/>累计确诊: ${params.value ? params.value : 0}`
      }
    },
    series: [{
      type: 'map',
      map: province,
      name: '累计确诊',
      center: province === '海南' ? [109.844902, 19.0392] : province === 'china' ? [104.114129, 37.550339] : undefined,
      // layoutCenter: province === '海南' ? ['50%', '50%'] : undefined,
      // layoutSize: province === '海南' ? '600%' : undefined,
      zoom: province === '海南' ? 6 : 1,
      label: {
        normal: {
          show: true,
          position: 'inside',
          align: 'center'
        }
      },
      data
    }],
    visualMap: {
      // 左下角的颜色区域
      type: 'piecewise', // 定义为分段型 visualMap
      min: 0,
      max: 100000,
      itemWidth: 40,
      bottom: 60,
      left: 20,
      pieces: buildVisualMap(province)
    }
  }
  return option
}
