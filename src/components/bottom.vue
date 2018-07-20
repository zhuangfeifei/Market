<template>
    <div id="bottom">
        <van-tabbar v-model="active" @change="changes">
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
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            icon: {
                home: require('../assets/img/home.png'),
                home0: require('../assets/img/home0.png'),
                pinpai: require('../assets/img/pinpai.png'),
                pinpai0: require('../assets/img/pinpai0.png'),
                shangjia: require('../assets/img/shangjia.png'),
                shangjia0: require('../assets/img/shangjia0.png'),
                my: require('../assets/img/my.png'),
                my0: require('../assets/img/my0.png'),
            }
        }
    },
    computed:{
        
    },
    created(){
        this.active = this.$store.state.active
    },
    methods:{
        changes(){
            this.$store.commit('ACTIVE', this.active)
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
</style>


