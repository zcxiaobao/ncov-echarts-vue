/*
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-03-20 13:35:48
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-03-26 17:11:20
 */
export default () => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter(params) {
        if (!params.value) {
          return `地区: ${params.name}
                    <br/>暂无数据`
        }
        return `地区: ${params.name}
                <br/>累计确诊: ${params.data.confirm}
                <br/>现存确诊: ${params.data.current}
                <br/>累计治愈: ${params.data.heal}
                <br/>累计死亡: ${params.data.dead}`
      }
    },
    series: [
      {
        type: 'map',
        map: '',
        name: '累计确诊',
        label: {
          show: true,
          position: 'inside',
          align: 'center',
          fontSize: '0.12rem'
        },
        data: null,
        top: '12%',
        left: '3%',
        bottom: '18%',
        right: '3%'
      }
    ],
    visualMap: {
      // 左下角的颜色区域
      type: 'piecewise', // 定义为分段型 visualMap
      min: 0,
      max: 100000,
      itemWidth: '0.15rem',
      itemHeight: '0.10rem',
      bottom: '0.10rem',
      left: '0.20rem',
      textStyle: {
        fontSize: '0.16rem'
      }
    }
  }
  return option
}
