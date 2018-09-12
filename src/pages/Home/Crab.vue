<template>
    <div id="Crab">


        <div v-if="crabgroupList != ''" class="Crab">
            <nav><img class="Crab_list_logos" src="../../assets/img/Crab_vip.png" alt=""></nav>
            <div class="Crab_main">
                <div class="Crab_title"></div>
                <div class="Crab_list" v-for="(item,index) in crabgroupList" :key="index">
                    <img class="Crab_list_logo" src="../../assets/img/CrabLogo.png" alt="">
                    <img class="Crab_list_content" @click="details(index)" :src="imgUrl + item.thumbnail_pic" alt="">
                    <div class="Crab_list_ammont">
                        <span>库存：{{item.inventory}}</span>
                        <div @click="pay(index)" :class="{CrabNo:item.inventory == 0}">¥<span>{{item.present_price}}</span><span>{{item.inventory == 0 ? '已抢完' : '立即购买'}}</span></div>
                    </div>
                </div>
                <div class="Crab_footer"><p>提货方式:</p><span>电话联系客服<br><a href='tel:0512-66831208'>0512-66831208</a>、<a href='tel:0512-66830887'>0512-66830887</a><br>周一至周五9点至17点半电话预约</span></div>
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
        // window.addEventListener('scroll', this.get)
    },
    methods:{
        details(index){
            this.$store.dispatch('groupListDetail', this.crabgroupList[index].id)
            this.$router.push({path:"/VoucherDetails", query:{index:index}})
        },
        pay(index){
            this.$toast.loading({
                mask: true,
                message: '加载中...',
                duration: 0
            })
            this.$store.dispatch('addGroupOrder', this.crabgroupList[index])
        },
        get(){
            var scrollTop = $(window).scrollTop()
            var windowHeight = $(window).height()
            var documentHeight = $(document).height()
            if(scrollTop + windowHeight === documentHeight){
                this.list.current ++
                this.list.isPage = true
                if(this.$store.state.isPage) this.$store.dispatch('promotionList', this.list)
            }
        },
    },
    destroyed(){
        window.removeEventListener('scroll', this.get)
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

    .Crab{
        width: 100%; height: 100%;
        & nav{
            width: 100%; height: 9.19rem; background: url('../../assets/img/CrabTitle.png') no-repeat; background-size: 100% 100%;
            .Crab_list_logos{ width: 1.78rem; height: 1.1rem; position: absolute; top: 0; right: 0.66rem;}
        }
        .Crab_main{
            width: 100%; background: url('../../assets/img/CrabBack.png') no-repeat; background-size: 100% 100%; position: relative;
            padding: calc(2.02rem - 0.6rem) 0.4rem 3.6rem 0.4rem;
            .Crab_title{
                width: 5.59rem; height: 2.02rem; background: url('../../assets/img/CrabNav.png') no-repeat; background-size: 100% 100%;
                position: absolute; top: -0.6rem; left: calc((100% - 5.59rem) / 2);
            }
            .Crab_list{
                width: 100%; height: 5.55rem; border: 0.03rem solid rgba(252,206,131,1); background-color: rgba(255,255,255,1); position: relative;
                padding: 0 0.3rem; margin-bottom: 0.48rem;
                .Crab_list_logo{ width: 2.01rem; height: 0.56rem; position: absolute; top: 0; left: 0;}
                .Crab_list_content{ width: 100%; height: 3.47rem; margin-top: 0.78rem; }
                .Crab_list_ammont{
                    width: 100%; height: 0.8rem; line-height: 0.8rem; margin-top: 0.1rem;
                    span{ .font1; color:rgba(43,43,43,1); }
                    div{ 
                        width: 2.72rem; height: 0.79rem; float: right; padding: 0 0.35rem 0 0.15rem; line-height: 0.76rem; .font1;
                        background: url('../../assets/img/CrabPay.png') no-repeat; background-size: 100% 100%; font-size: 0.23rem; color: rgba(255,255,255,1);
                        span:nth-child(1){ font-size: 0.36rem; color:rgba(255,255,255,1); }
                        span:nth-child(2){ font-size: 0.23rem; color:rgba(139,94,21,1); .font1; float: right; }
                    }
                    .CrabNo{ background: url('../../assets/img/CrabNo.png') no-repeat; background-size: 100% 100%; padding-right: 0.45rem;
                        span:nth-child(2){ color:rgba(255,255,255,1); }
                    }
                }
            }
            .Crab_footer{ 
                width: 100%; position: absolute; bottom: 2rem; left: 0; padding: 0 1.3rem 0 1rem; color:rgba(255,255,255,1); line-height: 0.4rem;
                text-indent: -0.6rem; .font2;
                p{ .font1; margin-bottom: 0.1rem;} 
                a{ text-decoration: underline; }
            }
        }
    }

    .no{
        width: 3.33rem; padding-top: 1.6rem; margin: 0 auto; font-size: 0.3rem; text-align: center; 
        img{ width: 100%; height: 3rem; }
    }


</style>


