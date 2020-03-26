<template>
  <a :href="context.url || context.link" class="con">
    <h3 class="title">{{context.title}}</h3>
    <p class="text">{{context.digest || context.detail}}</p>
    <div class="detail">
      <span>查看详细报道</span>
      <i class="el-icon-d-arrow-right"></i>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang='less' scoped>
.con {
  display: block;
  padding: 0.18rem 0.24rem 0.2rem;
  background-color: #f4f4f4;
  border-radius: 0.08rem;
  font-family: -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto,
    Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
  .title {
    color: #333;
    font-size: 0.28rem;
    line-height: 0.4rem;
    font-weight: 700;
  }
  .text {
    color: #666;
    font-size: 0.2rem;
    line-height: 0.3rem;
    text-align: justify;
    margin-bottom: 0.12rem;
  }
  .detail {
    // padding-left: 26rem;
    color: #999;
    font-size: 0.18rem;
    line-height: 0.18rem;
    span {
      vertical-align: middle;
    }
    i {
      vertical-align: middle;
      padding-left: 0.05rem;
    }
  }
}
</style>
