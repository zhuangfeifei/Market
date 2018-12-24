<template>
    <div id="Goods">
        
        <nav class="search">
            <div><input id="name" type="text" v-model="goodsName" ref="input"><img @click="search" src="../../assets/img/search.png" alt=""></div>
        </nav>
        <!-- <div class="Goods_title"><span>默认</span><span>销量</span><span>价格</span></div> -->
        <mescroll-vue class="GoodsMescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div class="goods">
                <div class="goods_list" v-for="(item,index) in goodsList" :key="index" @click="$router.push({path:'/GoodsDetails', query:{id: item.id}})">
                    <img :src="imgUrl+'file/gallery/'+item.thumbnail_pic" alt="">
                    <div>
                        <p>{{item.goods_name}}</p>
                    </div>
                    <span>¥{{item.price}}</span>
                </div>
            </div>
            <div v-if="goodsList.length == 0" class="goods_no">暂无</div>
        </mescroll-vue>
        
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
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
        MescrollVue
    },
    beforeCreate(){
        
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title =  this.$route.query.title || '商品分类'
        // console.log(12)
    },
    activated(){
        // console.log('hah')
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
    width: 100%; height: 1.03rem; border-bottom: 0.02rem solid rgba(206,206,206,1); padding-top: 0.195rem; position: fixed; top: 0; left: 0; background-color: white;
    div{
        width: 5.54rem; height: 0.64rem; border: 0.02rem solid #FF8B4B; margin: 0 auto; position: relative; border-radius: 0.32rem;
        input{
            width: 100%; height: 0.45rem; border: 0; background: none; outline: none!important;
            position: absolute; top: 0.07rem; left: 0; padding-left: 0.3rem; line-height: 0.45rem!important;
        }
        img{
            width: 0.42rem; height: 0.42rem; position: absolute; top: 0.1rem; right: 0.31rem;
        }
    }
}


.Goods_title{
    width: 100%; height: 1rem; line-height: 1rem;
}


.goods{
    width: 100%; height: 100%; display: flex; flex-wrap: wrap;
    .goods_list{
        width: 3.73rem; height: 4.55rem; margin-top: 0.02rem; background-color: white; padding: 0.4rem 0 0.1rem 0.4rem; 
        img{ width: 3.15rem; height: 2.4rem; }
        div{
            width: 100%; height: 0.76rem; padding-right: 0.2rem; line-height: 0.38rem; margin-bottom: 0.2rem; margin-top: 0.05rem;
            p{ overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font-size: 0.28rem; }
        }
        span{ color: #EA1616; .font1; }
    }
    .goods_list:nth-child(2n -1){ margin-right: 0.02rem; }
    .goods_list:nth-child(2n){ padding: 0.4rem 0 0.1rem 0.19rem!important; div{  padding-right: 0.4rem; } }
}

.goods_no{
    width: 100%; height: 100vh; text-align: center; padding-top: 2rem; color: gainsboro; font-size: 0.24rem;
}


</style>


