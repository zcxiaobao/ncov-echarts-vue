import axios from '@/axios.js'
import {
  getDate
} from '@/assets/js/util.js'
const provinces = {
  // 23个省
  台湾: 'taiwan',
  河北: 'hebei',
  山西: 'shanxi',
  辽宁: 'liaoning',
  吉林: 'jilin',
  黑龙江: 'heilongjiang',
  江苏: 'jiangsu',
  浙江: 'zhejiang',
  安徽: 'anhui',
  福建: 'fujian',
  江西: 'jiangxi',
  山东: 'shandong',
  河南: 'henan',
  湖北: 'hubei',
  湖南: 'hunan',
  广东: 'guangdong',
  海南: 'hainan',
  四川: 'sichuan',
  贵州: 'guizhou',
  云南: 'yunnan',
  陕西: 'shanxi1',
  甘肃: 'gansu',
  青海: 'qinghai', // 5个自治区
  新疆: 'xinjiang',
  广西: 'guangxi',
  内蒙古: 'neimenggu',
  宁夏: 'ningxia',
  西藏: 'xizang', // 4个直辖市
  北京: 'beijing',
  天津: 'tianjin',
  上海: 'shanghai',
  重庆: 'chongqing', // 2个特别行政区
  香港: 'xianggang',
  澳门: 'aomen'
}
const api = {
  getNcovData(isLatest = true) {
    const dateTime = getDate()
    let date = ''
    let ncovDateStorageName = ''
    if (isLatest) {
      date = dateTime.today
      ncovDateStorageName = 'nowNcovData'
    } else {
      date = dateTime.yestoday
      ncovDateStorageName = 'yesNcovData'
    }
    const ncovData = localStorage.getItem(ncovDateStorageName)
    if (ncovData) {
      return Promise.resolve(JSON.parse(ncovData))
    }
    return axios.get('http://api.tianapi.com/txapi/ncovcity/index', {
      params: {
        key: 'e82f86af9a0391032dc487dcce8f6b69',
        date
      }
    })
  },
  getNcovDataAll() {
    const ncovDataAll = localStorage.getItem('ncovDataAll')
    if (ncovDataAll) {
      return Promise.resolve(JSON.parse(ncovDataAll))
    }
    return axios.get('http://api.tianapi.com/txapi/ncov/index', {
      params: {
        key: 'e82f86af9a0391032dc487dcce8f6b69'
      }
    })
  },
  getProvinceData(province) {
    if (province !== 'china') {
      return axios.get(`/json/province/${provinces[province]}.json`)
    } else {
      // F:\duyiSpace\vue\echarts-vue\src\assets\common\map\json\china.json
      return axios.get('/json/china.json')
    }
  }
}
export default api
