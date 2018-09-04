<template>
    <div id="Pay">

        <van-popup v-model="PageShow" position="bottom" :overlay="true" :close-on-click-overlay="false">
            <van-row class="Pay_title">
                <van-col span="3"><img @click="isShowPay" src="../assets/img/clear.png" alt=""></van-col>
                <van-col span="18">确认付款</van-col>
            </van-row>
            <div v-if="show" class="Pay_change">
                <p>订单编号：{{order.order_num}}</p>
                <h4>¥{{order.amount}}</h4>
                <h5>选择支付方式</h5>
                <van-row class="Pay_change_">
                    <van-col span="3"><img class="Pay_balance" src="../assets/img/balance.png" alt=""></van-col>
                    <van-col span="18">余额（当前余额：{{user.wtCustomer.amount}}）</van-col>
                    <van-col span="3"><img @click="change" class="Pay_checke" :src="checke_show ? img[0] : img[1]" alt=""></van-col>
                </van-row>
                <van-row class="Pay_change_">
                    <van-col span="3"><img class="Pay_balance" src="../assets/img/wei.png" alt=""></van-col>
                    <van-col span="18">微信</van-col>
                    <van-col span="3"><img @click="change" class="Pay_checke" :src="!checke_show ? img[0] : img[1]" alt=""></van-col>
                </van-row>
                <div @click="pay" class="Pay_start">立即付款</div>
            </div>
            <div v-else class="Pay_passwod">
                <p>请输入支付密码</p>
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
            img:[require('../assets/img/checke.png'),require('../assets/img/checked.png')],
            checke_show:true, value: '', showKeyboard: true, show:true,PageShow:true
        }
    },
    components: {
        
    },
    beforeCreate(){
        // this.$store.dispatch('user')
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        window.document.title = '支付订单'
        // console.log(wx)
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
        change(){
            this.checke_show = !this.checke_show
        },
        pay(){
            if(!this.checke_show){
                if(parseInt(this.user.wtCustomer.amount) < parseInt(this.order.amount)){
                    this.$dialog.alert({
                        title: '余额不足！',
                    }).then(() => {
                        
                    })
                    return
                }
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
                this.show = !this.show
                this.value = ''
            }else{
                this.wxPay()
            }
        },
        onInput(key) {
            this.value = (this.value + key).slice(0, 6)
            if(this.value.length == 6){
                this.$store.commit('SET_PAY', false)
                this.$toast.loading({
                    mask: true,
                    message: '支付中...',
                    duration: 0
                })
                var list = { orderId: this.order.order_id, payType: 3, payPwd: this.value }
                this.$store.dispatch('pay', list)
            }
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1)
        },
        wxPay(){
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
            var list = { orderId: this.order.order_id, payType: 2 }
            this.$store.dispatch('pay', list)
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
    h5{ text-align: left; font-size: 0.3rem; .font1; margin-top: 0.64rem; margin-bottom: 0.27rem; }
    .Pay_change_{
        font-size: 0.28rem; color:rgba(75,75,75,1); .font2; text-align: left; line-height: 0.48rem; margin-top: 0.2rem;
        .Pay_balance{ width: 0.48rem; height: 0.48rem; }
        .Pay_checke{ width: 0.3rem; height: 0.3rem; float: right; margin-top: 0.1rem; }
    }
    .Pay_start{
        width: 100%; height: 0.96rem; font-size: 0.34rem; .font3; color:rgba(255,255,255,1); 
        background:rgba(255,139,75,1); border-radius: 0.1rem; line-height: 0.96rem; margin-top: 1rem;
    }
}
.Pay_passwod{
    width: 100vw; height: calc(8rem - 0.87rem);
    p{ margin-top: 0.63rem; margin-bottom: 0.3rem; font-size: 0.28rem; color:rgba(75,75,75,1); .font1; }
    .Pay_input{ width: 90%; margin-left: 5%; }
}

</style>


