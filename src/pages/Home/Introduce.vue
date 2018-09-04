<template>
    <div id="Introduce">
        <!--<header-item>商场介绍</header-item>-->

        <img v-for="(item,index) in 7" :key="index" :src="require('../../assets/img/'+(index + 1)+'.png')" alt="">
        
    </div>
</template>

<script>
export default {
    data() {  
        return {
            
        }
    },
    components: {
        
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '商场介绍'
        // console.log(12)
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        
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
        width: 100%; height: 100vh; background-color: white; font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }

    #Introduce{
        width: 100%; height: 100%;
        img{ width: 100%; }
    }
    
</style>


