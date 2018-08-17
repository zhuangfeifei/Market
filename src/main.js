// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import FontSize from './FontSize'
// import jQuery from 'jquery'
// Vue.prototype.$ = jQuery

import store from './store/store'
Vue.prototype.$store = store

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    // error:'../static/error.png',
    // loading:'../static/placeholder.gif'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
