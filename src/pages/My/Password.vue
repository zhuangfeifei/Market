<template>
	
    <div id="Password">

        <div @click="$router.push('/Setpassword')">支付密码设置</div>
        <div @click="$router.push('/Setpassword')">支付密码修改</div>
        <div @click="$router.push('/NewPassword')">忘记支付密码</div>
        
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
    beforeCreate(){
        
    },
    computed:{
        
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '余额支付设置'

    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
#Password{
    width: 100%; min-height: 100vh; font-size: 0.3rem; background:rgba(246,246,246,1);
    div{
        width: 100%; height: 1.28rem; background-color: white; margin-bottom: 0.2rem; text-align: center; line-height: 1.28rem;
        color:rgba(43,43,43,1); text-decoration:underline; .font2;
    }
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }
.font4{ font-family:FZSKJW--GB1-0; font-weight: normal; }




</style>