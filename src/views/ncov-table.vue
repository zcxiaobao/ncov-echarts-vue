<template>
  <el-row class="ncov-table">
    <el-row type="flex" justify="center" class="ncov-detail-wrapper">
      <el-col :span="16" class="ncov-detail">
        <el-row type="flex" justify="space-around">
          <el-col :span="4">
            <el-card :body-style="{ padding: '10px' }" shadow="never">
              <div class="detail-title">现有确诊</div>
              <div class="detail-number now-confirm">{{regionDetailData.now.currentConfirmedCount}}</div>
              <div class="detail-trend">
                昨日
                <span class="now-confirm">{{regionDetailData.trend.currentConfirmedCount}}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '10px' }" shadow="never">
              <div class="detail-title">累计确诊</div>
              <div class="detail-number total-confirm">{{regionDetailData.now.confirmedCount}}</div>
              <div class="detail-trend">
                昨日
                <span class="total-confirm">{{regionDetailData.trend.confirmedCount}}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '10px' }" shadow="never">
              <div class="detail-title">累计治愈</div>
              <div class="detail-number total-curd">{{regionDetailData.now.curedCount}}</div>
              <div class="detail-trend">
                昨日
                <span class="total-curd">{{regionDetailData.trend.curedCount}}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '10px' }" shadow="never">
              <div class="detail-title">累计死亡</div>
              <div class="detail-number total-dead">{{regionDetailData.now.deadCount}}</div>
              <div class="detail-trend">
                昨日
                <span class="total-dead">{{regionDetailData.trend.deadCount}}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">444</el-col>
      <el-col :span="16">
        <el-table
          v-show="ncovData.length"
          :data="ncovData"
          style="width: 100%;margin-bottom: 20px;"
          :row-key="rowKeyId"
          border
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
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      regionDetailData: null
    }
  },
  computed: {
    ...mapGetters(['ncovData', 'ncovDetailData', 'nowRegion'])
  },
  methods: {
    ...mapMutations({
      setNowRegion: 'SET_NOW_REGION'
    }),
    rowKeyId(row) {
      return row.provinceShortName || row.cityName
    },
    expandChange(row, expands) {
      if (!expands) {
        this.setNowRegion('中国')
      } else {
        this.setNowRegion(row.provinceShortName)
      }
    },
    formatTableShow(row, column, cellValue) {
      return cellValue > 0 ? cellValue : ''
    }
  },
  watch: {
    ncovDetailData(newData) {
      this.regionDetailData = newData[this.nowRegion]
    },
    nowRegion(newGegion) {
      this.regionDetailData = this.ncovDetailData[newGegion]
    }
  }
}
</script>

<style lang='less' scoped>
.ncov-table {
  min-width: 960px;
  .ncov-detail-wrapper {
    margin-bottom: 12px;
    .ncov-detail {
      padding: 12px;
      text-align: center;
      .detail-title {
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        margin-bottom: 8px;
        color: #333;
      }
      .detail-number {
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        color: #ff6a57;
      }
      .detail-trend {
        font-size: 10px;
        height: 10px;
        line-height: 10px;
        margin-top: 4px;
        color: #999;
      }
      .now-confirm {
        color: #ff6a57;
      }
      .total-confirm {
        color: #e83132;
      }
      .now-seemly {
        color: #ec9217;
      }
      .total-curd {
        color: #10aeb5;
      }
      .total-dead {
        color: #4d5054;
      }
      .now-danger {
        color: #476da0;
      }
    }
  }
  .ncov-table-td {
    padding: 6px 0;
  }
}
</style>
