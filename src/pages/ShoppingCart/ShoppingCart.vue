<template>
    <div id="ShoppingCart">
          
        <swipeout>
            <div class="ShoppingCart_" v-for="(item,index) in getList" :key="index">
                <swipeout-item transition-mode="follow" :right-menu-width="50" :right-menu-height="50">
                    <div slot="right-menu">
                        <swipeout-button @click.native="deletes(item.id)" type="warn">{{'删除'}}</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <div class="ShoppingCart">
                            <div class="ShoppingCartList">
                                <van-checkbox v-model="item.checked"></van-checkbox>
                                <van-card class="carts" :price="item.nowprice" :title="item.goodsname" :thumb="imgUrl+'file/gallery/'+item.picture" />
                                <van-stepper class="ShoppingCart_num" v-model="item.amount" @plus="plus(item.id)" @minus="minus(item.id)"/>
                            </div>
                        </div>
                    </div>
                </swipeout-item>
            </div>
        </swipeout>

        <div v-if="getList.length == 0" class="nos"><img src="../../assets/img/noOrder.png" alt=""><p>您目前还没有任何商品哦~</p></div>

        <van-submit-bar v-if="getList.length > 0" class="ShoppingCart_submit" :price="moeny" button-text="提交订单" @submit="onSubmit" >
            <van-checkbox v-model="checked" @change="changeAll">全选</van-checkbox>
        </van-submit-bar>
        
    </div>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
    data() {  
        return {
            imageURL:require('../../assets/img/1.jpg'), checked: false, value:'',
        }
    },
    components: {
        Swipeout, SwipeoutItem, SwipeoutButton
    },
    beforeCreate(){
        this.$store.dispatch('getList')
    },
    computed:{
        getList(){
            return this.$store.state.getList
        },
        moeny(){
            if(this.getList){
                let moeny = 0
                for(let val of this.getList){
                    val.checked ? moeny += val.nowprice * val.amount * 100 : ''
                }
                return parseFloat(moeny.toFixed(2))
            }
        },
        imgUrl(){
            return this.$store.state.imgUrl
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '购物车'
        // console.log(12)
        this.$store.commit('ACTIVE', 3)
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        plus(id){
            let list = { id:id, amount: 1 }
            this.$store.dispatch('updateAmount', list)
        },
        minus(id){
            let list = { id:id, amount: -1 }
            this.$store.dispatch('updateAmount', list)
        },
        deletes(id){
            this.$store.dispatch('deleteGoods', id)
        },
        changeAll(){
            if(this.checked){
                for(let i in this.getList){
                    this.getList[i].checked = this.checked 
                }
            }
        },
        onSubmit(){
            let array = []
            for(let val of this.getList){
                val.checked ? array.push(val) : ''
            }
            if(array.length > 0){
                this.$store.dispatch('cartList', array)
                this.$router.push({path:'/CreateGoodsCart',query:{ moeny: this.moeny }})
            }
        },
    },
    watch:{
        getList:{
            handler(val,old){
                for(let i in val){
                    if(!val[i].checked){
                        this.checked = false
                        break
                    }else{
                        this.checked = true
                    }
                }
            },deep:true
        }
    }
    // beforeRouteLeave(to, from, next) {   
    // // 设置下一个路由的 meta
    //     to.meta.keepAlive = true; // B 跳转到 A 时，让 A 缓存，即不刷新（代码写在B页面）
    //     next();
    // }
}
</script>

<style lang="less" scoped>
#ShoppingCart{
    width: 100%; min-height: 100vh; background-color: white; font-size: 0.3rem; padding-bottom: 1.2rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }

.ShoppingCart{
    width: 100%; margin-top: 0.2rem;
    .ShoppingCartList{
        width: 100%; height: 2rem; padding-bottom: 0.2rem; display: flex; justify-content: space-between; align-items: center; padding-left: 0.3rem; background-color: #fafafa; position: relative;
        .carts{
            width: 93%; padding: 0.1rem 0.3rem 0rem 2.2rem;
        }
        .ShoppingCart_num{
            position: absolute; right: 0.2rem; bottom: 0.2rem;
        }
    }
}

.ShoppingCart_submit{
    padding-left: 0.3rem; bottom: 1.1rem; background-color: white;
}

.nos{
    width: 100%; height: 100%; padding-top: 2rem; text-align: center; .font2; color:rgba(43,43,43,1);
    img{ width: 3rem; height: 3rem; margin-bottom: 0.6rem; }
}
    
</style>


