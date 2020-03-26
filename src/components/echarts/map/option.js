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
          fontSize: '0.16rem'
        },
        data: null,
        top: '5%',
        left: '8%',
        bottom: '20%',
        right: '5%'
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
        fontSize: '0.20rem'
      }
    }
  }
  return option
}
