<template>
  <div class="news-item" :data-url="context.link">
    <span>{{context.detail}}</span>
    <h3>{{context.title}}</h3>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='less' scoped>
.news-item {
  position: relative;
  height: 0.6rem;
  font-size: 0.26rem;
  line-height: 0.6rem;
  color: #333;
  span {
    float: left;
    padding: 0 0.12rem;
    margin-top: 0.12rem;
    margin-right: 0.14rem;
    border: 1px solid #e62727;
    border-radius: 0.1rem;
    border-bottom-left-radius: 0;
    background-color: #ffedec;
    font-size: 0.24rem;
    line-height: 0.34rem;
    color: #e10000;
  }
  h3 {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding-right: 0.16rem;
    font-weight: 400;
  }
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0.22rem;
    width: 0.1rem;
    height: 0.16rem;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAMAAAAYoR5yAAAAPFBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjlqKxAAAAE3RSTlMAXmeSlopz7t6zpaOdjYZtTi4H3puO6wAAAEZJREFUCNd1zEcOwDAIRFFwSe///neNFLDjjVk9DaMRnYL4ZdDi2Hftpybfm3z4fcNmumB+PimsUrSYAiTTCbHOHOLvMbte83QC6PUYRlUAAAAASUVORK5CYII=');
    background-size: 100% 100%;
  }
}
</style>
