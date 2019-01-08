<template>
	
    <div class="ShopDetils">
        
        <van-swipe v-if="shopDetail.PATH" class="ShopDetils_swipe" :autoplay="3000">
            <van-swipe-item v-for="(item, index) in shopDetail.PATH.split(';')" :key="index">
                <img v-lazy="imgUrl + item" />
            </van-swipe-item>
        </van-swipe>

        <div class="ShopDetils_nav">
            <div class="ShopDetils_nav_title">
                <img :src="imgUrl + shopDetail.logo_pic" alt="">
                <div><h4>{{shopDetail.shopName}}</h4><p>{{shopDetail.categoryName}}</p></div>
            </div>
            <div class="ShopDetils_nav_time"><img src="../../assets/img/clock.png" alt=""><span>营业时间：{{shopDetail.START_TIME}}~{{shopDetail.END_TIME}}</span></div>
            <div class="ShopDetils_nav_address"><img src="../../assets/img/address.png" alt=""><div @click="map">{{shopDetail.ADDRESS}}</div><a :href="'tel:'+ (shopDetail.PHONE || shopDetail.FIX_PHONE)"><img class="ShopDetils_nav_phone" src="../../assets/img/phone.png" alt=""></a></div>
        </div>

        <div class="ShopDetils_Recommend">
            <div class="ShopDetils_Recommend_title"><span>推荐商品</span><span>查看更多</span></div>
            <div v-if="mainGoods" class="ShopDetils_Recommend_scroll">
                <div v-if="mainGoods.length > 0" class="ShopDetils_Recommend_scrolls" :style="{'width':''+(mainGoods.length*2.2 + 0.6)+'rem'}">
                    <div class="ShopDetils_Recommend_list" v-for="(item, index) in mainGoods" :key="index">
                        <div class="ShopDetils_Recommend_list_img">
                            <img class="list_img" @click="imgClick(index)" :src="imgUrl + item.thumbnail" alt="">
                            <img v-if="true" class="status" src="../../assets/img/push.png" alt=""><img v-else class="status" src="../../assets/img/new.png" alt="">
                        </div>
                        <p>{{item.goods_name}}</p>
                    </div>
                </div>
                <div v-else class="ShopDetils_No">暂无</div>
            </div>
        </div>

        <div class="ShopDetils_table">
            <div class="ShopDetils_table_nav" :class="{Fiexd:tableFixed}">
                <div @click="tab(index)" v-for="(item,index) in title" :key="index" :class="{active: tabIndex == index}"><span>{{item}}</span><section v-show="tabIndex == index"></section></div>
            </div>
        </div>

        <Preferential-information v-if="tabIndex == 0" :groupList="groupList"></Preferential-information>
        <Hot-comments v-if="tabIndex == 1"></Hot-comments>
        <v-html v-if="tabIndex == 2"></v-html>

        <van-popup class="ImagePreviews" v-model="show"><img class="ImagePreview" @click="isShow" :src="imgs" alt=""></van-popup>

    </div>

</template>

<script>
import Preferential_information from '../../components/Preferential_information'
import Hot_comments from '../../components/Hot_comments'
import html from '../../components/html'
import { ImagePreview } from 'vant'
import { setTimeout } from 'timers';
	export default {
		name: "loginpassword-item",
        data(){
            return{
                active: 0, title:['优惠信息','热门评论','品牌故事'], tabIndex: 0, tableFixed: false, show:false, imgs:''
            }
        },
        components: {
            'Preferential-information':Preferential_information,
            'v-html':html,
            'Hot-comments':Hot_comments
        },
        beforeCreate(){
            this.$store.dispatch('shopDetail', this.$route.query.shopid)
            this.$store.dispatch('groupList', this.$route.query.shopid)
            this.$store.dispatch('mainGoods', this.$route.query.shopid)
        },
        computed:{
            imgUrl(){
                return this.$store.state.imgUrl
            },
            shopDetail(){
                return this.$store.state.shopDetail
            },
            groupList(){
                return this.$store.state.groupList
            },
            mainGoods(){
                return this.$store.state.mainGoods
            },
        },
        created(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            document.title = '商家详情'
            window.addEventListener('scroll', this.fixed)

            
        },
        methods: {
            map(){
                window.location.href = 'https://uri.amap.com/navigation?from=&to='+this.shopDetail.LNG+','+this.shopDetail.LAT+','+this.shopDetail.ADDRESS+'&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=0'
            },
            tab(index){
                this.tabIndex = index
                index == 2 ? this.$store.commit('HTML', this.shopDetail.content) : ''
                let Top = $(".ShopDetils_table").offset().top
                $(window).scrollTop(Top)
            },
            fixed(){
                var scrollTop = $(window).scrollTop()
                var tableTop = $('.ShopDetils_table').offset().top
                scrollTop >= tableTop ? this.tableFixed = true : this.tableFixed = false
            },
            imgClick(index){
                this.imgs = this.imgUrl+this.mainGoods[index].thumbnail
                this.show = true
            },
            isShow(){
                this.show = false
            }
        },
        destroyed(){
            window.removeEventListener('scroll', this.fixed)
        }
	}
