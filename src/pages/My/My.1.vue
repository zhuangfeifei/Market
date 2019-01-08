<template>
    <div id="My" v-if="user">

        <nav class="My_nav">
            <div class="My_code" :class="{My_code_active:user.wtCustomer.phonenumber}">
                <div class="My_title">
                    <section><img :src="user.wtCustomer.avatar" alt=""></section><h4 @click="$router.push('/Membership')">{{user.wtCustomer.nickname}}</h4>
                    <img @click="sign" class="My_sign" src="../../assets/img/sign.png" alt="">
                </div>
                <van-row class="My_class" type="flex" justify="space-between">
                    <van-col span="6" class="My_class_"><router-link to="/Wallet"><p>{{user.wtCustomer.integration || 0}}</p><p>积分</p></router-link></van-col>
                    <van-col span="6" class="My_class_"><router-link to="/Balance"><p>{{'¥'+(isFloats || 0)}}</p><p>余额</p></router-link></van-col>
                    <van-col span="6" class="My_class_"><router-link to="/Coupon"><p>{{user.couponNum || 0}}</p><p>优惠券</p></router-link></van-col>
                </van-row>
                <div v-if="user.card != ''" class="My_cardno"><span>NO：{{user.card[0].cardno}}</span><div @click="qrcodes" class="open_code"></div></div>
                <router-link v-else to="/Opencard"><div class="My_bind">绑定会员卡</div></router-link>
            </div>
        </nav>

        <div class="My_banner"><img src="../../assets/img/banner.png" alt=""></div>

        <van-row class="My_class_list" type="flex" justify="space-between">
            <van-col span="6" class="My_class_list_"><router-link to="/Membership"><img src="../../assets/img/personal.png" alt=""></router-link></van-col>
            <van-col span="6" class="My_class_list_"><router-link to="/CommonOrder"><img src="../../assets/img/CommonOrder.png" alt=""></router-link></van-col>
            <van-col span="6" class="My_class_list_"><router-link to="/GroupPurchaseOrder"><img src="../../assets/img/GroupPurchaseOrder.png" alt=""></router-link></van-col>
            <van-col span="6" class="My_class_list_"><router-link to="/Integralshop"><img src="../../assets/img/exchange.png" alt=""></router-link></van-col>
        </van-row>
        <van-row class="My_class_list" type="flex" justify="space-between">
            <van-col span="6" class="My_class_list_"><a href="http://www.homeamc.cn/h5/car/auth"><img src="../../assets/img/ParkingPayment.png" alt=""></a></van-col>
            <van-col span="6" class="My_class_list_"><router-link :to="user.wtCustomer.userType == 1 ? '/Owner' :'/Authentication'"><img src="../../assets/img/OwnerCertification.png" alt=""></router-link></van-col>
            <van-col span="6" class="My_class_list_ My_class_list_7"><router-link to="/Card"><img src="../../assets/img/MembershipCard.png" alt=""></router-link></van-col>
            <van-col span="6" class="My_class_list_"><router-link to="/Setpassword"><img src="../../assets/img/PaymentSetting.png" alt=""></router-link></van-col>
        </van-row>

        <van-popup class="QR" v-model="show"><div class="QR_codes"><p>会员码</p><div id="qrcode"></div></div></van-popup>

        <van-popup class="registered" v-model="registered">
            <img src="../../assets/img/registered.png" alt="" usemap="#planetmap">
            <map name="planetmap">
                <area @click="close" shape="rect" coords="230,0,265,40">
                <area @click="$router.push('/Opencard')" shape="rect" coords="0,60,300,300">
            </map>
        </van-popup>
        
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
        width: 100%; height: 100%; padding-bottom: 0.8rem; background-color: white; font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    .My_nav{
        width: 100%; height: 4.81rem; background-color: rgba(232,232,232,1); padding: 0.52rem 0.4rem 0.49rem 0.39rem;
        .My_code{
            width: 100%; height: 3.8rem; background: url('../../assets/img/nocode.png') no-repeat; background-size: 100% 100%;
            .My_title{
                width: 100%; height: 1.22rem; padding-left: 0.31rem; padding-top: 0.26rem;
                section{ width: 0.96rem; height: 0.96rem; float: left; img{ width: 100%; height: 100%; border-radius: 50%; } }
                h4{ float: left; font-size: 0.36rem; .font3; color:rgba(43,43,43,1); margin-top: 0.2rem; margin-left: 0.3rem; }
                .My_sign{ width: 0.97rem; height: 0.48rem; float: right; margin-top: 0.37rem; }
            }
            .My_class{ 
                text-align: center; margin-top: 0.75rem;
                a{ color: rgba(43,43,43,1);}
                .My_class_{ 
                    font-size: 0.4rem; .font1; line-height: 0.4rem; p:nth-child(2){ font-size: 0.24rem; .font2; color:rgba(128,128,128,1); line-height: 0.35rem;}
                }
            }
            .My_cardno{ 
                width: 100%; height: 1.2rem; line-height: 1.2rem; text-align: center; .font1; color:rgba(43,43,43,1); position: relative;
                .open_code{ width: 0.8rem; height: 100%; position: absolute; right: 0; bottom: 0; } 
            }
            a .My_bind{ text-decoration:underline; color:rgba(43,43,43,1); .My_cardno; }
        }
        .My_code_active{ background: url('../../assets/img/code.png') no-repeat; background-size: 100% 100%; }
    }

    .My_banner{
        width: 100%; height: 2.12rem; img{ width: 100%; height: 100%; }
    }

    .My_class_list{
        width: 100%; height: 1.12rem; padding: 0 0.4rem; margin-top: 0.63rem;
        .My_class_list_{
            width: 1.11rem; height: 100%;
            img{ width: 100%; height: 100%; }
        }
        .My_class_list_7{  text-align: center; img{ width: 0.84rem; height: 1.13rem; } }
    }


.QR{ border-radius: 0.3rem;}
.QR_codes{
    padding: 0.3rem 0.6rem 0.5rem 0.6rem; background-color: white; text-align: center; font-size: 0.36rem; border-radius: 0.3rem; font-weight: bold;
    p{ margin-bottom: 0.2rem; }
}


.registered{
    background: none; 
    img{ width: 6.24rem; height: 6.61rem; }
    area{ outline: none!important; }
}
    
</style>


