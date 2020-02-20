import {
  buildVisualMap
} from './map-visualMap'
export const buildMapOptions = function (province, data) {
  // const barSeriesConfig = {
  //   stack: '人数',
  //   type: 'bar',
  //   label: {
  //       position: 'inside',
  //       show: true,
  //       color: '#eee',
  //       formatter: ({ data }) => {
  //         return data[0] > 0 ? data[0] : '';
  //       }
  //   },
  //   barMaxWidth: 30,
  // };

  // const config = {
  //   baseOption: {
  //     tooltip: {
  //       show: true,
  //       trigger: 'item',
  //     },
  //     grid: [{
  //         top: 10,
  //         width: '100%',
  //         left: 10,
  //         containLabel: true
  //       }
  //     ],
  //     xAxis: [
  //       {
  //         type: 'value',
  //         axisLine: { show: false, },
  //         axisTick: { show: false, },
  //         axisLabel: { show: false, },
  //         splitLine: { show: false,},
  //       }
  //     ],
  //     yAxis: [
  //       {
  //         type: 'category',
  //         axisLabel: {
  //           show: true,
  //           interval: 0,
  //         },
  //         axisTick: { show: false, },
  //         axisLine: { show: false, },
  //       }
  //     ],
  //     visualMap: [
  //       {
  //         type: 'piecewise',
  //         pieces: visualPieces,
  //         left: 'auto',
  //         right: 30,
  //         bottom: 100,
  //         seriesIndex: 0,
  //       }
  //     ],
  //     series: [
  //       {
  //         name: '',
  //         type: 'map',
  //         mapType: mapName,
  //         label: {
  //           show: true,
  //         },
  //         left: hideBarChart ? 'center' : '30%',
  //         tooltip: {
  //           formatter: ({ name, data }) => {
  //             if (data) {
  //               const { name, value, confirmed, dead, cured, increased } = data;
  //               const tip = `<b>${name}</b><br />确诊人数：${confirmed}<br />治愈人数：${cured}<br />死亡人数：${dead}<br />新增确诊：${increased}`;
  //               return tip;
  //             }
  //             return `<b>${name}</b><br />暂无数据`;
  //           },
  //         },
  //         z: 1000,
  //       }
  //     ].concat((hideBarChart ? [] : [
  //       {
  //         name: '治愈',
  //         color: 'rgb(64,141,39)',
  //       },
  //       {
  //         name: '死亡',
  //         color: 'gray',
  //       },
  //       {
  //         name: '治疗',
  //         color: 'rgb(224,144,115)',
  //       }
  //     ].map(c => {
  //       return Object.assign({}, barSeriesConfig, c);
  //     })))
  //   },
  //   options: data.map(d => {
  //     d.records.sort((a ,b) => a.confirmedCount < b.confirmedCount ? -1 : 1);
  //     return {
  //       series: [
  //         {
  //           title: {
  //             text: d.day,
  //           },
  //           data: d.records.map(r => {
  //             return {
  //               name: r.showName,
  //               province: r.name,
  //               value: r[valueKey],
  //               confirmed: r.confirmedCount,
  //               dead: r.deadCount,
  //               cured: r.curedCount,
  //               increased: r.confirmedIncreased,
  //             };
  //           }),
  //         },
  //       ].concat(hideBarChart ? [] : [ 'cured', 'dead', 'insick' ].map(k => {
  //         return {
  //           data: d.records.map(r => {
  //             return [ r[k + 'Count'], r.showName || r.name ];
  //           })
  //         };
  //       }))
  //     };
  //   })
  // };
  const option = {
    baseOption: {
      title: {
        show: true,
        text: '疫情累计确诊地图',
        top: '8%',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter(params) {
          return `地区: ${params.name}
                <br/>累计确诊: ${params.value ? params.value : 0}`
        }
      },
      series: [{
        type: 'map',
        map: province,
        name: '累计确诊',
        center: province === '海南' ? [109.844902, 19.0392] : province === 'china' ? [104.114129, 37.550339] : undefined,
        zoom: province === '海南' ? 6 : 1,
        label: {
          normal: {
            show: true,
            position: 'inside',
            align: 'center'
          }
        },
        data
      }],
      visualMap: {
        // 左下角的颜色区域
        type: 'piecewise', // 定义为分段型 visualMap
        min: 0,
        max: 100000,
        itemWidth: 40,
        bottom: 60,
        right: 20,
        pieces: buildVisualMap(province)
      }
    },
    options: []
  }
  return option
}
