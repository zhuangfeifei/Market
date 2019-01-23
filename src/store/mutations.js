
import * as types from './types'
import Util from './storage'

export default {
    isLoading(state,res){
        state.isLoading = res
    },
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
    ['isPassword'](state,res){
        state.isPassword = res
    },
    isSuccess(state,res){
        state.isSuccess = res
    },
    isFocus(state,res){
        state.isFocus = res
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
    [types.GET_JFILLEGE](state,res){
        state.getJFIllege = res
    },
    [types.GET_INTEGRALHIS](state){
        state.getIntegralHis = Util.getLocal('getIntegralHis')
    },
    [types.GROUP_LIST](state){
        state.groupList = Util.getLocal('groupList')
    },
    [types.GROUP_LISTDETAIL](state){
        state.groupListDetail = Util.getLocal('groupListDetail')
    },
    [types.PREFERENTIAL_LIST](state){
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
    [types.BALANCE](state){
        state.balance = Util.getLocal('balance')
    },
    [types.MAINGOODS](state,res){
        state.mainGoods = res
    },
    [types.GETCRABGROUPLIST](state,res){
        state.crabgroupList = res
    },
    COUPONLIST(state,res){
        state.couponList = res
    },
    CategoryOneList(state,res){
        state.CategoryOneList = res
    },
    CategoryTwoOrThreeList(state,res){
        state.CategoryTwoOrThreeList = res
    },
    CategoryTwoOrThreeListDetail(state){
        state.CategoryTwoOrThreeListDetail = Util.getLocal('CategoryTwoOrThreeListDetail')
    },
    goodsList(state,res){
        state.goodsList = res
    },
    allGoodsByCategory(state,res){
        state.allGoodsByCategory = res
    },
    listadress(state,res){
        state.listadress = res
    },
    defaultAdress(state,res){
        state.defaultAdress = res
    },
    createGoods(state,res){
        state.createGoods = res
    },
    orderDetail(state,res){
        state.orderDetail = res
    },
    redPacketList(state,res){
        state.redPacketList = res
    },
    mySelfRedPacketList(state,res){
        state.mySelfRedPacketList = res
    },


    getList(state, res){
        state.getList = res
    },
    cartList(state){
        state.cartList = Util.getLocal('cartLists')
    },
    promotionList(state,res){
        state.promotionList = res
    },

// ------------------------- 普通订单 -------------------------
    CommonOrderDetail(state, res){
        state.CommonOrderDetail = res
    },


    index_goods(state, res){
        state.index_goods = res
    },
    CATEGORY_NAME(state, res){
        state.CATEGORY_NAME = res
    },



    
    scoreGoodDteail(state, res){
        state.scoreGoodDteail = res
    },
    myScoreGoodsList(state, res){
        state.myScoreGoodsList = res
    },



    index_icon(state, res){
        state.index_icon = res
    },




    market_wxh(state,res){
        state.market_wxh = res
    },
    market_openId(state,res){
        state.market_openId = res
    },
    market_unionId(state,res){
        state.market_unionId = res
    },



    
    getDeliverInfo(state,res){
        state.getDeliverInfo = res
    },
}

