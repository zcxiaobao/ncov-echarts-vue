<template>
  <div class="ncov-map-wrapper">
    <div id="ncov-map" ref="ncovAllCities"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import api from '@/api/api.js'
import { buildAllCitiesOption } from '@/assets/js/map-all-cities.js'
let allCitiesEcharts = null
export default {
  data() {
    return {
      allCitiesTimeData: []
    }
  },
  created() {
    // api.getByDateJson().then(res => {
    //   console.log(res)
    // })
  },
  mounted() {
    this._initEcharts()
    api.getByDateJson().then(records => {
      localStorage.setItem('byDate', JSON.stringify(records))
      this.$nextTick(() => {
        this._renderMap('china-cities', records)
      })
    })
  },
  methods: {
    _initEcharts() {
      allCitiesEcharts = echarts.init(this.$refs.ncovAllCities)
      // const option = buildAllCitiesOption(this.)
    },
    _renderMap(province, data) {
      if (data.length <= 0) {
        return
      }
      api.getAllCitiesData().then(mapJson => {
        echarts.registerMap(province, mapJson)
        const option = buildAllCitiesOption(province, data)
        // this.setMapData(data)
        allCitiesEcharts.setOption(option)
      })
    }
  }
}
</script>

<style>
.ncov-map-wrapper {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
