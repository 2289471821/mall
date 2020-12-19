import axios from 'axios'
import { baseURL, timeout } from './config'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({ baseURL, timeout })

  // 请求拦截
  instance.interceptors.request.use(
    config => {
      return config
    },
    error => console.log(error)
  )

  // 响应拦截
  instance.interceptors.response.use(
    res =>  {
      return res.data
    },
    error => console.log(error)
  )

  // 发送网络请求
  return instance(config)
}
