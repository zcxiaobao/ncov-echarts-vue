<template>
  <el-menu :default-active="activeUrl" class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/ncov-map" :route="{path: '/ncov-map'}">疫情地图</el-menu-item>
    <el-menu-item index="/ncov-world-map" :route="{path: '/ncov-world-map'}">疫情世界地图</el-menu-item>
    <el-menu-item index="/ncov-map-all-city" :route="{path: '/ncov-map-all-city'}">全部城市地图</el-menu-item>
    <el-menu-item index="/ncov-info" :route="{path: '/ncov-info'}">疫情表格</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeUrl: ''
    }
  },
  created() {
    this.activeUrl = this.$route.path
  }
}
</script>

<style>
</style>
