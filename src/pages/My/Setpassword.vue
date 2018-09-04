<template>
    <div id="Setup">

        <h4 class="Setup_title">{{isPassword ? isNext ? '设置支付密码' : '确认支付密码' : '原支付密码'}}</h4>
        <van-password-input class="Setup_input" :value="value" info="" @focus="showKeyboard = true" />
        <div class="Setup_next" @click="next">{{isNext ? '下一步' : '完成'}}</div>
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = true" />
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '', showKeyboard: true, password:[], isNext: true
        }
    },
    components: {
        
    },
    beforeCreate(){
        
    },
    computed:{
        user(){
            if(this.$store.state.user == ''){
                this.$store.commit('USER')
            }
            return this.$store.state.user.wtCustomer
        },
        isPassword(){
            return this.$store.state.isPassword
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '支付设置'
        
        this.$nextTick(()=>{
            this.$store.commit('isPassword', this.$store.state.user.wtCustomer.payPassword == '' ? true : false )
        })
    },
    methods:{
        onInput(key) {
            this.value = (this.value + key).slice(0, 6)
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1)
        },
        next(){
            if(this.value.length == 6){
                if(this.user.payPassword == '' || this.isPassword){   // 如果没有设置密码或者原密码验证成功
                    this.password.push(this.value)
                    this.isNext = false
                    this.value = ''
                    if(this.password.length == 2){
                        if(this.password[0] === this.password[1]){
                            this.$store.dispatch('paypwd', this.password[1])
                        }else{
                            this.$dialog.alert({
                                title: '两次输入的密码不一致!',
                                message: '',
                                confirmButtonText: '关闭'
                            }).then(() => {
                                this.isNext = true
                                this.password = []
                            })
                        }
                    }
                }else{
                    this.$store.dispatch('updatePaypwd', this.value)
                    this.value = ''
                }
            }
        }
    },
}
</script>

<style lang="less" scoped>
    #Setup{
        width: 100%; min-height: 100vh; background-color: white; font-size: 0.3rem; padding: 0 0.4rem; padding-top: 1.5rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }

    
    .Setup_title{
        text-align: center; font-size: 0.48rem; .font1
    }
    .Setup_input{
        margin-top: 0.64rem;
    }
    .Setup_next{
        width: 4rem; height: 0.96rem; background-color: rgba(255,139,75,1); border-radius: 0.1rem;
        color: white; font-size: 0.36rem; .font1; line-height: 0.96rem; text-align: center; margin: 0 auto; margin-top: 1.28rem; 
    }
    
</style>


