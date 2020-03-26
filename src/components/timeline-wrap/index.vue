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
    top: 0.32rem;
    left: 0.05rem;
    width: 0.04rem;
    height: 100%;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAQAQMAAAALeEywAAAABlBMVEUAAADd3d3swgqXAAAAAXRSTlMAQObYZgAAAA1JREFUCNdjSMACkQAAUqADwbjktIgAAAAASUVORK5CYII=)
      repeat-y;
  }
  .timeline-item {
    position: relative;
    padding-left: 0.32rem;
    .con {
      position: relative;
    }
    .timestamp {
      padding: 0.24rem 0;
      font-size: 0.3rem;
      line-height: 0.3rem;
      position: relative;
      &::before {
        content: '';
        width: 0.15rem;
        height: 0.15rem;
        background-color: #f00;
        position: absolute;
        top: 0.315rem;
        left: -0.32rem;
      }
    }
  }
}
</style>
