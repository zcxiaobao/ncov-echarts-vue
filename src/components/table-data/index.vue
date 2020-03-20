<template>
  <el-table
    ref="table"
    :data="tableData"
    style="width: 100%"
    v-show="tableData && tableData.length > 0"
    @row-click="toggleExpand"
    :row-class-name="tableRowClassName"
    header-row-class-name="even"
    :header-cell-class-name="tableHeaderCellClassName"
    :cell-class-name="tableCellClassName"
  >
    <el-table-column type="expand" width="10">
      <template slot-scope="props">
        <el-table
          :data="props.row.children"
          style="width: 100%"
          :show-header="false"
          :cell-class-name="tableCellClassName"
        >
          <el-table-column width="10" label="布局"></el-table-column>
          <el-table-column width="28" label="布局"></el-table-column>
          <el-table-column label="地区" prop="name"></el-table-column>
          <el-table-column label="新增确诊" prop="today.confirm"></el-table-column>
          <el-table-column label="确诊" prop="total.confirm"></el-table-column>
          <el-table-column label="死亡" prop="total.dead"></el-table-column>
          <el-table-column label="治愈" prop="total.heal"></el-table-column>
          <el-table-column label="疫情"></el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label width="28">
      <template slot-scope="props">
        <div v-if="props.row.children.length > 0">
          <i v-show="!props.row.expansion" class="iconfont el-icon-caret-bottom"></i>
          <i v-show="props.row.expansion" class="iconfont el-icon-caret-top"></i>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="地区" prop="name"></el-table-column>
    <el-table-column label="新增确诊" prop="today.confirm"></el-table-column>
    <el-table-column label="确诊" prop="total.confirm"></el-table-column>
    <el-table-column label="死亡" prop="total.dead"></el-table-column>
    <el-table-column label="治愈" prop="total.heal"></el-table-column>
    <el-table-column label="疫情">
      <template slot-scope="props">
        <a v-show="props.row.children.length" @click="handleEdit(props.$index, props.row)">编辑</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  created() {
    // window.addEventListener('scroll', e => {
    //   console.log(e)
    // })
  },
  computed: {
    needTableData() {
      return this.tableData.map(t => {
        t.expansion = false
      })
    }
  },
  methods: {
    toggleExpand(row, column, event) {
      if (!row.children.length > 0) {
        return
      }
      this.$refs.table.toggleRowExpansion(row)
      row.expansion = !row.expansion
    },
    tableRowClassName({ row, rowIndex }) {
      return rowIndex % 2 ? 'odd' : 'even'
    },
    tableHeaderCellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3) {
        return 'cell-default cell-danger cell-normal'
      } else {
        return 'cell-default cell-normal'
      }
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      const classNameStr = 'cell-default'
      if (columnIndex === 1) {
        return classNameStr + ' cell-text-left'
      }
      if (columnIndex === 2) {
        return classNameStr + ' cell-bold'
      }
      if (columnIndex === 3) {
        return classNameStr + ' cell-danger'
      }
      if (columnIndex === 7) {
        return classNameStr + ' cell-link'
      }
      return classNameStr
    }
  }
}
</script>

<style scoped lang='less'>
/deep/ .el-table__expanded-cell[class*='cell'] {
  padding: 0;
  border: none;
}
/deep/ .el-table__expand-column .cell {
  display: none;
}
</style>
