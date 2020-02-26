<template>
  <div class="ncov-map-wrapper">
    <div id="ncov-map" ref="ncov"></div>
    <div class="loading-container" v-show="!ncovWorldData.length">
      <loading title="地图加载中" />
    </div>
  </div>
</template>
 <script>
import echarts from 'echarts'
import api from '@/api/api.js'
import { buildMapOptions } from '@/assets/js/map-option.js'
import { buildWorldMapOption } from '@/assets/js/map-world-option.js'
import Loading from '@/components/loading/loading.vue'

let ncovMap = null
export default {
  data() {
    return {
      region: 'world',
      ncovWorldData: []
    }
  },
  created() {
    api.getAreaData().then(res => {
      this.ncovWorldData = res
    })
  },
  watch: {
    ncovWorldData(newWorldData) {
      setTimeout(() => {
        this._initEcharts()
        this._renderMap('world', this._transformNcovData(this.ncovWorldData))
      }, 20)
    }
  },
  mounted() {
    setTimeout(() => {
      this._initEcharts()
      this._renderMap('world', this._transformNcovData(this.ncovWorldData))
    }, 20)
  },
  methods: {
    _initEcharts() {
      ncovMap = echarts.init(this.$refs.ncov)
    },
    _renderMap(world, data) {
      if (data.length <= 0) {
        return
      }
      api.getProvinceData(world).then(res => {
        console.log(res)
        echarts.registerMap(world, res)
        const option = buildWorldMapOption(world, data)
        ncovMap.setOption(option)
      })
    },
    _transformNcovData(list) {
      return list.map(item => {
        const label = {}
        if (item.confirmedCount >= 0) {
          if (item.confirmedCount >= 1000) {
            label.color = '#fff'
          }
          label.show = true
        }
        return {
          name: item.enName,
          value: item.confirmedCount, // 累计确诊
          currentConfirmedCount: item.currentConfirmedCount, // 现存确诊
          curedCount: item.curedCount, // 治愈
          deadCount: item.deadCount, // 死亡
          label
        }
      })
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="less">
.ncov-map-wrapper {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  left: 0;
}
#ncov-map {
  width: 100%;
  height: 100%;
}
.loading-container {
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  width: 100%;
}
</style>
