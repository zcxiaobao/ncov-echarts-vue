<template>
  <li class="power-card" :data-url="power.link" @click.stop="clickPower">
    <img :src="power.img" :alt="power.title" class="power_report_avatar" />
    <div class="power-report-name">{{power.title}}</div>
    <div class="power-report-time">{{power.time}}</div>
    <div class="power-report-desc">{{power.detail}}</div>
  </li>
</template>

<script>
export default {
  props: {
    power: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='less' scoped>
.power-card {
  position: relative;
  padding: 1.1rem 0.75rem 0.4rem 1.4rem;
  border-radius: 0.1rem;
  background-color: #f4f4f4;
  margin-bottom: 0.4rem;
  .power_report_avatar {
    position: absolute;
    left: 0.26rem;
    top: 0.3rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    margin-bottom: 0.32rem;
  }
  .power-report-name {
    position: absolute;
    left: 1.4rem;
    top: 0.56rem;
    font-size: 0.32rem;
    line-height: 1;
    color: #333;
    font-weight: 500;
  }
  .power-report-time {
    position: absolute;
    right: 0.8rem;
    top: 0.7rem;
    line-height: 1;
    font-size: 0.2rem;
    color: #999;
  }
  .power-report-desc {
    position: relative;
    font-size: 0.2rem;
    line-height: 0.4rem;
    color: #666;
    &::before {
      content: '';
      position: absolute;
      position: absolute;
      top: -0.04rem;
      left: -0.4rem;
      width: 0.21rem;
      height: 0.2rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUBAMAAACQZWsAAAAALVBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZnzaKvMAAAADnRSTlMAQIDvML8gEGBQn8+v39ItO+wAAACDSURBVAjXtYrBCcJAFERH0FXxkoNnkT1YgedF8C5WIGIFKUCsIWADVmBJosaDJOHVkP+3h8zh8ZgZWeZn59IRTkfjtS2Nd77SOPGQZtBJe7D1QF0pJP6SXmylCfUuXwpplesFjfHpb934GROVfH1LUyjdfR2BssPHHNaD+CXGuAnRUvQyq2cxf5ubUQAAAABJRU5ErkJggg==')
        no-repeat;
      background-size: 100% 100%;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0.1rem;
      right: -0.3rem;
      width: 0.21rem;
      height: 0.2rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAAAM1BMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlkqvaGAAAAEHRSTlMAv0CA7xAwn2DfcM+PUCCvJxablQAAAHJJREFUGNPNzksSwCAIA1CEStX+vP9p24RRr9Cs3kRwEHGN+KKKpB5JZOTPbTGznW2QLWNsGV3EwLkGHipvH0u09WOb71smG769oQsylo6tHSpQ5aiC2MpnhxzfW0cU67MUJcu46rjnVdWD+WgykiwueQHjIQ13wfXs4QAAAABJRU5ErkJggg==')
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
