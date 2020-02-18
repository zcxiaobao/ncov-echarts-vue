import axios from 'axios'
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   console.log(config)
//   config.params = {
//     ...config.params,
//     appkey: 'dongmeiqi_i_1545272862243'
//   }
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // if (response.data.code === 200) {
  return response.data
  // }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default axios
