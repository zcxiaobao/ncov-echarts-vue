<template>
  <div class="china-map" id="china-map" ref="chinaMap"></div>
</template>

<script>
import echarts from 'echarts'
import api from '@/api/api'
import { buildMapOptions } from './option.js'
let map = null
export default {
  props: {
    mapData: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    area: {
      type: String,
      default: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this._initMap()
    }, 20)
  },
  methods: {
    _initMap() {
      map = echarts.init(this.$refs.chinaMap, 'light')
    },
    _renderMap(area, mapData) {
      if (mapData.length <= 0) {
        return
      }
      map.showLoading()
      api.getAreaMapData(area).then(mapJson => {
        echarts.registerMap(area, mapJson)
        const option = buildMapOptions(area, mapData)
        map.setOption(option)
        map.hideLoading()
      })
    }
  },
  watch: {
    mapData(newMapData) {
      map.clear()
      this._renderMap(this.area, newMapData)
    }
  }
}
</script>

<style>
</style>
