<template>
    <div id="bottom">
        <!--<van-tabbar v-model="active" @change="changes">
            <van-tabbar-item icon="shop" to="/">
                <span>首页</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.home : icon.home0" >
            </van-tabbar-item>
            <van-tabbar-item icon="shop" to="/Brand">
                <span>品牌商家</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.pinpai : icon.pinpai0" >
            </van-tabbar-item>
            <van-tabbar-item icon="shop" to="/Discount">
                <span>商家优惠</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.shangjia : icon.shangjia0" >
            </van-tabbar-item>
            <van-tabbar-item icon="shop" to="/My">
                <span>我的</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.my : icon.my0" >
            </van-tabbar-item>
        </van-tabbar>-->

        <div class="footer">
            <div v-for="(item,index) in list" :key="index" @click="changes(index)">
                <img :src="actives == index ? item.icon : item.icons" alt="">
                <p :class="{clicks: actives == index}">{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // active: 0,
            // icon: {
            //     home: require('../assets/img/home.png'), home0: require('../assets/img/home0.png'),
            //     pinpai: require('../assets/img/pinpai.png'), pinpai0: require('../assets/img/pinpai0.png'),
            //     shangjia: require('../assets/img/shangjia.png'), shangjia0: require('../assets/img/shangjia0.png'),
            //     my: require('../assets/img/my.png'), my0: require('../assets/img/my0.png'),
            // },
            list:[
                { name: '首页', icon: require('../assets/img/home.png'), icons: require('../assets/img/home0.png') },
                { name: '品牌商家', icon: require('../assets/img/pinpai.png'), icons: require('../assets/img/pinpai0.png') },
                { name: '商家优惠', icon: require('../assets/img/shangjia.png'), icons: require('../assets/img/shangjia0.png') },
                { name: '我的', icon: require('../assets/img/my.png'), icons: require('../assets/img/my0.png') },
            ]
        }
    },
    computed:{
        actives(){
            return this.$store.state.active
        }
    },
    created(){
        // this.active = this.$store.state.active
    },
    methods:{
        changes(index){
            this.$store.commit('ACTIVE', index)
            if(index == 0) this.$router.push({path:'/'})
            if(index == 1) this.$router.push({path:'/Brand'})
            if(index == 2) this.$router.push({path:'/Discount'})
            if(index == 3) this.$router.push({path:'/My'})
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
        width: 100%; height: 1.1rem; position: fixed; bottom: 0; left: 0; box-shadow:1px 0px 0px rgba(0,0,0,0.3);
    }
    .van-tabbar{
        height: 1.1rem;
        .van-tabbar-item__icon img{
            width: 0.45rem; height: 0.45rem;
        }
        .van-tabbar-item{
            font-size: 0.25rem;
        }
        .van-tabbar-item--active{
            color: rgba(255,139,75,1);
        }
    }

    .footer{
        width: 100%; height: 1.1rem; position: fixed; bottom: 0; left: 0; display: flex; 
        box-shadow:1px 0px 0px rgba(0,0,0,0.3); background:rgba(255,255,255,1); border-top: 0.01rem solid rgba(0,0,0,0.3);
        div{
            width: 25%; height: 100%; text-align: center; font-size: 0.25rem; color:rgba(75,75,75,1); 
            font-family:PingFang-SC-Regular; font-weight: Regular; padding-top: 0.13rem;
            img{ width: 0.46rem; height: 0.46rem; }
            p{ margin: 0; }
        }
        .clicks{ color:rgba(255,139,75,1); font-family:PingFang-SC-Medium; font-weight: Medium; }
    }
</style>


