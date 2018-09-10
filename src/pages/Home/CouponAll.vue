<template>
    <div id="CouponAll">

        <nav>
            <div @click="tab(index)" v-for="(item,index) in title" :key="index" :class="{active: list.tabIndex == index}"><span>{{item}}</span><section v-show="list.tabIndex == index"></section></div>
        </nav>

        <div v-if="false" class="CouponAll_">
            <van-row v-if="list.tabIndex == 0" class="CouponAll_list_Cash" v-for="(item,index) in 3" :key="index">
                <van-col span="16" class="CouponAll_list_Cash_title"><h4>80元抵扣100元</h4><h5>周一至周日午餐可用</h5><p>长期有效</p></van-col>
                <van-col span="8" class="CouponAll_list_Cash_ammont"><div>¥80抢购</div></van-col>
            </van-row>
            <van-row v-if="list.tabIndex == 1" class="CouponAll_list_" v-for="(item,index) in 4" :key="index" :class="{oldNo:index < 2}">
                <van-col span="17" class="CouponAll_list_title">
                    <div><span :class="{old:index < 2}">¥</span><span :class="{old:index < 2}">20</span></div>
                    <div><p :class="{old:index < 2}">满100元可用</p><p :class="{old:index < 2}">仅用于苏浙徽</p></div>
                    <p class="CouponAll_list_time" :class="{old:index < 2}">有效期：2018.01.01~2018.03.02</p>
                    <img v-if="index == 0" src="../../assets/img/platformNo.png" alt="">
                    <img v-if="index == 1" src="../../assets/img/businessNo.png" alt="">
                    <img v-if="index == 2" src="../../assets/img/platform.png" alt="">
                    <img v-if="index == 3" src="../../assets/img/business.png" alt="">
                </van-col>
                <van-col span="7" class="CouponAll_list_ammont">
                    <img v-if="index < 2" src="../../assets/img/Collared.png" alt=""><img v-else src="../../assets/img/Collar.png" alt="">
                    <p v-if="index > 1">剩余100张</p>
                </van-col>
            </van-row>
        </div>

        <div v-else class="nos"><img src="../../assets/img/no.png" alt=""><p>目前还没有优惠券哦~</p></div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0, title:['代金券','优惠券'], data:'1',
            status:[require('../../assets/img/notUsed.png'),require('../../assets/img/Undue.png'),require('../../assets/img/Expired.png')],
            list:{ limit:5, current:1, isPage: false, tabIndex: 0 }
        }
    },
    components: {
        
    },
    beforeCreate(){
        
    },
    computed:{
        coupon(){
            return this.$store.state.coupon
        },
    },
    created(){
        this.top()
        document.title = '优惠券'

        this.$store.commit('SET_PAGE', true)
        this.$store.dispatch('coupon', this.list)
        window.addEventListener('scroll', this.get)
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        top(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        tab(index){
            this.top()
            this.list.tabIndex = index
            this.list.current = 1
            this.$store.commit('SET_PAGE', true)
            this.$store.dispatch('coupon', this.list)
        },
        coupon_content(id){
            this.$router.push({path:'/couponContent', query:{status: this.list.tabIndex, ids: id}})
        },
        get(){
            var scrollTop = $(window).scrollTop()
            var windowHeight = $(window).height()
            var documentHeight = $(document).height()
            if(scrollTop + windowHeight === documentHeight){
                this.list.current ++
                this.list.isPage = true
                if(this.$store.state.isPage) this.$store.dispatch('coupon', this.list)
            }
        },
        
    },
    destroyed(){
        window.removeEventListener('scroll', this.get)
    }
}
</script>

<style lang="less" scoped>
    #CouponAll{
        width: 100%; min-height: 100vh; background:rgba(232,232,232,1); padding-top: calc(0.76rem); font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    nav{
        width: 100%; height: 0.76rem; .font1; background:rgba(255,255,255,1); display: flex; justify-content: space-around;
        position: fixed; top: 0; left: 0;
        div{
            height: 100%; text-align: center; line-height: 0.76rem; font-size: 0.28rem; color: rgba(43,43,43,1);
            section{
                width: 0.52rem; height: 0.04rem; background:rgba(255,139,75,1); margin: 0 auto; position: relative; top: -0.03rem;
            }
        }
        .active{ color: rgba(255,139,75,1); }
    }

    .CouponAll_{
        width: 100%; padding: 0.48rem 0.4rem;
        .CouponAll_list_Cash{
            height: 1.87rem; background: url('../../assets/img/Cash.png') no-repeat; background-size: 100% 100%; margin-bottom: 0.3rem;
            padding: 0.3rem;
            .CouponAll_list_Cash_title{
                & h4{ .font3; color:rgba(43,43,43,1); line-height: 0.4rem; }
                & h5{ .font2; color:rgba(75,75,75,1); font-size: 0.28rem; line-height: 0.55rem; }
                & p{ .font2; color:rgba(128,128,128,1); font-size: 0.24rem; }
            }
            .CouponAll_list_Cash_ammont{
                color: white; font-size: 0.36rem; line-height: 0.81rem; text-align: center; .font1;
                div{ width: 2rem; height: 0.81rem; background-color: rgba(255,139,75,1); border-radius: 0.1rem; margin-top: calc(0.53rem - 0.3rem); float: right; }
            }
        }
        .CouponAll_list_{
            height: 1.84rem; background: url('../../assets/img/Allcoupon.png') no-repeat; background-size: 100% 100%; margin-bottom: 0.3rem;
            .CouponAll_list_title{
                height: 100%; padding: 0.3rem 0; padding-left: 0.57rem; position: relative;
                & div:nth-child(1){
                    width: 1.8rem; height: 1rem; float: left; color:rgba(255,139,75,1); .font1;
                    span:nth-child(2){ font-size: 0.72rem; .font3; line-height: 0.8rem; }
                }
                & div:nth-child(2){
                    height: 0.6rem; float: left; color:rgba(255,139,75,1); .font3; text-align: center; line-height: 0.3rem;
                    p:nth-child(2){ font-size: 0.24rem; color:rgba(43,43,43,1); .font1; line-height: 0.6rem; }
                }
                .CouponAll_list_time{ clear: both; font-size: 0.24rem; color:rgba(128,128,128,1); }
                img{ width: 0.97rem; height: 0.97rem; position: absolute; top: 0; left: 0; }
            }
            .CouponAll_list_ammont{
                text-align: center;
                img{ width: 1.2rem; height: 1.2rem; margin-top: 0.16rem; }
                p{ color:rgba(255,255,255,1); font-size: 0.24rem; .font2; opacity: 0.8; margin-top: -0.1rem;}
            }
            .old{ color: gray!important; }
        }
        .oldNo{ 
            background: url('../../assets/img/AllcouponNo.png') no-repeat; background-size: 100% 100%; 
            .CouponAll_list_ammont{ img{ margin-top: 0.3rem; }}
        }
    }

    .nos{
        width: 100%; height: 100%; padding-top: 1.6rem; text-align: center; .font2; color:rgba(43,43,43,1);
        img{ width: 3rem; height: 3rem; margin-bottom: 0.6rem; }
    }
    
</style>


