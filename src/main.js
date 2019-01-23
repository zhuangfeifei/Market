// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import FontSize from './FontSize'
// import jQuery from 'jquery'
// Vue.prototype.$ = jQuery

import MescrollVue from 'mescroll.js/mescroll.vue'

import store from './store/store'
Vue.prototype.$store = store
import axios from './store/api'
Vue.prototype.$axios = axios

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    // error:'../static/error.png',
    // loading:'../static/placeholder.gif'
})

let time = setInterval(()=>{
  store.commit('market_wxh', getLocal('market_wxh'))
  store.commit('market_openId', getLocal('market_openId'))
  store.commit('market_unionId', getLocal('market_unionId'))
  try{
    if(store.state.market_wxhs != '' || store.state.market_wxhs != null || store.state.market_wxhs != undefined) {
      clearInterval(time)
    }
  }catch(e){
    
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
