<template>
	
    <div class="Hot_comments">
        <!--<header-item>商店详情</header-item>-->

        <!--<nav v-if="shopDetail">
            <h4>{{shopDetail.shopName}}</h4>
            <p>{{shopDetail.categoryName}}</p>
            <div class="logos"><img :src="imgUrl + shopDetail.PATH" alt=""></div>
            <div class="logo">
                <img :src="imgUrl + shopDetail.logo_pic" alt="">
                <p>营业时间【{{shopDetail.START_TIME}}~{{shopDetail.END_TIME}}】</p>
                <p @click="map"><img src="../assets/img/address.png" alt=""><span>{{shopDetail.ADDRESS}}</span></p>
            </div>
        </nav>

        <div v-if="shopDetail" class="features">
            <h4>店铺特色</h4>
            <div class="description" v-html="shopDetail.content"></div>
        </div>

        <div class="Preferential">
            <h4>优惠信息</h4>
            <div class="information">
                <div class="Cash_coupon" @click="details(index)" v-for="(item,index) in groupList" :key="item.id">
                    <h3><img src="../assets/img/daijinquan.png" alt=""><span>代金券</span></h3>
                    <p>{{item.group_name}}</p>
                    <p><span>有效期：{{item.update_time}}</span><img src="../assets/img/yishoujiantou.png" alt=""><span>库存{{item.inventory}}</span></p>
                </div>
                <h3 class="packages"><img src="../assets/img/youtuitaocan.png" alt=""><span>优惠套餐</span></h3>
                <div class="package" v-for="(item,index) in 2" :key="index">
                    <div class="center">
                        <div class="left"><img :src="images[1]" alt=""></div>
                        <div class="right">
                            <p>下午茶</p>
                            <p><img src="../assets/img/yishoujiantou.png" alt=""><span>已售300</span></p>
                            <p><span>¥300</span><del>¥200</del></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="comment">
            <div class="list">
                <div class="portrait">
                    <div><img :src="images[1]" alt=""></div>
                    <div>
                        <p><span>姓名</span><span>01-19</span><img src="../assets/img/time.png" alt=""></p>
                        <div class="heart">
                            <div v-for="(item,index) in 5" :key="index">
                                <img v-if="index < 3" src="../assets/img/wujiaoxing1.png" alt="">
                                <img v-else src="../assets/img/wujiaoxing2.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class=""></div>
                    <div></div>
                </div>
            </div>
        </div>-->


        暂无

    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                images: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531461952740&di=6ad5282d2d30f8ba0d75cd2bade8eed8&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F25%2F79%2F58PIC4B58PICbtD.jpg'
                ],
                active: 0, title:['优惠信息','热门评论','品牌故事'], tabIndex: 0,
            }
        },
        components: {
            
        },
        beforeCreate(){
            
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
        },
        created(){
            
        },
        methods: {
            
            // tab(index){
            //     this.tabIndex = index
            // },
        }
	}
</script>

<style lang="less" scoped>
.Hot_comments{
    width: 100%; font-size: 0.3rem; min-height: calc(100vh - 1.2rem); padding: 0.4rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }


