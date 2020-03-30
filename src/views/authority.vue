<!--
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-03-30 21:51:19
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-03-30 21:51:51
 -->
<template>
  <el-row class="ncov">
    <!-- 权威发布 -->
    <section class="power-report wrap">
      <h2 class="sec-title">权威报告</h2>
      <ul>
        <template v-for="(power,i) in newsData.powerData">
          <power-card :power="power" :key="i"></power-card>
        </template>
      </ul>
    </section>
    <!-- 前沿知识 -->
    <section class="paper wrap">
      <h2 class="sec-title">前沿知识</h2>
      <div class="timeline-wrap">
        <timeline-wrap :items="newsData.paperData"></timeline-wrap>
      </div>
    </section>
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
import BaseMap from '@/components/echarts/map/map'
import PowerCard from '@/components/power-card'
import detailNewsCard from '@/components/detail-news-card'
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
      // 地区趋势 trend数据
      regionTrend: {
        hubei: null,
        italy: null,
        korea: null,
        japan: null,
        iran: null
      },
      // line折线图基本option信息
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
      // table渲染数据
      tableData: {
        china: [],
        world: []
      },
      // 新闻数据  权威 实时播报 论文 滑动新闻
      newsData: {
        powerData: [],
        timelineData: [],
        paperData: [],
        scrollNewData: []
      },
      // 地图信息
      mapData: {
        chinaTotal: [],
        chinaCurrent: [],
        italy: [],
        japan: [],
        world: [],
        korea: [],
        iran: []
      }
    }
  },
  created() {
    this._getNcovData()
    for (const loc in ncovInfoLoc) {
      this._getRegionTrendData(ncovInfoLoc[loc], loc)
    }
    this._getNormalList()
    api.getVirusReport().then(res => {
      this.$set(this.newsData, 'powerData', res.power)
      this.$set(this.newsData, 'paperData', res.papers)
      this.$set(this.newsData, 'scrollNewData', res.scrollNews)
    })
    // api.getQData().then(res => {
    //   console.log(res)
    // })
    api.getLoctionLat().then(res => {
      console.log(res)
    })
  },
  methods: {
    infoTabToggle(tab) {
      this.activeInfo = tab.name
    },
    // 获取实时播报
    _getNormalList() {
      api.getNormalList().then(({ code, data }) => {
        if (code === 0) {
          this.$set(this.newsData, 'timelineData', data.items.slice(0, 15))
        }
      })
    },

    /**
     * @name: 获取疫情数据
     * @param
     * @return:
     */
    _getNcovData() {
      api.getChinaTotalData().then(({ data }) => {
        this._normallizeData(data.chinaTotal)
        this._calcOtherCountryData(data.areaTree)
        this.ncovAllData = data

        // #region 获取各个地区的ncovData
        const chinaMapData = this._getCountryDetailData(data.areaTree, 'china')
        const italyMapData = this._transformMapData(
          this._getCountryDetailData(data.areaTree, 'italy')
        )
        const koreaMapData = this._transformMapData(
          this._getCountryDetailData(data.areaTree, 'korea')
        )
        const iranMapData = this._transformMapData(
          this._getCountryDetailData(data.areaTree, 'iran')
        )
        const japanMapData = this._transformMapData(
          this._getCountryDetailData(data.areaTree, 'japan')
        )
        const worldMapData = this._transformMapData(data.areaTree)
        // #endregion

        // #region map
        // china Total
        this.$set(
          this.mapData,
          'chinaTotal',
          this._transformMapData(chinaMapData)
        )
        // china Current
        this.$set(
          this.mapData,
          'chinaCurrent',
          this._transformMapData(chinaMapData, false)
        )
        // other country
        this.$set(this.mapData, 'italy', italyMapData)
        this.$set(this.mapData, 'korea', koreaMapData)
        this.$set(this.mapData, 'iran', iranMapData)
        this.$set(this.mapData, 'japan', japanMapData)
        this.$set(this.mapData, 'world', worldMapData)
        // this.$set(this.mapData, 'italy', italyMapData)
        // #endregion

        // #region tableData
        // china table
        this.$set(this.tableData, 'china', chinaMapData)
        // world table
        this.$set(
          this.tableData,
          'world',
          this._getCountryDetailData(data.areaTree, 'world')
        )
        // #endregion
      })
    },

    /**
     * @name: 获取各个地区的详情数据 (绘制地图所需数据)
     * @param {Array} data  allNcovData
     * @param {String} area 区域
     * @return: area对应数据
     */
    _getCountryDetailData(data, area) {
      if (area === 'world') {
        return data.filter(d => d.name !== '中国')
      }
      const areaChinaName = countryEngName[area]
      const index = data.findIndex(d => d.name === areaChinaName)
      if (index !== -1) {
        return data[index].children
      }
    },

    /**
     * @name: 获取各个地区的增长趋势数据
     * @param {Number} locId 地区locationId
     * @param {String} loc 地区name
     * @return:
     */
    _getRegionTrendData(locId, loc) {
      api.getRegionData(locId).then(data => {
        this.$set(this.regionTrend, loc, data)
      })
    },

    /**
     * @name: 格式化 china info数据
     * @param {Object} chinaTotal
     * @return: 格式化后的info数据
     */
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

    /**
     * @name: 格式化 other country info数据
     * @param {Array} areaTree 所有疫情数据
     * @return: 格式化后的info数据
     */
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

    /**
     * @name: 格式化地图数据格式
     * @param {Array} list 地图数据
     * @param {Boolean} isTotal 累计
     * @return: 格式化后的数据
     */
    _transformMapData(list, isTotal = true) {
      return list.map(area => {
        const { confirm, heal, dead } = area.total
        const current = confirm - heal - dead
        const label = {}
        if ((isTotal && confirm >= 1000) || (!isTotal && current >= 1000)) {
          label.color = '#fff'
        }
        return {
          name: area.name,
          value: isTotal ? confirm : current,
          confirm,
          heal,
          dead,
          current,
          label
        }
      })
    }
  },
  components: {
    TimelineWrap,
    PowerCard
  }
}
</script>

