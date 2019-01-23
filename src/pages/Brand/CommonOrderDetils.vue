<template>
    <div id="CommonOrderDetils">

        <nav class="CommonOrderDetils_nav">
            <div><span>订单状态：{{orderStatus[CommonOrderDetail.ORDER_STATUS]}}</span><p>订单日期：{{CommonOrderDetail.ORDER_DATE}}</p></div>
            <img :src="imgStatus[CommonOrderDetail.ORDER_STATUS > 2 ? 2 : CommonOrderDetail.ORDER_STATUS]" alt="">
        </nav>

        <div class="CommonOrderDetils_address">
            <img src="../../assets/img/address.png" alt="">
            <div><p>收货人：</p><p>收货地址：</p></div>
            <div>
                <p>{{CommonOrderDetail.RECIEVE_MAN}}<span>{{CommonOrderDetail.RECIEVE_PHONE}}</span></p>
                <section>{{CommonOrderDetail.ADDRESS}}</section>
            </div>
        </div>

        <div class="CommonOrderDetils_order">
            <h4>方圆里商城</h4>
            <div class="CommonOrderDetils_goods" v-for="(item,index) in CommonOrderDetail.goodsList" :key="index">
                <img :src="imgUrlGoods + item.THUMB_PIC" alt="">
                <div class="CommonOrderDetils_goods_content">
                    <div>{{item.GOODS_NAME}}</div>
                    <p>规格：{{item.goods_specif}}</p>
                    <p>x{{item.GOODS_NUM}}<span>{{item.NOW_PRICE}}元</span></p>
                </div>
            </div>
            <div class="CommonOrderDetils_combined">共{{goods_Allnum}}件商品，合计<span>￥{{CommonOrderDetail.ORDER_MONEY}}</span>（含运费<span class="freight">￥0</span>）</div>
            <div class="CommonOrderDetils_order_content">
                <van-row>
                    <van-col span="8" class="CommonOrderDetils_order_content_title"><p>订单编号</p><p>订单金额</p><p>优惠券抵</p><p>积分抵</p><p>运费</p><p>实际支付</p></van-col>
                    <van-col span="16">
                        <p>{{CommonOrderDetail.ORDER_NO}}</p><p>￥{{CommonOrderDetail.ORDER_MONEY}}</p><p>-￥{{CommonOrderDetail.COUPON_AMOUNT}}</p>
                        <p>-￥{{CommonOrderDetail.INTEGRAL_AMOUNT}}</p><p>￥0</p><p>¥{{CommonOrderDetail.COUPON_AMOUNT > 0 ? CommonOrderDetail.TOTAL_AMOUNT : CommonOrderDetail.ORDER_MONEY}}</p>
                    </van-col>
                </van-row>
            </div>
        </div>

        <div v-if="CommonOrderDetail" class="CommonOrderDetils_footer">
            <div v-if="CommonOrderDetail.ORDER_STATUS > 0 && CommonOrderDetail.ORDER_STATUS < 3" @click.stop="$router.push({path:'/Return',query:{ id: CommonOrderDetail.ID }})" class="CommonOrder_status_return">退换货</div>
            <div v-if="CommonOrderDetail.ORDER_STATUS == 2" class="CommonOrder_status_Confirm" @click="confirmDelivery">确认收货</div>
            <div v-if="CommonOrderDetail.ORDER_STATUS >= 2" @click.stop="$router.push({path:'/Logistics',query:{ id: CommonOrderDetail.deliverno }})" class="CommonOrder_status_Cancel">查看物流</div>
            <div v-if="CommonOrderDetail.orderAfterList.length > 0 && CommonOrderDetail.orderAfterList[0].sale_type == 0 && CommonOrderDetail.ORDER_STATUS < 2" class="CommonOrder_status_remind">已提醒</div>
            <div v-if="CommonOrderDetail.ORDER_STATUS > 0 && CommonOrderDetail.orderAfterList.length == 0 && CommonOrderDetail.ORDER_STATUS < 2" class="CommonOrder_status_delivery" @click="delivery">提醒发货</div>
            <div v-if="CommonOrderDetail.ORDER_STATUS == 0" @click="orderCancelOrder" class="CommonOrder_status_Cancel">取消订单</div>
            <div v-if="CommonOrderDetail.ORDER_STATUS == 0" class="CommonOrder_status_payment" @click="pay">付款</div>
        </div>
        
    </div>
</template>

