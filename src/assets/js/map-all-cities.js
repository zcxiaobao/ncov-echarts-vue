import { buildVisualMap } from './map-visualMap'
const HandleDirectCity = function(data) {
  const zhixiashi = ['北京市', '重庆市', '上海市', '天津市']
  const records = data.map(d => {
    return {
      day: d.day,
      records: d.records.reduce((p, v) => {
        return p.concat(zhixiashi.indexOf(v.name) > -1 ? v : v.cityList)
      }, [])
    }
  })
  return records
}
export const buildAllCitiesOption = function(province, data) {
  const recordData = HandleDirectCity(data)
  const option = {
    baseOption: {
      timeline: {
        axisType: 'category',
        autoPlay: false,
        currentIndex: recordData.length - 1,
        playInterval: 1000,
        data: recordData.map(d => d.day)
      },
      tooltip: {
        show: true,
        trigger: 'item'
      },
      grid: [],
      xAxis: [],
      yAxis: [],
      series: [
        {
          type: 'map',
          map: 'china-cities',
          name: '累计确诊',
          left: 'center',
          label: {
            show: false
          },
          tooltip: {
            formatter(params) {
              if (!params.value) {
                return `地区: ${params.name}
                    <br/>暂无数据`
              }
              return `地区: ${params.name}
                <br/>累计确诊: ${params.value}
                <br/>新增确诊: ${params.data.confirmedIncreased}
                <br/>累计治愈: ${params.data.curedCount}
                <br/>累计死亡: ${params.data.deadCount}`
            }
          }
        }
      ],
      visualMap: [
        {
          // 左下角的颜色区域
          type: 'piecewise', // 定义为分段型 visualMap
          min: 0,
          max: 100000,
          itemWidth: 40,
          bottom: 60,
          right: 20,
          pieces: buildVisualMap('china-cities'),
          left: 'auto',
          seriesIndex: 0
        }
      ]
    },
    options: recordData.map(d => {
      return {
        series: {
          title: {
            text: d.day
          },
          data: d.records.map(r => {
            return {
              name: r.name,
              value: r.confirmedCount,
              curedCount: r.curedCount,
              deadCount: r.deadCount,
              confirmedIncreased: r.confirmedIncreased
            }
          })
        }
      }
    })
  }
  return option
}
