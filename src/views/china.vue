<template>
  <el-row class="ncov">
    <!-- 详情 -->
    <section class="info-detail china-detail">
      <el-tabs v-model="activeInfo" type="card" @tab-click="infoTabToggle">
        <el-tab-pane label="全国疫情数据(含港澳台)" name="china">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <detail-bar
                title="累计确诊"
                :total="chinaTotal.confirm"
                :todayAdd="chinaAdd.confirm"
                clsType="confirm"
              ></detail-bar>
            </el-col>
            <el-col :span="8">
              <detail-bar
                title="累计死亡"
                :total="chinaTotal.dead"
                :todayAdd="chinaAdd.dead"
                clsType="dead"
              ></detail-bar>
            </el-col>
            <el-col :span="8">
              <detail-bar
                title="累计治愈"
                :total="chinaTotal.heal"
                :todayAdd="chinaAdd.heal"
                :isNeedBorder="false"
                clsType="heal"
              ></detail-bar>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <detail-bar
                title="现有确诊"
                :total="chinaTotal.nowConfirm"
                :todayAdd="chinaAdd.nowConfirm"
                clsType="nowConfirm"
              ></detail-bar>
            </el-col>
            <el-col :span="8">
              <detail-bar
                title="无症状感染"
                :total="chinaTotal.noInfect"
                :todayAdd="chinaAdd.noInfect"
                clsType="noInfect"
              ></detail-bar>
            </el-col>
            <el-col :span="8">
              <detail-bar
                title="境外输入"
                :total="chinaTotal.importedCase"
                :todayAdd="chinaAdd.importedCase"
                :isNeedBorder="false"
                clsType="importedCase"
              ></detail-bar>
            </el-col>
          </el-row>
          <el-row class="update-time">
            <span class="time">截至 {{lastUpdateTime}}</span>
            <span class="explain">
              <i class="el-icon-question"></i>数据说明
            </span>
          </el-row>
          <el-row class="scroll-news" v-show="newsData.scrollNewData.length > 0">
            <el-carousel
              height="0.6rem"
              direction="vertical"
              arrow="never"
              indicator-position="none"
            >
              <el-carousel-item v-for="(con, i) in newsData.scrollNewData" :key="i">
                <detail-news-card :context="con"></detail-news-card>
              </el-carousel-item>
            </el-carousel>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="疫情数据" name="local">
          <span slot="label">
            <i class="el-icon-location-outline"></i> 我的行程
          </span>
          我的行程
        </el-tab-pane>
      </el-tabs>
    </section>
    <!-- 中国疫情 -->
    <section class="china-map-wrap">
      <h2 class="sec-title">中国疫情</h2>
      <div class="wrap">
        <p class="map-title">中国疫情图</p>
        <el-carousel height="7.00rem" :autoplay="false" arrow="hover" indicator-position="none">
          <el-carousel-item>
            <base-map area="china" :mapData="chinaCityConf" class="map-container"></base-map>
          </el-carousel-item>
          <el-carousel-item>
            <base-map area="china" :mapData="chinaCityNowConf" class="map-container"></base-map>
          </el-carousel-item>
        </el-carousel>
        <section class="city-ncov">
          <h3 class="module-title">
            城市疫情
            <small>
              累计确诊城市
              <span class="total-city">{{cityStatis.confirm}}</span>
            </small>
          </h3>
          <div class="content">
            <div class="item zero">
              <p class="num">{{cityStatis.zeroNowConfirm}}</p>
              <p class="text">零病例城市</p>
            </div>
            <div class="progress">
              <p :style="{width: cityStatis.zeroNowConfirm / cityStatis.confirm * 100 + '%'}"></p>
            </div>
            <div class="item has">
              <p class="num">{{cityStatis.notZeroNowConfirm}}</p>
              <p class="text">有病例城市</p>
            </div>
          </div>
          <div class="summary">
            全国累计确诊患者分布于
            <span>{{cityStatis.confirm}}</span>个城市，目前已有
            <span>{{cityStatis.zeroNowConfirm}}</span>个城市实现现有确诊“清零”
          </div>
        </section>
        <section class="line-chart-wrapper">
          <el-carousel height="6.00rem" :autoplay="false" arrow="always">
            <el-carousel-item>
              <h2 class="module-title">境外输入省市TOP10</h2>
              <div class="line-item-wrap">
                <bar-chart
                  :textData="textData.importStatisText"
                  :mapData="importStatis.TopList"
                  class="line-item-wrap"
                ></bar-chart>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <h2 class="module-title">境外新增输入趋势</h2>
              <div class="line-item-wrap">
                <new-line-chart
                  :textData="textData.importAddStatisText"
                  :mapData="importAddStatis"
                  class="line-item-wrap"
                ></new-line-chart>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <h2 class="module-title">境外新增输入趋势</h2>
              <div class="line-item-wrap">
                <new-line-chart
                  :textData="textData.importAddStatisText"
                  :mapData="importTotalStatis"
                  class="line-item-wrap"
                ></new-line-chart>
              </div>
            </el-carousel-item>
          </el-carousel>
        </section>
        <section class="line-chart-wrapper">
          <el-carousel height="6.00rem" :autoplay="false" arrow="always" indicator-position="none">
            <el-carousel-item>
              <h3 class="module-title">全国疫情新增趋势</h3>
              <new-line-chart
                :textData="textData.ncovAddText"
                :mapData="chinaData.chinaDayAddList"
                class="line-item-wrap"
              ></new-line-chart>
            </el-carousel-item>
            <el-carousel-item>
              <h3 class="module-title">全国确诊/疑似/重症趋势</h3>
              <new-line-chart
                :textData="textData.ncovTotalText"
                :mapData="chinaData.chinaDayList"
                class="line-item-wrap"
              ></new-line-chart>
            </el-carousel-item>
            <el-carousel-item>
              <h3 class="module-title">全国累计治愈/死亡趋势</h3>
              <new-line-chart
                :textData="textData.ncovHealDeadText"
                :mapData="chinaData.chinaDayList"
                :isPercent="true"
                class="line-item-wrap"
              ></new-line-chart>
            </el-carousel-item>
          </el-carousel>
        </section>
        <section class="line-chart-wrapper">
          <el-carousel height="6.00rem" :autoplay="false" arrow="always">
            <el-carousel-item>
              <h2 class="module-title">湖北确诊/治愈/死亡趋势</h2>
              <div class="line-item-wrap">
                <new-line-chart
                  :textData="textData.regionTotalText"
                  :mapData="dailyTrend.hubei"
                  class="line-item-wrap"
                ></new-line-chart>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <h2 class="module-title">非湖北确诊/治愈/死亡趋势</h2>
              <div class="line-item-wrap">
                <new-line-chart
                  :textData="textData.regionTotalText"
                  :mapData="dailyTrend.notHubei"
                  class="line-item-wrap"
                ></new-line-chart>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <h2 class="module-title">湖北内外治愈率对比</h2>
              <div class="line-item-wrap">
                <new-line-chart
                  :textData="textData.rateCompareText"
                  :mapData="dailyTrend.healRateDaily"
                  :isPercent="true"
                  class="line-item-wrap"
                ></new-line-chart>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <h2 class="module-title">湖北内外病死率对比</h2>
              <div class="line-item-wrap">
                <new-line-chart
                  :textData="textData.rateCompareText"
                  :mapData="dailyTrend.deadRateDaily"
                  :isPercent="true"
                  class="line-item-wrap"
                ></new-line-chart>
              </div>
            </el-carousel-item>
            <!-- <el-carousel-item>
              <h2 class="module-title">全国/湖北/非湖北新增确诊对比</h2>
              <div class="line-item-wrap">
                <line-chart
                  :isTotal="false"
                  :isNeedAssist="true"
                  :textData="textData.regionAddText"
                  :mapData="ncovAllData"
                  :assistData="regionTrend.hubei"
                  class="line-item-wrap"
                ></line-chart>
              </div>
            </el-carousel-item>-->
          </el-carousel>
        </section>
        <section class="line-chart-wrapper">
          <el-carousel height="6.00rem" :autoplay="false" arrow="always">
            <el-carousel-item>
              <h2 class="module-title">武汉新增确诊趋势</h2>
              <div class="line-item-wrap">
                <new-line-chart
                  :textData="textData.wuhanAddText"
                  :mapData="dailyTrend.wuhan"
                  class="line-item-wrap"
                ></new-line-chart>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <h2 class="module-title">湖北(非武汉)新增确诊趋势</h2>
              <div class="line-item-wrap">
                <new-line-chart
                  :textData="textData.wuhanAddText"
                  :mapData="dailyTrend.notWuhan"
                  class="line-item-wrap"
                ></new-line-chart>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <h2 class="module-title">全国(非湖北)新增确诊趋势</h2>
              <div class="line-item-wrap">
                <new-line-chart
                  :textData="textData.wuhanAddText"
                  :mapData="dailyTrend.notHubeiAdd"
                  class="line-item-wrap"
                ></new-line-chart>
              </div>
            </el-carousel-item>
          </el-carousel>
        </section>
        <section class="china-table">
          <h3 class="module-title">中国病例</h3>
          <table-list :tableData="areaTree"></table-list>
        </section>
      </div>
    </section>
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Tab from '@/components/tab/tab'
import TableList from '@/components/table-list'
import DetailBar from '@/components/detail-bar'
import BarChart from '@/components/echarts/bar'
import TimelineWrap from '@/components/timeline-wrap'
import NewLineChart from '@/components/echarts/new-line'
import BaseMap from '@/components/echarts/map/map'
import PowerCard from '@/components/power-card'
import detailNewsCard from '@/components/detail-news-card'
import api from '@/api/api.js'
import echarts from 'echarts'
import { dataDetailEnum, countryEngName, ncovInfoLoc } from '@/assets/js/config'
import { buildMapOptions } from '@/assets/js/map-option.js'
import {
  getChinaDisease,
  getForeignDisease,
  getChinaDiseaseH5
} from '@/api/china'
import { SUCCESS } from '@/api/config'

