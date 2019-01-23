<template>
    <div id="My" v-if="user">

        <nav class="My_nav" @click="$router.push('/Membership')">
            <section><img :src="user.wtCustomer.avatar" alt=""><img v-if="user.wtCustomer.phonenumber != ''" src="../../assets/my/king.png" alt=""></section>
            <div><p>{{user.wtCustomer.nickname}}<span v-if="user.wtCustomer.phonenumber != ''" class="My_vip">会员</span></p><span>{{user.wtCustomer.phonenumber}}</span></div>
        </nav>

        <div class="My_isOpen">
            <div><p>会员特权</p><span>生日有礼，积分加倍</span></div>
            <div v-if="user.wtCustomer.phonenumber == ''" @click="$router.push('/Opencard')">去开通</div>
            <p class="My_permissions" v-else @click="$router.push('/Card')">查看权限>></p>
        </div>

        <div class="My_list">
            <div class="My_list_" @click="$router.push('/Balance')">
                <div><img src="../../assets/my/Integral.png" alt=""><span>账户余额（元）</span><p>{{'¥'+(isFloats || 0)}}</p></div>
                <div></div>
                <!-- <div>充值有礼</div> -->
            </div>
            <div class="My_list_" @click="$router.push('/Wallet')">
                <div><img src="../../assets/my/well.png" alt=""><span>我的积分</span></div>
                <div><span>{{user.wtCustomer.integration || 0}}分</span><img src="../../assets/my/more.png" alt=""></div>
            </div>
            <div class="My_list_" @click="$router.push('/Coupon')">
                <div><img src="../../assets/my/coupon.png" alt=""><span>我的优惠券</span></div>
                <div><span>共{{user.couponNum || 0}}张可用</span><img src="../../assets/my/more.png" alt=""></div>
            </div>
            <div class="My_list_" @click="$router.push('/CommonOrder')">
                <div><img src="../../assets/my/order.png" alt=""><span>我的订单</span></div>
                <div><img src="../../assets/my/more.png" alt=""></div>
            </div>
            <div class="My_list_" @click="$router.push('/GroupPurchaseOrder')">
                <div><img src="../../assets/my/allOrder.png" alt=""><span>团购订单</span></div>
                <div><img src="../../assets/my/more.png" alt=""></div>
            </div>
            <div class="My_list_" @click="$router.push(user.wtCustomer.userType == 1 ? '/Owner' :'/Authentication')">
                <div><img src="../../assets/my/Owner.png" alt=""><span>业主认证</span></div>
                <div><img src="../../assets/my/more.png" alt=""></div>
            </div>
            <div class="My_list_" @click="$router.push('/Password')">
                <div><img src="../../assets/my/pay.png" alt=""><span>余额支付设置</span></div>
                <div><img src="../../assets/my/more.png" alt=""></div>
            </div>
            <div class="My_list_" @click="$router.push('')">
                <div><img src="../../assets/my/help.png" alt=""><span>关于帮助</span></div>
                <div><img src="../../assets/my/more.png" alt=""></div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            show:false,isCode:true,registered:false
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('user')
    },
    activated(){
        this.$store.dispatch('user')
    },
    computed:{
        user(){
            return this.$store.state.user
        },
        isFloats(){
            // var regPos = /^[0-9]*[1-9][0-9]*$/  // 判断是否是正整数
            // return regPos.test(this.user.wtCustomer.amount) ? this.user.wtCustomer.amount +'.00' : this.user.wtCustomer.amount
            return Number.isInteger(this.user.wtCustomer.amount) ? `${this.user.wtCustomer.amount}.00` : this.user.wtCustomer.amount
        }
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '会员中心'
        this.$store.commit('ACTIVE', 4)

        this.$nextTick(()=>{
            if(this.user.card == ''){
                this.registered = true
            }
        })
    },
    methods:{
        sign(){
            this.$store.dispatch('addIntegration', 2)
        },
        qrcodes() {
            this.show = !this.show
            if(this.isCode){
                this.$nextTick(()=>{
                    var qrcode = new QRCode(document.getElementById("qrcode"), {
                        width: 200, height: 200
                    })
                    function makeCode(e) { qrcode.makeCode(e) }
                    makeCode(this.user.wtCustomer.cardno)
                })
                this.isCode = false
            }
        },
        close(){
            this.registered = false
        },
    },
    filters:{
        
    }
}
</script>

<style lang="less" scoped>
#My{
    width: 100%; min-height: 100vh; padding-bottom: 0.8rem; background-color: rgba(246,246,246,1); font-size: 0.3rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

.My_nav{
    width: 100%; height: 3.04rem; padding-top: 1.28rem; padding-left: 0.4rem; display: flex;
    background: url('../../assets/my/myback.png') no-repeat; background-size: 100% 100%;
    section{
        width: 1.28rem; height: 1.28rem; border: 0.035rem solid rgba(248,181,81,1); border-radius: 50%; margin-right: 0.5rem; position: relative;
        img{ width: 100%; height: 100%; border-radius: 50%; }
        img:nth-child(2){ width: 0.62rem; height: 0.49rem; position: absolute; top: -0.35rem; right: -0.13rem; }
    }
    div{
        p{ color:rgba(43,43,43,1); font-size: 0.36rem; .font1; line-height: 0.7rem; 
            .My_vip{ color: #FF8B4B; font-size: 0.24rem; border: 0.018rem solid #FF8B4B; padding: 0 0.05rem; margin-left: 0.36rem; position: relative; top: -0.05rem; } 
        }
        span{ color:rgba(75,75,75,1); }
    }
}

.My_isOpen{
    width: 100%; height: 1.29rem; background-color: white; display: flex; justify-content: space-between; align-items: center; padding: 0 0.4rem;
    div{
        p{ color:rgba(43,43,43,1); font-size: 0.28rem; .font1 }
        span{ color:rgba(75,75,75,1); font-size: 0.24rem; .font2 }
    }
    div:nth-child(2){
        width: 1.2rem; height: 0.48rem; background:rgba(255,139,75,1); font-size: 0.24rem; border-radius: 0.24rem; color:rgba(255,255,255,1); 
        .font1; text-align: center; line-height: 0.48rem;
    }
    .My_permissions{ color: #FF8B4B; font-size: 0.24rem; .font1; }
}

.My_list{
    width: 100%; background-color: white; margin-top: 0.2rem; padding: 0 0.4rem;
    .My_list_{
        width: 100%; height: 0.9rem; border-bottom: 0.01rem solid rgba(206,206,206,1); display: flex; justify-content: space-between; align-items: center;
        div{
            display: flex; align-items: center;
            img{ width: 0.3rem; margin-right: 0.2rem; }
            span{ color:rgba(0,0,0,1); .font1; }
        }
        div:last-child{
            img{ width: 0.16rem; height: 0.29rem; margin: 0; margin-left: 0.2rem; }
            span{ color: #4B4B4B; .font2; }
        }
    }
    .My_list_:nth-child(1){ 
        height: 1.33rem; 
        div{ display: inline; p{ margin-left: 0.5rem; color: #EA1616; line-height: 0.45rem; .font1; } } 
        div:last-child{
            width: 1.2rem; height: 0.48rem; font-size: 0.24rem; border-radius: 0.24rem; color:rgba(43,43,43,1);
            .font1; text-align: center; line-height: 0.48rem; 
            // border: 0.02rem solid rgba(234,22,22,1);
        }
    }
    .My_list_:last-child{ border: 0; }
}
    
</style>


