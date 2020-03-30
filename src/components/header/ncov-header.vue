<!--
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-02-20 12:22:00
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-03-30 21:57:41
 -->
<template>
  <el-menu :default-active="activeUrl" class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/ncov-map" :route="{path: '/ncov-map'}">疫情地图</el-menu-item>
    <el-menu-item index="/ncov-world-map" :route="{path: '/ncov-world-map'}">疫情世界地图</el-menu-item>
    <el-menu-item index="/ncov-map-all-city" :route="{path: '/ncov-map-all-city'}">全部城市地图</el-menu-item>
    <el-menu-item index="/ncov-info" :route="{path: '/ncov-info'}">疫情表格</el-menu-item>
    <el-menu-item index="/china" :route="{path: '/china'}">国内疫情</el-menu-item>
    <el-menu-item index="/overseas" :route="{path: '/overseas'}">海外疫情</el-menu-item>
    <el-menu-item index="/realtime" :route="{path: '/realtime'}">实时播报</el-menu-item>
    <el-menu-item index="/authority" :route="{path: '/authority'}">实时播报</el-menu-item>
    <el-menu-item index="/paper" :route="{path: '/paper'}">前沿报告</el-menu-item>
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