export default {
  data() {
    return {
      chinaTotal: {},
      chinaAdd: {},
      chinaCityConf: [],
      chinaCityNowConf: [],
      lastUpdateTime: '',
      chinaData: {
        cityStatis: {},
        chinaDayAddList: [],
        chinaDayList: [],
        dailyHistory: []
      },
      areaTree: [],
      dailyTrend: {
        hubei: [],
        notHubei: [],
        healRateDaily: [],
        deadRateDaily: [],
        wuhan: [],
        notWuhan: [],
        notHubeiAdd: []
      },
      importData: {
        importStatis: {},
        importAddStatis: [],
        importTotalStatis: []
      },
      cityStatis: {},
      importStatis: {},
      importAddStatis: [],
      importTotalStatis: [],
      chinaInfo: {
        confirm: { total: '-', today: '-' },
        suspect: { total: '-', today: '-' },
        heal: { total: '-', today: '-' },
        dead: { total: '-', today: '-' },
        current: { total: '-', today: '-' },
        severe: { total: '-', today: '-' }
      },
      activeInfo: 'china',
      ncovAllData: null,
      // 地区趋势 trend数据
      regionTrend: {
        hubei: null
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
          dimensions: ['date', 'confirm', 'nowConfirm', 'suspect', 'nowSevere']
        },
        ncovHealDeadText: {
          legend: ['治愈率', '死亡率'],
          color: ['#58A97A', '#828282'],
          dimensions: ['date', 'healRate', 'deadRate']
        },
        regionTotalText: {
          legend: ['现有确诊', '现有治愈', '现有死亡'],
          color: ['#E44A3D', '#58A97A', '#828282'],
          dimensions: ['date', 'nowConfirm', 'heal', 'dead']
        },
        rateCompareText: {
          legend: ['全国', '湖北', '非湖北'],
          color: ['#E44A3D', '#58A97A', '#828282'],
          dimensions: ['date', 'country', 'hubei', 'notHubei']
        },
        otherRegionText: {
          legend: ['确诊', '治愈', '死亡'],
          color: ['#A31D13', '#58A97A', '#828282'],
          dimensions: ['date', 'confirm', 'heal', 'dead']
        },
        importStatisText: {
          dimensions: ['province', 'importedCase']
        },
        importAddStatisText: {
          dimensions: ['date', 'importedCase']
        },
        wuhanAddText: {
          dimensions: ['date', 'confirmAdd']
        }
      },
      // table渲染数据
      tableData: {
        china: []
      },
      // 新闻数据  权威 实时播报 论文 滑动新闻
      newsData: {
        scrollNewData: []
      },
      // 地图信息
      mapData: {
        chinaTotal: [],
        chinaCurrent: []
      }
    }
  },
  created() {
    getChinaDisease().then(({ ret, data }) => {
      if (ret === SUCCESS) {
        const d = JSON.parse(data)
        this.cityStatis = d.cityStatis
        this.$set(this.chinaData, 'chinaDayAddList', d.chinaDayAddList)
        this.$set(this.chinaData, 'chinaDayList', d.chinaDayList)
        this.$set(this.chinaData, 'dailyHistory', d.dailyHistory)
        this.$set(
          this.dailyTrend,
          'hubei',
          this.chinaData.dailyHistory.map(d => ({
            date: d.date,
            ...d.hubei
          }))
        )
        this.$set(
          this.dailyTrend,
          'notHubei',
          this.chinaData.dailyHistory.map(d => ({
            date: d.date,
            ...d.notHubei
          }))
        )
        this.$set(
          this.dailyTrend,
          'healRateDaily',
          this.chinaData.dailyHistory.map(d => ({
            date: d.date,
            hubei: d.hubei.healRate,
            notHubei: d.notHubei.healRate,
            country: d.country.healRate
          }))
        )
        this.$set(
          this.dailyTrend,
          'deadRateDaily',
          this.chinaData.dailyHistory.map(d => ({
            date: d.date,
            hubei: d.hubei.deadRate,
            notHubei: d.notHubei.deadRate,
            country: d.country.deadRate
          }))
        )
        this.$set(
          this.dailyTrend,
          'wuhan',
          d.wuhanDayList.map(day => ({ date: day.date, ...day.wuhan }))
        )
        this.$set(
          this.dailyTrend,
          'notWuhan',
          d.wuhanDayList.map(day => ({ date: day.date, ...day.notWuhan }))
        )
        this.$set(
          this.dailyTrend,
          'notHubeiAdd',
          d.wuhanDayList.map(day => ({ date: day.date, ...day.notHubei }))
        )
        this.importAddStatis = this.chinaData.chinaDayAddList.filter(
          d => d.importedCase > 0
        )
        this._calcImportTotal(this.chinaData.chinaDayAddList)
      }
    })
    getChinaDiseaseH5().then(({ ret, data }) => {
      if (ret === SUCCESS) {
        const d = JSON.parse(data)
        this.chinaTotal = d.chinaTotal
        this.chinaAdd = d.chinaAdd
        this.areaTree = d.areaTree[0].children
        this.lastUpdateTime = d.lastUpdateTime
        this.chinaCityConf = d.areaTree[0].children.map(area => {
          const { name, total } = area
          return {
            name,
            value: total.confirm,
            ...total
          }
        })
        this.chinaCityNowConf = d.areaTree[0].children.map(area => {
          const { name, total } = area
          return {
            name,
            value: total.nowConfirm,
            ...total
          }
        })
      }
    })
    getForeignDisease().then(({ ret, data }) => {
      if (ret === SUCCESS) {
        const d = JSON.parse(data)
        this.importStatis = d.importStatis
      }
    })
    this._getNcovData()
    for (const loc in ncovInfoLoc) {
      this._getRegionTrendData(ncovInfoLoc[loc], loc)
    }
    api.getVirusReport().then(res => {
      this.$set(this.newsData, 'scrollNewData', res.scrollNews)
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
    _calcImportTotal(list) {
      const index = list.findIndex(d => d.importedCase > 0)
      const len = list.length
      const res = []
      let sumImport = 0
      if (index !== -1) {
        for (let i = index; i < len; i++) {
          sumImport += list[i].importedCase
          res.push({ date: list[i].date, importedCase: sumImport })
        }
      }
      this.importTotalStatis = res
    },

    /**
     * @name: 获取疫情数据
     * @param
     * @return:
     */
    _getNcovData() {
      api.getChinaTotalData().then(({ data }) => {
        this._normallizeData(data.chinaTotal)
        this.ncovAllData = data

        // #region 获取各个地区的ncovData
        const chinaMapData = this._getCountryDetailData(data.areaTree, 'china')
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
        // #endregion

        // #region tableData
        // china table
        this.$set(this.tableData, 'china', chinaMapData)
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
    DetailBar,
    // TableData,
    TableList,
    BaseMap,
    detailNewsCard,
    BarChart,
    NewLineChart
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
    small {
      font: 0.22rem/0.6rem -apple-system-font, system-ui, -apple-system,
        Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif,
        Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI,
        Microsoft YaHei, Arial;
      margin-top: 0.1rem;
      margin-bottom: 0.2rem;
    }
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
  .city-ncov {
    .total-city {
      color: #f23a3b;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-radius: 0.1rem;
      background-color: #eef4ff;
      height: 1.2rem;

      .progress {
        flex: 1;
        height: 0.1rem;
        background-color: #f06061;
        border-radius: 0.1rem;
        position: relative;
        overflow: hidden;
        margin: 0 0.05rem;
        p {
          border-right: 0.05rem solid #eef4ff;
          width: 0;
          background-color: #4dadff;
          height: 100%;
        }
      }
      .item {
        flex: 0 0 25%;
        .num {
          font-size: 0.32rem;
          line-height: 0.4rem;
          height: 0.4rem;
          font-weight: 500;
        }
        .text {
          font-size: 0.24rem;
          color: #000;
          height: 0.28rem;
          line-height: 0.28rem;
          margin-top: 0.04rem;
        }
      }
      .zero {
        .num {
          color: #4dadff;
        }
      }
      .has {
        .num {
          color: #f23a3b;
        }
      }
    }
    .summary {
      font-size: 0.24rem;
      line-height: 0.32rem;
      color: #a6a6a6;
      margin: 0.1rem 0 0;
    }
  }
}
</style>
