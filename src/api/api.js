import axios from '@/axios.js'
import { getDate } from '@/assets/js/util.js'
import jsonp from '@/assets/js/jsonp'
const provinces = {
  // 23个省
  中国: 'china',
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
axios.jsonp = (url, callback = 'callback') => {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!')
    return
  }
  return new Promise((resolve, reject) => {
    window[callback] = result => {
      resolve(result)
    }
    var JSONP = document.createElement('script')
    JSONP.type = 'text/javascript'
    JSONP.src = `${url}&callback=${callback}`
    document.getElementsByTagName('head')[0].appendChild(JSONP)
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP)
    }, 500)
  })
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
    console.log(province)
    if (province === '中国') {
      return axios.get('json/map/china.json')
    } else if (province === 'world') {
      return axios.get('json/map/world.json')
    } else {
      return axios.get(`json/map/province/${provinces[province]}.json`)
    }
  },
  getAreaMapData(area) {
    return axios.get(`json/map/${area}.json`)
  },
  getAllCitiesData() {
    const allCities = localStorage.getItem('allCities')
    if (allCities) {
      return Promise.resolve(JSON.parse(allCities))
    }
    return axios.get('json/map/china-cities.json')
  },
  getByDateJson() {
    const byDate = localStorage.getItem('byDate')
    if (byDate) {
      return Promise.resolve(JSON.parse(byDate))
    }
    return axios.get('json/by_date.json')
  },
  getAreaData() {
    return axios.get('json/data/world-area.json')
  },
  getChinaTotalData() {
    return axios.get('json/data/list-total.json')
  },
  getRegionData(locationId = 420000) {
    return axios.get(`json/data/wangyi/${locationId}.json`)
  },
  getNormalList() {
    return axios.get('json/data/wangyi/normal-list.json')
  },
  getVirusReport() {
    return axios.jsonp(
      `https://ent.163.com/special/00035080/virus_report_data.js?_=${+new Date()}`
    )
  },
  getIpLoc() {
    return jsonp(
      'https://ipservice.3g.163.com/ip',
      { _: `${+new Date()}` }
      // { prefix: 'Zepto', name: 'Zepto' + +new Date() }
    )
  }
}
export default api
