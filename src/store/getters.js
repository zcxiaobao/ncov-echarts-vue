// const calcChinaData = function (ncov) {
//   const china = {
//     confirmedCount: 0,
//     curedCount: 0,
//     currentConfirmedCount: 0,
//     deadCount: 0
//   }
//   ncov.forEach(data => {
//     china.confirmedCount += data.confirmedCount
//     china.curedCount += data.curedCount
//     china.currentConfirmedCount += data.currentConfirmedCount
//     china.deadCount += data.deadCount
//   })
//   return china
// }
// const calcDetailData = function (data, oldData) {
//   return {
//     now: data,
//     trend: {
//       confirmedCount: oldData.confirmedCount - data.confirmedCount,
//       curedCount: oldData.curedCount - data.curedCount,
//       currentConfirmedCount: oldData.currentConfirmedCount - data.currentConfirmedCount,
//       deadCount: oldData.deadCount - data.deadCount
//     }
//   }
// }
export const ncovData = state => {
  return state.ncovData.map(province => {
    province.cities.map(city => {
      if (city.cityName === '待明确地区') {
        city.cityName = '待明确地区 - ' + province.provinceShortName
      }
      return city
    })
    return province
  })
}

export const ncovDetailData = (state) => state.ncovDetailData
export const mapData = state => state.mapData
export const nowRegion = state => state.nowRegion
export const isProvince = state => state.isProvince
// export const ncovData = state => state.ncovData
export const yesNcovData = state => state.yesNcovData
