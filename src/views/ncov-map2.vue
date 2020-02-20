<template>
  <div class="ncov-map-wrapper">
    <!-- <div id="stacked-column" ref="stackedColumn"></div> -->
    <div id="ncov-map" ref="ncov"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import api from '@/api/api.js'
import { buildMapOptions } from '@/assets/js/map-option.js'
import { mapGetters, mapMutations } from 'vuex'
import { buildStackColumnOption } from '@/assets/js/stacked-column-option.js'
import { buildMixin } from '@/assets/js/mixin-option.js'
export default {
  data() {
    return {
      provinces: {
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
    }
  },
  computed: {
    ...mapGetters(['ncovData', 'mapData'])
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this._initEcharts()
    }, 20)
  },
  watch: {
    ncovData() {
      setTimeout(() => {
        this._renderMap('china', this._transformNcovData(this.ncovData))
      }, 20)
    }
    // mapData(newMapData) {
    //   const option = buildStackColumnOption(newMapData)
    //   this.stackedColumn.setOption(option)
    // }
  },
  methods: {
    ...mapMutations({
      setMapData: 'SET_MAP_DATA'
    }),
    _initEcharts() {
      this.ncovMap = echarts.init(this.$refs.ncov)
      // this.stackedColumn = echarts.init(this.$refs.stackedColumn)
    },
    _searchCityNcovData(provinceName) {
      const index = this.ncovData.findIndex(
        province => province.provinceShortName === provinceName
      )
      return this.ncovData[index].cities
    },
    _renderMap(province, data) {
      if (data.length <= 0) {
        return
      }
      // axios.get
      api.getProvinceData(province).then(res => {
        echarts.registerMap(province, res)
        // this.setMapData(data)
        const option = buildMixin(province, data)
        this.ncovMap.setOption(option)
        if (province === 'china') {
          this.ncovMap.on('click', 'series.map', this.clickHandler)
          this.ncovMap.off('contextmenu', 'series.map', this.contextMenuHandler)
        } else {
          this.ncovMap.off('click', 'series.map', this.clickHandler)
          this.ncovMap.on('contextmenu', 'series.map', this.contextMenuHandler)
        }
      })
    },
    clickHandler(params) {
      const data = this._searchCityNcovData(params.name)
      this._renderMap(params.name, this._transformNcovData(data, false))
    },
    contextMenuHandler(params) {
      params.event.event.stopPropagation()
      params.event.event.preventDefault()
      this._renderMap('china', this._transformNcovData(this.ncovData))
    },
    _transformNcovData(list, isProvince = true) {
      return list.map(item => {
        const label = {}
        if (item.confirmedCount >= 1000) {
          label.color = '#fff'
        }
        return {
          name: isProvince ? item.provinceShortName : item.cityName,
          value: item.confirmedCount, // 累计确诊
          currentConfirmedCount: item.currentConfirmedCount, // 现存确诊
          curedCount: item.curedCount, // 治愈
          deadCount: item.deadCount, // 死亡
          allName: isProvince ? item.provinceName : '',
          label
        }
      })
    }
  }
}
</script>

<style>
#ncov-map {
  width: 80%;
  height: 800px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
#stacked-column {
  width: 100%;
  height: 800px;
  /* border: 1px solid #f00; */
}
</style>
