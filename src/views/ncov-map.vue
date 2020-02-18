<template>
  <div id="chart_example" ref="ncov"></div>
</template>
<script>
import echarts from 'echarts'
// import 'echarts/map/js/china.js'
// import '@/assets/js/data.js'
import api from '@/api/api.js'
import { buildMapOptions } from '@/assets/js/map-option.js'
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
    _renderMap(province, data) {
      // axios.get
      api.getProvinceData(province).then(res => {
        echarts.registerMap(province, res)
        this.myChart.setOption(buildMapOptions(province, data))
        if (province === 'china') {
          this.myChart.on('click', this.clickHandler)
          this.myChart.off('contextmenu', this.contextMenuHandler)
        } else {
          this.myChart.off('click', this.clickHandler)
          this.myChart.on('contextmenu', this.contextMenuHandler)
        }
      })
    },
    clickHandler(params) {
      const data = this._searchCityNcovData(params.name)
      this._renderMap(params.name, this._transformNcovData(data, false))
    },
    contextMenuHandler(params) {
      console.log(params)
      params.event.event.stopPropagation()
      params.event.event.preventDefault()

      this._renderMap('china', this._transformNcovData(this.ncovData))
    },
    _transformNcovData(list, isProvince = true) {
      return list.map(item => {
        const label = {}
        if (item.confirmedCount >= 1000) {
          label.color = '#fff'
        }
        return {
          name: isProvince ? item.provinceShortName : item.cityName,
          value: item.confirmedCount,
          allName: isProvince ? item.provinceName : '',
          label
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
