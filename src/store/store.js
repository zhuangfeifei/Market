import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import router from '../router'
import wx from 'weixin-js-sdk'
import * as types from './types'
import axios from './api'
import Util from './storage'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { Toast, Dialog } from 'vant'

const state = {
    isLoading: false,
    active: 0,   // 导航
    market_wxh: '',
    market_openId: '',
    market_unionId: '',
    imgUrl: axios.urls + '/shops/kaptcha/',
    imgUrlGoods: axios.urls + '/shops/kaptcha/file/gallery/',
    imgUrlIcons: axios.urls + '/shops/kaptcha/file/newfunc/',
    isPage: true,
    isPay: false,
    isPassword: false,
    isSuccess: false,
    isGetAuthentication: 2,
    html: '',
    isFocus: true,
    user: '',        // 获取用户信息
    carousel: '',    // 轮播图
    announceList: '',    // 公告
    announceDetail: '',    // 公告
    isFineList: '',    // 精选
    getContactList: '',    // 馆位
    shopDetail: '',    // 查询商户详情
    shopList: '',    // 根据分类查询商户列表
    List: '',       // 项目列表
    coupon: '',    // 优惠券列表
    couponDetail: '',    // 优惠券详情列表
    getIntegralHis: '',    // 获取积分记录 获取积分规则
    getJFIllege: '',    // 获取积分规则
    groupList: '',    // 获取商家团购卷列表
    groupListDetail: '',    // 获取商家团购卷列表详情
    preferentialList: '',    // 获取商家优惠活动列表
    order: '',    // 订单信息
    getBalance:'', // 获取余额
    getHistoryGroupOrder:'', // 查看个人历史团购订单
    documentType:'', // 获取业主认证证件类型
    basicinformation:'', // 获取业主认证信息
    balance:'', // 余额明细
    mainGoods:'', // 推荐商品（主推）
    crabgroupList:'', // 获取大闸蟹列表
    couponList:'', // 领取所有优惠券列表
    promotionList:'', // 

    CategoryOneList:'', // 获取商品一级分类列表
    CategoryTwoOrThreeList:'', // 根据一级分类主键id/二级分类主键id获取二级/三级商品分类信息列表
    CategoryTwoOrThreeListDetail:'', // 查询商品详情
    goodsList:'', // 分页查询商品列表
    brands:'', // 品牌列表
    allGoodsByCategory:'', // 分页查询商品列表
    createGoods:'', // 生成商品订单
    orderDetail:'', // 查询订单详情
    mySelfRedPacketList:'', // 获取我的优惠券列表

    listadress:'', // 获取用户地址列表
    defaultAdress:'', // 获取用户默认地址列表


    getList:'', // 获取购物车列表
    cartList:'', // 购物车列表

// ------------------------- 普通订单 -------------------------
    CommonOrderDetail:'', // 查询普通订单详情


    index_goods:'', // 首页商品列表
    CATEGORY_NAME:null, // 首页商品列表选中的title

    redPacketList:'', // 获取所有自领优惠券列表


    scoreGoodDteail:'', // 查看积分商城商品详情
    myScoreGoodsList:'', // 我的积分兑换列表




    index_icon:'', // 我的积分兑换列表


    getDeliverInfo:'', // 查询快递物流信息

    isKeepAlive:false, // 缓存
    includedComponent:'ShopActivity,CommonOrder', // 缓存
    includedComponents:'ShopActivity,Goods,CommonOrder,GoodStatus', // 缓存
    excludedComponents:'', // 缓存
    included:'Home,Classification,Brand,My', // 缓存
    excluded:'', // 缓存


    groupKillList:'', // 秒杀
    promotionList:'', // 秒杀
    times:'',
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})