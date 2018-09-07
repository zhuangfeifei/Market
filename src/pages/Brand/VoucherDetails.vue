<template>
    <div id="VoucherDetails" v-if="groupList">

        <div class="logo"><img :src="imgUrl + groupList.thumbnail_pic" alt=""></div>
        <div class="VoucherDetails">
            <div class="detail">
                <h4>{{groupList.group_name}}</h4>
                <p><span>广场指定餐饮商户{{groupList.group_name}}</span><span>库存{{groupList.inventory}}</span></p>
                <p><span>{{groupList.present_price}}元</span><span>/价值{{groupList.discount}}元</span></p>
                <p v-if="groupList.period_validity == 0">有效期：长期有效</p>
                <p v-else>有效期：{{groupList.start_time}} ~ {{groupList.end_time}}</p>
            </div>
            <div class="VoucherDetails_business">
                <div class="VoucherDetails_business_logo"><img :src="imgUrl + shopDetail.logo_pic" alt=""></div>
                <div class="VoucherDetails_business_contact">
                    <p>{{groupList.update_man}}</p>
                    <p><span class="VoucherDetails_business_address">{{shopDetail.ADDRESS}}</span><img src="../../assets/img/addresss.png" alt=""></p>
                    <div>
                        <a :href="'tel:' + shopDetail.PHONE"><div class="contact">联系门店</div></a><div class="reach" @click="map">到这去</div>
                    </div>
                </div>
            </div>
            <div class="Discount_content">
                <h4>优惠详情</h4>
                <div class="content" v-html="htmls"></div>
            </div>
        </div>

        <div class="footers">
            <button @click="pay">¥{{groupList.present_price}}立即购买</button>
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
            activeNames: ['0']
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
        groupList() {
            if(this.$store.state.groupList == ''){
                this.$store.commit('GROUP_LIST')
                this.$store.commit('SHOP_DETAIL')
            }
            return this.$store.state.groupList[this.$route.query.index]
        },
        shopDetail(){
            return this.$store.state.shopDetail
        },
        htmls(){
            this.$store.commit('HTML', this.groupList.description)
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
        map(){
            window.location.href = 'https://uri.amap.com/navigation?from=&to='+this.shopDetail.LNG+','+this.shopDetail.LAT+','+this.shopDetail.ADDRESS+'&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=0'
        },
        pay(){
            // var list = { shopId: groupList.shop_id, groupType: groupList.groupType, groupName: groupList.group_name, amount: groupList.discount, groupId: groupList.id }
            this.$toast.loading({
                mask: true,
                message: '加载中...',
                duration: 0
            })
            this.$store.dispatch('addGroupOrder', this.groupList)
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
    .VoucherDetails{
        width: 100%; height: 100%; padding: 0.41rem;
        .detail{
            width: 100%; height: 3.13rem; padding-top: 0.07rem;
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
                .font1; font-size: 0.24rem; color:rgba(43,43,43,1); line-height: 1rem;
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


</style>


