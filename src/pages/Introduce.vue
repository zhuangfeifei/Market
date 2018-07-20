<template>
    <div id="Introduce">
        <header-item>商场介绍</header-item>

        <div class="Introduce">
            <h4>方圆里</h4>
            <p class="time" @click="asd"><span>2018-7-9  苏州方圆里</span><span>苏州方圆里</span></p>
            <div class="content"></div>
        </div>
    </div>
</template>

<script>
import header from '../components/header'
export default {
    data() {
        return {
            
        }
    },
    components: {
        'header-item': header
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        // console.log(12)
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        asd(){
            this.$router.push({path:'/Card'})
        }
    },
    // beforeRouteLeave(to, from, next) {   
    // // 设置下一个路由的 meta
    //     to.meta.keepAlive = true; // B 跳转到 A 时，让 A 缓存，即不刷新（代码写在B页面）
    //     next();
    // }
}
</script>

<style lang="less" scoped>
    #Introduce{
        width: 100%; height: 100vh; background-color: white; padding-top: 1rem; font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }

    .Introduce{
        width: 100%; height: 100%; padding: 0.4rem;
        h4{ font-size: 0.38rem; margin-bottom: 0.2rem; }
        .time{ font-size: 0.3rem; }
        .content{
            width: 100%; 
        }
    }
    
</style>


