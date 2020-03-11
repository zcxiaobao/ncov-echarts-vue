import * as types from './mutation-types'
export const alterArea = ({ commit }, { area, isProvince }) => {
  commit(types.SET_AREA, area)
  commit(types.SET_IS_PROVINCE, isProvince)
}
