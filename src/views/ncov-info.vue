<template>
  <el-row class="ncov-info">
    <div class="info-detail">
      <el-tabs v-model="activeInfo" type="card" @tab-click="infoTabToggle">
        <el-tab-pane label="全国疫情数据(含港澳台)" name="china">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <data-detail title="累计确诊" :data="chinaInfo.confirm" clsType="confirm"></data-detail>
            </el-col>
            <el-col :span="8">
              <data-detail title="累计死亡" :data="chinaInfo.dead" clsType="dead"></data-detail>
            </el-col>
            <el-col :span="8">
              <data-detail title="累计治愈" :data="chinaInfo.heal" :isNeedBorder="false" clsType="heal"></data-detail>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <data-detail title="现有确诊" :data="chinaInfo.current" clsType="current"></data-detail>
            </el-col>
            <el-col :span="8">
              <data-detail title="现有重症" :data="chinaInfo.severe" clsType="suspect"></data-detail>
            </el-col>
            <el-col :span="8">
              <data-detail
                title="现有疑似"
                :data="chinaInfo.suspect"
                :isNeedBorder="false"
                clsType="severe"
              ></data-detail>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="疫情数据" name="local">山东</el-tab-pane>
      </el-tabs>
    </div>
    <div class="china-map-wrap">
      <div class="map-title">中国疫情</div>
      <tab :activeTab="activeMapTab" @tab-toggle="mapTabToggle" :tabs="mapTabs" class="tab-wrap"></tab>
      <div class="china-map" id="china-map" ref="chinaMap"></div>
    </div>
    <!-- <el-row type="flex" justify="center" class="ncov-detail-wrapper">
      <el-col :span="16" class="ncov-detail">
        <el-row type="flex" justify="space-around">
          <el-col :span="4">
            <el-card :body-style="{ padding: '10px' }" shadow="never">
              <div class="detail-title">现有确诊</div>
              <div class="detail-number now-confirm">-</div>
              <div class="detail-trend">
                昨日
                <span class="now-confirm"></span>
              </div>
            </el-card>
          </el-col>%%
          <el-col :span="4">
            <el-card :body-style="{ padding: '10px' }" shadow="never">
              <div class="detail-title">累计确诊</div>
              <div class="detail-number total-confirm">-</div>
              <div class="detail-trend">
                昨日
                <span class="total-confirm"></span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '10px' }" shadow="never">
              <div class="detail-title">累计治愈</div>
              <div class="detail-number total-curd">-</div>
              <div class="detail-trend">
                昨日
                <span class="total-curd"></span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '10px' }" shadow="never">
              <div class="detail-title">累计死亡</div>
              <div class="detail-number total-dead">-</div>
              <div class="detail-trend">
                昨日
                <span class="total-dead"></span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>-->
    <!-- <el-row class="table-wrapper">
        <el-table
          ref="ncovTable"
          v-show="ncovData.length"
          :data="ncovData"
          style="width: 100%;margin-bottom: 20px;"
          :row-key="rowKeyId"
          @expand-change="expandChange"
          :tree-props="{children: 'cities', hasChildren: 'hasCities'}"
          :cell-style="{padding: '6px 0'}"
        >
          <el-table-column label="地区" width="180" :formatter="formatTableShow">
            <template slot-scope="scope">{{ scope.row.provinceShortName || scope.row.cityName }}</template>
          </el-table-column>
          <el-table-column
            prop="confirmedCount"
            label="现存确诊"
            width="180"
            :formatter="formatTableShow"
          ></el-table-column>
          <el-table-column
            prop="currentConfirmedCount"
            label="累计确诊"
            width="180"
            :formatter="formatTableShow"
          ></el-table-column>
          <el-table-column prop="deadCount" label="死亡" :formatter="formatTableShow"></el-table-column>
          <el-table-column prop="curedCount" label="治愈" :formatter="formatTableShow"></el-table-column>
        </el-table>
        <div class="loading-container" v-show="!ncovData.length">
          <loading />
        </div>
    </el-row>-->
  </el-row>
  <!-- </div> -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Loading from '@/components/loading/loading.vue'
import Tab from '@/components/tab/tab'
import DataDetail from '@/components/data-detail/data-detail'
import api from '@/api/api.js'
import echarts from 'echarts'
import { dataDetailEnum } from '@/assets/js/config'
import { buildMapOptions } from '@/assets/js/map-option.js'

