<template>
    <div id="CommonOrder">

        <nav>
            <div @click="tab(index)" v-for="(item,index) in title" :key="index" :class="{active: list.tabIndex == index}"><span>{{item}}</span><section v-show="list.tabIndex == index"></section></div>
        </nav>

        <div v-if="false" class="CommonOrders">
            <div class="CommonOrder_list" @click="detils(item.order_id)" v-for="(item,index) in 2" :key="index">
                <div class="CommonOrder_num"><span>订单编号：12312312</span><span v-if="item.order_status === '1'">已完成</span><span v-else>待付款</span></div>
                <div class="CommonOrder_content">
                    <h4>潮宏基珠宝旗舰店</h4>
                    <van-row>
                        <van-col span="6"><img :src="images[1]" alt=""></van-col>
                        <van-col span="18">
                            <p class="CommonOrder_content_title">CHJ/潮宏基滴恋 18K钻石项链玫瑰阿大阿斯顿</p>
                            <p class="CommonOrder_content_Specifications">规格：白K 约0.03t，约1克，链长约40cm尾链</p>
                            <p class="CommonOrder_content_num"><span>×1</span><span>3000元</span></p>
                        </van-col>
                    </van-row>
                </div>
                <div class="CommonOrder_date">
                    <span>2018.02.28  12:28</span><div v-if="item.order_status === '0'">付款</div>
                </div>
            </div>
        </div>

        <div v-else class="nos"><img src="../../assets/img/noOrder.png" alt=""><p>您目前还没有任何订单哦~</p></div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0, title:['全部','待付款','待发货','待收货','待评价'], data:'1',
            status:[require('../../assets/img/notUsed.png'),require('../../assets/img/Undue.png'),require('../../assets/img/Expired.png')],
            images: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531461952740&di=6ad5282d2d30f8ba0d75cd2bade8eed8&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F25%2F79%2F58PIC4B58PICbtD.jpg'
            ],
            list:{ limit:10, current:1, isPage: false, tabIndex: 0 }
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
        getHistoryGroupOrder(){
            return this.$store.state.getHistoryGroupOrder
        },
    },
    created(){
        this.top()
        document.title = '普通订单'

        // this.$store.commit('SET_PAGE', true)
        // this.$store.dispatch('getHistoryGroupOrder', this.list)
        // window.addEventListener('scroll', this.get)
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        top(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        tab(index){
            this.top()
            this.list.tabIndex = index
            this.list.current = 1
            // this.$store.commit('SET_PAGE', true)
            // this.$store.dispatch('getHistoryGroupOrder', this.list)
        },
        detils(order_id){
            this.$router.push({path:'/GroupPurchaseOrderDetils', query:{ order_id: order_id}})
        },
        // get(){
        //     var scrollTop = $(window).scrollTop()
        //     var windowHeight = $(window).height()
        //     var documentHeight = $(document).height()
        //     if(scrollTop + windowHeight === documentHeight){
        //         this.list.current ++
        //         this.list.isPage = true
        //         if(this.$store.state.isPage) this.$store.dispatch('getHistoryGroupOrder', this.list)
        //     }
        // },
    },
    destroyed(){
        window.removeEventListener('scroll', this.get)
    }
}
</script>

<style lang="less" scoped>
    #CommonOrder{
        width: 100%; min-height: 100vh; background:rgba(232,232,232,1); padding-top: calc(0.76rem - 0.2rem); font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    nav{
        width: 100%; height: 0.76rem; .font1; background:rgba(255,255,255,1); display: flex; justify-content: space-around;
        position: fixed; top: 0; left: 0; border-bottom: 0.01rem solid rgba(206,206,206,1);
        div{
            height: 100%; text-align: center; line-height: 0.76rem; font-size: 0.28rem; color: rgba(43,43,43,1);
            section{
                width: 0.52rem; height: 0.04rem; background:rgba(255,139,75,1); margin: 0 auto; position: relative; top: -0.04rem;
            }
        }
        .active{ color: rgba(255,139,75,1); }
    }


    .nos{
        width: 100%; height: 100%; padding-top: 2rem; text-align: center; .font2; color:rgba(43,43,43,1);
        img{ width: 3rem; height: 3rem; margin-bottom: 0.6rem; }
    }


    .row{
        overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;
    }
    .CommonOrders{
        width: 100%;
        .CommonOrder_list{
            width: 100%; height: 4.8rem; background-color: white; margin-top: 0.2rem;
            .CommonOrder_num{
                width: 100%; height: 0.63rem; line-height: 0.63rem; padding: 0 0.4rem; font-size: 0.24rem; .font1; color:rgba(43,43,43,1);
                span:nth-child(2){ float: right; color:rgba(255,139,75,1); }
            }
            .CommonOrder_content{
                width: 100%; height: 2.29rem; background-color: rgba(247,247,247,1); padding: 0.3rem 0.4rem 0 0.4rem;
                & h4{ color:rgba(43,43,43,1); .font3; line-height: 0.29rem; margin-bottom: 0.3rem; }
                img{ width: 1.2rem; height: 1.2rem; border-radius: 0.1rem; }
                .CommonOrder_content_title{
                    display: inline-block; width: 100%; height: 0.29rem; line-height: 0.29rem; .font1; .row; color:rgba(43,43,43,1);
                }
                .CommonOrder_content_Specifications{
                    display: inline-block; width: 100%; height: 0.6rem; line-height: 0.6rem; .font2; .row; color:rgba(128,128,128,1); font-size: 0.24rem;
                }
                .CommonOrder_content_num{
                    font-size: 0.24rem; color:rgba(75,75,75,1); .font1;
                    & span:nth-child(2){ .font2; color:rgba(43,43,43,1); font-size: 0.3rem; float: right; line-height: 0.38rem; }
                }
            }
            .CommonOrder_date{
                width: 100%; height: 1rem; line-height: 1rem; color:rgba(128,128,128,1); font-size: 0.24rem;
                display: flex; justify-content: space-between; padding: 0 0.4rem;
                div{ 
                    width: 1.6rem; height: 0.6rem; border: 0.02rem solid rgba(255,139,75,1); border-radius: 0.3rem; line-height: 0.6rem; 
                    text-align: center; color: rgba(255,139,75,1); font-size: 0.28rem; .font1; margin-top: 0.2rem;
                }
            }
        }
    }
    
</style>


