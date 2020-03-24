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
  padding: 18px 24px 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  .title {
    color: #333;
    font-size: 24px;
    line-height: 36px;
    font-weight: 700;
  }
  .text {
    color: #666;
    font-size: 18px;
    line-height: 24px;
    text-align: justify;
    margin-bottom: 12px;
  }
  .detail {
    // padding-left: 26px;
    color: #999;
    font-size: 18px;
    line-height: 18px;
    span {
      vertical-align: middle;
    }
    i {
      vertical-align: middle;
      padding-left: 5px;
    }
  }
}
</style>
