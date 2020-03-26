<template>
  <div class="ncov-map-wrapper">
    <tab :activeTab="activeTab" @tab-toggle="tabToggle" :tabs="tabs" class="tab-wrap"></tab>
    <!-- <el-tabs v-model="activeTab" type="card" @tab-click="handleClick" class="ncov-tab">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.label"
        :label="tab.label"
        :name="tab.name"
        class="tab-item"
        :class="activeTab === tab.name? 'active': ''"
      ></el-tab-pane>
    </el-tabs>-->
    <div id="ncov-map" ref="ncov"></div>
  </div>
</template>
 <script>
import echarts from 'echarts'
import Tab from '@/components/tab/tab'
import api from '@/api/api.js'
import { buildMapOptions } from '@/assets/js/map-option.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { buildStackColumnOption } from '@/assets/js/stacked-column-option.js'
import { buildMixin } from '@/assets/js/mixin-option.js'

let ncovMap = null
export default {
  data() {
    return {
      tabs: [
        { label: '累计确诊', name: 'total' },
        { label: '现存确诊', name: 'now' }
      ],
      activeTab: 'total',
      chinaArea: {
        name: '中国',
        locationId: 100000
      }
    }
  },
  computed: {
    ...mapGetters(['ncovData', 'mapData', 'area', 'isProvince']),
    isTotal() {
      return this.activeTab === 'total'
    }
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this._initEcharts()
      this._renderMap(this.area, this._transformNcovData(this._getMapData()))
    }, 20)
  },
  watch: {
    ncovData() {
      setTimeout(() => {
        this._renderMap(this.area, this._transformNcovData(this._getMapData()))
      }, 20)
    },
    activeTab(newTab, oldTab) {
      if (newTab === oldTab) {
        return
      }
      setTimeout(() => {
        const data = this._getMapData()
        // this._initEcharts()
        ncovMap.clear()
        this._renderMap(this.area, this._transformNcovData(data))
      }, 20)
    }
  },
  methods: {
    ...mapActions(['alterArea']),
    ...mapMutations({
      setMapData: 'SET_MAP_DATA',
      setArea: 'SET_AREA',
      setIsProvince: 'SET_IS_PROVINCE'
    }),
    tabToggle(tab) {
      this.activeTab = tab.name
    },
    _initEcharts() {
      ncovMap = echarts.init(this.$refs.ncov)
    },
    _getMapData(provinceName) {
      if (this.isProvince) {
        const index = this.ncovData.findIndex(
          province => province.provinceShortName === this.area.name
        )
        return this.ncovData[index].cities
      }
      return this.ncovData
    },
    _renderMap(area, data) {
      if (data.length <= 0) {
        return
      }
      ncovMap.showLoading()
      api.getProvinceData(area.name).then(res => {
        echarts.registerMap(area.name, res)
        const option = buildMixin(area.name, data, this.isTotal)
        ncovMap.setOption(option)
        ncovMap.hideLoading()
        if (area.name === '中国') {
          ncovMap.on('click', this.clickHandler)
          ncovMap.off('contextmenu', this.contextMenuHandler)
        } else {
          ncovMap.off('click', this.clickHandler)
          ncovMap.on('contextmenu', this.contextMenuHandler)
        }
      })
    },
    clickHandler(params) {
      this.alterArea({
        area: { name: params.name, locationId: params.data.locationId },
        isProvince: true
      })
      const data = this._getMapData()
      // this.setArea({ name: params.name, locationId: params.data.locationId })
      this._renderMap(this.area, this._transformNcovData(data, false))
    },
    contextMenuHandler(params) {
      params.event.event.stopPropagation()
      params.event.event.preventDefault()
      this.alterArea({
        area: this.chinaArea,
        isProvince: false
      })
      this._renderMap(this.area, this._transformNcovData(this._getMapData()))
    },
    _transformNcovData(list, isProvince = true) {
      return list.map(item => {
        const label = {}
        if (
          (this.activeTab === 'total' && item.confirmedCount >= 1000) ||
          (this.activeTab === 'now' && item.currentConfirmedCount >= 1000)
        ) {
          label.color = '#fff'
        }
        return {
          name: !this.isProvince ? item.provinceShortName : item.cityName,
          value:
            this.activeTab === 'total'
              ? item.confirmedCount
              : item.currentConfirmedCount, // 累计确诊
          confirmedCount: item.confirmedCount,
          currentConfirmedCount: item.currentConfirmedCount, // 现存确诊
          curedCount: item.curedCount, // 治愈
          deadCount: item.deadCount, // 死亡
          locationId: item.locationId,
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
<style lang="less"  scoped>
.ncov-map-wrapper {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  left: 0;
  .tab-wrap {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
}
#ncov-map {
  position: absolute;
  top: 48px;
  width: 100%;
  bottom: 0;
}
</style>
