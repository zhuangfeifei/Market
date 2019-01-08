<template>
    <div id="CommonOrder">

        <nav>
            <div @click="tab(index)" v-for="(item,index) in title" :key="index" :class="{active: tabIndex == index}"><span>{{item}}</span><section v-show="tabIndex == index"></section></div>
        </nav>

        <mescroll-vue class="GroupPurchaseOrderMescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div v-if="CommonOrder != ''" class="CommonOrders">
                <div class="CommonOrder_list" @click="detils(item.ID)" v-for="(item,index) in CommonOrder" :key="index">
                    <div class="CommonOrder_num"><span>订单编号：{{item.ORDER_NO}}</span><span>{{orderStatus[item.ORDER_STATUS]}}</span></div>
                    <div class="CommonOrder_content">
                        <h4>方圆里商城</h4>
                        <van-row class="CommonOrder_content_list" v-for="(itemChild, indexChild) in item.goodsList" :key="indexChild">
                            <van-col span="6"><img :src="imgUrlGoods+itemChild.THUMB_PIC" alt=""></van-col>
                            <van-col span="18">
                                <p class="CommonOrder_content_title">{{itemChild.GOODS_NAME}}</p>
                                <p class="CommonOrder_content_Specifications">规格：{{itemChild.goods_specif}}</p>
                                <p class="CommonOrder_content_num"><span>×{{itemChild.GOODS_NUM}}</span><span>{{itemChild.NOW_PRICE}}元</span></p>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="CommonOrder_combined">共{{goods_Allnum(item.goodsList)}}件商品，合计<span>￥{{item.ORDER_MONEY}}</span>（含运费<span class="freight">￥0.00</span>）</div>
                    <div class="CommonOrder_date">
                        <span>{{item.ORDER_DATE}}</span>
                        <div class="CommonOrder_status">
                            <div v-if="item.ORDER_STATUS == 0" class="CommonOrder_status_payment">付款</div>
                            <div v-if="item.ORDER_STATUS == 0" class="CommonOrder_status_Cancel">取消订单</div>
                            <div v-if="item.orderAfterList.length > 0 && item.orderAfterList[0].sale_type == 0 && item.ORDER_STATUS < 2" class="CommonOrder_status_remind">已提醒</div>
                            <div v-if="item.ORDER_STATUS > 0 && item.orderAfterList.length == 0 && item.ORDER_STATUS < 2" class="CommonOrder_status_delivery">提醒发货</div>
                            <div v-if="item.ORDER_STATUS == 2" class="CommonOrder_status_Confirm">确认收货</div>
                            <div v-if="item.ORDER_STATUS > 0 && item.ORDER_STATUS < 3" class="CommonOrder_status_return">退换货</div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="nos"><img src="../../assets/img/noOrder.png" alt=""><p>您目前还没有任何订单哦~</p></div>

        </mescroll-vue>
        
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
    data() {
        return {
            active: 0, title:['全部','待付款','待发货','待收货','退换货'], data:'1',orderStatus:['待付款','待发货','待收货','退换货','已完成'],
            tabIndex:0,
            mescroll: null, mescrollDown:{}, 
            mescrollUp: { 
                isBounce: false,
                callback: this.upCallback, 
                noMoreSize: 10,
                page: { num: 0, size: 10 },
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多了！ --</p>'
            },
            CommonOrder:''
        }
    },
    components: {
        MescrollVue
    },
    beforeCreate(){
        // this.$store.dispatch('')
    },
    computed:{
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
        },
    },
    created(){
        this.top()
        document.title = '普通订单'

        
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
            this.tabIndex = index
            this.mescroll.resetUpScroll()
        },
        detils(id){
            this.$router.push({path:'/CommonOrderDetils', query:{ order_id: id}})
        },
        mescrollInit (mescroll) {
            this.mescroll = mescroll
        },
        upCallback (page, mescroll) {
            let list = { limit: page.size, current: page.num, tabIndex: this.tabIndex == 0 ? '' : this.tabIndex - 1  }
            this.$store.dispatch('CommonOrder', list)
            .then(res => {
                // console.log(res.data)
                if(res.data.code == 200) {
                    let arr = res.data.data
                    if (page.num === 1) this.CommonOrder = []
                    this.CommonOrder = this.CommonOrder.concat(arr)
                    this.$nextTick(() => {
                        res.data.data.length == 0 ? mescroll.endSuccess(this.CommonOrder.length, false) : mescroll.endSuccess(this.CommonOrder.length)
                    })
                }
            })
            .catch(err => mescroll.endErr())
        },
        goods_Allnum(goods){
            let num = 0
            for(let val of goods){
                num += val.GOODS_NUM
            }
            return num
        },
    },
    destroyed(){
        
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
            width: 90%; height: 0.04rem; background:rgba(255,139,75,1); margin: 0 auto; position: relative; top: -0.04rem;
        }
    }
    .active{ color: rgba(255,139,75,1); }
}


.nos{
    width: 100%; height: 100%; padding-top: 2rem; text-align: center; .font2; color:rgba(43,43,43,1);
    img{ width: 3rem; height: 3rem; margin-bottom: 0.6rem; }
}


.GroupPurchaseOrderMescroll{
    position: fixed;
    top: 0.76rem;
    bottom: 0rem;
    height: auto;
}

.row{
    overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;
}
.CommonOrders{
    width: 100%;
    .CommonOrder_list{
        width: 100%; background-color: white; margin-top: 0.2rem;
        .CommonOrder_num{
            width: 100%; height: 0.63rem; line-height: 0.63rem; padding: 0 0.4rem; font-size: 0.24rem; .font1; color:rgba(43,43,43,1);
            span:nth-child(2){ float: right; color:rgba(255,139,75,1); }
        }
        .CommonOrder_content{
            width: 100%; background-color: rgba(247,247,247,1); padding: 0.3rem 0.4rem 0.1rem 0.4rem;
            & h4{ color:rgba(43,43,43,1); .font3; line-height: 0.29rem; margin-bottom: 0.2rem; }
            .CommonOrder_content_list{
                margin-top: 0.2rem;
                img{ width: 1.2rem; height: 1.2rem; border-radius: 0.1rem; }
            }
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
        .CommonOrder_combined{
            width: calc(100% - 0.8rem); height: 0.87rem; line-height: 0.87rem; text-align: right; margin: 0 auto;
            border-bottom: 0.015rem dashed rgba(206,206,206,1); font-size: 0.28rem; color:rgba(75,75,75,1);
            span{ color: #EA1616; .font3; }
            .freight{ .font2; }
        }
        .CommonOrder_date{
            width: 100%; height: 1rem; color:rgba(128,128,128,1); font-size: 0.24rem;
            display: flex; justify-content: space-between; padding: 0 0.4rem; align-items: center;
            .CommonOrder_status{
                display: flex;
                div{ 
                    width: 1.6rem; height: 0.6rem; border-radius: 0.3rem; line-height: 0.6rem; 
                    text-align: center; font-size: 0.28rem; .font1; margin-left: 0.3rem;
                }
                .CommonOrder_status_payment,.CommonOrder_status_delivery,.CommonOrder_status_Confirm{ border: 0.02rem solid rgba(255,139,75,1); color: rgba(255,139,75,1); }
                .CommonOrder_status_Cancel,.CommonOrder_status_return{ border: 0.02rem solid rgba(43,43,43,1); color: rgba(43,43,43,1); }
                .CommonOrder_status_remind{ border: 0.02rem solid rgba(128,128,128,1); color: rgba(128,128,128,1); }
            }
        }
    }
}
    
</style>


