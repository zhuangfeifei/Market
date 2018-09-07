<template>
    <div id="home">

        <van-swipe class="swipe" :autoplay="3000">
            <van-swipe-item v-for="(item, index) in carousel" :key="index">
                <a :href="item.url"><img v-lazy="imgUrl + item.picture" /></a>
            </van-swipe-item>
        </van-swipe>

        <div class="classification">
            <router-link to="/Introduce"><div><img src="../../assets/img/introduce.png" alt=""><p>商场介绍</p></div></router-link>
            <div @click="changes"><img src="../../assets/img/brand.png" alt=""><p>品牌商家</p></div>
            <router-link to="/ShopActivity"><div><img src="../../assets/img/activity.png" alt=""><p>商场活动</p></div></router-link>
            <router-link to="/Wallet"><div><img src="../../assets/img/integral.png" alt=""><p>积分礼包</p></div></router-link>
            <a href="http://www.homeamc.cn/h5/car/auth"><div><img src="../../assets/img/Parking.png" alt=""><p>停车缴费</p></div></a>
            <router-link to="/Crab"><div><img src="../../assets/img/More.png" alt=""><p>更多</p></div></router-link>
        </div>

        <div class="Headline">
            <img src="../../assets/img/Headline.png" alt="">
            <span v-if="announceList != ''">{{announceList[0].title}}</span>
        </div>

        <div class="Discount">
            <h3>商家优惠<span @click="Discount_gets" class="Discount_get">查看全部</span></h3>
            <h4>限时福利、数量有限、抢完即止</h4>
            <div class="Discount_">
                <div class="Discount_list" @click="details(index)" v-for="(item,index) in preferentialList" :key="index" v-if="index < 4">
                    <img :src="imgUrl + item.topchartpic" alt="">
                    <div><p>{{item.title}}</p></div>
                </div>
            </div>
        </div>

        <div class="Selecteds">
            <h3>精选品牌</h3>
            <h4>精品商店一手掌握、随时随地想购就GO</h4>
        </div>
        <div class="brand">
            <span v-for="(item,index) in isFineList" :key="index">
                <img @click="Selected(item.id)" :src="imgUrl + item.logo_pic">
                <p>{{item.shopName}}</p>
            </span>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531461952740&di=6ad5282d2d30f8ba0d75cd2bade8eed8&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F25%2F79%2F58PIC4B58PICbtD.jpg'
            ],
            scrollWatch: true
        }
    },
    components: {
        
    },
    beforeCreate(){
        // this.$store.dispatch('carousel')
        // this.$store.dispatch('isFineList')
        let list = { current: 1, limit: 5, isPage: false }
        this.$store.dispatch('preferentialList', list)
        this.$store.dispatch('announceList')
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
        carousel(){
            return this.$store.state.carousel
        },
        isFineList(){
            return this.$store.state.isFineList
        },
        preferentialList(){
            return this.$store.state.preferentialList
        },
        announceList(){
            return this.$store.state.announceList
        },
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
        details(index){
            this.$router.push({path:'/DiscountItem',query:{indexs: index}})
        },
        Selected(shopid){
            this.$router.push({path:'/ShopDetils',query:{ shopid: shopid }})
        },
        changes(){
            this.$store.commit('ACTIVE', 1)
            this.$router.push({path:'/Brand'})
        },
        Discount_gets(){
            this.$store.commit('ACTIVE', 2)
            this.$router.push({path:'/Discount'})
        },
    },
    
}
</script>

<style lang="less" scoped>
    #home{
        width: 100%; height: 100%; padding-bottom: 1.1rem; background-color: white; font-size: 0.3rem;
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
        width: 100%; height: 3.6rem; padding: 0.1rem 0 0.25rem 0.4rem; font-size: 0.25rem; text-align: center;
        a{color:rgba(43,43,43,1);font-family:YouYuan;}
        & div{
            width: 2.1rem; height: 1.4rem; float: left; margin-right: 0.2rem; margin-top: 0.2rem;
            text-align: center; padding-top: 0.16rem;
            img{
                width: 0.74rem; height: 0.74rem;
            }
        }
    }

    .Headline{
        width: 100%; height: 1.28rem; border-top: 0.2rem solid rgba(232,232,232,1); border-bottom: 0.2rem solid rgba(232,232,232,1);
        font-size: 0.28rem; line-height: 0.88rem; padding-left: 0.39rem;
        & img{
            width: 1.19rem; height: 0.29rem; position: relative; top: 0.05rem; margin-right: 0.42rem
        }
    }

    .Discount{
        width: 100%; padding: 0.48rem 0 0.3rem 0.4rem;
        & h3{ font-size: 0.36rem; }
        .Discount_get{ float: right; font-size: 0.28rem; color:rgba(255,139,75,1); .font2; margin-right: 0.4rem; line-height: 0.55rem; }
        & h4{ font-size: 0.28rem; .font2; color:rgba(128,128,128,1); }
        .Discount_{
            display: inline-block; width: 100%; color: rgba(255,255,255,1);
            .Discount_list{
                width: 3.25rem; height: 3.25rem; float: left; margin-right: 0.2rem; margin-top: 0.2rem; position: relative;
                img{
                    width: 100%; height: 100%;
                }
                div{
                    width: 100%; height: 0.86rem; position: absolute; bottom: 0; left: 0; background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
                    text-shadow: 0.018rem 0.018rem 0.018rem black; line-height: 0.4rem; 
                    overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
                    font-size: 0.28rem; font-family:PingFang-SC-Medium; font-weight: Medium;
                }
            }
        }
    }

    .Selecteds{
        width: 100%; height: 1.9rem; position: relative; margin-top: 0.2rem; padding-left: 0.4rem; 
        border-top: 0.2rem solid rgba(232,232,232,1); padding-top: 0.48rem;
        & h3{ font-size: 0.36rem;  }
        & h4{ font-size: 0.28rem; .font2; color:rgba(128,128,128,1); }
    }

    .brand{
        width: calc(100% - 0.8rem); margin: 0 auto; padding-bottom: 0.3rem;
        border:1px solid rgba(206,206,206,1);
        span{
            display: inline-block;
            width: 33.33%; height: 1.7rem; text-align: center; margin-top: 0.3rem;
            img{ width: 1.2rem; height: 1.2rem; border-radius: 50%; }
            p{ font-size: 0.24rem; .font3; color:rgba(26,26,26,1); white-space: nowrap; overflow: hidden; }
        }
    }


</style>


