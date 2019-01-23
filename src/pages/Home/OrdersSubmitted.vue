<template>
    <div id="OrdersSubmitted">

        <div class="OrdersSubmitted_order">
            <h4>订单信息</h4>
            <div class="OrdersSubmitted_order_">
                <div class="OrdersSubmitted_order_content"><p>订单编号</p><span>{{orderDetail.ORDER_NO}}</span></div>
                <div class="OrdersSubmitted_order_content"><p>下单时间</p><span>{{orderDetail.ORDER_DATE}}</span></div>
                <div class="OrdersSubmitted_order_content"><p>订单金额</p><span>{{orderDetail.ORDER_MONEY}}元</span></div>
                <div class="OrdersSubmitted_order_content">
                    <p>账户余额（{{isAmountFloats || 0}}元）</p>
                    <p><img class="OrdersSubmitted_order_checked" @click="isChangeChecked" :src="isAmountFloats > 0 && isChecked ? imgs[1] : imgs[0]" alt=""><span>{{isAmountFloats > 0 ? '可用' : '不可用'}}</span></p>
                </div>
                <div class="OrdersSubmitted_order_content" @click="showList = true">
                    <p>优惠红包</p><p><span class="redMoney">{{redMoneys.price}}元</span><img class="OrdersSubmitted_order_more" src="../../assets/img/yishoujiantou.png" alt=""></p>
                    <van-coupon-cell class="OrdersSubmitted_red" :coupons="coupons" :chosen-coupon="chosenCoupon" @click="onWatchshowList = true" />
                </div>
            </div>
            <div class="OrdersSubmitted_order_Real"><span>余额实付</span><span>{{wxAmount == 0 ? yueAmount > redMoneys.price ? yueAmount - redMoneys.price : 0.00 : redMoneys.price > wxAmount ? yueAmount - (redMoneys.price - wxAmount) : yueAmount}}元</span></div>
            <div class="OrdersSubmitted_order_Real"><span>微信实付</span><span>{{wxAmount > redMoneys.price ? wxAmount - redMoneys.price : 0.00}}元</span></div>
        </div>

        <div class="OrdersSubmitted_footer">
            <div><small>¥</small><span>{{moeny}}</span><span>（优惠{{redMoneys.price}}元）</span></div>
            <div @click="isPay">订单付款</div>
        </div>


        <PayCommon-item v-if="isPays" :isWx="!isChecked" :moeny="moeny" :redMoneys="redMoneys"></PayCommon-item>

        <!-- 优惠券列表 -->
        <van-popup v-model="showList" position="bottom">
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                @change="onChange"
                :show-exchange-bar="false"
            />
        </van-popup>
        
    </div>
</template>

