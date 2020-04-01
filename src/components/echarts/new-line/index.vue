<!--
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-03-31 20:37:27
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-04-01 17:19:44
 -->
<template>
  <div class="line-item" id="line-item" ref="chart"></div>
</template>

<script>
import { workflow, drawChart, workflow2, drawChart2 } from '../echarts.config'
import { rem2px } from '@/assets/js/util.js'
import getOption from './option'
const line = null
export default {
  data() {
    return {
      option: getOption()
    }
  },
  props: {
    textData: {
      type: Object,
      required: true
    },
    mapData: {
      type: Array,
      default: null
    },
    isPercent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setOptionText() {
      this.textData.legend && (this.option.legend.data = this.textData.legend)
      this.textData.color && (this.option.color = this.textData.color)
      this.textData.dimensions &&
        (this.option.dataset.dimensions = this.textData.dimensions)
    },

    initYAxis() {
      this.option.yAxis.axisLabel.formatter = '{value} %'
    },
    setOptionRem() {
      const { legend, xAxis, yAxis } = this.option
      this.option.legend.textStyle.fontSize = rem2px(legend.textStyle.fontSize)
      this.option.legend.itemWidth = rem2px(legend.itemWidth)
      this.option.legend.itemHeight = rem2px(legend.itemHeight)
      this.option.xAxis.axisLabel.fontSize = rem2px(xAxis.axisLabel.fontSize)
      this.option.yAxis.axisLabel.fontSize = rem2px(yAxis.axisLabel.fontSize)
    },
    setSeriesData(data) {
      if (this.isPercent) {
        this.initYAxis()
      }
      this.setOptionRem()
      const { legend } = this.option
      const seriesObj = {
        type: 'line',
        lineStyle: {
          width: 5
        },
        symbolSize: 6,
        smooth: true
      }
      if (legend && legend.data && legend.data.length > 0) {
        this.option.series = this.option.legend.data.map(name => ({
          name,
          ...seriesObj
        }))
      } else {
        this.option.legend.show = false
        this.option.series = [seriesObj]
      }
      this.option.dataset.source = data
      this.myChart.setOption(this.option)
      this.myChart.hideLoading()
    }
  },
  mounted() {
    workflow2(this)
  },
  watch: {
    mapData(newOption) {
      drawChart2(this)
    }
  }
}
</script>

<style scoped lang='less'>
</style>
