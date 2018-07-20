import axios from 'axios'
import store from './store'


let localhostDev = true
let urls = localhostDev ? '/market' : 'http://www.homeamc.cn'

const api = axios.create()
api.defaults.baseURL = urls
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截
api.interceptors.request.use(function (config) {

    return config

  }, function (error) {
    
    return Promise.reject(error)
})

// 添加响应拦截器
api.interceptors.response.use(function (response) {

    return response;

  }, function (error) {
    

    return Promise.reject(error)
})

export default {api , urls}