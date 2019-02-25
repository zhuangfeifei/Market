<template>
    <div id="home" v-if="market_unionId">

        <div v-show="fixed" class="home_input_">
            <img src="../../assets/img/search.png" @click="$router.push({path:'/Goods',query:{goodsName: SearchgoodsName}})" alt="">
            <form action=""><input class="home_input" v-model="SearchgoodsName" input-align="center" placeholder="搜索你想要的商品" /></form>
        </div>

        <van-swipe class="swipe" :autoplay="3000">
            <van-swipe-item v-for="(item, index) in carousel" :key="index">
                <router-link v-if="item.titlename === '太湖专题'" to="/Crab"><img :src="imgUrl + item.picture" /></router-link>
                <a v-else :href="item.url"><img v-lazy="imgUrl + item.picture" /></a>
            </van-swipe-item>
        </van-swipe>

        <div class="classification" v-if="index_icon">
            <router-link to="/Introduce"><div><img :src="imgUrlIcons + index_icon.middleMenus[0].iconImage" alt=""></div></router-link>
            <router-link to="/ShopActivity"><div><img :src="imgUrlIcons + index_icon.middleMenus[1].iconImage" alt=""></div></router-link>
            <a href="http://www.homeamc.cn/h5/car/auth"><div><img :src="imgUrlIcons + index_icon.middleMenus[2].iconImage" alt=""></div></a>
            <router-link to="/Integralshop"><div><img :src="imgUrlIcons + index_icon.middleMenus[3].iconImage" alt=""></div></router-link>
            <div @click="shops(1)"><img :src="imgUrlIcons + index_icon.middleMenus[4].iconImage" alt=""></div>
            <div @click="shops(0)"><img :src="imgUrlIcons + index_icon.middleMenus[5].iconImage" alt=""></div>
            <router-link to="/Vouchers"><div><img :src="imgUrlIcons + index_icon.middleMenus[6].iconImage" alt=""></div></router-link>
            <router-link to="/CouponAll"><div><img :src="imgUrlIcons + index_icon.middleMenus[7].iconImage" alt=""></div></router-link>
        </div>

        <div class="Headline" @click="announce">
            <img src="../../assets/img/Headline.png" alt="">
            <span v-if="announceList != ''">{{announceList[0].title}}</span>
        </div>

        <div class="Home_activity">
            <section><img src="../../assets/home/Home_activity.png" alt=""><p>活动专区</p></section>
            <div>
                <img @click="$router.push({path:''})" src="../../assets/home/Home_activity_kill.png" alt="">
                <img @click="$router.push({path:'/Promotion'})" src="../../assets/home/Home_activity_promotion.png" alt="">
            </div>
        </div>
        
        <div class="home_list" v-for="(item,index) in index_goods" :key="index">
            <div class="home_list_title" @click="goodStatus(item)">
                <img class="home_list_title_img" v-lazy="imgUrl + '/file/newfunc/' + item.icon" alt="">
                <span :class="{home_list_title1: item.categoryName === '中外名酒', home_list_title2: item.categoryName === '生鲜水果', home_list_title3: item.categoryName === '食品饮料',
                    home_list_title4: item.categoryName === '个人护理' || item.categoryName === '年货市集', home_list_title5: item.categoryName === '家居清洁', home_list_title6: item.categoryName === '粮油副食'}">
                    {{item.categoryName}}
                </span> 
                <div>更多<img class="home_list_title_more" src="../../assets/home/more.png" alt=""></div>
            </div>
            <div class="home_list_wines" @click="$router.push({path:'/GoodStatus',query:{categoryId: item.categoryId, title: item.categoryName}})">
                <img v-lazy="imgUrl + '/file/newfunc/' + item.coverImage" alt="">
            </div>
            <div>
                <grid :cols="3" :show-lr-borders="false">
                    <grid-item v-for="(val,i) in item.goodsInfo" :key="i">
                        <div @click="details(val.id)" class="grid-center"><img v-lazy="imgUrlGoods + val.thumbnailPic" alt=""></div>
                        <div @click="details(val.id)" class="grid-centers">
                            <div>{{val.goodsName}}</div>
                            <p class="grid-center-money">¥{{val.price}}<del>¥{{val.marketPrice}}</del></p>
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
            fixed: true, scrollTop:'',SearchgoodsName:''
        }
    },
    components: {
        Grid,
        GridItem,
        GroupTitle,
    },
    beforeCreate(){
        let list = { current: 1, limit: 5, isPage: false }
        this.$store.dispatch('preferentialList', list)
        this.$store.dispatch('announceList')
        let lists = { current: 1, limit: 10, categoryId:'', categoryLevel: '', goodsLabel: 0 }
        this.$store.dispatch('goodsList', lists)
        this.$store.dispatch('index_goods')
        this.$store.dispatch('index_icon')
    },
    computed:{
        ...mapState({
            imgUrl: state => state.imgUrl,
            imgUrlGoods: state => state.imgUrlGoods,
            imgUrlIcons: state => state.imgUrlIcons,
            carousel: state => state.carousel,
            isFineList: state => state.isFineList,
            preferentialList: state => state.preferentialList,
            announceList: state => state.announceList,
            announceDetail: state => state.announceDetail,
            market_unionId: state => state.market_unionId,
            goodsList: state => state.goodsList,
            index_icon: state => state.index_icon,
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
        window.addEventListener('scroll', this.scrollFixed)
        // $(window).scrollTop(0);
        // $(window).on('scroll', () => {
        //     if (this.scrollWatch) {
        //         //your code here
        //         console.log(0)
        //     }
        // })
        this.focus()
    },
    // destroyed () {
    //     this.scrollWatch = false;
    // },
    methods:{
        details(id){
            this.$router.push({path:'/GoodsDetails',query:{id: id}})
            // this.$router.push({path:'/DiscountItem',query:{indexs: index}})
        },
        Selected(shopid){
            this.$router.push({path:'/ShopDetils',query:{ shopid: shopid }})
        },
        // classifications(name){
        //     this.$store.commit('CATEGORY_NAME', name)
        //     this.$router.push({path:'/Classification'})
        //     this.$store.commit('ACTIVE', 1)
        // },
        shops(index){
            this.$router.push({path:'/Goods',query:{ goodsLabel: index, title: index == 0 ? '热销商品' : '最新商品' }})
        },
        scrollFixed(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.scrollTop = scrollTop
        },
        focus(){
            $(document).ready(()=>{
                var win_h = $(window).height();//关键代码
                window.addEventListener('resize', this.focusChang);
            })
        },
        focusChang(){
            $(document).ready(()=>{
                $(window).height() < win_h ? this.$store.commit('isFocus', false) : this.$store.commit('isFocus', true)
            })
        },
        announce(){
            this.$dialog.alert({
                title: this.announceList[0].title,
                message: this.announceDetail[0].offer_deatils,
                // confirmButtonText: '确定'
            }).then(() => {
                // router.push({path:'/'})
            })
        },
        goodStatus(item){
            // console.log(true)
            // this.$store.commit("includedComponents", this.$store.state.includedComponent+",GoodStatus")
            // this.$store.commit("excludedComponents","");
            this.$router.push({path:'/GoodStatus',query:{categoryId: item.categoryId, title: item.categoryName}})
        },
    },
    watch:{
        scrollTop(val,old){
            val > old && val != 0  ? this.fixed = false : this.fixed = true
        },
        SearchgoodsName(val,old){
            var oForm =  document.getElementsByTagName("form")[0];
            let _this = this
            oForm.onsubmit = function(){
                _this.$router.push({path:'/Goods',query:{goodsName: _this.SearchgoodsName}})
            }
        },
    },
    // beforeRouteLeave(to, from, next) {   
    //     // 设置下一个路由的 meta
    //     console.log('home')
    //     console.log(to)
    //     to.path === '/GoodStatus' ? to.meta.keepAlive = false : null
    //     next();
    // },
    destroyed(){
        window.removeEventListener('scroll', this.scrollFixed)
        window.removeEventListener('resize', this.focusChang)
    },
}
</script>

<style lang="less" scoped>
#home{
    width: 100%; height: 100%; padding-bottom: 0.2rem; background-color: rgba(246,246,246,1); font-size: 0.3rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box; 
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

.home_input_{
    width: 90%; height: 0.64rem; position: fixed; top: 0.2rem; left: 0.4rem; background:rgba(206,206,206,0.8); z-index: 10; border-radius: 0.32rem;
    display: flex; align-items: center; padding-left: 0.3rem; transition: all 2s; 
    img{ width: 0.42rem; height: 0.42rem; }
    form{ width: 75%; height: 0.45rem; }
    .home_input{
        width: 100%; height: 100%; margin-left: 0.2rem; background: none; color: #2B2B2B; text-align: center; outline: none; border: 0; font-size: 0.28rem;
    }
    .home_input::-moz-placeholder{
        color: #2B2B2B; font-size: 0.28rem;
    }
    .home_input::-webkit-input-placeholder{
        color: #2B2B2B; font-size: 0.28rem;
    }
}

.swipe{
    width: 95%; height: 2.84rem; margin: 0 auto;
    & img{
        width: 100%; height: 100%;
    }
}

.classification{
    width: 95%; height: 3.6rem; font-size: 0.25rem; text-align: center; background-color: white; margin: 0 auto; margin-top: 0.2rem; border-radius: 0.1rem;
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
    width: 95%; height: 0.88rem; background-color: white; margin: 0 auto; margin-top: 0.2rem; border-radius: 0.1rem;
    font-size: 0.28rem; line-height: 0.88rem; padding-left: 0.39rem;
    & img{
        width: 1.19rem; height: 0.29rem; position: relative; top: 0.05rem; margin-right: 0.42rem
    }
}



.Home_activity{
    width: 95%; height: 3.45rem; background-color: white; border-radius: 0.1rem; margin: 0 auto; margin-top: 0.2rem;
    section{
        width: 100%; height: 0.71rem; border-bottom: 0.01rem solid rgba(234,22,22,0.2); display: flex; justify-content: center; align-items: center; position: relative;
        img{ width: 4.6rem; height: 0.54rem; }
        p{ position: absolute; color: #EA1616; font-size: 0.32rem; .font3; }
    }
    div{
        width: 100%; height: 2.73rem; display: flex; justify-content: space-between; padding: 0 0.4rem; align-items: center;
        img{ width: calc(50% - 0.1rem); height: 2.33rem; }
    }
}



.home_list{
    width: 95%; height: calc(0.78rem + 2.4rem + 3.1rem + 0.3rem); background-color: white; margin: 0 auto; margin-top: 0.2rem; overflow: hidden; border-radius: 0.1rem;
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
    width: 100%; color: #4B4B4B; padding: calc((100% - 2.1rem) / 2); padding-bottom: 0.1rem!important; text-align: center;
    img{ max-width: 2.1rem; max-height: 2.1rem; }
}
.grid-centers {
    width: 100%; color: #4B4B4B; padding: calc((100% - 2.1rem) / 2); border-top: 0.008rem solid rgba(255,139,75,0.3);
    div{ width: 100%; height: 0.3rem; font-size: 0.24rem; line-height: 0.3rem; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
    span{ background-color: #F15C4E; border-radius: 0.03rem; color: white; padding: 0.02rem 0.06rem; font-size: 0.14rem!important; }
    .grid-center-money{ font-size: 0.24rem; color: #EA1616; .font1; margin-top: 0.08rem; letter-spacing: 0.02rem; del{ font-size: 0.2rem!important; color: #808080; margin-left: 0.1rem; } }
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


