<template>
    <div id="CouponContent">

        <nav></nav>
        <div class="CouponContent_content">
            <h3>{{couponDetail.title}}</h3>
            <van-row class="CouponContent_title">
                <van-col span="7">使用条件</van-col>
                <van-col span="17"><p>· {{couponDetail.conditionDesc}}</p><p>· {{couponDetail.shopName}}</p></van-col>
            </van-row>
            <van-row class="CouponContent_time">
                <van-col span="7">有效期</van-col>
                <van-col span="17"><p>· {{couponDetail.limitDateStart}} ~ {{couponDetail.limitDateEnd}}</p></van-col>
            </van-row>
            <van-row class="CouponContent_code">
                <van-col span="7">校验码</van-col>
                <van-col class="CouponContent_code_2" span="17">
                    <p>· {{couponDetail.qrcode}}</p>
                    <img v-if="status > 0" class="CouponContent_code_no" src="../../assets/img/couponNoCode.png" alt="">
                    <img class="couponStatus" :src="img[status]" alt="">
                </van-col>
            </van-row>
            <div id="qrcode"></div>
            <van-row class="CouponContent_tip">
                <van-col span="7">使用须知</van-col>
                <van-col span="17"><p>· 仅限于方圆里中商家使</p><p>· 每人每次最多核销一张</p></van-col>
            </van-row>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            status:0, img:[require('../../assets/img/couponNoUse.png'),require('../../assets/img/couponUsed.png'),require('../../assets/img/couponTime.png')],
        }
    },
    components: {
        
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
        document.title = '优惠卷详情'
        this.status = this.$route.query.status

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
    // beforeRouteLeave(to, from, next) {   
    // // 设置下一个路由的 meta
    //     to.meta.keepAlive = true; // B 跳转到 A 时，让 A 缓存，即不刷新（代码写在B页面）
    //     next();
    // }
}
</script>

<style lang="less" scoped>
    #CouponContent{
        width: 100%; min-height: 100vh; font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    nav{
        width: 100%; height: 13.2rem; background: url('../../assets/img/titlebac.png') no-repeat; background-size: 100% 100%;
    }

    .CouponContent_content{
        width: 6.7rem; position: absolute; top: 0.73rem; left: 0.4rem; padding: 0.64rem 0.29rem; color: black;
        background: url('../../assets/img/use.png') no-repeat; background-size: 100% 100%; 
        h3{ text-align: center; .font1; font-size: 0.36rem; }
        .CouponContent_title,.CouponContent_time,.CouponContent_code,.CouponContent_tip{ 
            margin-top: 0.6rem; .font1; line-height: 0.45rem;
            p{ font-size: 0.28rem; .font2; color:rgba(75,75,75,1); }
        }
        .CouponContent_time{
            height: 1.24rem; line-height: 1.24rem; margin-top: 0.48rem; border-top: 0.02rem dashed rgba(206,206,206,1); border-bottom: 0.02rem dashed rgba(206,206,206,1);
        }
        .CouponContent_code{
            margin-top: 0.46rem;
            .CouponContent_code_2{ position: relative; }
            p{ .font3; color: rgba(255,139,75,1); font-size: 0.36rem; }
            .couponStatus{ width: 2.42rem; height: 1.63rem; position: absolute; right: -0.2rem; top: -0.83rem; }
            .CouponContent_code_no{ width: 2.5rem; height: 0.34rem; position: absolute; left: -0.1rem; top: 0; }
        }
        #qrcode{
            width: 3.6rem; height: 3.6rem; margin: 0.32rem auto;
        }
        .CouponContent_tip{
            margin-top: 0.48rem; padding-top: 0.49rem; border-top: 0.02rem dashed rgba(206,206,206,1);
        }
    }

    
    
</style>


