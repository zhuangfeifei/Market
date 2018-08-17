<template>
	
    <div class="yuyue">
        <!--<header-item>绑定手机号</header-item>-->

        <div class="logo">
            <img src="../assets/img/fyl.png" alt="">
        </div>
        
        <div class="shouji">
            <div>手机号
                <input id="phone" v-model="list.phones" type="text" placeholder="请输入手机号">
            </div>
            <div>验证码
                <input id="yma" v-model="list.codes" type="text" placeholder="请输入验证码">
                <button @click="getCode" id="huoqu" type="default" :disabled="disabled_btn" :class="{codes:disabled_btn}">{{time}}</span></button>
            </div>
        </div>
        <div class="shouquan">
            <van-checkbox class="mr" v-model="checked">同意将您的个人信息授权给扑满商城使用</van-checkbox>
        </div>
        <button id="Grant" class="btn" :class="{active: !checked}" :disabled="!checked" @click="open">授权开通</button>
    </div>

</template>

<script>
import header from '../components/header'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                list:{phones:'', codes:''}, disabled_btn:false, checked:false, time:'获取验证码'
            }
        },
        components: {
            'header-item': header
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
    color: #ff8b4b; font-size: 0.28rem; background: none; float: right;
    border: 0.01rem solid #ff8b4b; width: 1.8rem; height: 0.6rem;; border-radius: 0.05rem;
}
.codes{
    color: gray!important; border: 0.01rem solid gray!important;
}
.shouji div{
    line-height: 6vw; padding-bottom: 1vw; width: 100%; font-size: 0.28rem; .font1; margin-top: 0.3rem;
}
#phone{
    margin-left: 3vw; width: 59.5vw; height: 9vw; color: gray; border: none!important;
}
#yma{
    margin-left: 3vw; width: 30vw; height: 9vw; color: gray; border: none!important;
}
input:-moz-placeholder{
    font-weight: 500!important;
}
::-webkit-input-placeholder{
    font-weight: 500!important;
}

.shouquan{
    width: 90vw; height: 10vw; margin: 5vw auto; color: gray; font-size: 3.5vw;
}

.btn{
    width: 90%; height: 0.96rem; background-color: #ff8b4b; outline: none!important; border: 0;
    color: white; font-size: 0.36rem; border-radius: 1vw; margin-left: 5%; .font1;
}
.active{
    background-color: gainsboro; 
}
</style>