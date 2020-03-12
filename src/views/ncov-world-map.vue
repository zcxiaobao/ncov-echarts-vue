<template>
  <div class="ncov-map-wrapper">
    <tab :tabs="tabs" :activeTab="activeTab" @tab-toggle="tabToggle"></tab>
    <div id="ncov-map" ref="ncov"></div>
  </div>
</template>
 <script>
import echarts from 'echarts'
import api from '@/api/api.js'
import Tab from '@/components/tab/tab'
import { buildMapOptions } from '@/assets/js/map-option.js'
import { buildWorldMapOption } from '@/assets/js/map-world-option.js'
import { otherArea } from '@/assets/js/config'
import Loading from '@/components/loading/loading.vue'

let ncovMap = null
export default {
  data() {
    return {
      tabs: [
        { label: '世界', name: 'world' },
        { label: '意大利', name: 'italy' },
        { label: '伊朗', name: 'iran' },
        { label: '韩国', name: 'korea' },
        { label: '日本', name: 'japan' }
        // { label: '中国', name: 'china' }
      ],
      activeTab: 'world',
      ncovWorldData: []
    }
  },
  created() {
    api.getAreaData().then(({ areaTree }) => {
      this.ncovWorldData = areaTree
    })
    api.getAreaMapData('iran').then(({ features }) => {
      console.log(features)
      const names = features.map(city => city.properties.name)
      console.log(names)
    })
  },
  watch: {
    ncovWorldData(newWorldData) {
      setTimeout(() => {
        this._renderMap(
          'world',
          this._transformNcovData(this.ncovWorldData, 'world')
        )
      }, 20)
    },
    activeTab(newActiveTab) {
      this._renderMap(
        newActiveTab,
        this._transformNcovData(this.ncovWorldData, newActiveTab)
      )
    }
  },
  mounted() {
    setTimeout(() => {
      this._initEcharts()
      ncovMap.showLoading()
    }, 20)
  },
  methods: {
    tabToggle(tab) {
      this.activeTab = tab.name
    },
    _initEcharts() {
      ncovMap = echarts.init(this.$refs.ncov)
    },
    _renderMap(area, data) {
      if (data.length <= 0) {
        return
      }
      api.getAreaMapData(area).then(res => {
        echarts.registerMap(area, res)
        const option = buildWorldMapOption(area, data)
        ncovMap.setOption(option)
        ncovMap.hideLoading()
      })
    },
    _transformNcovData(list, area) {
      if (area === otherArea.world) {
        return this._normallizaData(list)
      } else {
        const label = this.tabs[this.tabs.findIndex(tab => tab.name === area)]
          .label
        const index = list.findIndex(country => country.name === label)
        return this._normallizaData(list[index].children)
      }
    },
    _normallizaData(list) {
      return list.map(item => {
        const label = {}
        if (item.total.confirm >= 0) {
          if (item.total.confirm >= 1000) {
            label.color = '#fff'
            label.show = true
          }
          if (otherArea.world !== this.activeTab) {
            label.show = true
          }
        }
        return {
          name: item.name,
          value: item.total.confirm, // 累计确诊
          currentConfirmedCount:
            item.total.confirm - item.total.heal - item.total.dead, // 现存确诊
          curedCount: item.total.heal, // 治愈
          deadCount: item.total.dead, // 死亡
          label
        }
      })
    }
  },
  components: {
    Tab
  }
}
</script>
<style lang="less" scoped>
.ncov-map-wrapper {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  left: 0;
}
#ncov-map {
  position: absolute;
  top: 48px;
  width: 100%;
  bottom: 0;
}
</style>
