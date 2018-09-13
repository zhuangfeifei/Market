<template>
    <div id="Pay">

        <van-popup v-model="PageShow" position="bottom" :overlay="true" :close-on-click-overlay="false">
            <van-row class="Pay_title">
                <van-col span="3"><img @click="isShowPay" src="../assets/img/clear.png" alt=""></van-col>
                <van-col span="18">确认付款</van-col>
            </van-row>
            <div v-if="isYu" class="Pay_change">
                <p>订单编号：{{order.order_num}}</p>
                <h4>¥{{isWx ? order.amount : user.wtCustomer.amount > order.amount ? order.amount : (order.amount - user.wtCustomer.amount).toFixed(2)}}</h4>
                <div @click="pay" class="Pay_start">立即付款</div>
            </div>
            <div v-else class="Pay_passwod">
                <p>请输入余额支付密码</p>
                <van-password-input class="Pay_input" :value="value" info="" @focus="showKeyboard = true" />
                <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = true" />
            </div>
        </van-popup>

    </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
    data(){
        return{
            checke_show:true, value: '', showKeyboard: true, isYu:true, PageShow:true
        }
    },
    components: {
        
    },
    props:['isWx'],
    beforeCreate(){
        // this.$store.dispatch('user')
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        window.document.title = '支付订单'
    },
    computed:{
        order(){
            return this.$store.state.order
        },
        user(){
            if(this.$store.state.user == ''){
                this.$store.commit('USER')
            }
            return this.$store.state.user
        },
    },
    methods:{
        isShowPay(){
            this.$store.commit('SET_PAY', false)
        },
        pay(){
            this.isWx ? this.wxPay() : this.isYu = false 
        },
        onInput(key) {
            this.value = (this.value + key).slice(0, 6)
            if(this.value.length == 6){
                this.$store.commit('SET_PAY', false)
                if(!this.isWx && this.user.wtCustomer.amount > this.order.amount){
                    this.$toast.loading({
                        mask: true,
                        message: '支付中...',
                        duration: 0
                    })
                    var list = { orderId: this.order.order_id, payType: 3, payPwd: this.value, yueAmount: this.order.amount, wxAmount: this.order.amount, }
                    this.$store.dispatch('pay', list)
                }else{
                    this.wxPay()
                }
            }
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1)
        },
        wxPay(){
            this.$store.commit('SET_PAY', false)
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                }
            }else{
                this.onBridgeReady();
            }
        },
        onBridgeReady(){
            var list = { orderId: this.order.order_id, payType: 2, yueAmount: this.order.amount, wxAmount: this.order.amount }
            var lists = { orderId: this.order.order_id, payType: 4, payPwd: this.value, yueAmount: this.user.wtCustomer.amount, wxAmount: parseFloat((this.order.amount - this.user.wtCustomer.amount).toFixed(2)) }
            this.isWx ? this.$store.dispatch('pay', list) : this.$store.dispatch('pay', lists)
        }
    }
}
</script>
<style lang="less" scoped>
#Pay{
    width: 100%; font-size: 0.3rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }


.van-popup--bottom{
    height: 8.3rem; width: 100vw; text-align: center;
}
.Pay_title{
    width: 100vw; height: 0.87rem; font-size: 0.37rem; .font3; text-align: center; line-height: 0.87rem; border-bottom: 0.01rem solid rgba(232,232,232,1);
    img{ width: 0.33rem; height: 0.33rem; }
}
.Pay_change{
    width: 100vw; height: calc(8rem - 1.3rem); padding: 0 0.4rem;
    p{ margin-top: 0.63rem; font-size: 0.28rem; color:rgba(75,75,75,1); .font1; }
    h4{ font-size: 0.6rem; .font3; margin-top: 0.48rem; letter-spacing: 0.06rem; }
    .Pay_start{
        width: 100%; height: 0.96rem; font-size: 0.34rem; .font3; color:rgba(255,255,255,1); 
        background:rgba(255,139,75,1); border-radius: 0.1rem; line-height: 0.96rem; margin-top: 3.5rem;
    }
}
.Pay_passwod{
    width: 100vw; height: calc(8rem - 0.87rem);
    p{ margin-top: 0.63rem; margin-bottom: 0.3rem; font-size: 0.28rem; color:rgba(75,75,75,1); .font1; }
    .Pay_input{ width: 90%; margin-left: 5%; }
}

</style>


