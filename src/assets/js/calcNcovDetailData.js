const calcChinaData = function (ncov) {
  const china = {
    confirmedCount: 0,
    curedCount: 0,
    currentConfirmedCount: 0,
    deadCount: 0
  }
  ncov.forEach(data => {
    china.confirmedCount += data.confirmedCount
    china.curedCount += data.curedCount
    china.currentConfirmedCount += data.currentConfirmedCount
    china.deadCount += data.deadCount
  })
  return china
}
const calcDetailData = function (data, oldData) {
  const confirmedCount = data.confirmedCount - oldData.confirmedCount
  const curedCount = data.curedCount - oldData.curedCount
  const currentConfirmedCount = data.currentConfirmedCount - oldData.currentConfirmedCount
  const deadCount = data.deadCount - oldData.deadCount
  return {
    now: data,
    trend: {
      confirmedCount: confirmedCount > 0 ? `+${confirmedCount}` : confirmedCount,
      curedCount: curedCount > 0 ? `+${curedCount}` : curedCount,
      currentConfirmedCount: currentConfirmedCount > 0 ? `+${currentConfirmedCount}` : currentConfirmedCount,
      deadCount: deadCount > 0 ? `+${deadCount}` : deadCount
    }
  }
}
export const detailDataList = (now, yes) => {
  const ncovData = [...now]
  const yesNcovData = [...yes]
  const obj = {
    中国: calcDetailData(calcChinaData(ncovData), calcChinaData(yesNcovData))
  }
  ncovData.forEach(province => {
    const index = yesNcovData.findIndex(pro => {
      return province.locationId === pro.locationId
    })
    if (index !== undefined) {
      obj[province.provinceShortName] = calcDetailData(province, yesNcovData[index])
    } else {
      obj[province.provinceShortName] = {
        now: province,
        trend: province
      }
    }
  })
  return obj
}
