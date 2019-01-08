<template>
	
    <div class="NewPassword">
        
        <div class="shouji">
            <div>手机号
                <input class="phone" v-model="list.phones" type="text" placeholder="请输入手机号">
            </div>
            <div>验证码
                <input class="yma" v-model="list.codes" type="text" placeholder="请输入验证码">
                <button @click="getCode" id="huoqu" type="default" :disabled="disabled_btn" :class="{codes:disabled_btn}">{{time}}</button>
            </div>
            <div>新密码
                <input class="phone" v-model="list.password" type="password" maxlength="6" placeholder="请输入新密码">
            </div>
            <div>确认密码
                <input class="password" v-model="list.passwords" type="password" maxlength="6" placeholder="请输入确认密码">
            </div>
        </div>
        
        <button id="Grant" class="btn" :class="{active: list.password !='' && list.passwords != ''}" :disabled="list.password == '' && list.passwords == ''" @click="Sets">提  交</button>
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                list:{phones:'', codes:'', password:'', passwords:''}, disabled_btn:false, checked:false, time:'获取验证码',
            }
        },
        components: {
            
        },
        computed:{
            user(){
                if(this.$store.state.user == ''){
                    this.$store.commit('USER')
                }
                return this.$store.state.user
            },
        },
        created(){
            document.title = '支付设置'
        },
        methods: {
            getCode(){
                if(this.list.phones.length != 11) {
                    this.$toast('请输入正确的手机号！')
                    return
                }
                this.disabled_btn = true
                this.$store.dispatch('code', this.list)
                this.time = 120
                let interval = window.setInterval(()=> {
                    if ((this.time--) <= 0) {
                        this.time = '获取验证码'
                        this.disabled_btn = false
                        window.clearInterval(interval)
                    }
                }, 1000)
            },
            Sets(){
                if(this.list.password.length == 6 && this.list.passwords.length == 6){
                    if(this.list.password === this.list.passwords){
                        this.$store.dispatch('forgetPwd', this.list)
                    }else{
                        this.$dialog.alert({
                            title: '两次输入的密码不一致!',
                            message: '',
                            confirmButtonText: '关闭'
                        }).then(() => {
                            
                        })
                    }
                }else{
                    this.$toast('密码为6位数！')
                }
            },
        }
	}
</script>

<style lang="less" scoped>
.NewPassword{
    width: 100%; height: 100vh; overflow: hidden;  font-size: 0.3rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }



.shouji{
    width: calc(100% - 0.8rem); margin: 0 auto;
}
#huoqu{
    color: #ff8b4b; font-size: 0.28rem; background: none; margin-left: 0.5rem;
    border: 0.01rem solid #ff8b4b; width: 2rem; height: 0.6rem;; border-radius: 0.05rem; line-height: 0.6rem;
}
.codes{
    color: gray!important; border: 0.01rem solid gray!important;
}
.shouji div{
    line-height: 1.22rem; width: 100%; height: 1.22rem; font-size: 0.28rem; .font1; border-bottom: 0.01rem solid rgba(206,206,206,1);
}
.phone,.password{
    margin-left: 0.5rem; width: 59.5vw; height: 0.6rem; color: gray; border: none!important; line-height: 0.6rem; background: none!important;
}
.password{ margin-left: 0.23rem; }
.yma{
    margin-left: 0.5rem; width: 30vw; height: 0.6rem; color: gray; border: none!important; line-height: 0.6rem; background: none!important;
}
input:-moz-placeholder{
    font-weight: 500!important;
}
::-webkit-input-placeholder{
    font-weight: 500!important;
}

.shouquan{
    width: 90vw; height: 10vw; margin: 5vw auto; color: gray; font-size: 0.28rem;
    img{ width: 0.33rem; height: 0.33rem; vertical-align: text-top; margin-right: 0.21rem; position: relative; top: 0.01rem; }
    p{ text-decoration: underline; color: rgba(234,22,22,1); font-size: 0.28rem; .font1; margin-top: 0.22rem; margin-left: 0.5rem; }
}

.btn{
    width: 90%; height: 0.96rem; background-color: gainsboro; outline: none!important; border: 0;
    color: white; font-size: 0.36rem; border-radius: 1vw; margin-left: 5%; .font1; margin-top: 1.5rem;
}
.active{
    background-color: #ff8b4b; 
}

</style>