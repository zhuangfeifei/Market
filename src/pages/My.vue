<template>
    <div id="My">
        <header-item>会员中心</header-item>

        <nav>
            <div class="header">
                <div class="portrait"><img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3512758362,4182805754&fm=27&gp=0.jpg" alt=""></div>
                <div class="name"><h4>厚木资产</h4><p v-if="isShow">普通会员</p><p v-else><router-link to="/Card">成为会员></router-link></p><p v-if="isShow">当前余额：2000元</p></div>
                <div class="Sign"><span>签到</span></div>
            </div>
            <p v-if="isShow" class="privilege"><span>·消费优惠</span><span>·身份象征</span><span>·更专业的服务</span></p>
            <p v-else class="privileges">请至会员卡开通会员，享受更多优惠</p>
        </nav>

        <div class="My">
            <div class="Order"></div>
            <div class="function">
                <div class="car"><img src="../assets/img/car.png" alt=""><p>停车缴费</p><p>parking payment</p></div>
                <div class="right">
                    <div class="coupon"><img src="../assets/img/coupon.png" alt=""><div><p>优惠券</p><p>coupon</p></div></div>
                    <div class="vip"><img src="../assets/img/vip.png" alt=""><p>会员卡</p><p>membership card</p></div>
                    <div class="settings"><img src="../assets/img/settings.png" alt=""><p>设置</p><p>settings</p></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import header from '../components/header'
export default {
    data() {
        return {
            isShow:false
        }
    },
    components: {
        'header-item': header
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

    },
    methods:{
        
    },
    // beforeRouteLeave(to, from, next) {   
    // // 设置下一个路由的 meta
    //     to.meta.keepAlive = false; // B 跳转到 A 时，让 A 缓存，即不刷新（代码写在B页面）
    //     next();
    // }
}
</script>

<style lang="less" scoped>
    #My{
        width: 100%; height: 12.85rem; background-color: white; padding-top: 1rem; font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }

    nav{
        width: 100%; height: 4.85rem; background: url('../assets/img/mybac.png') no-repeat; background-size: 100% 100%;
        padding-top: 0.7rem; padding: 0.7rem 0.4rem; color: white;
        .header{
            width: 100%; height: 1.4rem; display: flex;
            .portrait{
                width: 1.4rem; height: 100%; margin-right: 0.2rem;
                img{ width: 100%; height: 100%; border-radius: 50%; }
            }
            .name{
                width: calc(100% - 2.6rem); height: 100%;
                h4{ font-size: 0.36rem; .font1; }
                p:nth-child(2){ font-size: 0.3rem; color: #FF8B4B; margin-top: 0.05rem; font-family:PingFang-SC-Light; font-weight: Light; }
                p:nth-child(3){ font-size: 0.28rem; .font2; }
                a{ color: #FF8B4B; }
            }
            .Sign{
                width: 1rem; height: 100%; text-align: center; line-height: 1.4rem; font-size: 0.23rem;
                span{ padding: 0.06rem 0.25rem; border-radius: 0.2rem; background-color: #FF8B4B; }
            }
        }
        .privilege{
            font-size: 0.28rem; margin-top: 0.91rem; padding-left: 0.3rem; .font1;
            span{ margin-right: 1.02rem; }
            span:nth-child(3){ margin: 0; }
        }
        .privileges{
            font-size: 0.28rem; margin-top: 0.64rem; .font2; text-align: center;
        }
    }

    .My{
        width: 100%; height: 8.72rem; padding: 0.4rem; margin-top: -1.4rem; color: white; .font1; font-size: 0.28rem;
        .Order{
            width: 100%; height: 2.94rem; background: url('../assets/img/order.png') no-repeat; background-size: 100% 100%;
        }
        .function{
            width: 100%; margin-top: 0.48rem; text-align: center;
            .car{
                width: 2.3rem; height: 4.2rem; background: url('../assets/img/carbac.png') no-repeat; background-size: 100% 100%; float: left;
                img{ width: 1.3rem; height: 1.28rem; margin-top: 1.09rem; margin-bottom: 0.47rem; }
                p:nth-child(3){ font-size: 0.24rem;}
            }
            .right{
                width: 4.2rem; height: 4.2rem; float: right;
                .coupon{
                    width: 100%; height: 2rem; background: url('../assets/img/couponbac.png') no-repeat; background-size: 100% 100%; float: left;
                    img{ width: 1.2rem; height: 0.84rem; margin-top: 0.58rem; margin-right: 0.4rem; margin-left: 0.85rem; float: left; }
                    div{ 
                        float: left; margin-top: 0.65rem; 
                        p:nth-child(2){ font-size: 0.24rem;}
                    }
                }
                .vip{
                    width: 2.1rem; height: 2rem; background: url('../assets/img/vipbac.png') no-repeat; background-size: 100% 100%; margin-top: 0.2rem; float: left;
                    img{ width: 0.86rem; height: 0.62rem; margin-top: 0.26rem; }
                    p:nth-child(3){ font-size: 0.24rem;}
                }
                .settings{
                    width: 1.9rem; height: 2rem; background: url('../assets/img/settingsbac.png') no-repeat; background-size: 100% 100%; margin-top: 0.2rem; float: left;
                    margin-left: 0.2rem;
                    img{ width: 0.76rem; height: 0.76rem; margin-top: 0.23rem; }
                    p:nth-child(3){ font-size: 0.24rem;}
                }
            }
        }
    }
    
</style>


