<template>
    <div id="Goods">
        
        <nav class="search">
            <div><input id="name" type="text" v-model="goodsName" ref="input" placeholder="搜索你想要的商品"></div>
            <img @click="search" src="../../assets/img/search.png" alt="">
        </nav>
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
    data() {  
        return {
            goodsName: '',
            mescroll: null, mescrollDown:{}, 
            mescrollUp: { 
                isBounce: false,
                callback: this.upCallback, 
                noMoreSize: 10,
                page: { num: 0, size: 10 },
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多商品了！ --</p>'
            },
            goodsList:''
        }
    },
    components: {
        MescrollVue,
        "goods-item": _Goods
    },
    beforeCreate(){
        
    },
    computed:{
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
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
            if(this.$route.query.goodsLabel === undefined){
                list = { limit: page.size, current: page.num, categoryId:this.$route.query.id, categoryLevel: this.$route.query.categoryLevel, goodsLabel: '', goodsName: this.goodsName }
            }else{
                list = { limit: page.size, current: page.num, categoryId:'', categoryLevel: '', goodsLabel: this.$route.query.goodsLabel, goodsName: this.goodsName }
            }
            this.$store.dispatch('goodsList', list)
            .then(res => {
                // console.log(res.data)
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
    top: 1.03rem;
    bottom: 0rem;
    height: auto;
}

.search{
    width: 100%; height: 1.03rem; border-bottom: 0.02rem solid rgba(128,128,128,1); position: fixed; top: 0; left: 0; background-color: white;
    display: flex; justify-content: space-around; align-items: center; padding: 0 0.2rem;
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


