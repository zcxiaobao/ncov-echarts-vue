import * as types from './mutation-types.js'
const mutations = {
  [types.SET_NCOV_DATA](state, ncovData) {
    state.ncovData = ncovData
  },
  [types.SET_YES_NCOV_DATA](state, yesNcovData) {
    state.yesNcovData = yesNcovData
  },
  [types.SET_MAP_DATA](state, mapData) {
    state.mapData = mapData
  },
  [types.SET_IS_PROVINCE](state, isProvince) {
    state.isProvince = isProvince
  },
  [types.SET_AREA](state, area) {
    state.area = area
  },
  [types.SET_NCOV_DETAIL_DATA](state, ncovDetailData) {
    state.ncovDetailData = ncovDetailData
  }
}
export default mutations
