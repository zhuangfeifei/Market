<template>
    <div id="Recharge">

        <div class="Recharge">
            <p>充值金额</p>
            <van-row class="Recharge_">
                <van-col span="4">¥</van-col>
                <van-col span="20">{{value}}</van-col>
            </van-row>
            <div class="Recharge_next" @click="next">下一步</div>
        </div>
        
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = true" />
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '', showKeyboard: true, 
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
        document.title = '充值'
        
        
    },
    methods:{
        onInput(key) {
            this.value = (this.value + key).slice(0, 14)
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1)
        },
        next(){
            alert(this.value)
        }
    },
}
</script>

<style lang="less" scoped>
    #Recharge{
        width: 100%; min-height: 100vh; background-color: rgba(232,232,232,1);; font-size: 0.3rem; padding: 0 0.4rem; padding-top: 0.64rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    
    .Recharge{
        width: 6.7rem; height: 4.3rem; margin: 0 auto; background-color: white; border-radius: 0.1rem; padding: 0.48rem 0.31rem;
        p{ color:rgba(43,43,43,1); .font2; }
        .Recharge_{
            height: 1rem; font-size: 0.6rem; .font1; border-bottom: 0.015rem solid rgba(232,232,232,1); margin-top: 0.4rem;
        }
        .Recharge_next{
            width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; .font3; background-color: rgba(255,139,75,1); 
            border-radius: 0.1rem; color: white; text-align: center; margin-top: 0.48rem;
        }
    }
    
</style>


