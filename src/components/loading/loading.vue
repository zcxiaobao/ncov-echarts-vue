<template>
  <div class="loading">
    <img width="48" height="48" src="./loading.gif" />
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '数据加载中...'
    }
  }
}
</script>
<style scoped lang="less" >
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: 24px;
    color: #000;
  }
}
</style>
