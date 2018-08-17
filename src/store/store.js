import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import router from '../router'
import * as types from './types'
import axios from './api'
import Util from './storage'
import { Toast } from 'vant'

const state = {
    active: 0,   // 导航
    market_wxh: Util.getLocal('market_wxh'),
    market_openId: Util.getLocal('market_openId'),
    unionId: Util.getLocal('unionId'),
    imgUrl: axios.urls + '/shops/kaptcha/',
    user: '',        // 获取用户信息
    carousel: '',    // 轮播图
    isFineList: '',    // 精选
    getContactList: '',    // 馆位
    shopDetail: '',    // 查询商户详情
    shopList: '',    // 根据分类查询商户列表
    List: '',       // 项目列表
    coupon: '',    // 优惠券列表
    couponDetail: '',    // 优惠券详情列表
    getIntegralHis: '',    // 获取积分规则和记录
    isPage: true,
    html: '',
}

const mutations = {
    [types.ACTIVE](state,res){
        state.active = res
    },
    [types.CAROUSEL](state,res){
        state.carousel = res
    },
    [types.ISFINELIST](state,res){
        state.isFineList = res
    },
    [types.GETCONTACTLIST](state,res){
        state.getContactList = res
    },
    [types.SHOP_DETAIL](state,res){
        state.shopDetail = res
    },
    [types.SHOP_LIST](state){
        state.shopList = Util.getLocal('shopList')
    },
    [types.LIST](state,res){
        state.List = res
    },
    [types.USER](state){
        state.user = Util.getLocal('user')
    },
    [types.COUPON](state,res){
        state.coupon = res
    },
    [types.COUPON_DETAIL](state,res){
        state.couponDetail = res
    },
    [types.GET_INTEGRALHIS](state){
        state.getIntegralHis = Util.getLocal('getIntegralHis')
    },
    ['SET_PAGE'](state,res){
        state.isPage = res
    },
    ['HTML'](state,res){
        state.html = res
    },
}

const actions = {
    carousel({commit}){   // 轮播图
        axios.api.post('/shops/api/basic/carousel')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('CAROUSEL', res.data.data)
        })
        .catch(err => console.log(err))
    },
    isFineList({commit}){   // 精选
        axios.api.post('/shops/api/shop/isFineList', $.param({ limit: 100, current: 1 }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('ISFINELIST', res.data.data)
        })
        .catch(err => console.log(err))
    },
    shopList({commit,dispatch}, list){   // 根据条件查询商户列表
        axios.api.post('/shops/api/shop/list', $.param({ categoryId: list.categoryId, projectId: list.projectId, shopName: list.shopName, regionId: list.regionId, 
            floorId: list.floorId, limit: list.limit, current: list.current, sort: list.sort, order: list.order }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {   // 如果没有多个项目，就默认第一个
                dispatch('getContactList', list.projectId ? list.projectId : res.data.data.projects[0].ID)
                commit('LIST', res.data.data)
                if(res.data.data.shops.length > 0){  // 如果大于0 则拼接数据
                    Util.setLocal(res.data.data.shops, 'shopList', list.isPage)
                    commit('SHOP_LIST')
                }else if(list.current == 1 && res.data.data.shops.length == 0){  // 如果是第一次请求或者搜索没有数据就更新数据
                    Util.setLocal(res.data.data.shops, 'shopList', false)
                    commit('SHOP_LIST')
                }else{      // 关闭上拉刷新
                    commit('SET_PAGE', false)  
                }
            }
        })
        .catch(err => console.log(err))
    },
    getContactList({commit}, projectIds){   // 获取馆位列表数据
        axios.api.post('/shops/api/shop/getContactList', $.param({ projectId: projectIds }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('GETCONTACTLIST', res.data.data)
        })
        .catch(err => console.log(err))
    },
    shopDetail({commit}, shopid){   // 查询商户详情
        axios.api.post('/shops/api/shop/detail', $.param({ shopId: shopid }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('SHOP_DETAIL', res.data.data)
        })
        .catch(err => console.log(err))
    },
    user({commit,state}){   // 获取用户信息
        axios.api.post('/shops/api/comment/user', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId }) )
        .then(res => {
            console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'user')
                commit('USER')
            }
        })
        .catch(err => console.log(err))
    },
    editUserInfo({commit,state}, list){   // 更新用户信息
        axios.api.post('/shops/api/customer/editUserInfo', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, name: list.name, sex: list.sex, birthday: list.birthday }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('保存成功！')
                router.push({path:'/My'})
            }
        })
        .catch(err => console.log(err))
    },
    coupon({commit,state}){   // 优惠券列表
        axios.api.post('/shops/api/order/coupon', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('COUPON', res.data.data)
        })
        .catch(err => console.log(err))
    },
    couponDetail({commit,state}, couponIds){   // 优惠券详情列表
        axios.api.post('/shops/api/order/coupon/detail', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, couponId: couponIds }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('COUPON_DETAIL', res.data.data)
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    width: 200, height: 200
                })
                function makeCode(e) { qrcode.makeCode(e) }
                makeCode(res.data.data.qrcode)
            }
        })
        .catch(err => console.log(err))
    },
    getIntegralHis({commit,state}, list){   // 获取积分规则和记录
        axios.api.post('/shops/api/card/getIntegralHis', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, current: list.current, limit: list.limit }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                if(res.data.data.length > 0){  // 如果大于0 则拼接数据
                    Util.setLocal(res.data.data, 'getIntegralHis', list.isPage)
                    commit('GET_INTEGRALHIS')
                }else if(list.current == 1 && res.data.data.length == 0){  // 如果是第一次请求或者搜索没有数据就更新数据
                    Util.setLocal(res.data.data, 'getIntegralHis', false)
                    commit('GET_INTEGRALHIS')
                }else{      // 关闭上拉刷新
                    commit('SET_PAGE', false)  
                }
            }
        })
        .catch(err => console.log(err))
    },
    code({commit,state}, list){   // 获取验证码
        axios.api.post('/puman/api/system/code', $.param({ phone: list.phones, msgType:3 }))
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) Toast.success('发送成功！')
        })
        .catch(err => console.log(err))
    },
    phone({commit,state,dispatch}, list){   // 开通会员卡
        axios.api.post('/shops/api/bind/phone', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, phone: list.phones, vcode: list.codes }))
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) dispatch('addIntegration', 1)
        })
        .catch(err => console.log(err))
    },
    addIntegration({commit,state}, integration){   // 开通送积分
        axios.api.post('/shops/api/card/addIntegration', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, type: integration }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                integration == 1 ? Toast.success('开通成功！') : Toast.success('签到成功！')
                router.push({path:'/My'})
            }
        })
        .catch(err => console.log(err))
    },
}

const getters ={
    htmls: state => state.html.replace(/;/g,'').replace(/&gt/g,'>').replace(/&lt/g,'<').replace(/&apos/g,"'").replace(/&quot/g,"\\")
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})