<style lang='less' scoped>
.ncov {
  position: absolute;
  max-width: 750px;
  width: 100%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  box-sizing: border-box;
  background-color: #fff;
  top: 0.6rem;
  .china-detail {
    .update-time {
      border-bottom: 1px solid #e8e8e8;
    }
  }
  .info-detail {
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 0.16rem;
    margin: 0.3rem auto 0.4rem;
    min-height: 2.3rem;
    font-size: 0;
    overflow: hidden;
    .update-time {
      padding: 0.22rem 0;
      margin: 0 0.32rem;
      font-size: 0.22rem;
      color: #a9a9a9;
      clear: both;
      font-weight: 400;
      .explain {
        float: right;
        i {
          margin-right: 0.04rem;
        }
      }
    }
    .scroll-news {
      height: 0.6rem;
      margin: 0.13rem 0.32rem 0.15rem;
      overflow: hidden;
    }
    /deep/ .el-tabs--card > .el-tabs__header {
      .el-tabs__nav {
        border: none;
        width: 100%;
        overflow: hidden;
        border-top-left-radius: 0.16rem;
        border-top-right-radius: 0.16rem;
      }
      .el-tabs__item {
        height: 0.8rem;
        width: 50%;
        color: #333;
        text-align: center;
        background: #f1f1f1;
        font: 0.26rem/0.8rem -apple-system-font, system-ui, -apple-system,
          Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif,
          Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI,
          Microsoft YaHei, Arial;
        &.is-active {
          background-color: #fff;
        }
      }
    }
    /deep/ .el-tabs__content {
      padding: 0 0.2rem;
    }
    /deep/ .el-tabs__header {
      margin: 0;
    }
  }
  .wrap {
    position: relative;
    padding: 0 0.32rem;
    .tab-wrap {
      position: absolute;
      top: 0.38rem;
      right: 0rem;
    }
    .china-map {
      width: 100%;
      height: 4.5rem;
      margin: 0;
      padding: 0;
      position: relative;
    }
    .map-container {
      height: 100%;
      border: 0.01rem solid #eee;
      background: #f2f2f2;
      box-sizing: border-box;
    }
  }
  .line-chart-wrapper {
    position: relative;
    overflow: hidden;
    height: 100%;
    .line-item-wrap {
      height: 5rem;
      border: 0.01rem solid #eee;
      // background: #f2f2f2;
      box-sizing: border-box;
    }
  }
  .module-title {
    position: relative;
    font: 0.28rem/0.6rem -apple-system-font, system-ui, -apple-system, Segoe UI,
      Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
    margin-top: 0.1rem;
    margin-bottom: 0.2rem;
  }
  .sec-title {
    height: 0.94rem;
    border-bottom: 2px solid #eee;
    padding-left: 0.58rem;
    position: relative;
    font-weight: 500;
    font-size: 0.32rem;
    line-height: 0.94rem;
    color: #333;
    margin-bottom: 0.32rem;
    &::before {
      content: '';
      width: 0.08rem;
      height: 0.32rem;
      background-color: #e10000;
      position: absolute;
      left: 0.32rem;
      top: calc(50% - 0.16rem);
    }
  }
  .map-title {
    position: absolute;
    left: 0.6rem;
    top: 0.4rem;
    padding-left: 0.3rem;
    font-size: 0.26rem;
    line-height: 1;
    color: #333;
    z-index: 10;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.05rem;
      width: 0.16rem;
      height: 0.16rem;
      background: #e10000;
    }
  }
}
</style>
