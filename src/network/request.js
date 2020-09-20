// 1.axios的基本使用
// import axios from 'axios'
// axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
// }).then(res => {
//   console.log(res);
// })

// 2.axios发送并发请求
// axios.all([
//   axios({
//     url: 'http://123.207.32.32:8000/home/multidata'
//   }), 
//   axios({
//     url: 'http://123.207.32.32:8000/home/data',
//     params: {
//       type: 'pop',
//       page: 1
//     }
//   })
// ]).then(axios.spread((res1, res2) => {
//   console.log(res1);
//   console.log(res2);
// }))

import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    // 请求拦截的作用
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标(等待转圈的图标)
    // 3.某些网络请求（比如登录），必须携带一些特殊的信息
    return config
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    // 响应拦截
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
