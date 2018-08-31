<template>
	
    <div class="yuyue">
        <!--<header-item>绑定手机号</header-item>-->

        <div class="logo">
            <img src="../../assets/img/fyl.png" alt="">
        </div>
        
        <div class="shouji">
            <div>手机号
                <input id="phone" v-model="list.phones" type="text" placeholder="请输入手机号">
            </div>
            <div>验证码
                <input id="yma" v-model="list.codes" type="text" placeholder="请输入验证码">
                <button @click="getCode" id="huoqu" type="default" :disabled="disabled_btn" :class="{codes:disabled_btn}">{{time}}</button>
            </div>
        </div>
        <div class="shouquan">
            <img @click="change" :src="checked ? checkeds[0] : checkeds[1]" alt=""><span>同意将您的个人信息授权给方圆里商城使用</span>
            <p @click="Notes">开卡需知</p>
        </div>
        <button id="Grant" class="btn" :class="{active: !checked}" :disabled="!checked" @click="open">授权开通</button>
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                list:{phones:'', codes:''}, disabled_btn:false, checked:false, time:'获取验证码',
                checkeds:[require('../../assets/img/checkedRed.png'),require('../../assets/img/checkedW.png')]
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
            document.title = '开通会员卡'
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
            open(){
                this.$store.dispatch('phone', this.list)
            },
            change(){
                this.checked = !this.checked
            },
            Notes(){
                this.$router.push({path:'/Rule'})
            }
        }
	}
</script>

<style lang="less" scoped>
.yuyue{
    width: 100%; height: 100vh; overflow: hidden;  font-size: 0.3rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }


.logo{
    width: 2.65rem; height: 0.94rem; margin: 1rem auto;
    img{
        width: 100%; height: 100%;
    }
}


.shouji{
    width: calc(100% - 0.8rem); border-top: 0.01rem solid rgba(206,206,206,1); margin: 0 auto;
}
#huoqu{
    color: #ff8b4b; font-size: 0.28rem; background: none; margin-left: 1.1rem;
    border: 0.01rem solid #ff8b4b; width: 2rem; height: 0.6rem;; border-radius: 0.05rem; line-height: 0.6rem;
}
.codes{
    color: gray!important; border: 0.01rem solid gray!important;
}
.shouji div{
    line-height: 1.22rem; width: 100%; height: 1.22rem; font-size: 0.28rem; .font1; border-bottom: 0.01rem solid rgba(206,206,206,1);
}
#phone{
    margin-left: 3vw; width: 59.5vw; height: 0.6rem; color: gray; border: none!important; line-height: 0.6rem;
}
#yma{
    margin-left: 3vw; width: 30vw; height: 0.6rem; color: gray; border: none!important; line-height: 0.6rem;
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
    width: 90%; height: 0.96rem; background-color: #ff8b4b; outline: none!important; border: 0;
    color: white; font-size: 0.36rem; border-radius: 1vw; margin-left: 5%; .font1; margin-top: 1.5rem;
}
.active{
    background-color: gainsboro; 
}

</style>