<template>
    <div id="CouponAll">

        <div v-if="redPacketList.length > 0" class="CouponAll_">
            <div class="CouponAll_list_" v-for="(item,index) in redPacketList" :key="index" :class="{oldNo:item.isSinceCollar === '1'}">
                <van-row>
                    <van-col span="17" class="CouponAll_list_title">
                        <div class="CouponAll_list_titles">
                            <div><span :class="{old:item.COUPON_STATUS != 2}">¥</span><span :class="{old:item.COUPON_STATUS != 2}">{{item.price}}</span></div>
                            <div><div :class="{old:item.COUPON_STATUS != 2}">{{item.title}}</div><div :class="{old:item.COUPON_STATUS != 2}">{{item.use_codition === 0 ? "无条件" : '满'+item.condition_price+'减'+item.price}}</div></div>
                            <p class="CouponAll_list_time" :class="{old:item.COUPON_STATUS != 2}">有效期：{{item.limit_date_start}}~{{item.limit_date_end}}</p>
                            <!-- <img v-if="item.UNIT_TYPE == 1 && item.COUPON_STATUS != 2" src="../../assets/img/platformNo.png" alt="">
                            <img v-if="item.UNIT_TYPE == 2 && item.COUPON_STATUS != 2" src="../../assets/img/businessNo.png" alt=""> -->
                            <img src="../../assets/img/platform.png" alt="">
                            <!-- <img v-if="item.UNIT_TYPE == 2 && item.COUPON_STATUS == 2" src="../../assets/img/business.png" alt=""> -->
                        </div>
                    </van-col>
                    <van-col span="7" class="CouponAll_list_ammont">
                        <img @click="receive(item.id)" src="../../assets/img/Collar.png" alt="">
                        <p>剩余{{item.storage_num}}张</p>
                    </van-col>
                </van-row>
            </div>
        </div>

        <div v-else class="nos"><img src="../../assets/img/no.png" alt=""><p>目前还没有优惠券哦~</p></div>

        <div v-if="show">
            <van-popup v-model="shows" class="getsuccessbacks">
                <div class="getsuccessback">
                    <h4>优惠券领用成功</h4>
                    <img src="../../assets/img/getsuccess.png" alt="">
                    <div @click="$router.push('/Coupon'); $store.commit('isSuccess', false)">前往使用</div>
                </div>
            </van-popup>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0, data:'1',shows:true,
            status:[require('../../assets/img/notUsed.png'),require('../../assets/img/Undue.png'),require('../../assets/img/Expired.png')],
            list:{ limit:100, current:1, isPage: false, tabIndex: 1 }
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('redPacketList')
    },
    computed:{
        redPacketList(){
            return this.$store.state.redPacketList
        },
        couponList(){
            return this.$store.state.couponList
        },
        imgUrl() {
            return this.$store.state.imgUrl
        },
        show(){
            return this.$store.state.isSuccess
        }
    },
    created(){
        this.top()
        document.title = '优惠券'

        this.$store.commit('SET_PAGE', true)
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        top(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        receive(id){
            this.$store.dispatch('getRedPacket', id)
        },
    },
    destroyed(){
        window.removeEventListener('scroll', this.CouponAllGet)
    }
}
</script>

<style lang="less" scoped>
    #CouponAll{
        width: 100%; min-height: 100vh; background:rgba(232,232,232,1); font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    nav{
        width: 100%; height: 0.76rem; .font1; background:rgba(255,255,255,1); display: flex; justify-content: space-around;
        position: fixed; top: 0; left: 0; z-index: 10;
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
            padding: 0.3rem 0.4rem;
            .CouponAll_list_Cash_title{
                img{ width: 1.07rem; height: 1.07rem; margin-top: 0.1rem; }
            }
            // .CouponAll_list_Cash_title{
            //     & h4{ .font3; color:rgba(43,43,43,1); line-height: 0.4rem; }
            //     & h5{ .font2; color:rgba(75,75,75,1); font-size: 0.28rem; line-height: 0.55rem; }
            //     & p{ .font2; color:rgba(128,128,128,1); font-size: 0.24rem; }
            // }
            .CouponAll_list_Cash_ammont{
                height: 1.3rem; color: black; line-height: 0.4rem; .font1; padding-left: 0.2rem; position: relative;
                div{ 
                    width: 100%; margin-top: 0.1rem; position: absolute; bottom: 0; left: 0; padding-left: 0.2rem;
                    del{
                        font-size: 0.24rem; color: #808080;
                    }
                    span:nth-child(2){
                        background-color: rgba(255,139,75,1); border-radius: 0.1rem; float: right; color: #FFFFFF; .font1; padding: 0.05rem 0.3rem;
                    }
                }
            }
        }
        .CouponAll_list_{
            height: 1.84rem; background: url('../../assets/img/Allcoupon.png') no-repeat; background-size: 100% 100%; margin-bottom: 0.3rem;
            .CouponAll_list_titles{
                height: 100%; padding: 0.3rem 0; padding-left: 0.57rem; position: relative;
                & div:nth-child(1){
                    width: 1rem; height: 1rem; float: left; color:rgba(255,139,75,1); .font1;
                    span:nth-child(2){ font-size: 0.72rem; .font3; line-height: 0.8rem; }
                }
                & div:nth-child(2){
                    height: 0.6rem; float: left; color:rgba(255,139,75,1); .font3; text-align: center; line-height: 0.3rem;
                    div{ width: 2.8rem; height: 0.4rem; clear: both; line-height: 0.4rem; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
                    div:nth-child(2){ font-size: 0.24rem; color:rgba(43,43,43,1); .font1; line-height: 0.5rem; }
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
    

.getsuccessbacks{
    background: none;
    .getsuccessback{
        width: 5.4rem; height: 4.17rem; text-align: center; padding-top: 0.3rem; position: relative;
        background: url('../../assets/img/getsuccessback.png') no-repeat; background-size: 100% 100%;
        h4{ font-size: 0.36rem; color: #2B2B2B; .font2; line-height: 0.8rem; }
        img{ width: 1.99rem; height: 1.74rem; }
        div{ color: #FF8B4B; .font3; width: 100%; height: 0.87rem; line-height: 0.87rem; border-top: 0.02rem solid #FF8B4B; position: absolute; bottom: 0; left: 0; }
    }
}
</style>


