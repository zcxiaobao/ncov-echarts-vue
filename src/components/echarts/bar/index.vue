<!--
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-03-31 09:57:25
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-03-31 21:33:01
 -->
<template>
  <div class="bar-item" id="bar-item" ref="chart"></div>
</template>

<script>
import { workflow, drawChart } from '../echarts.config'
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
    }
  },
  methods: {
    setOptionText() {
      this.option.dataset.dimensions = this.textData.dimensions
    },
    setOptionRem() {
      const { legend, xAxis, yAxis } = this.option
      this.option.xAxis.axisLabel.fontSize = rem2px(xAxis.axisLabel.fontSize)
      this.option.yAxis.axisLabel.fontSize = rem2px(yAxis.axisLabel.fontSize)
    },
    setSeriesData(data) {
      this.setOptionRem()
      this.option.series = [
        {
          name,
          type: 'bar',
          barMaxWidth: 30
        }
      ]
      this.option.dataset.source = data
      this.myChart.setOption(this.option)
      this.myChart.hideLoading()
    }
  },
  mounted() {
    workflow(this)
  },
  watch: {
    mapData(newOption) {
      drawChart(this)
    }
  }
}
</script>

<style scoped lang='less'>
</style>