nav{
    width: calc(100% - 0.8rem); margin: 0 auto; padding-top: 0.63rem; text-align: center;
    h4{ font-size: 0.53rem; .font3; }
    p{ margin-top: 0.1rem; color: #7b7b7b; }
    .logos{
        width: 100%; height: 6.22rem; margin-top: 0.48rem;
        img{ width: 100%; height: 100%; border-radius: 0.13rem; }
    }
    .logo{
        width: 100%; height: 2.5rem; background: url("../assets/img/kuang.png") no-repeat; background-size: 100% 100%;
        margin: 0.64rem 0; text-align: center; padding-top: 0.1rem; .font1;
        img{ width: 1rem; height: 1rem; border-radius: 50%; }
        p:nth-child(3){
            color: #ea9518; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;
            img{ width: 0.25rem; height: 0.3rem; }
        }
    }
}

.features{
    width: calc(100% - 0.8rem); margin: 0 auto;
    h4{ font-size: 0.36rem; text-align: center; }
}

.Preferential{
    width: 100%; background-color: black; padding: 0.63rem 0.4rem 0 0.4rem;
    h4{ color: #a6a6a6; font-size: 0.26rem; .font3; }
    .information{
        width: 100%; background-color: white; margin-top: 0.3rem;
        .Cash_coupon{
            width: 100%; padding: 0.37rem 0.4rem 0.21rem 0.96rem; border-bottom: 0.01rem solid #dbdbdb;
            h3{
                font-size: 0.36rem; .font3; color: #444444; position: relative; left: -0.56rem;
                img{ width: 0.4rem; height: 0.4rem; position: relative; top: 0.08rem; margin-right: 0.16rem; }
            }
            p:nth-child(2){ margin-top: 0.2rem; font-size: 0.28rem; .font1; color: #666666; }
            p:nth-child(3){ 
                margin-top: 0.12rem; font-size: 0.22rem; .font2; color: #a6a6a6; 
                span:nth-child(3){ float: right; }
                img{ width: 0.11rem; height: 0.19rem; float: right; margin-left: 0.1rem; margin-top: 0.07rem; }
            }
        }
        .packages{
            font-size: 0.36rem; .font3; color: #444444; margin-top: 0.32rem; margin-left: 0.4rem;
            img{ width: 0.37rem; height: 0.36rem; position: relative; top: 0.07rem; margin-right: 0.16rem; }
        }
        .package{
            width: 100%; padding: 0.32rem 0.4rem; border-bottom: 0.01rem solid #dbdbdb;
            .center{
                width: 100%; height: 1.6rem; display: flex; justify-content: space-between;
                .left{
                    width: 1.6rem; height: 100%; 
                    img{ width: 100%; height: 100%; }
                }
                .right{
                    width: calc(100% - 1.6rem - 0.2rem); height: 100%;
                    p:nth-child(1){ .font1; font-size: 0.32rem; color: #444444; }
                    p:nth-child(2){ 
                        .font2; font-size: 0.22rem; color: #a6a6a6; text-align: right; line-height: 0.75rem; 
                        img{ width: 0.11rem; height: 0.19rem; float: right; margin-left: 0.1rem; margin-top: 0.26rem; }
                    }
                    p:nth-child(3){
                        span{ color: #d62b2b; font-size: 0.32rem; .font3; }
                        del{ color: #666666; font-size: 0.24rem; .font3; margin-left: 0.23rem; }
                    }
                }
            }
        }
    }
}

.comment{
    width: 100%; background-color: black; padding: 0.26rem 0.4rem;
    .list{
        width: 100%; background-color: white; padding: 0.6rem 0.4rem;
        .portrait{
            width: 100%; display: flex; justify-content: space-between;
            div:nth-child(1){ width: 1.02rem; height: 1.02rem; img{ width: 100%; height: 100%; border-radius: 50%; } }
            div:nth-child(2){ 
                width: calc(100% - 1.02rem - 0.4rem); height: 1.02rem; margin-top: 0.03rem;
                p{
                    span:nth-child(2){ float: right;  }
                    img{ width: 0.3rem; height: 0.3rem; float: right; position: relative; top: 0.03rem; left: -0.1rem; }
                }
                .heart{
                    width: 100%; height: 0.3rem; display: flex; margin-top: 0.1rem;
                    div{
                        width: 0.3rem; height: 0.3rem; margin: 0; margin-right: 0.12rem;
                        img{ width: 100%; height: 100%; }
                    }
                }
            }
        }
    }
}



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
            width: 100%; height: 100%; font-size: 0.36rem; color:rgba(43,43,43,1); .font3; line-height: 0.55rem; padding-top: 0.03rem;
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
    }
}

.ShopDetils_table{
    width: 100%; height: 1.2rem;
    .ShopDetils_table_nav{
        width: 100%; height: 100%; padding-top: 0.4rem; .font3; background:rgba(255,255,255,1); display: flex; justify-content: space-around;
        // position: fixed; top: 0; left: 0;
        border-bottom: 0.01rem solid rgba(206,206,206,1);
        div{
            height: 100%; text-align: center; line-height: 0.7rem; font-size: 0.36rem; color: rgba(43,43,43,1); position: relative;
            section{
                width: 1.42rem; height: 0.03rem; background:url("../assets/img/table.png"); position: absolute; bottom: 0; left: 0;
            }
        }
        .active{ color: rgba(255,139,75,1); }
    }
}



</style>