let map = ''
export default {
  data() {
    return {
      chinaInfo: {
        confirm: { total: '-', today: '-' },
        suspect: { total: '-', today: '-' },
        heal: { total: '-', today: '-' },
        dead: { total: '-', today: '-' },
        current: { total: '-', today: '-' },
        severe: { total: '-', today: '-' }
      },
      activeInfo: 'china',
      chinaMapData: [],
      mapTabs: [
        { label: '累计确诊', name: 'total' },
        { label: '现存确诊', name: 'now' }
      ],
      activeMapTab: 'total'
    }
  },
  created() {
    this._getChinaTotalData()
  },
  mounted() {
    setTimeout(() => {
      this._initMap()
    }, 20)
  },
  computed: {},
  methods: {
    mapTabToggle(tab) {
      this.activeMapTab = tab.name
    },
    infoTabToggle(tab) {
      this.activeInfo = tab.name
    },
    _initMap() {
      map = echarts.init(this.$refs.chinaMap, 'light')
    },
    _getChinaTotalData() {
      api.getChinaTotalData().then(({ data }) => {
        this._normallizeData(data.chinaTotal)
        const chinaIndex = data.areaTree.findIndex(area => area.name === '中国')
        this.chinaMapData =
          chinaIndex !== -1 ? data.areaTree[chinaIndex].children : []
      })
    },
    _renderMap(area, mapData) {
      if (mapData.length <= 0) {
        return
      }
      // map.showLoading()
      api.getAreaMapData(area).then(mapJson => {
        echarts.registerMap(area, mapJson)
        const option = buildMapOptions(area, mapData)
        map.setOption(option)
        // map.hideLoading()
      })
    },
    _normallizeData({ today, total }) {
      const res = []
      Object.keys(dataDetailEnum).forEach(d => {
        let tmp = {}

        tmp =
          d === 'current'
            ? {
                total: total.confirm - total.dead - total.heal,
                today: (today.storeConfirm > 0 ? '+' : '') + today.storeConfirm
              }
            : {
                total: total[d],
                today: (today[d] > 0 ? '+' : '') + today[d]
              }
        this.$set(this.chinaInfo, d, tmp)
      })
      return res
    },
    _transformChinaMapData(list) {
      return list.map(area => {
        const { confirm, heal, dead } = area.total
        const current = confirm - heal - dead
        return {
          name: area.name,
          value: this.activeMapTab === 'total' ? confirm : current,
          confirm,
          heal,
          dead,
          current
        }
      })
    }
  },
  watch: {
    chinaMapData(newMapData) {
      this._renderMap('china', this._transformChinaMapData(newMapData))
    },
    activeMapTab(newMapTab, oldMapTab) {
      if (newMapTab === oldMapTab) {
        return
      }
      setTimeout(() => {
        map.clear()
        this._renderMap('china', this._transformChinaMapData(this.chinaMapData))
      }, 20)
    }
  },
  components: {
    DataDetail,
    Tab
  }
}
</script>

<style lang='less' scoped>
.ncov-info {
  position: absolute;
  width: 750px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  min-width: 750px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  top: 60px;
  .info-detail {
    width: 100%;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    /deep/ .el-tabs--card > .el-tabs__header {
      .el-tabs__nav {
        border: none;
        width: 100%;
        overflow: hidden;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
      }
      .el-tabs__item {
        height: 80px;
        width: 50%;
        color: #333;
        text-align: center;
        background: #f1f1f1;
        font: 26px/80px -apple-system-font, system-ui, -apple-system, Segoe UI,
          Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue,
          PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei,
          Arial;
        &.is-active {
          background-color: #fff;
        }
      }
    }
    /deep/ .el-tabs__content {
      padding: 0 20px;
    }
  }
  .china-map-wrap {
    position: relative;
    .map-title {
      height: 75px;
      border-bottom: 2px solid #eee;
      padding-left: 58px;
      position: relative;
      font-weight: 500;
      font-size: 28px;
      line-height: 75px;
      color: #333;
      &::before {
        content: '';
        width: 6px;
        height: 32px;
        background-color: #e10000;
        position: absolute;
        left: 32px;
        top: calc(50% - 16px);
      }
    }
    .tab-wrap {
      position: absolute;
      top: 38px;
      right: 0px;
    }
    .china-map {
      width: 100%;
      height: 450px;
      margin: 0;
      padding: 0;
      position: relative;
    }
  }
}
</style>
