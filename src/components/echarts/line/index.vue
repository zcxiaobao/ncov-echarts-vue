<template>
  <div class="line-item" id="line-item" ref="chart"></div>
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
      type: Object,
      default: null
    },
    // seriesDataPromise: {
    //   type: Promise,
    //   required: true
    // },
    isTotal: {
      type: Boolean,
      default: true
    },
    isNeedAssist: {
      type: Boolean,
      default: false
    },
    assistData: {
      type: Object,
      default: null
    }
  },
  methods: {
    setOptionText() {
      this.option.legend.data = this.textData.legend
      this.option.color = this.textData.color
      this.option.dataset.dimensions = this.textData.dimensions
    },
    initXAxis(data) {
      this.option.xAxis.data = data.chinaDayList.map(d => d.date)
    },
    setOptionRem() {
      const { legend, xAxis, yAxis } = this.option
      this.option.legend.textStyle.fontSize = rem2px(legend.textStyle.fontSize)
      this.option.xAxis.axisLabel.fontSize = rem2px(xAxis.axisLabel.fontSize)
      this.option.yAxis.axisLabel.fontSize = rem2px(yAxis.axisLabel.fontSize)
    },
    setSeriesData(data) {
      // this.initXAxis(data)
      this.setOptionRem()
      this.option.series = this.option.legend.data.map(name => ({
        name,
        type: 'line',
        lineStyle: {
          width: 5
        },
        symbolSize: 6,
        smooth: true
      }))
      const list = data.chinaDayList || data.list || []
      if (this.isTotal) {
        this.option.dataset.source = list.map(d => {
          const { confirm, suspect, heal, dead, severe } = d.total
          return {
            date: d.date,
            confirm,
            suspect,
            heal,
            dead,
            severe,
            current: confirm - heal - dead
          }
        })
      } else {
        this.option.dataset.source = list.map(d => ({
          date: d.date,
          ...d.today
        }))
      }
      this.myChart.setOption(this.option)
      this.myChart.hideLoading()
    },
    setSeriesDataByAssist(mainData, assistData) {
      this.initXAxis(mainData)
      this.setOptionRem()
      this.option.series = this.option.legend.data.map(name => ({
        name,
        type: 'line',
        lineStyle: {
          width: 5
        },
        symbolSize: 6,
        smooth: true
      }))
      this.option.dataset.source = mainData.chinaDayList.map((d, index) => {
        const chinaConfirm = d.total.confirm
        const huConfirm = assistData.list[index].total.confirm
        const chinaAddConfirm = d.today.confirm
        const huAddConfirm = assistData.list[index].today.confirm
        return {
          date: d.date,
          chinaConfirm,
          huConfirm,
          otherConfirm: chinaConfirm - huConfirm,
          chinaAddConfirm,
          huAddConfirm,
          otherAddConfirm: chinaAddConfirm - huAddConfirm
        }
      })
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
    },
    assistData() {
      if (!this.isNeedAssist) {
        return
      }
      drawChart(this)
    }
  }
}
</script>

<style scoped lang='less'>
// .line-item {
//   width: 100%;
//   height: 100%;
// }
</style>
