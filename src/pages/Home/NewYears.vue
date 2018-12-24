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
                <div class="Crab_list_">
                    <!-- <div v-if="crabgroupList_Is.length > 0" class="Crab_Recommend"><img :src="img[0]" alt=""></div>
                    <div class="Crab_list" v-for="(item,index) in crabgroupList_Is" :key="item.id">
                        <img class="Crab_list_content" @click="details(index)" :src="imgUrl + item.thumbnail_pic" alt="">
                        <div class="Crab_list_ammont">
                            <span>{{item.group_name}}</span>
                            <div class="Crab_">
                                <p>已售{{item.soldRate}}%</p>
                                <div class="Crab_Progressbar"><div class="Crab_Progressbar_" :style="{width: item.soldRate+'%'}"><div></div></div></div>
                            </div>
                            <div class="Crab_pay">
                                <p>¥<span>{{item.present_price}}</span> <del>原价：{{item.discount}}</del></p>
                                <div :class="{CrabNo:item.inventory == 0}">{{item.inventory == 0 ? '已售罄' : '立即抢购'}}</div>
                            </div>
                        </div>
                    </div> -->
                    <div class="Crab_Recommend"><img :src="img[1]" alt=""></div>
                    <div class="Crab_list" v-for="(item,indexs) in crabgroupList" :key="item.id">
                        <img class="Crab_list_content" @click="detailss(indexs)" :src="imgUrl + item.thumbnail_pic" alt="">
                        <div class="Crab_list_ammont">
                            <span>{{item.group_name}}</span>
                            <div class="Crab_">
                                <p>已售{{item.soldRate}}%</p>
                                <div class="Crab_Progressbar"><div class="Crab_Progressbar_" :style="{width: item.soldRate+'%'}"><div></div></div></div>
                            </div>
                            <div class="Crab_pay">
                                <p>¥<span>{{item.price}}</span> <del>原价：{{item.discount}}</del></p>
                                <div :class="{CrabNo:item.inventory == 0}">{{item.inventory == 0 ? '已售罄' : '立即抢购'}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Crab_footer"><img src="../../assets/img/CrabBacks_footer.png" alt=""></div>
            </div>
        </div>

        <div v-else class="no"><img src="../../assets/img/nohuo.png" alt="">暂无活动</div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            activeNames: ['0'],img:[require('../../assets/img/Recommend.png'),require('../../assets/img/NoRecommend.png')],
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
        // crabgroupListIs(){
        //     let array = this.crabgroupList
        //     let res = array.filter(function(item,index,array){
        //         //元素值，元素的索引，原数组。
        //         return (item.is_hot_style == 0);
        //     });
        //     return res
        // },
        // crabgroupList_Is(){
        //     let array = this.crabgroupList
        //     let res = array.filter(function(item,index,array){
        //         return (item.is_hot_style == 1);
        //     });
        //     return res
        // }
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '大闸蟹火热抢购...'
        
        this.$store.commit('SET_PAGE', true)
        // window.addEventListener('scroll', this.promotionListGet)
        
        if(this.$route.query.statusId != undefined){
            this.$store.dispatch('groupListDetail', this.$route.query.statusId)
            this.$router.push({path:"/VoucherDetails"})
        }

        this.$nextTick(()=>{
            setTimeout( ()=> {this.videoMethod()}, 500);
        })
    },
    methods:{
        // details(index){
        //     this.$store.dispatch('groupListDetail', this.crabgroupList_Is[index].id)
        //     this.$router.push({path:"/VoucherDetails", query:{index:index}})
        // },
        detailss(indexs){
            this.$store.dispatch('groupListDetail', this.crabgroupList[indexs].id)
            this.$router.push({path:"/VoucherDetails", query:{index:indexs}})
        },
        // pay(index){
        //     if(this.crabgroupList_Is[index].inventory > 0){
        //         this.$toast.loading({
        //             mask: true,
        //             message: '加载中...',
        //             duration: 0
        //         })
        //         this.$store.dispatch('addGroupOrder', this.crabgroupList_Is[index])
        //     }
        // },
        // pays(indexs){
        //     if(this.crabgroupListIs[indexs].inventory > 0){
        //         this.$toast.loading({
        //             mask: true,
        //             message: '加载中...',
        //             duration: 0
        //         })
        //         this.$store.dispatch('addGroupOrder', this.crabgroupListIs[indexs])
        //     }
        // },
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
            width: 100%;
            .Crab_list_logos{ width: 100%; height: 8rem; line-height: 0.4rem; } 
            div{ 
                width: 100%; height: 4.31rem; padding: 0 0.3rem 0.15rem 0.3rem; margin-top: -0.25rem;
                background: url('../../assets/img/CrabBacks_bottom.png') no-repeat; background-size: 100% 100%;
            }
        }
        .Crab_main{
            width: 100%; 
            padding: 0 0 1rem 0;
            .Crab_Recommend{ width: 100%; height: 1.06rem; margin-top: 1.01rem; margin-bottom: 0.6rem; text-align: center;
                img{ width: 3.14rem; height: 100%; }
            }
            .Crab_list_{ width: 6.4rem; background-color: rgba(255,255,255,1); margin: 0 auto; padding: 0.22rem 0.26rem;  }
            .Crab_list{
                width: 100%; position: relative; margin-bottom: 0.6rem;
                .Crab_list_content{ width: 100%; height: 3.6rem; }
                .Crab_list_ammont{
                    width: 100%; line-height: 0.4rem; margin-top: 0.15rem;
                    span{ .font1; color:rgba(0,0,0,1); }
                    .Crab_pay{ 
                        width: 100%; display: flex; justify-content: space-between; margin-top: 0.13rem;
                        p{ color: #FF4200; span{ font-size: 0.48rem; color: #FF4200; .font1; margin-left: 0.1rem; } del{ margin-left: 0.1rem; color: #646464; font-size: 0.28rem; }  }
                        div{ 
                            width: 1.4rem; height: 0.4rem; background:rgba(255,66,0,1); border-radius: 0.2rem; color:rgba(255,255,255,1); font-size: 0.24rem;
                            line-height: 0.4rem; text-align: center; .font1;
                        }
                        .CrabNo{ 
                            background: #8D8D8D;
                        }
                    }
                    .Crab_{
                        width: 100%; height: 0.4rem; margin: 0 auto; display: flex; padding-left: 2.3rem; line-height: 0.4rem; position: absolute; top: 3.15rem; right: 0;
                        p{ font-size: 0.24rem; color: #FFFFFF; .font2; }
                        .Crab_Progressbar{
                            width: 2.06rem; height: 0.14rem; border-radius: 0.07rem; border:1px solid #FFFFFF; margin-top: 0.13rem; margin-left: 0.1rem;
                            .Crab_Progressbar_{ 
                                height: 100%;
                                div{
                                    width: 100%; height: 100%; border-top-left-radius: 0.02rem; border-bottom-left-radius: 0.02rem; background:#FFFFFF; 
                                    -webkit-animation:dong 0.5s linear 0s 1 alternate;
                                    animation: dong 0.5s linear 0s 1 alternate;
                                }
                            }
                        }
                    }
                }
            }
            .Crab_footer{ 
                width: 100%; height: 7.53rem; padding: 0 0.28rem;
                img{ width: 100%; height: 100%; }
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


