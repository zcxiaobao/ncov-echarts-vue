<template>
  <div class="layout-default">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header height="80px">111</el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <zc-aside></zc-aside>
        </el-aside>

        <el-main>
          <router-view></router-view>
          <!-- main -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ZcAside from '@/components/aside/zc-aside.vue'
export default {
  name: 'Default',
  components: {
    ZcAside
  }
}
</script>

<style scoped lang='less'>
.el-header,
.el-main,
.el-footer {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  overflow: unset;
}

.el-header {
  background: #f8f8f8;
  color: #999;
  width: 100%;
  font-size: 12px;
}
.layout-default {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
