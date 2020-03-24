<template>
  <el-row class="ncov-info">
    <!-- 详情 -->
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
    <!-- 中国疫情 -->
    <div class="china-map-wrap map-wrap">
      <div class="sec-title">中国疫情</div>
      <tab :activeTab="activeMapTab" @tab-toggle="mapTabToggle" :tabs="mapTabs" class="tab-wrap"></tab>
      <div style="height: 700px">
        <base-map area="china" :mapData="chinaMapData" class="map-container"></base-map>
      </div>
      <div class="line-chart-wrapper">
        <el-carousel height="600px" :autoplay="false" arrow="always">
          <el-carousel-item>
            <h2 class="module-title">全国疫情新增趋势</h2>
            <div class="line-item-wrap">
              <line-chart
                :isTotal="false"
                :textData="textData.ncovAddText"
                :mapData="ncovAllData"
                class="line-item-wrap"
              ></line-chart>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <h2 class="module-title">全国确诊/疑似/重症趋势</h2>
            <div class="line-item-wrap">
              <line-chart
                :textData="textData.ncovTotalText"
                :mapData="ncovAllData"
                class="line-item-wrap"
              ></line-chart>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <h2 class="module-title">全国累计治愈/死亡趋势</h2>
            <div class="line-item-wrap">
              <line-chart
                :textData="textData.ncovHealDeadText"
                :mapData="ncovAllData"
                class="line-item-wrap"
              ></line-chart>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="line-chart-wrapper">
        <el-carousel height="600px" :autoplay="false" arrow="always">
          <el-carousel-item>
            <h2 class="module-title">全国/湖北/非湖北累计确诊对比</h2>
            <div class="line-item-wrap">
              <line-chart
                :isTotal="false"
                :isNeedAssist="true"
                :textData="textData.regionTotalText"
                :mapData="ncovAllData"
                :assistData="region.hubei"
                class="line-item-wrap"
              ></line-chart>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <h2 class="module-title">全国/湖北/非湖北新增确诊对比</h2>
            <div class="line-item-wrap">
              <line-chart
                :isTotal="false"
                :isNeedAssist="true"
                :textData="textData.regionAddText"
                :mapData="ncovAllData"
                :assistData="region.hubei"
                class="line-item-wrap"
              ></line-chart>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="china-table">
        <h2 class="module-title">中国病例</h2>
        <table-data :tableData="chinaMapDataOrigin"></table-data>
      </div>
    </div>
    <!-- 世界疫情 -->
    <div class="other-country-wrap map-wrap">
      <div class="sec-title">海外疫情</div>
      <div class="info-detail">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="6">
            <data-detail title="累计确诊" :data="otherCountryInfo.confirm" clsType="confirm"></data-detail>
          </el-col>
          <el-col :span="6">
            <data-detail title="现存确诊" :data="otherCountryInfo.current" clsType="heal"></data-detail>
          </el-col>
          <el-col :span="6">
            <data-detail title="累计死亡" :data="otherCountryInfo.dead" clsType="dead"></data-detail>
          </el-col>
          <el-col :span="6">
            <data-detail
              title="累计治愈"
              :data="otherCountryInfo.heal"
              :isNeedBorder="false"
              clsType="heal"
            ></data-detail>
          </el-col>
        </el-row>
      </div>
      <div class="line-chart-wrapper">
        <el-carousel height="700px" :autoplay="false" arrow="always">
          <el-carousel-item>
            <base-map :mapData="worldMapData" area="world" :showLabel="false" class="map-container"></base-map>
          </el-carousel-item>
          <el-carousel-item>
            <base-map :mapData="italyMapData" area="italy" class="map-container"></base-map>
          </el-carousel-item>
          <el-carousel-item>
            <base-map :mapData="koreaMapData" area="korea" class="map-container"></base-map>
          </el-carousel-item>
          <el-carousel-item>
            <base-map :mapData="iranMapData" area="iran" class="map-container"></base-map>
          </el-carousel-item>
          <el-carousel-item>
            <base-map :mapData="japanMapData" area="japan" class="map-container"></base-map>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="line-chart-wrapper">
        <el-carousel height="600px" :autoplay="false" arrow="always">
          <el-carousel-item>
            <h2 class="module-title">意大利疫情趋势</h2>
            <div class="line-item-wrap">
              <line-chart
                :textData="textData.otherRegionText"
                :mapData="region.italy"
                class="line-item-wrap"
              ></line-chart>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <h2 class="module-title">伊朗趋势</h2>
            <div class="line-item-wrap">
              <line-chart
                :textData="textData.otherRegionText"
                :mapData="region.iran"
                class="line-item-wrap"
              ></line-chart>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <h2 class="module-title">韩国疫情趋势</h2>
            <div class="line-item-wrap">
              <line-chart
                :textData="textData.otherRegionText"
                :mapData="region.korea"
                class="line-item-wrap"
              ></line-chart>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <h2 class="module-title">日本疫情趋势</h2>
            <div class="line-item-wrap">
              <line-chart
                :textData="textData.otherRegionText"
                :mapData="region.japan"
                class="line-item-wrap"
              ></line-chart>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="china-table">
        <h2 class="module-title">海外病例</h2>
        <table-data :tableData="tableData.world"></table-data>
      </div>
    </div>
    <!-- 实时播报 -->
    <div class="realtime">
      <div class="sec-title">实时播报</div>
      <div class="timeline-wrap">
        <timeline-wrap :items="newsData.timelineData"></timeline-wrap>
      </div>
    </div>
    <!-- 权威发布 -->
    <div class="power-report">
      <div class="sec-title">权威报告</div>
      <ul>
        <template v-for="(power,i) in newsData.powerData">
          <power-card :power="power" :key="i"></power-card>
        </template>
      </ul>
    </div>
    <!-- 前沿知识 -->
    <div class="paper">
      <div class="sec-title">前沿知识</div>
      <div class="timeline-wrap">
        <timeline-wrap :items="newsData.paperData"></timeline-wrap>
      </div>
    </div>
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Tab from '@/components/tab/tab'
import DataDetail from '@/components/data-detail/data-detail'
import TimelineWrap from '@/components/timeline-wrap'
import MapInit from '@/components/map/map.vue'
import LineChart from '@/components/echarts/line'
import TableData from '@/components/table-data'
import TableTry from '@/components/table-try'
import BaseMap from '@/components/echarts/map/map'
import PowerCard from '@/components/power-card'
import api from '@/api/api.js'
import echarts from 'echarts'
import { dataDetailEnum, countryEngName, ncovInfoLoc } from '@/assets/js/config'
import { buildMapOptions } from '@/assets/js/map-option.js'

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
      otherCountryInfo: {
        confirm: { total: '-', today: '-' },
        heal: { total: '-', today: '-' },
        dead: { total: '-', today: '-' },
        current: { total: '-', today: '-' }
      },
      activeInfo: 'china',
      ncovAllData: null,
      region: {
        hubei: null,
        italy: null,
        korea: null,
        japan: null,
        iran: null
      },
      textData: {
        ncovAddText: {
          legend: ['确诊', '治愈', '疑似', '死亡'],
          color: ['#A31D13', '#58A97A', '#FFD667', '#828282'],
          dimensions: ['date', 'confirm', 'heal', 'suspect', 'dead']
        },
        ncovTotalText: {
          legend: ['累计确诊', '现有确诊', '现有疑似', '现有重症'],
          color: ['#A31D13', '#E44A3D', '#FFD667', '#791618'],
          dimensions: ['date', 'confirm', 'current', 'suspect', 'severe']
        },
        ncovHealDeadText: {
          legend: ['累计治愈', '累计死亡'],
          color: ['#58A97A', '#828282'],
          dimensions: ['date', 'heal', 'dead']
        },
        regionTotalText: {
          legend: ['全国', '湖北', '非湖北'],
          color: ['#C13531', '#2F4554', '#61A0A8'],
          dimensions: ['date', 'chinaConfirm', 'huConfirm', 'otherConfirm']
        },
        regionAddText: {
          legend: ['全国', '湖北', '非湖北'],
          color: ['#C13531', '#2F4554', '#61A0A8'],
          dimensions: [
            'date',
            'chinaAddConfirm',
            'huAddConfirm',
            'otherAddConfirm'
          ]
        },
        otherRegionText: {
          legend: ['确诊', '治愈', '死亡'],
          color: ['#A31D13', '#58A97A', '#828282'],
          dimensions: ['date', 'confirm', 'heal', 'dead']
        }
      },
      tableData: {
        china: [],
        world: []
      },
      newsData: {
        powerData: [],
        timelineData: [],
        paperData: []
      },
      chinaMapData: [],
      chinaMapDataOrigin: [],
      italyMapData: [],
      japanMapData: [],
      iranMapData: [],
      koreaMapData: [],
      worldMapData: [],
      mapTabs: [
        { label: '累计确诊', name: 'total' },
        { label: '现存确诊', name: 'now' }
      ],
      activeMapTab: 'total',
      timelineData: []
    }
  },
  created() {
    this._getChinaTotalData()
    for (const loc in ncovInfoLoc) {
      this._getRegionData(ncovInfoLoc[loc], loc)
    }
    this._getNormalList()
    api.getVirusReport().then(res => {
      this.$set(this.newsData, 'powerData', res.power)
      this.$set(this.newsData, 'paperData', res.papers)
    })
  },
  methods: {
    mapTabToggle(tab) {
      this.activeMapTab = tab.name
    },
    infoTabToggle(tab) {
      this.activeInfo = tab.name
    },
    _getNormalList() {
      api.getNormalList().then(({ code, data }) => {
        if (code === 0) {
          this.$set(this.newsData, 'timelineData', data.items.slice(0, 15))
          // this.timelineData = data && data.items.slice(0, 15)
        }
      })
    },
    _getChinaTotalData() {
      api.getChinaTotalData().then(({ data }) => {
        this._normallizeData(data.chinaTotal)
        this._calcOtherCountryData(data.areaTree)
        this.ncovAllData = data
        this.chinaMapDataOrigin = this._getCountryData(data.areaTree, 'china')
        this.$set(this.tableData, 'china', this.chinaMapDataOrigin)
        this.$set(
          this.tableData,
          'world',
          this._getCountryData(data.areaTree, 'world')
        )
        this.italyMapData = this._transformMapData(
          this._getCountryData(data.areaTree, 'italy')
        )
        this.koreaMapData = this._transformMapData(
          this._getCountryData(data.areaTree, 'korea')
        )
        this.iranMapData = this._transformMapData(
          this._getCountryData(data.areaTree, 'iran')
        )
        this.japanMapData = this._transformMapData(
          this._getCountryData(data.areaTree, 'japan')
        )
        this.worldMapData = this._transformMapData(data.areaTree)
      })
    },
    _getCountryData(data, area) {
      if (area === 'world') {
        return data.filter(d => d.name !== '中国')
      }
      const areaChinaName = countryEngName[area]
      const index = data.findIndex(d => d.name === areaChinaName)
      if (index !== -1) {
        return data[index].children
      }
    },
    _getRegionData(locId, loc) {
      api.getRegionData(locId).then(data => {
        this.$set(this.region, loc, data)
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
                today: today.storeConfirm
              }
            : {
                total: total[d],
                today: today[d]
              }
        this.$set(this.chinaInfo, d, tmp)
      })
      return res
    },
    _calcOtherCountryData(areaTree) {
      const tmp = {
        confirm: { today: 0, total: 0 },
        current: { today: 0, total: 0 },
        heal: { today: 0, total: 0 },
        dead: { today: 0, total: 0 },
        severe: { today: 0, total: 0 },
        suspect: { today: 0, total: 0 }
      }
      areaTree.forEach(area => {
        if (area.name === '中国') return
        const { total, today } = area
        Object.keys(dataDetailEnum).forEach(key => {
          if (key === 'current') {
            tmp[key].today += today.storeConfirm ? today.storeConfirm : 0
          } else {
            tmp[key].total += total[key] ? total[key] : 0
            tmp[key].today += today[key] ? today[key] : 0
          }
        })
      })
      tmp.current.total = tmp.confirm.total - tmp.heal.total - tmp.dead.total
      tmp.current.today = tmp.confirm.today - tmp.heal.today - tmp.dead.today

      this.otherCountryInfo = tmp
    },
    _transformMapData(list) {
      return list.map(area => {
        const { confirm, heal, dead } = area.total
        const current = confirm - heal - dead
        const label = {}
        if (confirm >= 1000) {
          label.color = '#fff'
        }
        return {
          name: area.name,
          value: this.activeMapTab === 'total' ? confirm : current,
          confirm,
          heal,
          dead,
          current,
          label
        }
      })
    }
  },
  watch: {
    chinaMapDataOrigin(newMapData) {
      this.chinaMapData = this._transformMapData(newMapData)
    },
    activeMapTab(newMapTab, oldMapTab) {
      if (newMapTab === oldMapTab) {
        return
      }
      this.chinaMapData = this._transformMapData(this.chinaMapDataOrigin)
    }
  },
  components: {
    DataDetail,
    Tab,
    LineChart,
    TableData,
    BaseMap,
    TimelineWrap,
    PowerCard
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
    /deep/ .el-tabs__header {
      margin: 0;
    }
  }
  .map-wrap {
    position: relative;

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
    .map-container {
      height: 100%;
      border: 1px solid #eee;
      background: #f2f2f2;
      box-sizing: border-box;
    }
  }
  .line-chart-wrapper {
    position: relative;
    overflow: hidden;
    height: 100%;

    .line-item-wrap {
      height: 500px;
      border: 1px solid #eee;
      background: #f2f2f2;
      box-sizing: border-box;
    }
  }
  .module-title {
    position: relative;
    font: 28px/60px -apple-system-font, system-ui, -apple-system, Segoe UI,
      Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .sec-title {
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
}
</style>
