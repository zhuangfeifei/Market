<template>
    <div id="_goods">

        <div class="goods_list" v-for="(item,index) in goodsList" :key="index" @click="$router.push({path:'/GoodsDetails', query:{id: item.id}})">
            <section :style="{background:'url('+imgUrlGoods + item.thumbnail_pic+')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position':'center'}">
                <section v-if="item.sold_num - item.inventory == 0" class="SoldOut"><img src="../assets/home/no.png" alt=""></section>
            </section>
            <!-- <img v-lazy="imgUrlGoods + item.thumbnail_pic" alt=""> -->
            <div>
                <p>{{item.goods_name}}</p>
            </div>
            <span>¥{{item.price}}</span>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    components: {
        
    },
    props:['goodsList'],
    beforeCreate(){

    },
    created(){
        
    },
    computed:{
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
        },
    },
    methods:{
        
    }
}
</script>
<style lang="less" scoped>
#_goods{
    width: 100vw; font-size: 0.3rem; display: flex; flex-wrap: wrap;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }


.goods_list{
    width: 3.73rem; height: 4.55rem; margin-top: 0.02rem; background-color: white; padding: 0.4rem 0 0.1rem 0.4rem; 
    section{ 
        width: 3.15rem; height: 2.4rem; background-size: cover!important; background-repeat: no-repeat!important; background-position:center!important;
        .SoldOut{
            width: 100%; height: 100%; text-align: center; padding-top: 0.6rem; background: rgba(0,0,0,0.4);
            img{ width: 1.28rem; height: 1.28rem; }
        }
    }
    div{
        width: 100%; height: 0.76rem; padding-right: 0.2rem; line-height: 0.38rem; margin-bottom: 0.2rem; margin-top: 0.05rem;
        overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
        p{ font-size: 0.28rem; }
    }
    span{ color: #EA1616; .font1; }
}
.goods_list:nth-child(2n -1){ margin-right: 0.02rem; }
.goods_list:nth-child(2n){ padding: 0.4rem 0 0.1rem 0.19rem!important; div{  padding-right: 0.4rem; } }


</style>


