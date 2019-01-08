<template>
    <div id="GoodsDetails">
        
        <van-swipe :autoplay="3000" v-if="CategoryTwoOrThreeListDetail">
            <van-swipe-item class="swipes" v-for="(image, index) in CategoryTwoOrThreeListDetail.goods_pic.split(',')" :key="index">
                <img class="swipe" :src="imgUrlGoods+image" />
            </van-swipe-item>
        </van-swipe>

        <section>
            <h3>{{CategoryTwoOrThreeListDetail.goods_name}}</h3>
            <p><span>专享价：</span>¥{{CategoryTwoOrThreeListDetail.price}} <span>市场价：</span><del>¥{{CategoryTwoOrThreeListDetail.market_price}}</del><span>{{CategoryTwoOrThreeListDetail.goods_specif}}</span></p>
        </section>

        <div class="group">
            <van-row><van-col span="10">运费：免运费</van-col><van-col>剩余：{{CategoryTwoOrThreeListDetail.inventory}}</van-col></van-row>
        </div>
        <p class="GoodsDetails_title">商品详情</p>
        <div id="GoodsDetails_html" v-html="htmls"></div>

        <van-goods-action>
            <van-goods-action-mini-btn icon="phone-o" text="客服" @click="onClickKeBtn"/>
            <van-goods-action-mini-btn icon="shopping-cart-o" text="购物车" @click="$router.push('/ShoppingCart')"/>
            <van-goods-action-big-btn text="加入购物车" @click="onClickMiniBtn"/>
            <van-goods-action-big-btn text="立即购买" primary @click="onClickBigBtn"/>
        </van-goods-action>
        
    </div>
</template>

<script>
export default {
    data() {  
        return {
            
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('CategoryTwoOrThreeListDetail', this.$route.query.id)
    },
    computed:{
        CategoryTwoOrThreeListDetail(){
            return this.$store.state.CategoryTwoOrThreeListDetail
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
            this.$store.dispatch('insertGoods', this.$route.query.id)
        },
        onClickBigBtn() {
            this.$router.push({path:'/CreateGoods',query:{id: this.CategoryTwoOrThreeListDetail.id}})
        },
        onClickKeBtn(){
            window.location.href = 'tel:0512-66831208'
        }
    },
}
</script>

<style lang="less" scoped>
    #GoodsDetails{
        width: 100%; min-height: 100vh; font-size: 0.3rem;  background-color: white; padding-bottom: 1rem;
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

    .GoodsDetails_title{
        color: gray; font-size: 0.24rem; line-height: 0.6rem; padding-left: 0.3rem;
    }

    
</style>


