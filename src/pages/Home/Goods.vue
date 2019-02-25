<template>
    <div id="Goods">
        
        <nav class="search">
            <div class="search_">
                <div><input id="name" type="text" v-model="goodsName" ref="input" placeholder="搜索你想要的商品"></div>
                <img @click="search" src="../../assets/img/search.png" alt="">
            </div>
            <ul>
                <li @click="changeList(0)">品牌<img src="../../assets/img/down.png" alt=""></li>
                <li @click="comprehensiveClick">综合</li>
                <li @click="changeSearch(1)">新品</li>
                <li @click="changeSearch(0)">热销</li>
                <li @click="orderClick">{{price}}</li>
            </ul>
        </nav>
        <div v-show="change" class="changeList">
            <div class="changeList_scroll">
                <div><p :class="{actives: index == activeIndex}" v-for="(item,index) in brands" :key="index" @click="brand(index)">{{item.brand_name}}</p></div>
            </div>
        </div>

        <mescroll-vue class="GoodsMescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div class="goods">
                <goods-item :goodsList="goodsList"></goods-item>
            </div>
            <div v-if="goodsList.length == 0" class="goods_no">暂无</div>
        </mescroll-vue>
        
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import _Goods from '../../components/_goods'
export default {
    name:'Goods',
    data() {  
        return {
            goodsName: '', change: false, goodsLabel: '', categoryId: null, order: '', comprehensive: false, price:'价格',
            mescroll: null, mescrollDown:{}, 
            mescrollUp: { 
                isBounce: false,
                callback: this.upCallback, 
                noMoreSize: 10,
                page: { num: 0, size: 10 },
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多商品了！ --</p>'
            },
            goodsList:'', activeIndex:0
        }
    },
    components: {
        MescrollVue,
        "goods-item": _Goods
    },
    beforeCreate(){
        this.$store.dispatch('brands')
    },
    computed:{
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
        },
        brands(){
            return this.$store.state.brands
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title =  this.$route.query.title || '商品分类'
        
        this.goodsName = this.$route.query.goodsName
    },
    activated(){
        
    },
    methods:{
        search(){
            this.mescroll.resetUpScroll()
        },
        mescrollInit (mescroll) {
            this.mescroll = mescroll
        },
        upCallback (page, mescroll) {
            let list = {}
            if(!this.comprehensive){
                if(this.$route.query.goodsLabel === undefined){
                    list = { limit: page.size, current: page.num, 
                        categoryId: this.categoryId === null ? this.$route.query.id : '', categoryLevel: this.categoryLevel || this.$route.query.categoryLevel, 
                        goodsLabel: this.goodsLabel, goodsName: this.goodsName, order: this.order, brandId: this.brands[this.activeIndex].id }
                }else{
                    list = { limit: page.size, current: page.num, 
                        categoryId: this.categoryId, categoryLevel: '', 
                        goodsLabel: this.goodsLabel || this.$route.query.goodsLabel, goodsName: this.goodsName, order: this.order, brandId: this.brands[this.activeIndex].id }
                }
            }else{
                list = { limit: page.size, current: page.num, 
                    categoryId: '', categoryLevel: '', 
                    goodsLabel: '', goodsName: '', order: this.order, brandId: this.brands[this.activeIndex].id }
            }
            this.$store.dispatch('goodsList', list)
            .then(res => {
                console.log(res.data)
                if(res.data.code == 200) {
                    let arr = res.data.data
                    if (page.num === 1) this.goodsList = []
                    this.goodsList = this.goodsList.concat(arr)
                    this.$nextTick(() => {
                        res.data.data.length == 0 ? mescroll.endSuccess(this.goodsList.length, false) : mescroll.endSuccess(this.goodsList.length)
                    })
                }
            })
            .catch(err => mescroll.endErr())
        },
        changeList(index){
            this.change = !this.change
        },
        brand(index){
            this.activeIndex = index
            this.change = false
            this.search()
        },
        changeSearch(index){ // 新品、热销
            this.comprehensive = false
            this.goodsLabel = index
            this.categoryId = ''
            this.order = ''
            this.search()
        },
        orderClick(){  // 价格排序
            this.order = this.order == 0 || this.order == '' ? 1 : 0
            this.order == 0 ? this.price = '升序' : this.price = '降序'
            this.search()
        },
        comprehensiveClick(){  // 综合
            this.comprehensive = true
            this.order = ''
            this.search()
        },
    },
    beforeRouteLeave(to, from, next) {   
        if(to.name==='GoodsDetails'){
            next()
        }else{
            this.$store.commit("includedComponents", '');
            this.$store.commit("excludedComponents","Goods");
            next()
        }
    },
    activated(){
        if(this.$store.state.includedComponents.indexOf('Goods') == -1){
            this.$store.commit("includedComponents", this.$store.state.includedComponent+",Goods")
            this.$store.commit("excludedComponents","");
        }
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

#Goods{
    width: 100%; min-height: 100vh; background-color: rgba(246,246,246,1); font-size: 0.3rem;
}

.GoodsMescroll{
    position: fixed;
    top: 1.6rem;
    // top: 1.03rem;
    bottom: 0rem;
    height: auto;
}

.search{
    width: 100%; border-bottom: 0.02rem solid rgba(128,128,128,1); position: fixed; top: 0; left: 0; background-color: white; padding: 0 0.2rem; z-index: 10;
    .search_{
        width: 100%; height: 1.03rem;
        display: flex; justify-content: space-around; align-items: center;
        div{
            width: 5.54rem; height: 0.64rem; border-radius: 0.32rem; background:rgba(246,246,246,1); padding-top: 0.07rem;
            input{
                width: 100%; height: 0.45rem; border: 0; background: none; outline: none!important;
                padding-left: 0.3rem; line-height: 0.45rem!important;
            }
        }
        img{
            width: 0.42rem; height: 0.42rem;
        }
    }
    ul{
        display: flex; justify-content: space-between; align-items: center; color: #4B4B4B; list-style: none; margin-bottom: 0.15rem; font-size: 0.26rem; padding: 0 0.15rem;
        img{ width: 0.2rem; height: 0.1rem; position: relative; top: -0.02rem; }
    }
}

.changeList{
    width: 100%; color:rgba(68,68,68,1); font-size: 0.3rem; z-index: 10;
    position: fixed; top: 1.6rem; left: 0;
    .changeList_scroll{
        width: 100%; height: 3.96rem; overflow-y: auto; -webkit-overflow-scrolling:touch;
        div{
            width: 100%; line-height: 0.6rem; background-color: rgba(246,246,246,1); padding: 0.1rem 0.4rem;
            .font1;
        } 
    }
    .actives{
        color: #FF8B4B;
    }
}


.Goods_title{
    width: 100%; height: 1rem; line-height: 1rem;
}


.goods{
    width: 100%; height: 100%;
}

.goods_no{
    width: 100%; height: 100vh; text-align: center; padding-top: 2rem; color: gainsboro; font-size: 0.24rem;
}


</style>


