<template>
    <div id="home">

        <van-swipe class="swipe" :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>

        <div class="classification">
            <router-link to="/Introduce"><div><img src="../assets/img/introduce.png" alt=""><p>商场介绍</p></div></router-link>
            <div><img src="../assets/img/brand.png" alt=""><p>品牌商家</p></div>
            <div><img src="../assets/img/activity.png" alt=""><p>商场活动</p></div>
            <div><img src="../assets/img/integral.png" alt=""><p>积分礼包</p></div>
            <div><img src="../assets/img/Parking.png" alt=""><p>停车缴费</p></div>
            <div><img src="../assets/img/More.png" alt=""><p>更多</p></div>
        </div>

        <div class="Headline">
            <img src="../assets/img/Headline.png" alt="">
            <span>开业时间为10点至22点</span>
        </div>

        <div class="Discount">
            <h3>商家优惠</h3>
            <div class="Discount_">
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532064211&di=aee234da3a893e5fdef997314f37d552&imgtype=jpg&er=1&src=http%3A%2F%2Fa2.att.hudong.com%2F30%2F58%2F01300001345773131372583577955.jpg" alt="">
                    <div><p>酱小七</p><p>开业5.8折大促</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg" alt="">
                    <div><p>迈家茶饮 </p><p>新品8折尝新</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532064211&di=aee234da3a893e5fdef997314f37d552&imgtype=jpg&er=1&src=http%3A%2F%2Fa2.att.hudong.com%2F30%2F58%2F01300001345773131372583577955.jpg" alt="">
                    <div><p>酱小七</p><p>开业5.8折大促</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg" alt="">
                    <div><p>迈家茶饮 </p><p>新品8折尝新</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532064211&di=aee234da3a893e5fdef997314f37d552&imgtype=jpg&er=1&src=http%3A%2F%2Fa2.att.hudong.com%2F30%2F58%2F01300001345773131372583577955.jpg" alt="">
                    <div><p>酱小七</p><p>开业5.8折大促</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg" alt="">
                    <div><p>迈家茶饮 </p><p>新品8折尝新</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532064211&di=aee234da3a893e5fdef997314f37d552&imgtype=jpg&er=1&src=http%3A%2F%2Fa2.att.hudong.com%2F30%2F58%2F01300001345773131372583577955.jpg" alt="">
                    <div><p>酱小七</p><p>开业5.8折大促</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg" alt="">
                    <div><p>迈家茶饮 </p><p>新品8折尝新</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532064211&di=aee234da3a893e5fdef997314f37d552&imgtype=jpg&er=1&src=http%3A%2F%2Fa2.att.hudong.com%2F30%2F58%2F01300001345773131372583577955.jpg" alt="">
                    <div><p>酱小七</p><p>开业5.8折大促</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg" alt="">
                    <div><p>迈家茶饮 </p><p>新品8折尝新</p></div>
                </div>
                <div class="Discount_list">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532064211&di=aee234da3a893e5fdef997314f37d552&imgtype=jpg&er=1&src=http%3A%2F%2Fa2.att.hudong.com%2F30%2F58%2F01300001345773131372583577955.jpg" alt="">
                    <div><p>酱小七</p><p>开业5.8折大促</p></div>
                </div>
                <div class="Discount_list" @click="qwe">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg" alt="">
                    <div><p>迈家茶饮 </p><p>新品8折尝新</p></div>
                </div>
            </div>
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
    created(){
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        console.log(2)
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
        qwe(){
            this.$router.push({path:'/Card'})
        }
    },
    
}
</script>

<style lang="less" scoped>
    #home{
        width: 100%; height: 100%; padding-bottom: 1.1rem; background-color: white;
    }
    
    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .swipe{
        width: 100%; height: 4.26rem;
        & img{
            width: 100%; height: 100%;
        }
    }

    .classification{
        width: 100%; height: 3.6rem; padding: 0.1rem 0 0.25rem 0.4rem; font-size: 0.25rem; text-align: center;
        a{color:rgba(0,0,0,1);}
        & div{
            width: 2.1rem; height: 1.4rem; float: left; margin-right: 0.2rem; margin-top: 0.2rem;
            background-color: #ffe8db; text-align: center; padding-top: 0.16rem;
            img{
                width: 0.64rem; height: 0.64rem;
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
        width: 100%; padding: 0.3rem 0 0.3rem 0.4rem;
        & h3{ font-size: 0.36rem; }
        .Discount_{
            width: 100%; height: 20.7rem; color: rgba(255,255,255,1);;
            .Discount_list{
                width: 3.25rem; height: 3.25rem; float: left; margin-right: 0.2rem; margin-top: 0.2rem; position: relative;
                img{
                    width: 100%; height: 100%;
                }
                div{
                    width: 100%; height: 0.86rem; position: absolute; bottom: 0; left: 0; background:rgba(0,0,0,1); opacity:0.5;
                    p:nth-child(1){ position: absolute; bottom: 0.43rem; left: 0.1rem; font-size: 0.28rem; font-family:PingFang-SC-Medium; font-weight: Medium;}
                    p:nth-child(2){ position: absolute; bottom: 0.1rem; left: 0.1rem; font-size: 0.24rem; font-family:PingFang-SC-Regular; font-weight: Regular;}
                }
            }
        }
    }


</style>


