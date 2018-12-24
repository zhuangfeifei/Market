
import router from '../router'
import wx from 'weixin-js-sdk'
import axios from './api'
import Util from './storage'
import { Toast, Dialog } from 'vant'

export default {
// 
//
// ------------------------- 普通订单 -------------------------
// 
//
CommonOrder({state}, list){   // 查看个人历史普通订单
    return axios.fetch('/shopss/api/order/list', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
         limit: list.limit, current: list.current, orderStatus: list.tabIndex })
    .then(res => { 
        // console.log(res.data)
        if(res.data.code == 200){
            return Promise.resolve(res)
        }
    })
    .catch(err => console.log(err))
},
CommonOrderDetail({commit,state}, orderIds){   // 查询普通订单详情
    axios.fetch('/shopss/api/order/detail', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
        orderId: orderIds })
    .then(res => {
        // console.log(res.data)
        if(res.data.code == 200) {
            commit('CommonOrderDetail', res.data.data)
        }
    })
    .catch(err => console.log(err))
},
orderCancelOrder({state}, orderIds){   // 取消订单
    axios.fetch('/shopss/api/order/cancelOrder', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
        orderId: orderIds })
    .then(res => {
        // console.log(res.data)
        if(res.data.code == 200) {
            Toast.success('取消成功！')
            router.go(-1)
        }
    })
    .catch(err => console.log(err))
},
confirmDelivery({state}, orderIds){   // 取消订单
    axios.fetch('/shopss/api/order/confirmDelivery', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
        orderId: orderIds })
    .then(res => {
        // console.log(res.data)
        if(res.data.code == 200) {
            Toast.success('确认成功！')
            dispatch('CommonOrderDetail', orderIds)
        }
    })
    .catch(err => console.log(err))
},
async returnOrExchange({dispatch,state}, list){   // 提醒发货/退货、换货
    if(list.sale_type > 0){
        const img = await dispatch('uploadPicture', list.formData)
        Exchange(img)
    }else{
        const img = { message:'' }
        Exchange(img)
    }
    function Exchange(img){
        axios.fetch('/shopss/api/order/returnOrExchange', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            orderId: list.orderId, sale_type: list.sale_type, isGetGoods: list.isGetGoods, reason: list.reason, remark: list.reason, credentialsPic: img.message })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                if(list.sale_type == 0){
                    Toast.success('提醒成功！')
                    dispatch('CommonOrderDetail', list.orderId)
                }else{
                    Toast.success('提交成功！')
                    router.go(-1)
                }
            }
        })
        .catch(err => console.log(err))
    }
},
uploadPicture({}, formData){   // 上传图片
    return axios.fetch('/shopss/api/uploadPicture', formData )
    .then(res => {
        // console.log(res.data)
        if(res.data.code == 200) {
            return Promise.resolve(res.data)
        }
    })
    .catch(err => console.log(err))
},
//
//
// ------------------------- 购物车 -------------------------
//
//
    cartList({commit}, list){   // 购物车列表
        Util.setLocal(list, 'cartLists')
        commit('cartList')
    },
    getList({commit,state}){   // 获取购物车列表
        axios.fetch('/shopss/api/shoppingcart/getList', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            limit:100, current:1 })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                let list = res.data.data
                for(let i in list){
                    list[i].checked = false
                }
                commit('getList', list)
            }
        })
        .catch(err => console.log(err))
    },
    insertGoods({state}, id){   // 添加购物车
        axios.fetch('/shopss/api/shoppingcart/insertGoods', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            goodsid: id, amount: 1 })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('添加成功！')
            }
        })
        .catch(err => console.log(err))
    },
    updateAmount({state}, list){   // 更新购物车商品的数量
        axios.fetch('/shopss/api/shoppingcart/updateAmount', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            id: list.id, amount: list.amount })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                
            }
        })
        .catch(err => console.log(err))
    },
    deleteGoods({dispatch,state}, ids){   // 删除购物车商品
        axios.fetch('/shopss/api/shoppingcart/deleteGoods', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            ids: ids })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                dispatch('getList')
            }
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 商品下单 -------------------------
// 
// 
    CategoryOneList({commit,dispatch}){   // 获取商品一级分类列表
        axios.fetch('/shopss/api/goods/CategoryOneList')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('CategoryOneList', res.data.data)
                dispatch('CategoryTwoOrThreeList', res.data.data[0].ID)
            }
        })
        .catch(err => console.log(err))
    },
    CategoryTwoOrThreeList({commit}, id){   // 根据一级分类主键id/二级分类主键id获取二级/三级商品分类信息列表
        axios.fetch('/shopss/api/goods/CategoryTwoOrThreeList', { categoryId: parseInt(id) })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('CategoryTwoOrThreeList', res.data.data)
        })
        .catch(err => console.log(err))
    },
    goodsList({commit}, list){   // 分页查询商品列表
        return axios.fetch('/shopss/api/goods/list', { limit: list.limit, current: list.current, categoryId: list.categoryId, categoryLevel: list.categoryLevel, 
            goodsLabel: list.goodsLabel, goodsName: list.goodsName })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('goodsList', res.data.data)
            return Promise.resolve(res)
        })
        .catch(err => console.log(err))
    },
    CategoryTwoOrThreeListDetail({commit,state}, id){   // 查询商品详情
        axios.fetch('/shopss/api/goods/detail', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, goodsId: parseInt(id) })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'CategoryTwoOrThreeListDetail')
                commit('CategoryTwoOrThreeListDetail')
                commit('HTML', res.data.data.description)
            }
        })
        .catch(err => console.log(err))
    },
    createGoods({commit,state}, order){   // 生成商品订单
        let headers = {'Content_Type':"application/json"}
        axios.fetch('/shopss/api/order/create' +'?access_type=WXH5&wxh='+state.market_wxh+'&openId='+state.market_openId+'&unionId='+state.market_unionId,
            {order} , headers )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('createGoods', res.data.data)
                router.replace({path:'/OrdersSubmitted',query:{ orderId: res.data.data.orderId}})
            }
        })
        .catch(err => console.log(err))
    },
    mySelfRedPacketList({commit,state}){   // 获取我的优惠券列表
        axios.fetch('/shopss/api/redPacket/mySelfRedPacketList', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            stateType: '3', limit:100, current:1 }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('mySelfRedPacketList', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
    validationRedPacket({state}, list){   // 判断优惠券是否可用
        return axios.fetch('/shopss/api/redPacket/validationRedPacket', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            redPacketId: list.redPacketId, orderMoney: list.redPacketId }) 
        .then(res => {
            // console.log(res.data)
            return Promise.resolve(res)
        })
        .catch(err => console.log(err))
    },
    orderDetail({commit,state}, orderId){   // 查询订单详情
        axios.fetch('/shopss/api/order/detail', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, orderId:orderId }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('orderDetail', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 添加地址 -------------------------
// 
//
    listadress({commit,state}){   // 获取用户地址列表
        axios.fetch('/shopss/api/address/listadress', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, limit:100, current:1 })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('listadress', res.data.data)
                if(res.data.data.length == 0){
                    Dialog.confirm({
                        title: '去添加收货地址？',
                    }).then(() => {
                        router.push('/AddAddress')
                    }).catch(() => {
                    // on cancel
                    });
                }
                for(let i in res.data.data){
                    if(res.data.data[i].isdefault == 1 ) commit('defaultAdress', res.data.data[i])
                }
            }
        })
        .catch(err => console.log(err))
    },
    deladress({dispatch,state}, id){   // 删除用户地址
        axios.fetch('/shopss/api/address/deladress', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            id: id })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('删除成功！')
                dispatch('listadress')
            }
        })
        .catch(err => console.log(err))
    },
    defaultById({dispatch,state}, id){   // 设置默认地址
        axios.fetch('/shopss/api/address/defaultById', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            id: id })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('设置成功！')
                dispatch('listadress')
            }
        })
        .catch(err => console.log(err))
    },
    addadress({dispatch,state}, list){   // 添加用户地址列表
        // console.log(list)
        axios.fetch('/shopss/api/address/addadress', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            shipName: list.shipName, phoneNum:list.phoneNum, province:list.province, city:list.city, area:list.area, address:list.address, zipCode:list.zipCode, isdefault: list.isdefault })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('添加成功！')
                router.go(-1)
                dispatch('listadress')
            }
        })
        .catch(err => console.log(err))
    },
    updateadress({state}, list){   // 更新用户地址
        // console.log(list)
        axios.fetch('/shopss/api/address/updateadress', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, id: list.id,
            shipName: list.shipName, phoneNum:list.phoneNum, province:list.province, city:list.city, area:list.area, address:list.address, zipCode:list.zipCode, isdefault: list.isdefault })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('更新成功！')
                router.go(-1)
            }
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 首页 -------------------------
// 
//
    carousel({commit}){   // 轮播图
        axios.fetch('/shopss/api/basic/carousel')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('CAROUSEL', res.data.data)
        })
        .catch(err => console.log(err))
    },
    announceList({commit}){   // 公告
        axios.fetch('/shopss/api/announce/announceList', { limit: 10, current: 1 })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('ANNOUNCELIST', res.data.data)
        })
        .catch(err => console.log(err))
    },
    isFineList({commit}){   // 精选
        axios.fetch('/shopss/api/shop/isFineList', { limit: 100, current: 1 }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('ISFINELIST', res.data.data)
        })
        .catch(err => console.log(err))
    },
    index_goods({commit}){   // 首页商品列表
        axios.fetch('/shopss/api/newfunc/index_goods') 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('index_goods', res.data.data)
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 领取优惠券 -------------------------
// 
//
    couponList({commit,state}){   // 领取所有优惠券列表
        axios.fetch('/shopss/api/sinceCollar/couponList', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            limit: 500, current: 1 }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('COUPONLIST', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
    sinceCollarCoupon({state,dispatch,commit}, couponId){   // 领取优惠券
        axios.fetch('/shopss/api/sinceCollar/sinceCollarCoupon', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            couponId: couponId }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                dispatch('couponList')
                commit('isSuccess', true)
            }
        })
        .catch(err => console.log(err))
    },
    sinceCollarCouponDetail({state}, couponId){   // 领取优惠券详情
        axios.fetch('/shopss/api/sinceCollar/couponDetail', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            couponId: couponId }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                // dispatch('couponList')
                // Toast.success('领取成功！')
            }
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 商家列表 -------------------------
// 
//
    shopList({commit,dispatch}, list){   // 根据条件查询商户列表
        return axios.fetch('/shopss/api/shop/list', list ) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {   // 如果没有多个项目，就默认第一个
                return Promise.resolve(res)
            }
        })
        .catch(err => console.log(err))
    },
    getContactList({commit}, projectIds){   // 获取馆位列表数据
        axios.fetch('/shopss/api/shop/getContactList', { projectId: projectIds }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('GETCONTACTLIST', res.data.data)
        })
        .catch(err => console.log(err))
    },
    shopDetail({commit}, shopid){   // 查询商户详情
        axios.fetch('/shopss/api/shop/detail', { shopId: shopid }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data[0], 'shopDetail')
                commit('SHOP_DETAIL')
            }
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 团购订单 -------------------------
// 
//
    mainGoods({commit}, shopid){   // 推荐商品（主推）
        axios.fetch('/shopss/api/goods/mainGoods', { shopId: shopid }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('MAINGOODS', res.data.data)
        })
        .catch(err => console.log(err))
    },
    groupList({commit,state}, shopIds = ''){   // 获取商家团购卷列表
        axios.fetch('/shopss/api/groupOrder/groupList', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            shopId: shopIds, groupType: '' }) 
        .then(res => {
            // console.log(res.data)   
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'groupList')
                commit('GROUP_LIST')
            }
        })
        .catch(err => console.log(err))
    },
    groupListDetail({commit,state}, groupId){   // 获取商家团购卷列表详情
        axios.fetch('/shopss/api/groupOrder/groupListDetail', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            groupId:groupId }) 
        .then(res => {
            // console.log(res.data) 
            if(res.data.code == 200) {
                Util.setLocal(res.data.data[0], 'groupListDetail')
                commit('GROUP_LISTDETAIL')
            }
        })
        .catch(err => console.log(err))
    },
    addGroupOrder({state}, lists){   // 添加团购订单
        let list = lists.groupListDetail
        axios.fetch('/shopss/api/groupOrder/addGroupOrder', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            shopId: list.shop_id, groupType: 0, groupName: list.group_name, amount: (list.price * lists.num).toFixed(2), groupId: list.id, num: lists.num }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                router.push({path:'/GroupPurchaseOrderDetils', query:{ order_id: res.data.data.orderId}})
                Toast.clear()
            }else if(res.data.code == 251){
                Toast.clear()
                Dialog.confirm({
                    title: res.data.message,
                    confirmButtonText:'去验证'
                }).then(() => {
                    router.push({path:'/Authentication'})
                }).catch(()=>{
                   Toast.clear()
                });
            }
        })
        .catch(err => console.log(err))
    },
    getHistoryGroupOrderDetail({commit,state}, list){   // 团购订单详情
        axios.fetch('/shopss/api/groupOrder/getHistoryGroupOrderDetail', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            orderId: list.orderIds }) 
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
// 
//
// ------------------------- 支付 -------------------------
// 
//
    pay({state,dispatch}, list){   // 团购订单支付
        axios.fetch('/shopss/api/groupOrder/pay', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            orderId: list.orderId, payType: list.payType, payPwd: list.payPwd, yueAmount: list.yueAmount, wxAmount: list.wxAmount }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                if(list.payType === 3){
                    Toast.success('支付完成！')
                    let lists = { orderIds: list.orderId, status: 1 }
                    dispatch('getHistoryGroupOrderDetail', lists)
                }else{
                    let order_list = { orderIds: list.orderId, status: 1, result: res.data.data }
                    dispatch('wsPay', order_list)
                }
            }
        })
        .catch(err => console.log(err))
    },
    PayCommon({state,dispatch}, list){   // 普通订单支付
        axios.fetch('/shopss/api/order/pay',  list ) 
        .then(res => {
            // console.log(res.data)
            Toast.clear()
            if(res.data.code == 200) {
                if(list.payType === 3){
                    router.replace({path:'/Result', query:{ orderId: list.orderIds }})
                }else{
                    let order_list = { orderIds: list.orderId, status: 2, result: res.data.data }
                    dispatch('wsPay', order_list)
                }
            }
        })
        .catch(err => console.log(err))
    },
    wsPay({dispatch}, list){   // 微信支付
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": list.result.appId,     //公众号名称，由商户传入     
                "timeStamp": list.result.timestamp ,         //时间戳，自1970年以来的秒数     
                "nonceStr": list.result.nonce, //随机串     
                "package": list.result.packageName,
                "signType": list.result.signType,         //微信签名方式     
                "paySign": list.result.signature //微信签名 
            },
            (res) => {
                if (res.err_msg == "get_brand_wcpay_request:ok") {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                    if(list.status == 1){
                        dispatch('getHistoryGroupOrderDetail', list)
                    }else{
                        router.replace({path:'/Result',query:{orderId: list.orderIds}})
                    }
                } else {
                    if (res.err_msg != 'get_brand_wcpay_request:cancel') {
                        Toast.fail(res.err_msg)
                    }
                }
            }
        );
    },
