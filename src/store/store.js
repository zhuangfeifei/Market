import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import router from '../router'
import * as types from './types'
import axios from './api'
import Util from './storage'
import { Toast, Dialog } from 'vant'

const state = {
    active: 0,   // 导航
    market_wxh: Util.getLocal('market_wxh'),
    market_openId: Util.getLocal('market_openId'),
    unionId: Util.getLocal('unionId'),
    imgUrl: axios.urls + '/shops/kaptcha/',
    isPage: true,
    isPay: false,
    isGetAuthentication: 2,
    html: '',
    user: '',        // 获取用户信息
    carousel: '',    // 轮播图
    announceList: '',    // 公告
    isFineList: '',    // 精选
    getContactList: '',    // 馆位
    shopDetail: '',    // 查询商户详情
    shopList: '',    // 根据分类查询商户列表
    List: '',       // 项目列表
    coupon: '',    // 优惠券列表
    couponDetail: '',    // 优惠券详情列表
    getIntegralHis: '',    // 获取积分规则和记录
    groupList: '',    // 获取商家团购设置的团购卷码信息列表
    preferentialList: '',    // 获取商家优惠活动列表
    order: '',    // 订单信息
    getBalance:'', // 获取余额
    getHistoryGroupOrder:'', // 查看个人历史团购订单
    documentType:'', // 获取业主认证证件类型
    basicinformation:'', // 获取业主认证信息
    balance:'', // 余额明细
}

