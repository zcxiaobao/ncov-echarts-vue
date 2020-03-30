/*
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-03-30 22:08:06
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-03-30 22:11:08
 */
import jsonp from '@/assets/js/jsonp'

export const getChinaDisease = () => {
  return jsonp('https://view.inews.qq.com/g2/getOnsInfo', {
    _: `${+new Date()}`,
    name: 'disease_other'
  })
}
