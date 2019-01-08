<template>
    <div id="IntegralshopDetails" v-if="scoreGoodDteail">
        
        <van-swipe :autoplay="3000" v-if="scoreGoodDteail">
            <van-swipe-item class="swipes" v-for="(image, index) in scoreGoodDteail.goods_images.split(',')" :key="index">
                <img class="swipe" :src="imgUrlGoods+image" />
            </van-swipe-item>
        </van-swipe>

        <section>
            <h3>{{scoreGoodDteail.goods_name}}</h3>
            <p><span>积分：</span>¥{{scoreGoodDteail.score}}</p>
        </section>

        <div class="group">
            <van-row><van-col span="10">运费：免运费</van-col><van-col>剩余：{{scoreGoodDteail.storage_num}}</van-col></van-row>
        </div>
        <p class="IntegralshopDetails_title">商品详情</p>
        <div id="IntegralshopDetails_html">{{scoreGoodDteail.remark}}</div>

        <div class="Integral_exchange">
            <div class="Integral_exchange_num"><span>数量</span><van-stepper class="ShoppingCart_num" v-model="amount"/></div>
            <div class="Integral_exchange_" @click="onClickMiniBtn">立即兑换</div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {  
        return {
            amount:1
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('scoreGoodDteail', this.$route.query.id)
    },
    computed:{
        scoreGoodDteail(){
            return this.$store.state.scoreGoodDteail[0]
        },
        htmls(){
            return this.$store.getters.htmls
        },
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '商品详情'
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        onClickMiniBtn() {
            let list = { 
                scoreGoodId: this.$route.query.id, totalScore: this.scoreGoodDteail.score, goodsNum: this.amount
            }
            this.$store.dispatch('exchange', list)
        },
    },
}
</script>

<style lang="less" scoped>
#IntegralshopDetails{
    width: 100%; min-height: 100vh; font-size: 0.3rem;  background-color: white; padding-bottom: 2rem; 
    // background:rgba(246,246,246,1);
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

.swipes{ background-color: white; }
.swipe{
    width: 100%; height: 7rem;
}

.cell{
    height: 0.8rem; padding: 0.2rem 0.3rem;
}

section{
    width: 100%; padding-left: 0.3rem; background-color: white;
    h3{ font-size: 0.35rem; .font1; }
    p{ color: red; line-height: 0.7rem; span{ font-size: 0.26rem; color: gray } span:nth-child(2){ font-size: 0.24rem; margin-left: 0.3rem; } del{ font-size: 0.24rem; } 
        span:nth-child(4){ float: right; margin-right: 0.3rem; font-size: 0.24rem; }
    }
}

.group{  
    height: 1rem; line-height: 0.8rem; color: gray; border-top: 0.01rem solid gainsboro; border-bottom: 0.2rem solid gainsboro;
    font-size: 0.24rem; padding-left: 0.3rem; margin-top: 0.2rem;
}

.IntegralshopDetails_title{
    color: gray; font-size: 0.24rem; line-height: 0.6rem; padding-left: 0.3rem;
}

.Integral_exchange{
    width: 100%;  height: 0.99rem; position: fixed; bottom: 0; left: 0; background-color: white;
    .font1; display: flex;
    .Integral_exchange_num{ 
        width: 50%; height: 100%; display: flex; border-top: 0.01rem solid #CECECE; padding-top: 0.2rem;
        span{ color:rgba(43,43,43,1); font-size: 0.24rem; line-height: 0.6rem; margin-left: 0.4rem; margin-right: 0.2rem; }
        .ShoppingCart_num{
            width: 70%; 
        }
    }
    .Integral_exchange_{
        width: 50%; height: 100%; background:rgba(255,139,75,1); line-height: 0.99rem; text-align: center; color:rgba(255,255,255,1);
    }
}
    
</style>


