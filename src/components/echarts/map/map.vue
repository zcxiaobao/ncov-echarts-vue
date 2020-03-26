<template>
  <div class="china-map" id="china-map" ref="chart"></div>
</template>

<script>
import echarts from 'echarts'
import api from '@/api/api'
import getOption from './option.js'
import { drawChart, workflow } from '../echarts.config'
import { buildVisualMap } from '@/assets/js/map-visualMap'
import { countryNameMap } from '@/assets/js/country'
import { rem2px } from '@/assets/js/util.js'
export default {
  props: {
    mapData: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: null
    },
    area: {
      type: String,
      default: ''
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      option: getOption(),
      myChart: null
    }
  },
  mounted() {
    setTimeout(() => {
      workflow(this)
    }, 20)
  },
  methods: {
    setOptionText() {
      this.option.visualMap.pieces = buildVisualMap(this.area)
    },
    setOptionRem() {
      const { visualMap } = this.option
      this.option.visualMap.itemWidth = rem2px(visualMap.itemWidth)
      this.option.visualMap.itemHeight = rem2px(visualMap.itemHeight)
      this.option.visualMap.bottom = rem2px(visualMap.bottom)
      this.option.visualMap.left = rem2px(visualMap.left)
      this.option.visualMap.textStyle.fontSize = rem2px(
        visualMap.textStyle.fontSize
      )
    },
    setSeriesData(mapData) {
      if (!mapData.length) {
        return
      }
      this.setOptionRem()
      this.option.series[0].map = this.area
      this.option.series[0].nameMap = countryNameMap[this.area]
      this.option.series[0].label.show = this.showLabel
      this.option.series[0].label.fontSize = rem2px(
        this.option.series[0].label.fontSize
      )
      // this.option.series[0].zoom = 1.15
      this._renderMap(this.area, mapData)
    },
    _renderMap(area, mapData) {
      if (mapData.length <= 0) {
        return
      }
      api.getAreaMapData(area).then(mapJson => {
        echarts.registerMap(area, mapJson)
        this.option.series[0].data = mapData
        this.myChart.setOption(this.option)
        this.myChart.hideLoading()
      })
    }
  },
  watch: {
    mapData(newMapData) {
      this.myChart.clear()
      drawChart(this)
    }
  }
}
</script>

<style>
</style>
