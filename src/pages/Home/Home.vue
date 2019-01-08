<template>
    <div id="home" v-if="market_unionId">

        <van-swipe class="swipe" :autoplay="3000">
            <van-swipe-item v-for="(item, index) in carousel" :key="index">
                <router-link v-if="item.titlename === '太湖专题'" to="/Crab"><img :src="imgUrl + item.picture" /></router-link>
                <a v-else :href="item.url"><img v-lazy="imgUrl + item.picture" /></a>
            </van-swipe-item>
        </van-swipe>

        <div class="classification">
            <router-link to="/Introduce"><div><img src="../../assets/img/Introduces.png" alt=""></div></router-link>
            <router-link to="/ShopActivity"><div><img src="../../assets/img/ShopActivity.png" alt=""></div></router-link>
            <a href="http://www.homeamc.cn/h5/car/auth"><div><img src="../../assets/img/car.png" alt=""></div></a>
            <router-link to="/Integralshop"><div><img src="../../assets/img/Wallet.png" alt=""></div></router-link>
            <div @click="shops(1)"><img src="../../assets/img/newgood.png" alt=""></div>
            <div @click="shops(0)"><img src="../../assets/img/good.png" alt=""></div>
            <router-link to="/Vouchers"><div><img src="../../assets/img/securities.png" alt=""></div></router-link>
            <router-link to="/CouponAll"><div><img src="../../assets/img/CouponAlls.png" alt=""></div></router-link>
        </div>

        <div class="Headline" @click="$router.push('')">
            <img src="../../assets/img/Headline.png" alt="">
            <span v-if="announceList != ''">{{announceList[0].title}}</span>
        </div>
        
        <div class="home_list" v-for="(item,index) in index_goods" :key="index">
            <div class="home_list_title" @click="classifications(item.categoryName)">
                <img class="home_list_title_img" v-lazy="imgUrl + '/file/newfunc/' + item.icon" alt="">
                <span :class="{home_list_title1: item.categoryName === '中外名酒', home_list_title2: item.categoryName === '生鲜水果', home_list_title3: item.categoryName === '食品饮料',
                        home_list_title4: item.categoryName === '个人护理', home_list_title5: item.categoryName === '家居清洁', home_list_title6: item.categoryName === '粮油副食'}">{{item.categoryName}}</span> 
                <div>更多<img class="home_list_title_more" src="../../assets/home/more.png" alt=""></div>
            </div>
            <div class="home_list_wines" @click="classifications(item.categoryName)"><img v-lazy="imgUrl + '/file/newfunc/' + item.coverImage" alt=""></div>
            <div>
                <grid :cols="3" :show-lr-borders="false">
                    <grid-item v-for="(val,i) in item.goodsInfo" :key="i">
                        <div @click="details(val.id)" class="grid-center"><img v-lazy="imgUrlGoods + val.thumbnailPic" alt=""></div>
                        <div @click="details(val.id)" class="grid-centers">
                            <div>{{val.goodsName}}</div>
                            <!-- <span>满2斤送1500积分</span> -->
                            <p class="grid-center-money">¥{{val.price}}</p>
                        </div>
                    </grid-item>
                </grid>
            </div>
        </div>

    </div>
</template>

<script>
import { Grid, GridItem, GroupTitle } from 'vux'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            scrollWatch: true, defaults:require('../../assets/img/default.png'),
        }
    },
    components: {
        Grid,
    GridItem,
    GroupTitle
    },
    beforeCreate(){
        let list = { current: 1, limit: 5, isPage: false }
        this.$store.dispatch('preferentialList', list)
        this.$store.dispatch('announceList')
        let lists = { current: 1, limit: 10, categoryId:'', categoryLevel: '', goodsLabel: 0 }
        this.$store.dispatch('goodsList', lists)
        this.$store.dispatch('index_goods')
        // this.$store.dispatch('index_icon')
    },
    computed:{
        ...mapState({
            imgUrl: state => state.imgUrl,
            imgUrlGoods: state => state.imgUrlGoods,
            carousel: state => state.carousel,
            isFineList: state => state.isFineList,
            preferentialList: state => state.preferentialList,
            announceList: state => state.announceList,
            market_unionId: state => state.market_unionId,
            goodsList: state => state.goodsList,
            index_goods: state => {
                let array = []
                for(let val of state.index_goods){
                    val.goodsInfo = [ val.goodsInfo1, val.goodsInfo2, val.goodsInfo3 ]
                    array.push(val)
                }
                return array
            },
        }),
    },
    created(){
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        document.title = '方圆里'
        this.$store.commit('ACTIVE', 0)
    },
    mounted() {
        // $(window).scrollTop(0);
        // $(window).on('scroll', () => {
        //     if (this.scrollWatch) {
        //         //your code here
        //         console.log(0)
        //     }
        // })
    },
    destroyed () {
        this.scrollWatch = false;
    },
    methods:{
        details(id){
            this.$router.push({path:'/GoodsDetails',query:{id: id}})
            // this.$router.push({path:'/DiscountItem',query:{indexs: index}})
        },
        Selected(shopid){
            this.$router.push({path:'/ShopDetils',query:{ shopid: shopid }})
        },
        classifications(name){
            this.$store.commit('CATEGORY_NAME', name)
            this.$router.push({path:'/Classification'})
            this.$store.commit('ACTIVE', 1)
        },
        shops(index){
            this.$router.push({path:'/Goods',query:{ goodsLabel: index, title: index == 0 ? '热销商品' : '最新商品' }})
        }
    },
    
}
</script>

