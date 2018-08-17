<template>
	
    <div class="yuyue">
        <!--<header-item>商店详情</header-item>-->

        <nav v-if="shopDetail">
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
                <div class="Cash_coupon">
                    <h3><img src="../assets/img/daijinquan.png" alt=""><span>代金券</span></h3>
                    <p>每满100减30元</p>
                    <p><span>有效期：2017.8.1-2017.9.1</span><img src="../assets/img/yishoujiantou.png" alt=""><span>已售300</span></p>
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
        </div>

    </div>

</template>

<script>
import header from '../components/header'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                images: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531461952740&di=6ad5282d2d30f8ba0d75cd2bade8eed8&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F25%2F79%2F58PIC4B58PICbtD.jpg'
                ],
            }
        },
        components: {
            'header-item': header
        },
        beforeCreate(){
            this.$store.dispatch('shopDetail', this.$route.query.shopid)
        },
        computed:{
            imgUrl(){
                return this.$store.state.imgUrl
            },
            shopDetail(){
                return this.$store.state.shopDetail[0]
            },
        },
        created(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            document.title = '商店详情'
        },
        methods: {
            map(){
                window.location.href = 'https://uri.amap.com/navigation?from=&to='+this.shopDetail.LNG+','+this.shopDetail.LAT+','+this.shopDetail.ADDRESS+'&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=0'
            },
        }
	}
</script>

<style lang="less" scoped>
.yuyue{
    width: 100%; font-size: 0.3rem;
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

</style>