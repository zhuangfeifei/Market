<template>
    <div id="CreateGoodsCart">
        
        <nav @click="address">
            <img src="../../assets/img/address.png" alt="">
            <div v-if="listadress.length == 0">请填写收货信息</div>
            <div class="nav_address" v-for="(item,index) in listadress" :key="index">
                <div v-if="listadress.length > 0 && index == changeIndex">
                <p>收货人：{{item.ship_name}}</p><span>{{item.phone_num}}</span>
                <div>收货地址：{{item.province+item.city+item.area+item.address}}</div>
                </div>
            </div>
            <img src="../../assets/img/yishoujiantou.png" alt="">
        </nav>

        <div class="CreateGoodsCart_Commodity">
            <h4>商品信息</h4>
            <div v-if="cartList" class="CreateGoodsCart_Commodity_">
                <div class="CreateGoodsCart_Commodity_content" v-for="(item,index) in cartList" :key="index">
                    <img :src="imgUrlGoods+item.picture" alt="">
                    <section>
                        <p>{{item.goodsname}}</p>
                        <div>
                            <span>{{item.nowprice}}元</span>
                            <p>x{{item.amount}}</p>
                        </div>
                    </section>
                </div>
                <!-- <div class="CreateGoodsCart_Commodity_time"><p>有效期</p><span>永久有效</span></div>
                <div class="CreateGoodsCart_Commodity_time"><p>适用商家</p><span>全场通用</span></div> -->
            </div>
            <!-- <div class="CreateGoodsCart_Commodity_nowPrice"><span>小计：</span><span>{{(cartList.price*value).toFixed(2)}}元</span></div> -->
        </div>

        <div class="CreateGoodsCart_footer">
            <div><span>合计：</span><small>¥ </small><span>{{moeny}}</span></div>
            <div @click="createdOrder">提交订单</div>
        </div>

        <van-actionsheet class="actionsheet" v-model="show">
            <div class="addressList" @click="changeAddress(index)" v-for="(item,index) in listadress" :key="index">
                <div>
                    <p><span>{{item.ship_name}}</span><span>{{item.phone_num}}</span><span v-if="item.isdefault == 1">默认</span></p>
                    <span class="addressList_">{{item.province+item.city+item.area+item.address}}</span>
                </div>
                <img @click="details(index)" src="../../assets/img/editor.png" alt="">
            </div>
            <div class="addressList_add">添加地址</div>
        </van-actionsheet>
        
    </div>
</template>

<script>
export default {
    data() {  
        return {
            show: false, changeIndex:'', moeny:0
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('listadress')
    },
    computed:{
        listadress(){
            for(let i in this.$store.state.listadress){
                this.$store.state.listadress[i].isdefault == 1 ? this.changeIndex = i : ''
            }
            return this.$store.state.listadress
        },
        cartList(){
            if(this.$store.state.cartList == '') this.$store.commit('cartList')
            return this.$store.state.cartList
        },
        imgUrl(){
            return this.$store.state.imgUrl
        },
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '订单确认'
        
        this.moeny = this.$route.query.moeny / 100
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        address(){
            this.listadress.length == 0 ? this.$router.push('/AddAddress') : this.show = true
        },
        createdOrder(){
            let array = []
            for(let val of this.cartList){
                array.push(
                    { 
                        goodsId: val.goodsid, goodsName: val.goodsname, goodsNum: val.amount, nowPrice: val.nowprice, 
                        oldPrice: val.marketprice, thumbPic: val.picture 
                    }
                )
            }
            let order = { 
                addressId: this.listadress[this.changeIndex].id, orderMoney: this.moeny, orderSource: 0, dataSource: 0, killId:'',
                orderGoods: array
            }
            this.$store.dispatch('createGoods', order)
        },
        details(index){
            this.$router.push({path:'/AddAddress',query:{object:this.listadress[index]}})
        },
        changeAddress(index){
            this.show = false
            this.changeIndex = index
        },
    },
}
</script>

<style lang="less" scoped>
*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

#CreateGoodsCart{
    width: 100%; min-height: 100vh; background-color: rgba(246,246,246,1); font-size: 0.3rem; padding-top: 0.2rem; padding-bottom: 1.28rem;
}

