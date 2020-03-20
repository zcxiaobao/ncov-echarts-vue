<template>
  <el-table
    v-show="needTableData.length > 0"
    :data="needTableData"
    :span-method="objectSpanMethod"
    border
    style="width: 100%; margin-top: 20px"
  >
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
    <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
    <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
  </el-table>
</template>

<script>
export default {
  // props: {
  //   tableData6: {
  //     type: Array,
  //     default: []
  //   }
  // },
  // watch: {
  //   tableData6() {
  //     this.dealWithTableData()
  //   }
  // },
  data() {
    return {
      tableData6: [
        {
          id: '12987122',
          status: {
            name: '状态',
            amount1: '234',
            amount2: '3.2',
            amount3: 10
          },
          total: {
            name: '数目',
            amount1: '222',
            amount2: '3.2',
            amount3: 222
          },
          other: {
            name: '其他',
            amount1: '777',
            amount2: '45',
            amount3: 259
          }
        },
        {
          id: 'dddd',
          status: {
            name: '状态',
            amount1: '223',
            amount2: '122.2',
            amount3: 910
          },
          total: {
            name: '数目',
            amount1: '789',
            amount2: '35',
            amount3: 1022
          },
          other: {
            name: '其他',
            amount1: '117',
            amount2: '3.05',
            amount3: 258
          }
        }
      ],
      needTableData: []
    }
  },
  created() {
    this.dealWithTableData()
  },
  methods: {
    dealWithTableData() {
      this.tableData6.forEach(t => {
        const { id, status, total, other } = t
        this.needTableData.push({ id, ...status })
        this.needTableData.push({ id, ...total })
        this.needTableData.push({ id, ...other })
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>
