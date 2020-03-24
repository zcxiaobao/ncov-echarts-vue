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
  padding: 110px 75px 40px 140px;
  border-radius: 10px;
  background-color: #f4f4f4;
  margin-bottom: 40px;
  .power_report_avatar {
    position: absolute;
    left: 26px;
    top: 30px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-bottom: 32px;
  }
  .power-report-name {
    position: absolute;
    left: 140px;
    top: 56px;
    font-size: 32px;
    line-height: 1;
    color: #333;
    font-weight: 500;
  }
  .power-report-time {
    position: absolute;
    right: 80px;
    top: 70px;
    line-height: 1;
    font-size: 20px;
    color: #999;
  }
  .power-report-desc {
    position: relative;
    font-size: 20px;
    line-height: 40px;
    color: #666;
    &::before {
      content: '';
      position: absolute;
      position: absolute;
      top: -4px;
      left: -40px;
      width: 21px;
      height: 20px;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUBAMAAACQZWsAAAAALVBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZnzaKvMAAAADnRSTlMAQIDvML8gEGBQn8+v39ItO+wAAACDSURBVAjXtYrBCcJAFERH0FXxkoNnkT1YgedF8C5WIGIFKUCsIWADVmBJosaDJOHVkP+3h8zh8ZgZWeZn59IRTkfjtS2Nd77SOPGQZtBJe7D1QF0pJP6SXmylCfUuXwpplesFjfHpb934GROVfH1LUyjdfR2BssPHHNaD+CXGuAnRUvQyq2cxf5ubUQAAAABJRU5ErkJggg==')
        no-repeat;
      background-size: 100% 100%;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 10px;
      right: -30px;
      width: 21px;
      height: 20px;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAAAM1BMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlkqvaGAAAAEHRSTlMAv0CA7xAwn2DfcM+PUCCvJxablQAAAHJJREFUGNPNzksSwCAIA1CEStX+vP9p24RRr9Cs3kRwEHGN+KKKpB5JZOTPbTGznW2QLWNsGV3EwLkGHipvH0u09WOb71smG769oQsylo6tHSpQ5aiC2MpnhxzfW0cU67MUJcu46rjnVdWD+WgykiwueQHjIQ13wfXs4QAAAABJRU5ErkJggg==')
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