const mutations = {
    ['SET_PAGE'](state,res){
        state.isPage = res
    },
    ['SET_PAY'](state,res){
        state.isPay = res
    },
    ['HTML'](state,res){
        state.html = res
    },
    ['isGetAuthentication'](state,res){
        state.isGetAuthentication = res
    },
    [types.ACTIVE](state,res){
        state.active = res
    },
    [types.CAROUSEL](state,res){
        state.carousel = res
    },
    [types.ANNOUNCELIST](state,res){
        state.announceList = res
    },
    [types.ISFINELIST](state,res){
        state.isFineList = res
    },
    [types.GETCONTACTLIST](state,res){
        state.getContactList = res
    },
    [types.SHOP_DETAIL](state){
        state.shopDetail = Util.getLocal('shopDetail')
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
    [types.COUPON](state){
        state.coupon = Util.getLocal('coupon')
    },
    [types.COUPON_DETAIL](state,res){
        state.couponDetail = res
    },
    [types.GET_INTEGRALHIS](state){
        state.getIntegralHis = Util.getLocal('getIntegralHis')
    },
    [types.GROUP_LIST](state){
        state.groupList = Util.getLocal('groupList')
    },
    [types.PREFERENTIAL_LIST](state,res){
        state.preferentialList = Util.getLocal('preferentialList')
    },
    [types.ORDER](state){
        state.order = Util.getLocal('order')
    },
    [types.GET_BALANCE](state,res){
        state.getBalance = res
    },
    [types.GET_HISTORYGROUPORDER](state){
        state.getHistoryGroupOrder = Util.getLocal('getHistoryGroupOrder')
    },
    [types.DOCUMENTTYPE](state,res){
        state.documentType = res
    },
    [types.BASICINFORMATION](state){
        state.basicinformation = Util.getLocal('basicinformation')
    },
    [types.BALANCE](state,res){
        state.balance = Util.getLocal('balance')
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
    announceList({commit}){   // 公告
        axios.api.post('/shops/api/announce/announceList', $.param({ limit: 10, current: 1 }))
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('ANNOUNCELIST', res.data.data)
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
                }else{      // 关闭上拉加载
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
            if(res.data.code == 200) {
                Util.setLocal(res.data.data[0], 'shopDetail')
                commit('SHOP_DETAIL')
            }
        })
        .catch(err => console.log(err))
    },
    groupList({commit,state}, shopIds){   // 获取商家团购设置的团购卷码信息列表
        axios.api.post('/shops/api/groupOrder/groupList', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, 
            shopId: shopIds, groupType: '1' }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'groupList')
                commit('GROUP_LIST')
            }
        })
        .catch(err => console.log(err))
    },
    addGroupOrder({commit,state,dispatch}, list){   // 添加团购订单
        axios.api.post('/shops/api/groupOrder/addGroupOrder', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, 
            shopId: list.shop_id, groupType: list.group_type, groupName: list.group_name, amount: list.discount, groupId: list.id }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                router.push({path:'/GroupPurchaseOrderDetils', query:{ order_id: res.data.data.orderId}})
                Toast.clear()
            }
        })
        .catch(err => console.log(err))
    },
    getHistoryGroupOrderDetail({commit,state}, list){   // 团购订单详情
        axios.api.post('/shops/api/groupOrder/getHistoryGroupOrderDetail', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, 
            orderId: list.orderIds }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data[0], 'order')
                commit('ORDER')
            }else{
                Dialog.alert({
                    title: '温馨提示',
                    message: res.data.data.message,
                }).then(() => {
                    // router.push({path:'/'})
                })
            }
        })
        .catch(err => console.log(err))
    },
    pay({commit,state}, list){   // 团购订单支付
        axios.api.post('/shops/api/groupOrder/pay', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, 
            orderId: list.orderId, payType: list.payType, payPwd: list.payPwd }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('支付完成！')
                router.push({path:'/'})
            }
        })
        .catch(err => console.log(err))
    },
    cancelOrder({commit,state}, orderIds){   // 取消订单
        axios.api.post('/shops/api/groupOrder/cancelOrder', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, 
            orderId: orderIds }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('取消成功！')
                router.go(-1)
            }
        })
        .catch(err => console.log(err))
    },
    getHistoryGroupOrder({commit,state}, list){   // 查看个人历史团购订单
        axios.api.post('/shops/api/groupOrder/getHistoryGroupOrder', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId,
             limit: list.limit, current: list.current, orderStatus: list.tabIndex == 0 ? '' : list.tabIndex == 1 ? 0 : 1 }) )
        .then(res => { 
            // console.log(res.data)
            if(res.data.code == 200){
                if(list.current == 1){
                    Util.setLocal(res.data.data, 'getHistoryGroupOrder', false)
                    commit('GET_HISTORYGROUPORDER')
                }else if(res.data.data.length > 0){
                    Util.setLocal(res.data.data, 'getHistoryGroupOrder', list.isPage)
                    commit('GET_HISTORYGROUPORDER')
                }else{
                    commit('SET_PAGE', false)  
                }
            }
        })
        .catch(err => console.log(err))
    },
    getCode({commit,state}, orderIds){   // 获取劵码及二维码图片路径
        axios.api.post('/shops/api/groupOrder/getCode', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, orderId: orderIds }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Dialog.alert({
                    title: '温馨提示',
                    message: res.data.data.message,
                    // confirmButtonText: '确定'
                }).then(() => {
                    // router.push({path:'/'})
                })
            }
        })
        .catch(err => console.log(err))
    },
    preferentialList({commit,state}){   // 获取商家优惠活动列表
        axios.api.post('/shops/api/activity/preferentialList', $.param({ limit: 100, current: 1 }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'preferentialList')
                commit('PREFERENTIAL_LIST')
            }
        })
        .catch(err => console.log(err))
    },
    activityList({commit,state}){   // 获取商场优惠活动列表
        axios.api.post('/shops/api/activity/activityList', $.param({ limit: 100, current: 1 }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                // Util.setLocal(res.data.data, 'user')
                commit('PREFERENTIAL_LIST', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
    user({commit,state}){   // 获取用户信息
        axios.api.post('/shops/api/comment/userNew', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'user')
                commit('USER')
            }
        })
        .catch(err => console.log(err))
    },
    editUserInfo({commit,state}, list){   // 更新用户信息
        axios.api.post('/shops/api/customer/editUserInfo', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, 
            name: list.name, sex: list.sex, birthday: list.birthday }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('保存成功！')
                router.push({path:'/My'})
            }
        })
        .catch(err => console.log(err))
    },
    paypwd({commit,state}, pwds){   // 设置余额密码
        axios.api.post('/shops/api/set/paypwd', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, pwd: pwds }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('设置成功！')
                router.push({path:'/My'})
            }
        })
        .catch(err => console.log(err))
    },
    balance({commit,state}, list){   // 余额明细
        axios.api.post('/shops/api//bind/yue', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId,
            queryType: list.tabIndex, limit: list.limit, current: list.current, }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                if(list.current == 1){
                    Util.setLocal(res.data.data.yueList, 'balance', false)
                    commit('BALANCE')
                }else if(res.data.data.yueList.length > 0){
                    Util.setLocal(res.data.data.yueList, 'balance', list.isPage)
                    commit('BALANCE')
                }else{
                    commit('SET_PAGE', false)  
                }
            }
        })
        .catch(err => console.log(err))
    },
    coupon({commit,state}, list){   // 优惠券列表
        axios.api.post('/shops/api/order/coupon', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId,
            queryType: list.tabIndex, limit: list.limit, current: list.current, }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                if(list.current == 1){
                    Util.setLocal(res.data.data, 'coupon', false)
                    commit('COUPON')
                }else if(res.data.data.length > 0){
                    Util.setLocal(res.data.data, 'coupon', list.isPage)
                    commit('COUPON')
                }else{
                    commit('SET_PAGE', false)  
                }
            }
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
                }else if(list.current == 1){  // 如果是第一次请求或者搜索没有数据就更新数据
                    Util.setLocal(res.data.data, 'getIntegralHis', false)
                    commit('GET_INTEGRALHIS')
                }else{      // 关闭上拉加载
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
        axios.api.post('/shops/api/bind/phoneNew', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId, phone: list.phones, vcode: list.codes }))
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
    documentType({commit,state}){   // 获取业主认证证件类型
        axios.api.post('/shops/api/bind/documentType' )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('DOCUMENTTYPE', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
    ownerCertification({commit,state}, formData){   // 业主认证
        axios.api.post('/shops/api/bind/ownerCertification', formData )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('isGetAuthentication', 1)
            }else{
                commit('isGetAuthentication', 0)
            }
        })
        .catch(err => console.log(err))
    },
    basicinformation({commit,state}){   // 业主认证信息
        axios.api.post('/shops/api/bind/basicinformation', $.param({ access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.unionId }))
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'basicinformation')
                commit('BASICINFORMATION')
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