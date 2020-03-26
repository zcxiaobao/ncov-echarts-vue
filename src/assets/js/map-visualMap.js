/*
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-02-18 12:18:33
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-03-26 17:18:35
 */
const chinaPieces = [
  {
    gt: 9999,
    label: '>10000',
    color: '#4F070D'
  },
  {
    gt: 999,
    lte: 10000,
    label: '1000-10000',
    color: '#811C24'
  },
  {
    gt: 499,
    lte: 999,
    label: '500-999',
    color: '#CB2A2F'
  },
  {
    gt: 99,
    lte: 499,
    label: '100-499',
    color: '#CB5A4E'
  },
  {
    gt: 9,
    lte: 99,
    label: '10-99',
    color: '#F59E83'
  },
  {
    gt: 0,
    lte: 9,
    label: '1-9',
    color: '#FDEBCF'
  },
  {
    value: 0,
    label: '0',
    color: '#FFF'
  }
]
const provincePieces = [
  {
    gt: 999,
    label: '>1000',
    color: '#4F070D'
  },
  {
    gt: 499,
    lte: 999,
    label: '500-999',
    color: '#811C24'
  },
  {
    gt: 99,
    lte: 499,
    label: '100-499',
    color: '#CB2A2F'
  },
  {
    gt: 49,
    lte: 99,
    label: '50-99',
    color: '#CB5A4E'
  },
  {
    gt: 9,
    lte: 49,
    label: '10-49',
    color: '#F59E83'
  },
  {
    gt: 0,
    lte: 9,
    label: '1-9',
    color: '#FDEBCF'
  },
  {
    value: 0,
    label: '0',
    color: '#FFF'
  }
]
export const buildVisualMap = function(province) {
  return province === 'china' || province === 'world' || province === 'italy'
    ? chinaPieces
    : provincePieces
}
