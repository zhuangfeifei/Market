<template>
    <div id="Result">
        
        <nav class="Result_nav"><img src="../../assets/img/result.png" alt=""><p>付款成功</p></nav>

        <div class="Result_tip">
            <p>温馨提示：</p>
            <p>1.消费券型商品，消费时请出示券码</p>
            <p>2.查询券码请至优惠券列表或短信提醒</p>
            <p>3.发货类商品，请耐心等待发货</p>
        </div>

        <div class="Result_view">
            <div @click="details">查看订单</div><div @click="$router.go(-1)">继续</div>
        </div>
        
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
        document.title = '付款成功'
        // console.log(12)
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        details(){
            this.$router.replace({path:'/CommonOrderDetils', query:{ order_id: this.$route.query.orderId}})
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
#Result{
    width: 100%; height: 100vh; font-size: 0.3rem; background: url('../../assets/img/resultbj.png') no-repeat; background-size: 100% 100%;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

.Result_nav{
    width: 100%; text-align: center; padding-top: 1.02rem;
    img{ width: 2rem; height: 2rem; }
    p{ color:rgba(43,43,43,1); font-size: 0.48rem; .font3; line-height: 1.4rem; }
}

.Result_tip{
    width: 100%; padding-left: 1.73rem; font-size: 0.24rem; color:rgba(0,0,0,1); .font2; line-height: 0.5rem;
}

.Result_view{
    width: calc(100% - 0.8rem); margin: 1.5rem auto; text-align: center;
    div{ 
        width: 100%; height: 0.96rem; background:rgba(255,139,75,1); border-radius: 0.1rem; margin-top: 0.49rem; line-height: 0.96rem; 
        color:rgba(255,255,255,1); font-size: 0.36rem; .font3;
    }
    div:last-child{
        color:rgba(255,139,75,1); background: none; border:0.03rem solid rgba(255,139,75,1);
    }
}
    
</style>


