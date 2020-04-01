/*
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-03-30 22:08:06
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-04-01 17:22:48
 */
import jsonp from '@/assets/js/jsonp'

export const getChinaDisease = () => {
  return jsonp('https://view.inews.qq.com/g2/getOnsInfo', {
    _: `${+new Date()}`,
    name: 'disease_other'
  })
}

export const getForeignDisease = () => {
  return jsonp('https://view.inews.qq.com/g2/getOnsInfo', {
    _: `${+new Date()}`,
    name: 'disease_foreign'
  })
}

export const getChinaDiseaseH5 = () => {
  return jsonp('https://view.inews.qq.com/g2/getOnsInfo', {
    _: `${+new Date()}`,
    name: 'disease_h5'
  })
}
