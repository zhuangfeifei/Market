<template>
    <div id="CouponContent">
        <!--<header-item>满减券</header-item>-->

        <nav></nav>
        <div class="content" :style="{'background': 'url('+bacimg[status]+')' + 'no-repeat','background-size': '100% 100%'}">
            <h3>{{couponDetail.shopName || '12'}}</h3>
            <p class="title">（满300减100）</p>
            <div class="cont">
                <div><p>使用期限：</p><p>代金券状态：</p><p>使用须知：</p></div>
                <div><p>{{couponDetail.limitDateStart}}-{{couponDetail.limitDateEnd}}</p><p>{{couponDetail.useStatusDesc}}</p><p>仅限于方圆里中商家使用 每人每次最多核销一张券</p></div>
            </div>
            <div class="code">
                <h4>校验码</h4>
                <p>{{couponDetail.qrcode}}</p>
                <div id="qrcode"></div>
            </div>
        </div>

    </div>
</template>

<script>
import header from '../components/header'
export default {
    data() {
        return {
            status:0, bacimg:[require('../assets/img/use.png'),require('../assets/img/nouse.png')]
        }
    },
    components: {
        'header-item': header
    },
    beforeCreate(){
        this.$store.dispatch('couponDetail', this.$route.query.ids)
    },
    computed:{
        couponDetail(){
            return this.$store.state.couponDetail
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '优惠卷'
        this.status = this.$route.query.status == 2 ? 1 : 0

    },
    mounted(){
        // this.$nextTick(() => {
        //     console.log('更新数据了')
        //     var qrcode = new QRCode(document.getElementById("qrcode"), {
        //         width: 180,
        //         height: 180
        //     })
        //     function makeCode(e) {
        //         qrcode.makeCode(e)
        //     }
        //     makeCode(this.couponDetail.qrcode)
        // })
    },
    methods:{
        
    },
}
</script>

<style lang="less" scoped>
    #CouponContent{
        width: 100%; height: 13.5rem; background:rgba(232,232,232,1); font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }

    nav{
        width: 100%; height: 4.72rem; background: url('../assets/img/titlebac.png') no-repeat; background-size: 100% 100%;
    }

    .content{
        width: 6.7rem; height: 10.48rem; position: absolute; top: 1.22rem; left: 0.39rem; padding-top: 0.63rem; color: white;
        background: url('../assets/img/use.png') no-repeat; background-size: 100% 100%;
        h3,.title{ text-align: center; .font1; font-size: 0.36rem; }
        .cont{
            width: 5.9rem; height: 2.2rem; background:rgba(255,255,255,0.1); margin: 0.29rem 0.4rem; padding-top: 0.2rem;
            display: flex; justify-content: space-around; line-height: 0.5rem; font-size: 0.3rem;
            & div:nth-child(1){
                width: 32%; height: 100%;
            }
            & div:nth-child(2){
                width: 58%; height: 100%; 
                p:nth-child(3){ line-height: 0.35rem; position: relative; top: 0.075rem; }
            }
        }
        .code{
            width: 100%; text-align: center; color:rgba(43,43,43,1); padding-top: 0.47rem;
            h4{ color:rgba(255,139,75,1); .font2; font-size: 0.28rem; margin-bottom: 0.1rem; }
            & p{ font-size: 0.36rem; }
            #qrcode{
                width: 3.6rem; height: 3.6rem; margin: 0.3rem auto;
            }
        }
    }

    
    
</style>


