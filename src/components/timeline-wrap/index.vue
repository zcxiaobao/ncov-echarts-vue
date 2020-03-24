<template>
  <ul class="timeline">
    <li class="timeline-item" v-for="(item,i) in items" :key="i">
      <div class="timestamp">{{item.ptime || item.source}}</div>
      <div class="con">
        <timeline-card :context="item"></timeline-card>
      </div>
    </li>
  </ul>
</template>

<script>
import TimelineCard from '@/components/timeline-card'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    TimelineCard
  }
}
</script>

<style lang='less' scoped>
.timeline {
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 32px;
    left: 5px;
    width: 4px;
    height: 100%;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAQAQMAAAALeEywAAAABlBMVEUAAADd3d3swgqXAAAAAXRSTlMAQObYZgAAAA1JREFUCNdjSMACkQAAUqADwbjktIgAAAAASUVORK5CYII=)
      repeat-y;
  }
  .timeline-item {
    position: relative;
    padding-left: 32px;
    .con {
      position: relative;
    }
    .timestamp {
      padding: 24px 0;
      font-size: 30px;
      line-height: 30px;
      position: relative;
      &::before {
        content: '';
        width: 15px;
        height: 15px;
        background-color: #f00;
        position: absolute;
        top: 31.5px;
        left: -32px;
      }
    }
  }
}
</style>