nav{
    width: 100%; padding: 0.4rem 0.4rem; display: flex; justify-content: space-between; align-items: center; background-color: white;
    -webkit-border-image: url('../../assets/img/border.png') 2 2 round; /* Safari 5 */
    -o-border-image: url('../../assets/img/border.png') 2 2 round; /* Opera */
    border-image: url('../../assets/img/border.png') 2 2 round;
    div{
        width: 80%; color:rgba(128,128,128,1); .font2;
        display: flex; flex-wrap: wrap; justify-content: space-between;
        p,span{color:rgba(43,43,43,1);}
        div{ width: 100%; }
    }
    .nav_address{ div{color:rgba(43,43,43,1)!important;} }
    img{ width: 0.36rem; height: 0.44rem; }
    img:last-child{ width: 0.16rem; height: 0.29rem; }
}


.CreateGoodsCart_Commodity{
    width: 100%; background-color: white; margin-top: 0.2rem;
    h4{ color:rgba(43,43,43,1); .font1; line-height: 1.1rem; margin-left: 0.4rem; }
    .CreateGoodsCart_Commodity_{
        width: 100%; padding: 0 0.4rem; border-top: 0.015rem solid rgba(206,206,206,1);
        .CreateGoodsCart_Commodity_content{
            width: 100%; height: 2.2rem; border-bottom: 0.015rem solid rgba(206,206,206,1);
            // border-bottom: 0.015rem dashed rgba(206,206,206,1);
            display: flex; justify-content: space-between; align-items: center;
            img{ width: 1.6rem; height: 1.6rem; }
            section{ 
                width: 4.46rem; height: 1.6rem; display: flex; flex-direction: column; justify-content: space-between;
                p{ color:rgba(43,43,43,1); line-height: 0.36rem; .font2; }
                div{
                    width: 100%; display: flex; justify-content: space-between; align-items: center;
                    span{ color:rgba(234,22,22,1); font-size: 0.28rem; line-height: 0.3rem; }
                }
            }
        }
        .CreateGoodsCart_Commodity_content:last-child{ border: 0; }
        // .CreateGoodsCart_Commodity_time{
        //     width: 100%; height: 0.86rem; border-bottom: 0.015rem dashed rgba(206,206,206,1);
        //     display: flex; justify-content: space-between; align-items: center; font-size: 0.28rem; .font2;
        //     p{ color:rgba(75,75,75,1); }
        //     span{ display: inline-block; width: 4.46rem; }
        // }
        // .CreateGoodsCart_Commodity_time:last-child{ border: 0!important; }
    }
    .CreateGoodsCart_Commodity_nowPrice{
        width: 100%; padding: 0 0.4rem; text-align: right; line-height: 0.85rem; color:rgba(43,43,43,1); .font1;
        span:nth-child(2){ color:rgba(234,22,22,1); font-size: 0.36rem; margin-left: 0.25rem; }
    }
}

.CreateGoodsCart_footer{
    width: 100%; height: 1.08rem; line-height: 1.08rem; display: flex; position: fixed; bottom: 0; left: 0; background-color: white;
    div:nth-child(1){
        width: calc(100% - 3rem); height: 100%; padding-left: 0.4rem; border-top: 0.01rem solid rgba(206,206,206,1);
        span:nth-child(3),small{ color:rgba(234,22,22,1); .font3; }
        span:nth-child(3){ font-size: 0.5rem; }
        // span:nth-child(3){ font-size: 0.24rem; color:rgba(75,75,75,1); .font2; }
    }
    div:nth-child(2){
        width: 3rem; height: 100%; background:rgba(255,139,75,1); color: white; .font1; text-align: center;
    }
}


.actionsheet{
    height: 9rem; padding-bottom: 0.98rem;
}
.addressList {
    width: 100%; min-height: 1.6rem; padding: 0.1rem 0.3rem; border-bottom: 0.013rem solid rgba(206,206,206,1); margin: 0 auto; background-color: white;
    display: flex; justify-content: space-between; align-items: center;
    div{
        width: calc(100% - 0.9rem); height: 100%;
        p{
            color:rgba(43,43,43,1); .font1; 
            span:nth-child(1){ display: inline-block; width: 1.5rem; }
            span:nth-child(3){ margin-left: 0.26rem; font-size: 0.22rem; color:rgba(255,139,75,1); background-color: rgba(255,218,197,1); border-radius: 0.14rem; padding: 0 0.13rem; position: relative; top: -0.04rem; }
        }
        .addressList_{ color:rgba(75,75,75,1); font-size: 0.24rem; }
    }
    img{ width: 0.32rem; height: 0.36rem; }
}
.addressList_add{
    width: 100%; height: 0.98rem; text-align: center; line-height: 0.98rem; position: fixed; bottom: 0; left: 0; border-top: 0.013rem solid rgba(206,206,206,1);
    color: rgba(255,139,75,1); .font3; background-color: white;
}

</style>