<script>
import Pay from '@/components/Pay'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            orderStatus:['待付款','待发货','待收货','退换货','已完成'], 
            imgStatus:[require('../../assets/img/payment.png'),require('../../assets/img/delivery.png'),require('../../assets/img/Confirm.png')],
        }
    },
    components: {
        'pay-item': Pay
    },
    beforeCreate(){
        this.$store.dispatch('CommonOrderDetail', this.$route.query.order_id)
        this.$store.dispatch('user')
    },
    computed:{
        ...mapState({
            imgUrlGoods: state => state.imgUrlGoods,
            CommonOrderDetail: state => state.CommonOrderDetail,
            user: state => state.user,
            goods_Allnum(){
                if(this.CommonOrderDetail){
                    let num = 0
                    for(let val of this.CommonOrderDetail.goodsList){
                        num += val.GOODS_NUM
                    }
                    return num
                }
            },
        }),
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '订单详情'
        
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        pay(){
            if(this.user.wtCustomer.payPassword == '' || this.user.wtCustomer.payPassword == null){
                this.$dialog.confirm({
                    title: '您还没有设置密码！',
                    confirmButtonText:'去设置'
                }).then(() => {
                    this.$router.push({path:'/Setpassword'})
                }).catch(()=>{

                });
                return
            }
            this.$router.push({path:'/OrdersSubmitted',query:{ orderId: this.CommonOrderDetail.ID }})
        },
        delivery(){
            let list = { orderId: this.CommonOrderDetail.ID, sale_type: 0, isGetGoods: 0, reason: 3, remark:'', credentialsPic:'' }
            this.$store.dispatch('returnOrExchange', list)
        },
        orderCancelOrder(){
            this.$dialog.confirm({
                title: '确认取消订单？',
            }).then(() => {
                this.$store.dispatch('orderCancelOrder', this.CommonOrderDetail.ID)
            }).catch(() => {
                // on cancel
            });
        },
        confirmDelivery(){
            this.$dialog.confirm({
                title: '确认收货？',
            }).then(() => {
                this.$store.dispatch('confirmDelivery', this.CommonOrderDetail.ID)
            }).catch(() => {
                // on cancel
            });
        },
    },
}
</script>

<style lang="less" scoped>
#CommonOrderDetils{
    width: 100%; min-height: 100vh; background:rgba(232,232,232,1); font-size: 0.3rem; padding-bottom: 1.1rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

.CommonOrderDetils_nav{
    width: 100%; height: 1.68rem; background:linear-gradient(90deg,rgba(255,139,75,1),rgba(234,22,22,1));
    color: white; padding: 0 0.64rem; .font1; display: flex; justify-content: space-between; align-items: center;
    div p{ font-size: 0.24rem; color:rgba(255,254,254,1); .font2; opacity: 0.8rem; line-height: 0.5rem; }
    img{ width: 1.08rem; height: 0.91rem; }
}

.CommonOrderDetils_address{
    width: 100%; height: 1.69rem; margin: 0.2rem 0; background-color: white; padding: 0 0.4rem; display: flex; justify-content: space-between; align-items: center;
    img{ width: 0.32rem; height: 0.4rem; }
    div{ height: 100%; padding: 0.2rem 0; color:rgba(75,75,75,1); font-size: 0.28rem; .font2; line-height: 0.5rem; }
    div:last-child{
        width: 4.3rem;
        p{ span{ float: right; font-size: 0.3rem; color:rgba(68,68,68,1); } }
        section{ width: 100%; height: 0.8rem; line-height: 0.4rem; margin-top: 0.025rem; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;  }
    }
}

.CommonOrderDetils_order{
    width: 100%; background-color: white; 
    h4{ font-size: 0.36rem; color:rgba(43,43,43,1); .font3; line-height: 1.2rem; margin-left: 0.4rem; }
    .CommonOrderDetils_goods{
        width: 100%; height: 1.6rem; background:rgba(247,247,247,1); padding: 0 0.4rem; display: flex; justify-content: space-between; align-items: center;
        img{ width: 1.2rem; height: 1.2rem; }
        .CommonOrderDetils_goods_content{
            width: calc(100% - 1.7rem); height: 1.2rem; display: flex; flex-flow: column; justify-content: space-between;
            div{ width: 100%; height: 0.35rem; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; line-height: 0.35rem; font-size: 0.3rem; .font3; }
            p{ 
                font-size: 0.24rem; color:rgba(128,128,128,1); .font2; line-height: 0.24rem;
                span{ float: right; color:rgba(43,43,43,1); font-size: 0.3rem; .font2; } 
            }
        }
    }
    .CommonOrderDetils_combined{
        width: calc(100% - 0.8rem); height: 0.87rem; line-height: 0.87rem; text-align: right; margin: 0 auto;
        border-bottom: 0.015rem dashed rgba(206,206,206,1); font-size: 0.28rem; color:rgba(75,75,75,1);
        span{ color: #EA1616; .font3; }
        .freight{ .font2; }
    }
    .CommonOrderDetils_order_content{
        width: calc(100% - 0.8rem); margin: 0 auto; line-height: 0.6rem; padding: 0.3rem 0;
        p{ color:rgba(128,128,128,1); font-size: 0.28rem; .font2; }
        .CommonOrderDetils_order_content_title{ p{ color:rgba(75,75,75,1); .font1; } }
    }
}

.CommonOrderDetils_footer{
    width: 100%; height: 0.98rem; font-size: 0.28rem; .font3; padding-right: 0.1rem; display: flex; flex-flow: row-reverse; align-items: center;
    position: fixed; bottom: 0; left: 0; background-color: white; border-top: 0.01rem solid rgba(255,139,75,1);
    div{ 
        width: 1.6rem; height: 0.6rem; line-height: 0.6rem; text-align: center; margin-right: 0.3rem;
        border-radius: 0.3rem; border: 0.02rem solid rgba(43,43,43,1); 
    }
    .CommonOrder_status_payment,.CommonOrder_status_delivery,.CommonOrder_status_Confirm{ border: 0.02rem solid rgba(255,139,75,1); color: rgba(255,139,75,1); }
    .CommonOrder_status_Cancel,.CommonOrder_status_return{ border: 0.02rem solid rgba(43,43,43,1); color: rgba(43,43,43,1); }
    .CommonOrder_status_remind{ border: 0.02rem solid rgba(128,128,128,1); color: rgba(128,128,128,1); }
}
   
    
</style>


