<template>
    <div id="bottom" v-if="market_unionId">

        <div class="footer">
            <div v-for="(item,index) in list" :key="index" @click="changes(index)">
                <img :src="actives == index ? item.icon : item.icons" alt="">
                <!-- <p :class="{clicks: actives == index}">{{item.name}}</p> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[
                { name: '首页', icon: require('../assets/img/home.png'), icons: require('../assets/img/home0.png') },
                { name: '分类', icon: require('../assets/img/class.png'), icons: require('../assets/img/class0.png') },
                { name: '品牌商家', icon: require('../assets/img/pinpai.png'), icons: require('../assets/img/pinpai0.png') },
                { name: '购物车', icon: require('../assets/img/shangjia.png'), icons: require('../assets/img/shangjia0.png') },
                { name: '会员中心', icon: require('../assets/img/my.png'), icons: require('../assets/img/my0.png') },
            ]
        }
    },
    computed:{
        actives(){
            return this.$store.state.active
        },
        market_unionId(){
            return this.$store.state.market_unionId
        },
    },
    created(){
        
    },
    methods:{
        changes(index){
            this.$store.commit('ACTIVE', index)
            if(index == 0) this.$router.push({path:'/'})
            if(index == 1) this.$router.push({path:'/Classification'})
            if(index == 2) this.$router.push({path:'/Brand'})
            if(index == 3) this.$router.push({path:'/ShoppingCart'})
            if(index == 4) this.$router.push({path:'/My'})
        }
    },
    // beforeRouteLeave(to, from, next) {   
    // // 设置下一个路由的 meta
    //     to.meta.keepAlive = false; // B 跳转到 A 时，让 A 缓存，即不刷新（代码写在B页面）
    //     next();
    // }
}
</script>

<style lang="less" scoped>
    #bottom{
        width: 100%; height: 1.1rem; position: fixed; bottom: 0; left: 0; box-shadow:1px 0px 0px rgba(0,0,0,0.3); z-index: 1000;
    }

    .footer{
        width: 100%; height: 1.1rem; position: fixed; bottom: 0; left: 0; display: flex; 
        box-shadow:1px 0px 0px rgba(0,0,0,0.3); background:rgba(255,255,255,1); border-top: 0.01rem solid rgba(0,0,0,0.3);
        div{
            width: 25%; height: 100%; text-align: center; font-size: 0.25rem; color:rgba(75,75,75,1); 
            font-family:PingFang-SC-Regular; font-weight: Regular; padding-top: 0.13rem;
            img{ width: 0.87rem; height: 0.79rem; }
            p{ margin: 0; }
        }
        .clicks{ color:rgba(255,139,75,1); font-family:PingFang-SC-Medium; font-weight: Medium; }
    }
</style>


