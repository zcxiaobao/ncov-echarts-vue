/*
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-03-18 16:46:00
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-03-31 20:51:25
 */
import echarts from 'echarts'
import elementResizeDetectorMaker from 'element-resize-detector'
const showLoadingObj = {
  text: '正在加载中',
  color: '#25b5cd',
  textColor: '#25b5cd',
  maskColor: 'rgba(138,206,254,0.3)',
  zlevel: 0
}
export const drawChart = async self => {
  self.myChart.showLoading('default', showLoadingObj)
  self.setOptionText()
  if (!self.mapData) {
    return
  }
  if (self.isNeedAssist) {
    if (self.assistData) {
      self.setSeriesDataByAssist(self.mapData, self.assistData)
    }
  } else {
    if (self.mapData) {
      self.setSeriesData(self.mapData)
    }
  }
}
export const workflow = self => {
  self.myChart = echarts.init(self.$refs.chart)
  drawChart(self)
  window.addEventListener('resize', () => self.myChart.resize())
  elementResizeDetectorMaker().listenTo(self.$refs.chart, () =>
    self.myChart.resize()
  )
}

export const drawChart2 = async self => {
  self.myChart.showLoading('default', showLoadingObj)
  self.setOptionText()
  if (
    !self.mapData ||
    (Array.isArray(self.mapData) && self.mapData.length < 1)
  ) {
    return
  }
  self.setSeriesData(self.mapData)
}
export const workflow2 = self => {
  self.myChart = echarts.init(self.$refs.chart)
  drawChart2(self)
  window.addEventListener('resize', () => self.myChart.resize())
  elementResizeDetectorMaker().listenTo(self.$refs.chart, () =>
    self.myChart.resize()
  )
}
