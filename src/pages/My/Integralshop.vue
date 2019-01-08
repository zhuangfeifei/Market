<template>
	
    <div id="Integralshop">

        <mescroll-vue class="IntegralMescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <nav class="Integralshop_nav">
                <div><img src="../../assets/home/integral.png" alt=""><p>积分<span v-if="user">{{user.wtCustomer.integration || 0}}</span></p></div>
                <div @click="$router.push('/MyIntegral')"><img src="../../assets/home/record.png" alt=""><p>兑换记录</p></div>
                <div @click="sign"><img src="../../assets/home/sign.png" alt=""><p>每日签到</p></div>
            </nav>

            <div class="Integralshop_banner"><img src="../../assets/home/banner.png" alt=""></div>

            <div class="Integralshop_main">
                <div class="Integralshop_main_">积分商城</div>
                <div class="Integralshop_main_list">
                    <div class="goods">
                        <div class="goods_list" v-for="(item,index) in scoreGoodsList" :key="index" @click="$router.push({path:'/IntegralshopDetails', query:{id: item.id}})">
                            <img v-lazy="imgUrlGoods + item.goods_images" alt="">
                            <div>
                                <p>{{item.goods_name}}</p>
                            </div>
                            <span>¥{{item.score}}</span>
                        </div>
                    </div>
                    <div v-if="scoreGoodsList.length == 0" class="goods_no">暂无</div>
                </div>
            </div>
        </mescroll-vue>
        
    </div>

</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
    name: "loginpassword-item",
    data(){
        return{
            goodsName: '',
            mescroll: null, mescrollDown:{}, 
            mescrollUp: { 
                isBounce: false,
                callback: this.upCallback, 
                noMoreSize: 10,
                page: { num: 0, size: 10 },
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多商品了！ --</p>'
            },
            scoreGoodsList:''
        }
    },
    components: {
        MescrollVue
    },
    beforeCreate(){
        this.$store.dispatch('user')
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
        },
        user(){
            return this.$store.state.user
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '积分兑换'

    },
    methods: {
        search(){
            this.mescroll.resetUpScroll()
        },
        mescrollInit (mescroll) {
            this.mescroll = mescroll
        },
        upCallback (page, mescroll) {
            let list = { limit: page.size, current: page.num }
            this.$store.dispatch('scoreGoodsList', list)
            .then(res => {
                // console.log(res.data)
                if(res.data.code == 200) {
                    let arr = res.data.data
                    if (page.num === 1) this.scoreGoodsList = []
                    this.scoreGoodsList = this.scoreGoodsList.concat(arr)
                    this.$nextTick(() => {
                        res.data.data.length == 0 ? mescroll.endSuccess(this.scoreGoodsList.length, false) : mescroll.endSuccess(this.scoreGoodsList.length)
                    })
                }
            })
            .catch(err => mescroll.endErr())
        },
        sign(){
            this.$store.dispatch('addIntegration', 2)
        },
    }
}
</script>

<style lang="less" scoped>
#Integralshop{
    width: 100%; min-height: 100vh; font-size: 0.3rem; background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }
.font4{ font-family:FZSKJW--GB1-0; font-weight: normal; }

.IntegralMescroll{
    position: fixed;
    top: 0rem;
    bottom: 0rem;
    height: auto;
}

.Integralshop_nav{
    width: 100%; height: 2.58rem; display: flex; justify-content: space-around; align-items: center; background-color: white;
    div{
        text-align: center;
        img{ width: 0.88rem; height: 0.88rem; }
        p{ font-size: 0.24rem; .font1; line-height: 0.4rem; span{ color:rgba(245,100,100,1); .font4 } }
    }
}

.Integralshop_banner{
    width: 100%; height: 2.4rem; margin: 0.2rem 0; 
    img{ width: 100%; height: 100%; }
}

.Integralshop_main{ 
    width: 100%; min-height: 3rem;
    .Integralshop_main_{
        width: 100%; height: 1.07rem; color:rgba(43,43,43,1); .font1; border-bottom: 0.01rem solid rgba(206,206,206,1); padding-top: 0.4rem; padding-left: 0.4rem;
        background-color: white;
    }
    .Integralshop_main_list{
        width: 100%;
        .goods{
            width: 100%; height: 100%; display: flex; flex-wrap: wrap;
            .goods_list{
                width: 3.73rem; height: 4.55rem; margin-top: 0.02rem; background-color: white; padding: 0.4rem 0 0.1rem 0.4rem; 
                img{ width: 3.15rem; height: 2.4rem; }
                div{
                    width: 100%; height: 0.76rem; padding-right: 0.2rem; line-height: 0.38rem; margin-bottom: 0.2rem; margin-top: 0.05rem;
                    p{ overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font-size: 0.28rem; }
                }
                span{ color: #EA1616; .font1; }
            }
            .goods_list:nth-child(2n -1){ margin-right: 0.02rem; }
            .goods_list:nth-child(2n){ padding: 0.4rem 0 0.1rem 0.19rem!important; div{  padding-right: 0.4rem; } }
        }

        .goods_no{
            width: 100%; text-align: center; padding-top: 2rem; color: gainsboro; font-size: 0.24rem;
        }
    }
}


</style>