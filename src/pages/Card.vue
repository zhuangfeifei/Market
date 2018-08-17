<template>
    <div id="card">
        <!--<header-item>会员卡</header-item>-->

        <div v-if="user.wtCustomer" class="card">
            <div class="integral">
                <img src="../assets/img/integrals.png" alt=""><span>积分</span><span>{{user.wtCustomer.integration}}</span>
                <router-link to="/Wallet"><span>查看更多 ></span></router-link>
            </div>
            <div v-if="user.wtCustomer.phonenumber" class="card_vip">
                <img class="vipend" src="../assets/img/vipend.png" alt="">
                <img class="qrcode" @click="qrcodes" src="../assets/img/qrcode.png" alt="">
                <div class="step">
                    <p><span>会员等级</span><span>{{user.card[0].name}}</span></p>
                    <div><span></span><span></span><span></span></div>
                    <div><span>普通会员</span><span>黑金会员</span></div>
                </div>
                <div class="code"><span>NO：{{user.wtCustomer.cardno}}</span></div>
            </div>
            <div v-else class="card_vips">
                <img class="vipend" src="../assets/img/vipstart.png" alt="">
                <div class="register"><router-link to="/Opencard"><span>注册开通电子会员卡</span></router-link></div>
            </div>
        </div>

        <div class="list">
            <div @click="go(0)"><span>会员权益</span></div>
            <div @click="go(1)"><span>会员折扣</span></div>
            <router-link to="/Membership"><div><span>会员信息</span></div></router-link>
            <router-link to="/Integralshop"><div><span>积分商城</span></div></router-link>
            <a href="tel:12345678910"><div><span>联系客服</span></div></a>
        </div>

        <van-popup class="QR" v-model="show"><div class="QR_codes"><p>会员码</p><div id="qrcode"></div></div></van-popup>

    </div>
</template>

<script>
import header from '../components/header'
export default {
    data() {
        return {
            show:false,isCode:true
        }
    },
    components: {
        'header-item': header
    },
    computed:{
        user(){
            if(this.$store.state.user == ''){
                this.$store.commit('USER')
            }
            return this.$store.state.user
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '会员卡'
    },
    methods:{
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
        go(index){
            if(index == 0){
                this.$store.commit('HTML', this.user.card[0].equity)
                this.$router.push({path:'/Rule', query:{title:'会员权益'}})
            }else{
                this.$store.commit('HTML', this.user.card[0].regulations)
                this.$router.push({path:'/Rule', query:{title:'会员折扣'}})
            }
        }
    }
}
</script>

<style lang="less" scoped>
    #card{
        width: 100%; height: 100%; background-color: #e8e8e8; font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    .card{
        width: 100%; height: 5.41rem; padding-top: 0.53rem;
        .integral{
            width: 100%; height: 0.38rem; line-height: 0.38rem; padding: 0 0.4rem; 
            color:rgba(43,43,43,1); .font1;
            img{ width: 0.38rem; height: 0.38rem; margin-right: 0.2rem; float: left; }
            span:nth-child(2){ float: left; }
            span:nth-child(3){ margin-left: 0.48rem; color: #EA1616; font-size: 0.36rem; float: left; }
            a span{ font-size: 0.24rem; .font2; float: right; color:rgba(43,43,43,1); }
        }
        .card_vip{
            width: calc(100% - 0.8rem); height: 3.95rem; margin-left: 0.4rem; margin-top: 0.55rem; position: relative;
            .vipend{
                width: 100%; height: 100%; position: absolute; top: 0; left: 0;
            }
            .qrcode{
                width: 0.5rem; height: 0.5rem; position: absolute; top: 0.43rem; right: 0.5rem;
            }
            .code{ 
                width: 100%; height: 0.8rem; line-height: 0.8rem; position: absolute; bottom: 0.23rem; left: 0; text-align: center; 
                .font1; font-size: 0.35rem;
            }
        }
        .card_vips{
            width: calc(100% - 0.8rem); height: 3.95rem; margin-left: 0.4rem; margin-top: 0.55rem; position: relative;
            .vipend{
                width: 100%; height: 100%; position: absolute; top: 0; left: 0;
            }
            .register{ 
                width: 100%; height: 0.8rem; line-height: 0.8rem; position: absolute; bottom: 0.23rem; left: 0; text-align: center; 
                .font1; font-size: 0.35rem; text-decoration: underline; z-index: 11;
                a{ color: black; }
            }
        }
    }

    .list{
        width: 100%; height: 6.5rem; background: url('../assets/img/listbac.png') no-repeat; background-size: 100% 100%;
        z-index: 10; position: relative; padding: 1.2rem 0.2rem; margin-top: -0.85rem;
        // border: 1px solid red;
        div{
            width: 2.1rem; height: 2.1rem; text-align: center; font-size: 0.36rem; line-height: 2.1rem; float: left; 
            margin-left: 0.2rem; margin-top: 0.2rem; color: white; .font1;
            span{ text-decoration: underline; }
        } 
        div:nth-child(1){
            background: url('../assets/img/interests.png') no-repeat; background-size: 100% 100%;
        }
        div:nth-child(2){
            background: url('../assets/img/discounts.png') no-repeat; background-size: 100% 100%;
        }
        a:nth-child(3) div{
            background: url('../assets/img/information.png') no-repeat; background-size: 100% 100%;
        }
        a:nth-child(4) div{
            width: 4.4rem;
            background: url('../assets/img/Integralbac.png') no-repeat; background-size: 100% 100%;
        }
        a:nth-child(5) div{
            background: url('../assets/img/Contact.png') no-repeat; background-size: 100% 100%;
        }
        a{ color: white; .font1; }
    }

.QR{ border-radius: 0.3rem;}
.QR_codes{
    padding: 0.3rem 0.6rem 0.5rem 0.6rem; background-color: white; text-align: center; font-size: 0.36rem; border-radius: 0.3rem; font-weight: bold;
    p{ margin-bottom: 0.2rem; }
}


.step{
    width: 100%; height: 1.3rem; position: absolute; bottom: 1rem; left: 0; padding-left: 0.6rem; .font1;
            p{
                display: inline-block; width: 100%; height: 0.3rem; font-size: 0.24rem; line-height: 0.3rem; margin-bottom: 0.15rem; 
                span:nth-child(2){
                    font-family:PingFang-SC-Medium; color:#ff8b4b; margin-left: 3vw; .font3;
                }
            }
            div:nth-child(2){
                width: 90%; height: 0.04rem; padding:0; display: flex;
                span{ display: inline-block;}
                span:nth-child(1){
                    width: 33%; height: 100%; background-color: RGBA(255, 139, 75, 1);
                }            
                span:nth-child(2){
                    width: 0.08rem; height: 0.08rem; border-radius: 50%; background-color: RGBA(255, 139, 75, 1); position: relative; top: -0.02rem;
                }            
                span:nth-child(3){
                    width: 100%; height: 0.02rem; background-color: RGBA(255, 139, 75, 1); position: relative; top: 0.012rem;
                }            
            }
            div:nth-child(3){
                width: 90%; height: 0.3rem; padding:0; font-size: 0.2rem; line-height: 0.3rem; color:rgba(128,128,128,1); margin-top: 0.15rem;
                span:nth-child(1){
                    float: left;
                }            
                span:nth-child(2){
                    float: right;
                }           
            }
}
    
</style>