</script>

<style lang="less" scoped>
.ShopDetils{
    width: 100%; font-size: 0.3rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }


.ShopDetils_swipe{
    width: 100%; height: 4.2rem;
    & img{
        width: 100%; height: 100%;
    }
}

.ShopDetils_nav{
    width: calc(100% - 0.8rem); padding: 0.48rem 0; margin: 0 auto; border-bottom: 0.02rem dashed rgba(206,206,206,1); 
    & .ShopDetils_nav_title{
        width: 100%; height: 1.2rem; display: flex;
        img{ width: 1.2rem; height: 100%; border-radius: 50%; margin-right: 0.3rem; }
        div{
            width: calc(100% - 1.2rem - 0.3rem); height: 100%; font-size: 0.36rem; color:rgba(43,43,43,1); .font3; line-height: 0.55rem; padding-top: 0.03rem;
            p{ font-size: 0.3rem; color: rgba(234,22,22,1); .font2; }
        }
    }
    & .ShopDetils_nav_time{
        width: 100%; height: 0.32rem; display: flex; margin-top: 0.48rem; line-height: 0.32rem; font-size: 0.28rem; color:rgba(75,75,75,1); .font2;
        img{ width: 0.32rem; height: 0.32rem; margin-right: 0.3rem; }
    }
    & .ShopDetils_nav_address{
        width: 100%; display: flex; justify-content: space-between; margin-top: 0.32rem; line-height: 0.36rem; font-size: 0.28rem; color:rgba(75,75,75,1); .font2;
        img{ width: 0.3rem; height: 0.35rem; margin-right: 0.3rem; }
        & div{ width: 100%; margin-right: 0.35rem; }
        .ShopDetils_nav_phone{ width: 0.64rem; height: 0.64rem; position: relative; top: -0.15rem; }
    }
}

.ShopDetils_Recommend{
    width: 100%; padding: 0.64rem 0; border-bottom: 0.2rem solid rgba(232,232,232,1);
    & .ShopDetils_Recommend_title{
        width: 100%; height: 0.48rem; margin-bottom: 0.48rem; padding: 0 0.4rem;
        span:nth-child(1){ float: left; font-size: 0.36rem; color:rgba(43,43,43,1); .font3; }
        span:nth-child(2){ float: right; font-size: 0.28rem; color:rgba(255,139,75,1); .font2; line-height: 0.52rem; }
    }
    & .ShopDetils_Recommend_scroll{
        width: 100%; height: 2.1rem; overflow-x: scroll; -webkit-overflow-scrolling: touch;
        .ShopDetils_Recommend_scrolls{
            height: 100%; padding-left: 0.4rem;
            .ShopDetils_Recommend_list{
                width: 2rem; height: 100%; margin-right: 0.2rem; float: left; position: relative;
                .ShopDetils_Recommend_list_img{
                    width: 100%; height: 1.5rem;
                    .list_img{ width: 100%; height: 100%; border-radius: 0.1rem; }
                    .status{ width: 0.8rem; height: 0.32rem; position: absolute; top: 0; left: 0; }
                }
                p{ font-size: 0.28rem; color:rgba(75,75,75,1); .font1; margin-top: 0.1rem; white-space: nowrap; overflow: hidden; }
            }
        }
        .ShopDetils_No{ margin-left: 0.4rem; }
    }
}

.ShopDetils_table{
    width: 100%; height: 1.2rem; position: relative; z-index: 10;
    .ShopDetils_table_nav{
        width: 100%; height: 1.2rem; padding-top: 0.4rem; .font3; background:rgba(255,255,255,1); padding-left: 0.4rem;
        border-bottom: 0.01rem solid rgba(206,206,206,1); 
        div{
            height: 100%; text-align: center; line-height: 0.7rem; font-size: 0.36rem; color: rgba(43,43,43,1); position: relative; float: left; margin-right: 0.64rem;
            section{
                width: 1.42rem; height: 0.03rem; background:url("../../assets/img/table.png") no-repeat; background-size: 100% 100%; position: absolute; bottom: 0; left: 0;
            }
        }
        .active{ color: rgba(255,139,75,1); }
    }
    .Fiexd{ position: fixed; top: 0; left: 0; }
}



.ImagePreviews{ background: none; }
.ImagePreview{
    max-width: 100vw; text-align: center;
}



</style>