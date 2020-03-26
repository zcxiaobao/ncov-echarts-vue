<template>
  <el-table
    ref="table"
    :data="tableData_"
    style="width: 100%"
    size="mini"
    v-show="tableData && tableData.length > 0"
    @row-click="toggleExpand"
    :row-class-name="tableRowClassName"
    header-row-class-name="even"
    :header-cell-class-name="tableHeaderCellClassName"
    :cell-class-name="tableCellClassName"
  >
    <el-table-column type="expand" width="1">
      <template slot-scope="props">
        <el-table
          :data="props.row.children"
          style="width: 100%"
          :show-header="false"
          :cell-class-name="tableCellClassName"
        >
          <el-table-column min-width="1" label="布局"></el-table-column>
          <el-table-column min-width="20" label="布局"></el-table-column>
          <el-table-column min-width="40" label="地区" prop="name"></el-table-column>
          <el-table-column min-width="50" label="新增确诊" prop="today.confirm" :formatter="formatVal"></el-table-column>
          <el-table-column min-width="40" label="确诊" prop="total.confirm"></el-table-column>
          <el-table-column min-width="40" label="死亡" prop="total.dead"></el-table-column>
          <el-table-column min-width="40" label="治愈" prop="total.heal"></el-table-column>
          <el-table-column min-width="40" label="疫情"></el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label min-width="20">
      <template slot-scope="props">
        <div v-if="props.row.children.length > 0">
          <i v-show="!props.row.expansion" class="iconfont el-icon-caret-bottom"></i>
          <i v-show="props.row.expansion" class="iconfont el-icon-caret-top"></i>
        </div>
      </template>
    </el-table-column>
    <el-table-column min-width="40" label="地区" prop="name"></el-table-column>
    <el-table-column min-width="50" label="新增确诊" prop="today.confirm" :formatter="formatVal"></el-table-column>
    <el-table-column min-width="40" label="确诊" prop="total.confirm"></el-table-column>
    <el-table-column min-width="40" label="死亡" prop="total.dead"></el-table-column>
    <el-table-column min-width="40" label="治愈" prop="total.heal"></el-table-column>
    <el-table-column min-width="40" label="疫情">
      <template slot-scope="props">
        <a v-show="props.row.children.length">编辑</a>
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
  computed: {
    tableData_() {
      return [...this.tableData].sort(
        (a, b) => b.total.confirm - a.total.confirm
      )
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
      } else if (columnIndex === 2) {
        return 'cell-default cell-normal cell-text-left'
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
        return classNameStr + ' cell-bold cell-text-left'
      }
      if (columnIndex === 3) {
        return classNameStr + ' cell-danger'
      }
      if (columnIndex === 7) {
        return classNameStr + ' cell-link'
      }
      return classNameStr
    },
    formatVal(row, column, cellValue, index) {
      return cellValue || '-'
    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .el-table__expanded-cell[class*='cell'] {
  padding: 0;
  border: none;
}
/deep/ .el-table__expand-column .cell {
  display: none;
}
</style>
