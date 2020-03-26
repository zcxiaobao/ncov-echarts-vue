<template>
  <div class="detail-wrapper" :class="isNeedBorder? 'border': ''">
    <el-card :body-style="{ padding: '0.18rem 0'}" shadow="never">
      <div class="detail-title">{{title}}</div>
      <div class="detail-number" :class="clsType">{{data.total}}</div>
      <div class="detail-trend" v-show="todayIsShow">
        <span>昨日</span>
        <span :class="clsType">{{formatNum(data.today)}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default() {
        return { total: '-', today: '-' }
      }
    },
    title: {
      type: String,
      default: '累计确诊'
    },
    clsType: {
      // dead heal confirm suspect severe
      type: String,
      default: 'confirm'
    },
    isNeedBorder: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      todayIsShow: false
    }
  },
  methods: {
    formatNum(num) {
      return (num > 0 ? '+' : '') + num
    }
  },
  watch: {
    data() {
      this.todayIsShow = true
    }
  }
}
</script>

<style lang='less' scoped>
.detail-wrapper {
  // margin-bottom: 24px;
  position: relative;
  .el-card {
    border: 0px solid transparent;
  }
  &.border {
    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: calc(50% - 0.15rem);
      width: 0.01rem;
      height: 0.3rem;
      background: #e8e8e8;
    }
  }
  .detail-title {
    text-align: center;
    font: 0.2rem/0.24rem -apple-system-font, system-ui, -apple-system, Segoe UI,
      Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
    font-weight: 600;
    color: #333;
  }
  .detail-number {
    font: 700 0.36rem/0.74rem DIN Alternate, din_alternate_bold,
      -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu,
      Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC,
      Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
    text-align: center;
  }
  .detail-trend {
    font: 0.16rem/1 -apple-system-font, system-ui, -apple-system, Segoe UI,
      Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
    color: #999;
    text-align: center;
  }
  .confirm {
    color: #a31d13;
  }
  .current {
    color: #e44a3d;
  }
  .suspect {
    color: #ffa352;
  }
  .heal {
    color: #34aa70;
  }
  .dead {
    color: #333;
  }
  .severe {
    color: #791618;
  }
}
</style>
