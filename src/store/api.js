import axios from 'axios'
import store from './store'
import Util from './storage'
import router from '../router'
import { Toast, Dialog } from 'vant'


let localhostDev = true  
let urls = localhostDev ? '/market' : 'http://www.homeamc.cn'

axios.defaults.baseURL = urls

// 请求拦截
axios.interceptors.request.use(function (config) {
  // console.log(store.state.market_wxh)
    if(store.state.market_wxh == '' || store.state.market_wxh == null || store.state.market_wxh == undefined){
      store.commit('market_wxh', Util.getLocal('market_wxh'))
      store.commit('market_openId', Util.getLocal('market_openId'))
      store.commit('market_unionId', Util.getLocal('market_unionId'))
      store.dispatch('carousel')
    }
 
   if(config.url !== '/market/shops/api/order/pay' && config.url !== '/market/shops/api/address/addadress') store.commit('isLoading', true)
    return config

  }, function (error) {
    
    return Promise.reject(error)
})

// 请求
const fetch = (url, params = '', headers = { 'Content_Type':'application/x-www-form-urlencoded' }) => {

  axios.defaults.headers.post['Content-Type'] = headers.Content_Type
  
  // 判断是否是FormData
  const data = Object.prototype.toString.call(params) === '[object FormData]' ? params : headers.Content_Type === 'application/json' ? params : $.param(params)   
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
} 

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  store.commit('isLoading', false)
  if(response.data.code == 9999) {
    Dialog.confirm({
        title: '您还没有绑定会员卡！',
        confirmButtonText:'去绑定'
    }).then(() => {
        Toast.clear()
        router.push({path:'/Opencard'})
    }).catch(()=>{
       Toast.clear()
    });
  }else if(response.data.code != 200) {
    Dialog.alert({
        title: '温馨提示',
        message: response.data.message,
        // confirmButtonText: '确定'
    }).then(() => {
        // router.push({path:'/'})
    })
  }
  
    return response;

  }, function (error) {
    store.commit('isLoading', false)
    Toast.fail('网络异常！')
    return Promise.reject(error)
})

export default {fetch , urls}