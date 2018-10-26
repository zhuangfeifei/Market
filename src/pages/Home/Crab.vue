<template>
    <div id="Crab">


        <div v-if="crabgroupList != ''" class="Crab">
            <nav>
                <img class="Crab_list_logos" src="../../assets/img/CrabBacks.png" alt="">
                <div>
                    <video muted id="videos" width="100%" height="100%" src="../../assets/img/1.mp4" controls autoplay="autoplay" playsinline="true" loop type="video/mp4">
                        您的浏览器不支持 video 标签。 
                    </video>
                </div>
            </nav>
            <div class="Crab_main">
                <div class="Crab_Recommend"><img src="../../assets/img/Recommend.png" alt=""></div>
                <div class="Crab_list_">
                    <div class="Crab_list" v-for="(item,index) in crabgroupList" :key="index">
                        <img v-if="index%2 == 0" class="Crab_list_content" @click="details(index)" :src="imgUrl + item.thumbnail_pic" alt="">
                        <div class="Crab_list_ammont">
                            <span>{{item.group_name}}</span>
                            <div class="Crab_pay" @click="pay(index)" :class="{CrabNo:item.inventory == 0}">¥<span>{{item.present_price}}</span></div>
                            <div class="Crab_">
                                <p>已售{{item.soldRate}}%</p>
                                <div class="Crab_Progressbar"><div class="Crab_Progressbar_" :style="{width: item.soldRate+'%'}"><div></div></div></div>
                            </div>
                        </div>
                        <img v-if="index%2 != 0" class="Crab_list_content" @click="details(index)" :src="imgUrl + item.thumbnail_pic" alt="">
                    </div>
                </div>
                <div class="Crab_footer">提货热线：<a href="tel:0512-66830887">0512-66830887</a><br><a class="Crab_phone" href="tel:0512-66831208">0512-66831208</a></div>
            </div>
        </div>

        <div v-else class="no"><img src="../../assets/img/nohuo.png" alt="">暂无活动</div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            activeNames: ['0'],
            show:true,
            list: { current: 1, limit: 50, isPage: false }
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('user')
        let list = { current: 1, limit: 50, isPage: false }
        this.$store.dispatch('promotionList', list)
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
        crabgroupList(){
            return this.$store.state.crabgroupList
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '大闸蟹火热抢购...'
        
        this.$store.commit('SET_PAGE', true)
        // window.addEventListener('scroll', this.promotionListGet)

        this.$nextTick(()=>{
            setTimeout( ()=> {this.videoMethod()}, 500);
        })
    },
    methods:{
        details(index){
            this.$store.dispatch('groupListDetail', this.crabgroupList[index].id)
            this.$router.push({path:"/VoucherDetails", query:{index:index}})
        },
        pay(index){
            if(this.crabgroupList[index].inventory > 0){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration: 0
                })
                this.$store.dispatch('addGroupOrder', this.crabgroupList[index])
            }
        },
        promotionListGet(){
            var scrollTop = $(window).scrollTop()
            var windowHeight = $(window).height()
            var documentHeight = $(document).height()
            if(scrollTop + windowHeight === documentHeight){
                this.list.current ++
                this.list.isPage = true
                if(this.$store.state.isPage) this.$store.dispatch('promotionList', this.list)
            }
        },
        videoMethod() {
            wx.config({
                // 配置信息, 即使不正确也能使用 wx.ready
                debug: false,
                appId: '',
                timestamp: 1,
                nonceStr: '',
                signature: '',
                jsApiList: []
            });
            wx.ready(function() {
                var globalAudio = document.getElementById("videos");
                globalAudio.play();
            });
        }
    },
    destroyed(){
        window.removeEventListener('scroll', this.promotionListGet)
    },
}
</script>

<style lang="less" scoped>
    #Crab{
        width: 100%; min-height: 100vh; font-size: 0.3rem;
    }
    
    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }
    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }
    .font4{ font-family:PingFang-SC-Light; font-weight: Light; }

    .Crab{
        width: 100%; height: 100%;
        & nav{ 
            width: 100%; background:rgba(34,32,37,1);
            img{ width: 100%; height: 4.53; } 
            div{ 
                width: 100%; height: 4.41rem; padding: 0 0.3rem 0.25rem 0.3rem;
            }
        }
        .Crab_main{
            width: 100%; background: url('../../assets/img/CrabBacks_bottom.png') no-repeat; background-size: 100% 100%;
            padding: 0.2rem 0.4rem 2rem 0.4rem;
            .Crab_Recommend{ width: 100%; height: 0.48rem; margin: 0.36rem 0; text-align: center;
                img{ width: 5.54rem; height: 100%; }
            }
            .Crab_list_{ width: 6.4rem; background-color: rgba(255,255,255,1); margin: 0 auto; padding: 0.22rem 0.26rem;  }
            .Crab_list{
                width: 100%; height: 2.94rem; background-color: rgba(239,239,239,1); position: relative; display: flex;
                .Crab_list_content{ width: 50%; height: 100%; }
                .Crab_list_ammont{
                    width: 100%; height: 0.8rem; line-height: 0.4rem; margin-top: 0.1rem; text-align: center; padding: 0 0.1rem; padding-top: 0.3rem;
                    span{ .font1; color:rgba(0,0,0,1); font-size: 0.28rem; }
                    .Crab_pay{ 
                        width: 2.72rem; height: 0.79rem; padding: 0 0.35rem 0 0.25rem; line-height: 0.76rem; .font1; margin: 0.3rem auto; text-align: left; margin-bottom: 0;
                        background: url('../../assets/img/CrabPay.png') no-repeat; background-size: 100% 100%; font-size: 0.23rem; color: rgba(255,255,255,1);
                        span:nth-child(1){ font-size: 0.36rem; color:rgba(255,255,255,1); }
                    }
                    .CrabNo{ 
                        background: url('../../assets/img/CrabNo.png') no-repeat; background-size: 100% 100%; padding-right: 0.45rem;
                    }
                    .Crab_{
                        width: 2.72rem; height: 0.4rem; margin: 0 auto; display: flex; line-height: 0.4rem;
                        p{ font-size: 0.2rem; color: #E89F1F; .font4; }
                        .Crab_Progressbar{
                            width: 1.3rem; height: 0.1rem; border-radius: 0.05rem; border:1px solid rgba(232,159,31,1); margin-top: 0.15rem; margin-left: 0.1rem;
                            .Crab_Progressbar_{ 
                                height: 100%;
                                div{
                                    width: 100%; height: 100%; border-top-left-radius: 0.05rem; border-bottom-left-radius: 0.05rem; background:#E89F1F; 
                                    -webkit-animation:dong 0.5s linear 0s 1 alternate;
                                    animation: dong 0.5s linear 0s 1 alternate;
                                }
                            }
                        }
                    }
                }
            }
            .Crab_footer{ 
                width: 100%; height: 1rem; line-height: 0.4rem; text-align: center; color:rgba(255,255,255,1); .font1; margin-top: 0.6rem;
                a{ color:rgba(255,255,255,1); text-decoration: underline;  }
                .Crab_phone{ position: relative; left: 0.75rem; }
            }
        }
    }

    .no{
        width: 3.33rem; padding-top: 1.6rem; margin: 0 auto; font-size: 0.3rem; text-align: center; 
        img{ width: 100%; height: 3rem; }
    }



@keyframes dong{
    from{
        width: 0;
    }
    to{
        width: 100%;
    }
}
@-webkit-keyframes dong{
    from{
        width: 0;
    }
    to{
        width: 100%;
    }
}
</style>


