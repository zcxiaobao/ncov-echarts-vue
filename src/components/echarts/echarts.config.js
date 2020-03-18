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
  const resData = await self.seriesDataPromise
  self.setSeriesData(resData)
  self.myChart.setOption(self.option)
  self.myChart.hideLoading()
}
export const workflow = self => {
  self.myChart = echarts.init(self.$refs.chart)
  drawChart(self)
  window.addEventListener('resize', () => self.myChart.resize())
  elementResizeDetectorMaker().listenTo(self.$refs.chart, () =>
    self.myChart.resize()
  )
}