<script>
import PayCommon from '@/components/PayCommon'
import { mapState } from 'vuex'
export default {
    data() {  
        return {
            chosenCoupon: -1, showList: false, imgs:[require('../../assets/img/checke.png'),require('../../assets/img/checkedRed.png')],isChecked: false,
            redMoneys: { couponId:'', price:0 }, 
            yueAmount: 0.00, wxAmount: 0.00
        }
    },
    components: {
        'PayCommon-item': PayCommon
    },
    beforeCreate(){
        this.$store.dispatch('orderDetail', this.$route.query.orderId)
        this.$store.dispatch('user')
        this.$store.dispatch('mySelfRedPacketListPay')
    },
    computed:{
        orderDetail(){
            this.wxAmount = this.$store.state.orderDetail.ORDER_MONEY
            return this.$store.state.orderDetail
        },
        coupons(){
            return this.$store.getters.coupons
        },
        user(){
            return this.$store.state.user
        },
        isAmountFloats(){
            if(this.user){
                return Number.isInteger(this.user.wtCustomer.amount) ? `${this.user.wtCustomer.amount}.00` : this.user.wtCustomer.amount
            }
        },
        moeny(){
            return this.orderDetail.ORDER_MONEY - this.redMoneys.price < 0 ? 0 : (this.orderDetail.ORDER_MONEY - this.redMoneys.price).toFixed(2)
        },
        isPays(){
            return this.$store.state.isPay
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '订单确认'
        // console.log(12)

        this.$nextTick(()=>{
            this.yueAmount = 0.00
            this.wxAmount = this.orderDetail.ORDER_MONEY
        })
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        address(){
            this.$router.push('/Address')
        },
        isChangeChecked(){
            if(this.isAmountFloats > 0){
                this.isChecked = !this.isChecked
                if(this.isChecked){
                    this.yueAmount = this.isAmountFloats > this.orderDetail.ORDER_MONEY ? this.orderDetail.ORDER_MONEY : this.isAmountFloats
                    this.wxAmount = this.isAmountFloats > this.orderDetail.ORDER_MONEY ? 0.00 : this.orderDetail.ORDER_MONEY - this.isAmountFloats
                }else{
                    this.yueAmount = 0.00
                    this.wxAmount = this.orderDetail.ORDER_MONEY
                }
            }
        },
        onChange(index) {
            this.showList = false;
            this.chosenCoupon = index;
            if(index > -1){
                let list = { couponId: this.coupons[index].couponId, orderMoney: this.orderDetail.ORDER_MONEY, goodsId: null }
                this.$store.dispatch('validationRedPacket', list)
                .then(res =>{
                    // console.log(res.data)
                    if(res.data.code == 200){
                        this.redMoneys.couponId = res.data.data.couponId
                        this.redMoneys.price = res.data.data.price
                    }else{
                        this.$toast(res.data.message)
                    }
                })
                .catch(err =>{})
            }else{
                this.redMoneys.price = 0
            }
        },
        isPay(){
            if(!this.isChecked){
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
            }
            this.$store.commit('SET_PAY', true)
            // console.log(this.isChecked)
            // console.log(this.user.wtCustomer.payPassword)
        },
        // yueAmount(){
        //     console.log(this.isChecked)
        //     // return this.isChecked ? 0.00 : this.isAmountFloats > this.orderDetail.ORDER_MONEY ? this.orderDetail.ORDER_MONEY : this.isAmountFloats
        // },
        // wxAmount(){
        //     return 12
        // },
    },
}
</script>

<style lang="less" scoped>
*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

#OrdersSubmitted{
    width: 100%; min-height: 100vh; background-color: rgba(246,246,246,1); font-size: 0.3rem; padding-bottom: 1.28rem;
}


.OrdersSubmitted_order{
    width: 100%; background-color: white;
    h4{ color:rgba(43,43,43,1); .font1; line-height: 1.1rem; margin-left: 0.4rem; }
    .OrdersSubmitted_order_{
        width: 100%; height: 4.36rem; padding: 0 0.4rem; border-top: 0.015rem solid rgba(206,206,206,1); border-bottom: 0.015rem solid rgba(206,206,206,1);
        .OrdersSubmitted_order_content{
            width: 100%; height: 0.86rem; border-bottom: 0.015rem dashed rgba(206,206,206,1); position: relative;
            display: flex; justify-content: space-between; align-items: center;
            p{ color:rgba(75,75,75,1); }
            span{ color:rgba(43,43,43,1); font-size: 0.28rem; .font1; }
            .OrdersSubmitted_red{ position: absolute; top: 0; right: 0; width: 100%; opacity: 0; }
            .redMoney{ color:rgba(234,22,22,1); margin-right: 0.1rem; }
            .OrdersSubmitted_order_more{ width: 0.16rem; height: 0.29rem; position: relative; top: 0.04rem; }
            .OrdersSubmitted_order_checked{ width: 0.27rem; height: 0.27rem; margin-right: 0.19rem; position: relative; top: 0.03rem; }
        }
        .OrdersSubmitted_order_content:last-child{ border: 0; }
    }
    .OrdersSubmitted_order_Real{
        width: 100%; padding: 0 0.4rem; text-align: right; line-height: 0.85rem; color:rgba(43,43,43,1); .font1;
        span:nth-child(2){ color:rgba(234,22,22,1); font-size: 0.36rem; margin-left: 0.25rem; }
    }
}

.OrdersSubmitted_footer{
    width: 100%; height: 1.08rem; line-height: 1.08rem; display: flex; position: fixed; bottom: 0; left: 0; background-color: white;
    div:nth-child(1){
        width: calc(100% - 3rem); height: 100%; padding-left: 0.4rem; border-top: 0.01rem solid rgba(206,206,206,1);
        span:nth-child(2),small{ color:rgba(234,22,22,1); .font3; }
        span:nth-child(2){ font-size: 0.5rem; }
        span:nth-child(3){ font-size: 0.24rem; color:rgba(75,75,75,1); .font2; }
    }
    div:nth-child(2){
        width: 3rem; height: 100%; background:rgba(255,139,75,1); color: white; .font1; text-align: center;
    }
}


</style>


