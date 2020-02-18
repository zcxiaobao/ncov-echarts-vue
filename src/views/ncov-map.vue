<template>
  <div id="chart_example" ref="ncov"></div>
</template>
<script>
import echarts from 'echarts'
// import 'echarts/map/js/china.js'
// import '@/assets/js/data.js'
import api from '@/api/api.js'
export default {
  data() {
    return {
      ncovData: [],
      provinces: {
        // 23个省
        台湾: 'taiwan',
        河北: 'hebei',
        山西: 'shanxi',
        辽宁: 'liaoning',
        吉林: 'jilin',
        黑龙江: 'heilongjiang',
        江苏: 'jiangsu',
        浙江: 'zhejiang',
        安徽: 'anhui',
        福建: 'fujian',
        江西: 'jiangxi',
        山东: 'shandong',
        河南: 'henan',
        湖北: 'hubei',
        湖南: 'hunan',
        广东: 'guangdong',
        海南: 'hainan',
        四川: 'sichuan',
        贵州: 'guizhou',
        云南: 'yunnan',
        陕西: 'shanxi1',
        甘肃: 'gansu',
        青海: 'qinghai', // 5个自治区
        新疆: 'xinjiang',
        广西: 'guangxi',
        内蒙古: 'neimenggu',
        宁夏: 'ningxia',
        西藏: 'xizang', // 4个直辖市
        北京: 'beijing',
        天津: 'tianjin',
        上海: 'shanghai',
        重庆: 'chongqing', // 2个特别行政区
        香港: 'xianggang',
        澳门: 'aomen'
      }
    }
  },
  created() {
    api.getNcovData().then(res => {
      if (!localStorage.getItem('ncovData')) {
        localStorage.setItem('ncovData', JSON.stringify(res))
      }
      this.ncovData = res.newslist
    })
    api.getNcovDataAll().then(res => {
      if (!localStorage.getItem('ncovDataAll')) {
        localStorage.setItem('ncovDataAll', JSON.stringify(res))
      }
    })
  },
  mounted() {
    setTimeout(() => {
      this._initEcharts()
      this._renderMap('china', this._transformNcovData(this.ncovData))
    }, 20)
  },
  methods: {
    _initEcharts() {
      this.myChart = echarts.init(this.$refs.ncov)
    },
    _searchCityNcovData(provinceName) {
      const index = this.ncovData.findIndex(
        province => province.provinceShortName === provinceName
      )
      return this.ncovData[index].cities
    },
    _renderMap(mapName, data) {
      // axios.get
      api.getProvinceData(mapName).then(res => {
        echarts.registerMap(mapName, res)
        const option = {
          title: {
            show: true,
            text: '疫情累计确诊地图',
            top: '10%',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter(params) {
              return `地区: ${params.name}
                    <br/>累计确诊: ${params.value}`
            }
          },
          series: [
            {
              type: 'map',
              map: mapName,
              name: '疫情信息',
              label: {
                show: true
              },
              data: data
            }
          ],
          visualMap: {
            // 左下角的颜色区域
            type: 'piecewise', // 定义为分段型 visualMap
            min: 0,
            max: 100000,
            itemWidth: 40,
            bottom: 60,
            left: 20,
            pieces: [
              { gt: 9999, label: '>10000', color: '#4F070D' },
              {
                gt: 999,
                lte: 10000,
                label: '1000-10000',
                color: '#811C24'
              },
              { gt: 499, lte: 999, label: '500-999', color: '#CB2A2F' },
              { gt: 99, lte: 499, label: '100-499', color: '#CB5A4E' },
              { gt: 9, lte: 99, label: '10-99', color: '#F59E83' },
              { gt: 0, lte: 9, label: '1-9', color: '#FDEBCF' }, // (]
              { value: 0, label: '0', color: '#FFF' } // [0]
            ]
          }
        }
        if (mapName === 'china') {
          this.myChart.on('click', this.clickHandler)
        } else {
          this.myChart.off('click', this.clickHandler)
        }
        this.myChart.setOption(option)
      })
    },
    clickHandler(params) {
      const data = this._searchCityNcovData(params.name)

      this._renderMap(params.name, this._transformNcovData(data, false))
    },
    _transformNcovData(list, isProvince = true) {
      return list.map(item => {
        return {
          name: isProvince ? item.provinceShortName : item.cityName,
          value: item.confirmedCount,
          allName: isProvince ? item.provinceName : ''
        }
      })
    }
  }
}
</script>

<style>
#chart_example {
  width: 80%;
  height: 800px;
  border: 1px solid red;
  margin: 0 auto;
}
</style>