<style lang="less" scoped>
#home{
    width: 100%; height: 100%; padding-bottom: 0.2rem; background-color: rgba(232,232,232,1); font-size: 0.3rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box; 
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

.swipe{
    width: 100%; height: 4.26rem;
    & img{
        width: 100%; height: 100%;
    }
}

.classification{
    width: 100%; height: 3.6rem; font-size: 0.25rem; text-align: center; background-color: white;
    a{color:rgba(43,43,43,1);font-family:YouYuan;}
    & div{
        width: 25%; height: 1.4rem; float: left; margin-top: 0.2rem;
        text-align: center; padding-top: 0.16rem;
        img{
            width: 0.94rem; height: 1.18rem;
        }
    }
}

.Headline{
    width: 100%; height: 0.88rem; background-color: white; margin-top: 0.2rem;
    font-size: 0.28rem; line-height: 0.88rem; padding-left: 0.39rem;
    & img{
        width: 1.19rem; height: 0.29rem; position: relative; top: 0.05rem; margin-right: 0.42rem
    }
}

.home_list{
    width: 100%; height: calc(0.78rem + 2.4rem + 3.1rem + 0.5rem); background-color: white; margin-top: 0.2rem; overflow: hidden;
    .home_list_title{
        width: 100%; height: 0.78rem; text-align: center; position: relative; color: #F09513; .font1; line-height: 0.78rem;
        .home_list_title_img{ height: 0.34rem; position: relative; top: 0.05rem; margin-right: 0.1rem; }
        .home_list_title1{ color: #F09513; }
        .home_list_title2{ color: #E82D08; }
        .home_list_title3{ color: #348ADF; }
        .home_list_title4{ color: #2AAC6C; }
        .home_list_title5{ color: #AC57D0; }
        .home_list_title6{ color: #F15D1C; }
        div{ 
            position: absolute; right: 0.3rem; top: 0; font-size: 0.24rem; color: #808080; .font2;
            .home_list_title_more{ width: 0.08rem; height: 0.14rem; position: relative; top: -0.03rem; left: 0.1rem; }
        }
    }
    .home_list_wines{ width: 100%; height: 2.4rem; img{ width: 100%; height: 100%; } }
}
.grid-center {
    width: 100%; color: #4B4B4B; padding: calc((100% - 2.1rem) / 2); padding-bottom: 0.1rem!important;
    img{ width: 2.1rem; height: 2.1rem; }
}
.grid-centers {
    width: 100%; color: #4B4B4B; padding: calc((100% - 2.1rem) / 2); border-top: 0.008rem solid rgba(255,139,75,0.3);
    div{ width: 100%; height: 0.3rem; font-size: 0.24rem; line-height: 0.3rem; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
    span{ background-color: #F15C4E; border-radius: 0.03rem; color: white; padding: 0.02rem 0.06rem; font-size: 0.14rem!important; }
    .grid-center-money{ font-size: 0.24rem; color: #EA1616; .font1; margin-top: 0.08rem; letter-spacing: 0.02rem; }
}
.weui-grid {
    margin: 0; padding: 0!important;
}
.weui-grids:before {
    border-top: 0!important; 
}
.weui-grid:before {
    border-right: 1px solid rgba(255,139,75,0.3); border-top: 0; 
}
.weui-grid:after{ border-bottom: 0; }


</style>


