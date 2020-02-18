<template>
  <div id="chart_example" ref="ncov"></div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import '@/assets/js/data.js'
import api from '@/api/api.js'
export default {
  data() {
    return {
      ncovData: []
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
      this._renderMap('中国', this._transformNcovData(this.ncovData))
    }, 20)
  },
  methods: {
    _initEcharts() {
      this.myChart = echarts.init(this.$refs.ncov)
      this.myChart.on('click', params => {
        const data = this._searchCityNcovData(params.name)
        this._renderMap(params.name, this._transformNcovData(data, false))
      })
    },
    _searchCityNcovData(provinceName) {
      const index = this.ncovData.findIndex(
        province => province.provinceShortName === provinceName
      )
      return this.ncovData[index].cities
    },
    _renderMap(mapName, data) {
      const option = {
        title: {
          show: true,
          text: '疫情累计确诊地图',
          top: '10%',
          left: 'center'
        },
        tooltip: {
          formatter(params) {
            return `地区: ${params.name}
                    <br/>累计确诊: ${params.value}`
          }
        },
        series: [
          {
            type: 'map',
            map: mapName === '湖北' ? 'hubei' : mapName,
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
            { gt: 10000, label: '>10000', color: '#4F070D' },
            {
              gt: 1000,
              lte: 10000,
              label: '1000-10000',
              color: '#811C24'
            },
            { gt: 500, lte: 999, label: '500-999', color: '#CB2A2F' },
            { gt: 100, lte: 499, label: '100-499', color: '#CB5A4E' },
            { gt: 10, lte: 99, label: '10-99', color: '#F59E83' },
            { gt: 0, lte: 9, label: '1-9', color: '#FDEBCF' }, // (]
            { value: 0, label: '0', color: '#FFF' } // [0]
          ]
        }
      }
      this.myChart.setOption(option)
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
