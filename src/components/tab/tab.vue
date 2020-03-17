<template>
  <el-tabs v-model="activeTab_" type="card" @tab-click="tabToggle" class="ncov-tab">
    <el-tab-pane
      v-for="tab in tabs"
      :key="tab.label"
      :label="tab.label"
      :name="tab.name"
      class="tab-item"
    ></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    activeTab: {
      type: String,
      default: ''
    }
  },
  computed: {
    activeTab_: {
      get() {
        return this.activeTab
      },
      set(newActiveTab) {
        this.$emit('tab-toggle', { name: newActiveTab })
      }
    }
  },
  methods: {
    tabToggle(tab, event) {
      this.activeTab_ = tab.name
    }
  }
}
</script>

<style lang='less' scoped>
.ncov-tab {
  // position: absolute;
  // top: 5px;
  // left: 50%;
  // transform: translate3d(-50%, 0, 0);
  /deep/ .el-tabs__item {
    color: #666;
    height: 36px;
    line-height: 36px;
    background: #f7f7f7;
    border-radius: 2px;
    &.is-active {
      color: #4169e2;
      background: #f1f5ff;
      border-bottom: 1px solid transparent !important;
    }
  }
}
</style>