// 
//
// ------------------------- 我的团购订单 -------------------------
// 
//
    cancelOrder({state}, orderIds){   // 取消订单
        axios.fetch('/shopss/api/groupOrder/cancelOrder', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            orderId: orderIds }) 
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
        return axios.fetch('/shopss/api/groupOrder/getHistoryGroupOrder', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, 
            unionId: state.market_unionId, limit: list.limit, current: list.current, orderStatus: list.orderStatus })
        .then(res => { 
            // console.log(res.data)
            if(res.data.code == 200){
                return Promise.resolve(res)
            }
        })
        .catch(err => console.log(err))
    },
    getCode({state}, orderIds){   // 获取劵码及二维码图片路径
        axios.fetch('/shopss/api/groupOrder/getCode', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, orderId: orderIds }) 
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
// 
//
// ------------------------- 活动 -------------------------
// 
//
    preferentialList({commit}, list){   // 获取商家优惠活动列表
        return axios.fetch('/shopss/api/activity/preferentialList', { limit: list.limit, current: list.current }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                return Promise.resolve(res)
            }
        })
        .catch(err => console.log(err))
    },
    activityList({commit}, list){   // 获取商场优惠活动列表
        return axios.fetch('/shopss/api/activity/activityList', { limit: list.limit, current: list.current }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                return Promise.resolve(res)
            }
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 会员中心 -------------------------
// 
//
    user({commit,state}){   // 获取用户信息
        axios.fetch('/shopss/api/comment/userNew',  { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'user')
                commit('USER')
            }
        })
        .catch(err => console.log(err))
    },
    editUserInfo({state}, list){   // 更新用户信息
        axios.fetch('/shopss/api/customer/editUserInfo', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, 
            name: list.name, sex: list.sex, birthday: list.birthday }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('保存成功！')
                router.push({path:'/My'})
            }
        })
        .catch(err => console.log(err))
    },
    paypwd({state}, pwds){   // 设置余额密码
        axios.fetch('/shopss/api/set/paypwd', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, pwd: pwds }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('设置成功！')
                router.go(-1)
            }
        })
        .catch(err => console.log(err))
    },
    updatePaypwd({commit,state}, newPwds){   // 修改余额密码
        axios.fetch('/shopss/api/set/updatePaypwd', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, newPwd: newPwds }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('isPassword', true)
        })
        .catch(err => console.log(err))
    },
    balance({commit,state}, list){   // 余额明细
        return axios.fetch('/shopss/api/bind/yue', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            queryType: list.queryType, limit: list.limit, current: list.current, }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                return Promise.resolve(res)
            }
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 优惠卷 -------------------------
// 
//
    coupon({commit,state}, list){   // 优惠券列表
        return axios.fetch('/shopss/api/order/coupon', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId,
            queryType: list.queryType, limit: list.limit, current: list.current, }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                return Promise.resolve(res)
            }
        })
        .catch(err => console.log(err))
    },
    couponDetail({commit,state}, couponIds){   // 优惠券详情列表
        axios.fetch('/shopss/api/order/coupon/detail', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, couponId: couponIds }) 
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
// 
//
// ------------------------- 积分 -------------------------
// 
//
    getIntegralHis({commit,state}, list){   // 获取积分记录
        axios.fetch('/shopss/api/card/getIntegralHis', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, current: list.current, limit: list.limit }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                if(list.current == 1){  // 如果是第一次请求或者搜索没有数据就更新数据
                    Util.setLocal(res.data.data, 'getIntegralHis', false)
                    commit('GET_INTEGRALHIS')
                }else if(list.current > 1 && res.data.data.length > 0){  // 如果大于0 则拼接数据
                    Util.setLocal(res.data.data, 'getIntegralHis', list.isPage)
                    commit('GET_INTEGRALHIS')
                }else{      // 关闭上拉加载
                    commit('SET_PAGE', false)  
                }
            }
        })
        .catch(err => console.log(err))
    },
    getJFIllege({commit}){   // 获取积分和会员卡规则
        axios.fetch('/shopss/api/card/getIllege')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('GET_JFILLEGE', res.data.data)
                commit('HTML',res.data.data.equity)
            }
        })
        .catch(err => console.log(err))
    },
    code({state}, list){   // 获取验证码      第一个参数不能为空
        axios.fetch('/pm/api/system/code/send', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, phone: list.phones, msgType:3 })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) Toast.success('发送成功！')
        })
        .catch(err => console.log(err))
    },
    phone({state}, list){   // 开通会员卡
        axios.fetch('/shopss/api/bind/phoneNew', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, phone: list.phones, vcode: list.codes })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('开通成功！')
                router.push({path:'/My'})
            }
        })
        .catch(err => console.log(err))
    },
    addIntegration({state,dispatch}, integration){   // 开通送积分
        axios.fetch('/shopss/api/card/addIntegration', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId, type: integration }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('签到成功！')
                dispatch('user')
            }
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 业主验证 -------------------------
// 
//
    documentType({commit}){   // 获取业主认证证件类型
        axios.fetch('/shopss/api/bind/documentType' )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('DOCUMENTTYPE', res.data.data)
        })
        .catch(err => console.log(err))
    },
    ownerCertification({commit}, formData){   // 业主认证
        axios.fetch('/shopss/api/bind/ownerCertification', formData )
        .then(res => {
            // console.log(res.data)
            res.data.code == 200 ? commit('isGetAuthentication', 1) : commit('isGetAuthentication', 0)
        })
        .catch(err => console.log(err))
    },
    basicinformation({commit,state}){   // 业主认证信息
        axios.fetch('/shopss/api/bind/basicinformation', { access_type:'WXH5', wxh: state.market_wxh, openId: state.market_openId, unionId: state.market_unionId })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'basicinformation')
                commit('BASICINFORMATION')
            }
        })
        .catch(err => console.log(err))
    },
// 
//
// ------------------------- 大闸蟹 -------------------------
// 
//
    promotionList({dispatch}, list){   // 获取大闸蟹列表
        axios.fetch('/shopss/api/promotion/promotionList', { current: list.current, limit: list.limit }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                // Util.setLocal(res.data.data[0], 'promotionList')
                // commit('SHOP_DETAIL')
                dispatch('crabgroupList', { id: res.data.data[0].id, list})
            }
        })
        .catch(err => console.log(err))
    },
    crabgroupList({commit}, list){   // 获取大闸蟹列表
        axios.fetch('/shopss/api/promotion/groupList', { promotionId: list.id, current: list.list.current, limit: list.list.limit }) 
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                // Util.setLocal(res.data.data[0], 'promotionList')
                commit('GETCRABGROUPLIST', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
}