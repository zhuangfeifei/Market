<template>
    <div id="VoucherDetails" v-if="groupListDetail">

        <!-- <div class="logo"><img :src="imgUrlGoods + groupListDetail.path.split(',')[0]" alt=""></div> -->
        <van-swipe v-if="groupListDetail.path" class="ShopDetils_swipe" :autoplay="3000">
            <van-swipe-item v-for="(item, index) in groupListDetail.path.split(',')" :key="index">
                <img v-lazy="imgUrlGoods + item" />
            </van-swipe-item>
        </van-swipe>
        <div class="VoucherDetails">
            <div class="detail">
                <h4>{{groupListDetail.group_name}}</h4>
                <p><span>广场指定餐饮商户{{groupListDetail.group_name}}</span><span>库存{{groupListDetail.inventory}}</span></p>
                <p><span>{{groupListDetail.price}}元</span><span>/价值{{groupListDetail.discount}}元</span></p>
                <p><span>数量：</span><van-stepper class="VoucherDetails_num" v-model="num" @change="change"/></p>
                <p v-if="groupListDetail.period_validity == 0">有效期：长期有效</p>
                <p v-else>有效期：{{groupListDetail.start_time}} ~ {{groupListDetail.end_time}}</p>
            </div>
            <div class="VoucherDetails_business">
                <div class="VoucherDetails_business_logo"><img :src="imgUrl + groupListDetail.LOGO_PIC" alt=""></div>
                <div class="VoucherDetails_business_contact">
                    <!-- <p>{{groupListDetail.shopName}}</p> -->
                    <p><span class="VoucherDetails_business_address">{{groupListDetail.ADDRESS}}</span><img src="../../assets/img/addresss.png" alt=""></p>
                    <div>
                        <a :href="'tel:' + (groupListDetail.PHONE || groupListDetail.FIX_PHONE)"><div class="contact">联系门店</div></a><div class="reach" @click="map">到这去</div>
                    </div>
                </div>
            </div>
            <div class="Discount_content">
                <h4>优惠详情</h4>
                <div class="content" v-html="htmls"></div>
            </div>
        </div>

        <div class="footers">
            <button @click="pay" :class="{ispay: groupListDetail.inventory == 0}">¥{{(groupListDetail.price * num).toFixed(2)}}立即购买</button>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            activeNames: ['0'],num:1
        }
    },
    components: {
        
    },
    beforeCreate() {
        // this.$store.dispatch('shopDetail', this.$route.query.shopid)
        // this.$store.dispatch('groupList', this.$route.query.shopid)
        
    },
    computed: {
        imgUrl() {
            return this.$store.state.imgUrl
        },
        imgUrlGoods() {
            return this.$store.state.imgUrlGoods
        },
        groupListDetail() {
            if(this.$store.state.groupListDetail == ''){
                this.$store.commit('GROUP_LISTDETAIL')
            }
            return this.$store.state.groupListDetail
        },
        htmls(){
            this.$store.commit('HTML', this.groupListDetail.description)
            return this.$store.getters.htmls
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '券详情'

        this.$nextTick(()=>{
            // this.$store.commit('HTML', this.groupList.description)
        })
    },
    methods:{
        change(){

        },
        map(){
            window.location.href = 'https://uri.amap.com/navigation?from=&to='+this.groupListDetail.LNG+','+this.groupListDetail.LAT+','+this.groupListDetail.ADDRESS+'&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=0'
        },
        pay(){
            // var list = { shopId: groupList.shop_id, groupType: groupList.groupType, groupName: groupList.group_name, amount: groupList.discount, groupId: groupList.id }
            if(this.groupListDetail.inventory > 0){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration: 0
                })
                var list = { groupListDetail: this.groupListDetail, num: this.num }
                this.$store.dispatch('addGroupOrder', list)
            }
        },
    },
}
</script>

<style lang="less" scoped>
    #VoucherDetails{
        width: 100%; min-height: 100vh; background-color: white; font-size: 0.3rem; letter-spacing: 0.005rem; padding-bottom: 1.28rem;
    }
    
    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    .logo{
        width: 100%; height: 4.2rem;
        img{ width: 100%; height: 100%; }
    }
.ShopDetils_swipe{
    width: 100%; height: 4.2rem;
    & img{
        width: 100%; height: 100%;
    }
}

    .VoucherDetails{
        width: 100%; height: 100%; padding: 0.41rem;
        .detail{
            width: 100%; padding-top: 0.07rem;
            & h4{ font-size: 0.36rem; .font3; }
            & p:nth-child(2){
                .font2; font-size: 0.24rem; color:rgba(128,128,128,1); line-height: 0.5rem;
                span:nth-child(2){ float: right; }
            }
            & p:nth-child(3){
                .font2; font-size: 0.3rem; color: #4B4B4B; line-height: 0.7rem;
                span:nth-child(1){ color: #EA1616; }
            }
            & p:nth-child(4){
                display: flex;
            }
            & p:nth-child(5){
                .font1; font-size: 0.24rem; color:rgba(43,43,43,1); line-height: 0.7rem;
            }
        }
        .VoucherDetails_business{
            width: 100%; height: 2.88rem; display: flex; justify-content: space-between; padding: 0.64rem 0;
             border-bottom: 0.02rem dashed rgba(206,206,206,1); border-top: 0.02rem dashed rgba(206,206,206,1);
            .VoucherDetails_business_logo{
                width: 1.6rem; height: 100%;
                img{ width: 100%; height: 100%; }
            }
            .VoucherDetails_business_contact{
                width: calc(100% - 1.6rem - 0.64rem); height: 100%; position: relative; top: -0.05rem;
                img{ width: 0.32rem; height: 0.32rem; position: relative; top: 0.03rem; }
                p:nth-child(1){ .font1; color:rgba(43,43,43,1); font-size: 0.3rem; margin-bottom: 0.05rem; }
                p:nth-child(2){ 
                    .font2; color:rgba(128,128,128,1); font-size: 0.28rem; margin-bottom: 0.25rem; display: flex; justify-content: space-between;
                    .VoucherDetails_business_address{ 
                        display: inline-block; width: calc(100% - 0.4rem); height: 0.4rem; line-height: 0.4rem; 
                        overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; 
                    }
                }
                div{
                    width: 100%; height: 0.5rem; font-size: 0.28rem; .font1; text-align: center; line-height: 0.48rem;
                    .contact{
                        width: 1.6rem; height: 100%; border-radius: 0.25rem; color: #FF8B4B; border: 0.02rem solid #FF8B4B; float: left;
                    }
                    .reach{
                        width: 1.6rem; height: 100%; border-radius: 0.25rem; color: #62B900; border: 0.02rem solid #62B900; float: left; margin-left: 0.64rem;
                    }
                }
            }
        }
        .Discount_content{
            width: 100%; margin-top: 0.6rem; padding-top: 0.48rem;
            .content{
                width: 100%; 
            }
        }
    }



    .footers{
        width: 100%; height: 1.28rem; border-top: 0.01rem solid rgba(204,204,204,1); position: fixed; bottom: 0; left: 0; background-color: white;
        button{
            width: 6.7rem; height: 0.96rem; margin: 0.16rem 0.4rem; background-color: rgba(255,139,75,1); outline: none!important; border: 0; border-radius: 0.1rem;
            color: white; .font3; font-size: 0.36rem;
        }
    }

    .ispay{
        background-color: gray!important;
    }


</style>


