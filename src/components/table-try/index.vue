<template>
  <el-date-picker
    v-model="value9"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    default-value="2010-10-01"
    :picker-options="pickerOptions"
    @blur="blur"
  ></el-date-picker>
</template>

<script>
export default {
  data() {
    return {
      value9: '',
      minDateTime: +new Date('2018-11-05'),
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime()
          if (maxDate) {
            this.pickerMinDate = ''
          }
        },
        disabledDate: time => {
          if (this.pickerMinDate !== '') {
            const day30 = 7 * 24 * 3600 * 1000
            let maxTime = this.pickerMinDate + day30
            const minTime = this.pickerMinDate - day30
            if (maxTime >= new Date()) {
              maxTime = new Date()
            }
            return time.getTime() > maxTime || time.getTime() < minTime
          }
          return time.getTime() >= Date.now()
        }
      }
    }
  },
  methods: {
    disabledDate() {
      console.log(arguments)
    },
    blur() {
      this.value9 = ''
      this.pickerMinDate = ''
    }
  }
}
</script>
