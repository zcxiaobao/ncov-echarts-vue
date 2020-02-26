<template>
  <div class="layout-default">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header>
        <ncov-header></ncov-header>
      </el-header>
      <el-container>
        <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <zc-aside></zc-aside>
        </el-aside>-->

        <el-main class="ncov-main">
          <router-view></router-view>
          <!-- main -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ZcAside from '@/components/aside/zc-aside.vue'
import NcovHeader from '@/components/header/ncov-header.vue'
import { mapMutations, mapGetters } from 'vuex'
import { detailDataList } from '@/assets/js/calcNcovDetailData.js'
import api from '@/api/api.js'
export default {
  name: 'Default',
  created() {
    this._getNcovData()
    this._getNcovData(false)
  },
  data() {
    return {
      ncovDataStr: 'nowNcovData',
      yesNcovDataStr: 'yesNcovData'
    }
  },
  computed: {
    ...mapGetters(['ncovData', 'yesNcovData'])
  },
  methods: {
    ...mapMutations({
      setNcovData: 'SET_NCOV_DATA',
      setYesNcovData: 'SET_YES_NCOV_DATA',
      setDetailData: 'SET_NCOV_DETAIL_DATA',
      setNewRegion: 'SET_NOW_REGION'
    }),
    _getNcovData(isLatest = true) {
      api.getNcovData(isLatest).then(res => {
        if (isLatest) {
          if (!localStorage.getItem(this.ncovDataStr)) {
            localStorage.setItem(this.ncovDataStr, JSON.stringify(res))
          }
          this.setNcovData(res.newslist)
        } else {
          if (!localStorage.getItem(this.yesNcovDataStr)) {
            localStorage.setItem(this.yesNcovDataStr, JSON.stringify(res))
          }
          this.setYesNcovData(res.newslist)
        }
        if (this.ncovData.length > 0 && this.yesNcovData.length > 0) {
          const data = detailDataList(this.ncovData, this.yesNcovData)
          this.setDetailData(data)
          this.setNewRegion = '中国'
        }
      })
    }
  },
  components: {
    // ZcAside
    NcovHeader
  }
}
</script>

<style scoped lang='less'>
.el-header,
.el-main,
.el-footer {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  overflow: unset;
}

.el-header {
  background: #f8f8f8;
  color: #999;
  width: 100%;
  font-size: 12px;
}
.layout-default {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.el-main {
  // padding: 20px;
}
</style>
