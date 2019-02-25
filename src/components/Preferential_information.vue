<template>
    <div id="Preferential_information">
        
        <div class="ShopDetils_CashCoupon">
            <h4>代金券</h4>
            <div class="ShopDetils_CashCoupon_list" @click="details(index)" v-for="(item,index) in groupList" :key="index">
                <div><img :src="imgUrlGoods+item.thumbnail_pic" alt=""></div>
                <div>
                    <h4>{{item.group_name}}</h4>
                    <!-- <del>原价：{{item.discount}}</del> -->
                    <div class="CashCoupon_list_num">
                        <div class="CashCoupon_list_num_">
                            <p>售价：<span>¥{{item.price}}</span></p>
                            <div class="Crab_Progressbar"><div class="Crab_Progressbar_" :style="{width: parseInt(item.soldNum) / item.inventory+'%'}"><div></div></div></div>
                        </div>
                        <div class="CashCoupon_list_btn" :class="{CashCoupon_list_btn_: item.inventory == 0}">{{item.inventory == 0 ? '已售完' : '立即购买'}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ShopDetils_SetMeal">
            <h4>优惠套餐</h4>
            <div class="ShopDetils_SetMeal_list" v-for="(item,index) in 1" :key="index">
                暂无
                <!--<div><img :src="images[1]" alt=""></div>
                <div><p>夏日么么下午茶夏日么 么下午茶</p><p>周一至周日午餐可用</p><p><span>¥128</span><del>¥198</del><span>已售330</span></p></div>-->
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
            date:['周一至周五','周一至周六','周一至周日'],
            show:true
        }
    },
    components: {
        
    },
    props:['groupList'],
    computed:{
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
        },
    },
    created(){
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        
        
    },
    methods:{
        details(index){
            this.$store.dispatch('groupListDetail', this.groupList[index].id)
            this.$router.push({path:"/VoucherDetails", query:{index:index}})
        },
    },
    
}
</script>

<style lang="less" scoped>
#Preferential_information{
    width: 100%; min-height: calc(100vh - 1.2rem); padding: 0.48rem 0.4rem; font-size: 0.3rem; z-index: 1;
}
    
*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

.ShopDetils_CashCoupon{
    width: 100%;
    h4{ color:rgba(43,43,43,1); .font3; }
    & .ShopDetils_CashCoupon_list{
        width: 100%; height: 1.87rem; margin-top: 0.2rem; padding: 0.23rem 0.3rem; display: flex; justify-content: space-between; align-items: center;
        background:rgba(246,246,246,1);
        div:nth-child(1){
            width: 1.6rem; height: 1.6rem;
            img{ width: 100%; height: 100%; }
        }
        div:nth-child(2){ 
            width: calc(100% - 1.8rem); height: 100%; text-align: left;
            // del{ font-size: 0.24rem; .font2; color:rgba(75,75,75,1); margin-top: 0.1rem; position: absolute; bottom: 0; left: 0; }
            .CashCoupon_list_num{
                width: 100%; height: 1rem; display: flex; justify-content: space-between; margin-top: 0.4rem;
                .CashCoupon_list_num_{
                    width: calc(100% - 1.4rem); height: 100%;
                    p{ font-size: 0.28rem; .font2; color:rgba(75,75,75,1); line-height: 0.4rem; span{ font-size: 0.36rem; color: #FF8B4B; .font3; } }
                    .Crab_Progressbar{
                        width: 2.06rem; height: 0.14rem; border-radius: 0.07rem; border:1px solid #FF8B4B; margin-top: 0.05rem;
                        .Crab_Progressbar_{ 
                            height: 100%;
                            div{
                                width: 100%; height: 100%; border-top-left-radius: 0.02rem; border-bottom-left-radius: 0.02rem; background:#FF8B4B; 
                                -webkit-animation:dong 0.5s linear 0s 1 alternate;
                                animation: dong 0.5s linear 0s 1 alternate;
                            }
                        }
                    }
                }
                .CashCoupon_list_btn{
                    width: 1.4rem; height: 0.48rem; background:rgba(255,139,75,1); border-radius: 0.1rem; margin-top: 0.2rem;
                    color: white; font-size: 0.28rem; .font1; text-align: center; line-height: 0.48rem;
                } 
                .CashCoupon_list_btn_{ background:rgba(206,206,206,1)!important; }
            }
        }
    }
}

.ShopDetils_SetMeal{
    width: 100%; margin-top: 0.48rem;
    h4{ color:rgba(43,43,43,1); .font3; }
    & .ShopDetils_SetMeal_list{
        width: 100%; height: 2.2rem; margin-top: 0.2rem; padding: 0.2rem 0.2rem;
        background: url("../assets/img/SetMeal.png") no-repeat; background-size: 100% 100%;
        div:nth-child(1){
            width: 1.8rem; height: 1.8rem; float: left;
            img{ width: 100%; height: 100%; }
        }
        div:nth-child(2){
            width: calc(100% - 1.8rem - 0.63rem); height: 100%; float: right;
            p:nth-child(1){ font-size: 0.32rem; color:rgba(43,43,43,1); .font1; line-height: 0.4rem; }
            p:nth-child(2){ font-size: 0.24rem; color:rgba(75,75,75,1); .font1; margin-top: 0.2rem; }
            p:nth-child(3){ 
                font-size: 0.22rem; color:rgba(128,128,128,1); .font1; margin-top: 0.1rem;
                span:nth-child(1){ font-size: 0.36rem; color:rgba(234,149,24,1); .font3; }
                del{ color:rgba(75,75,75,1); margin-left: 0.19rem; margin-right: 0.79rem; }
            }
        }
    }
}


</style>


