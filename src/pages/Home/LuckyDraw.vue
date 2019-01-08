<template>
    <div id="LuckyDraw">

        <div v-if="true" class="draw">
            <p>绑定手机参与抽奖</p>
            <div class="inputs"><span>手机号</span><input class="phone" type="text" v-model="list.phone"></div>
            <div class="inputs"><span>验证码</span><input class="code" type="text" v-model="list.code"><div class="getcode" @click="getCode" :class="{isCode:disabled_btn}">{{time}}</div></div>
            <div class="bind" :class="{isBinds:isBind}" @click="bindPhone">绑定手机号</div>
        </div>
        <div v-else class="draw phones">
            <p>尊敬的<span>{{isPhone || list.phone}}用户</span></p>
            <p>您已经成功绑定手机号</p>
        </div>

        <div class="Rotary">
            <div id="Rotary_">
                <div><section><span>¥100</span></section><p>现金<br/>抵扣券</p></div>
                <div><section><span>¥101</span></section><p>现金<br/>抵扣券</p></div>
                <div><section><span>¥102</span></section><p>现金<br/>抵扣券</p></div>
                <div><section><span>¥103</span></section><p>现金<br/>抵扣券</p></div>
                <div><section><span>¥104</span></section><p>现金<br/>抵扣券</p></div>
                <div><section><span>¥105</span></section><p>现金<br/>抵扣券</p></div>
                <div><section><span>¥106</span></section><p>现金<br/>抵扣券</p></div>
                <div><section><span>¥107</span></section><p>现金<br/>抵扣券</p></div>
            </div>
            <img class="action" @click="isLuckys" src="../../assets/home/action.png" alt="">
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:{ phone:'', code:''}, isBind:false, disabled_btn: false, time:'发送验证码', isShowLamp: true, isPhone: '', Interval:'',
            show: false, shows: false, Records_list:'', changeNum:'', isMore: false, prizeLists:'', circleNum: -1, redlist:'', isimmediately:true,
            isLucky: true, isLuckyEnd: false, num:0
        }
    },
    components: {
        
    },
    beforeCreate(){
        
    },
    computed:{
        coupon(){
            return this.$store.state.coupon
        },
        groupList(){
            return this.$store.state.groupList
        },
        imgUrl() {
            return this.$store.state.imgUrl
        },
    },
    created(){
        
        document.title = '抽奖'

        this.$store.commit('SET_PAGE', true)
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        bindPhone(){},
        getCode(){},
        isLuckys(){
            // this.num += Math.floor(Math.random() * 3600); //求得随机的旋转度数 
            if(this.isLucky){
                this.isLucky = false
                this.num += 45 + (0.6 * 3600); 
                // console.log(this.num)
                document.getElementById("Rotary_").style.transform = 'rotate(' + this.num + 'deg)';
                setTimeout(()=>{
                    this.isLucky = true
                },3000)
            }
        },
    },
    destroyed(){
        
    }
}
</script>

<style lang="less" scoped>
*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }
.font4{ font-family:MicrosoftYaHei; font-weight: 400; }

#LuckyDraw{
    width: 100%; min-height: 100vh; padding: 0.3rem 0.4rem; background: white; font-size: 0.3rem;
    background: url('../../assets/home/drawback.png') no-repeat; background-size: 100% 100%;
    .draw{
        width: 5.74rem; height: 2.95rem; margin: 0 auto; padding: 0.3rem 0.48rem; color:rgba(51,51,51,1);
        background: url('../../assets/home/bind.png') no-repeat; background-size: 100% 100%;
        p{ .font3; line-break: 0.3rem; }
        .inputs{
            width: 100%; height: 0.48rem; line-height: 0.48rem; display: flex; justify-content: space-between; margin-top: 0.1rem; font-size: 0.28rem; .font1;
            input{ background:rgba(240,240,240,1); outline: none; border: 0; padding: 0 0.2rem; color: rgba(203,59,29,1)!important; font-size: 0.28rem;}
            .phone{
                width: 3.66rem; height: 100%; color: black;
            }
            .code{
                width: 1.43rem; height: 100%;
            }
            .getcode{
                width: 2.03rem;  height: 100%; font-size: 0.24rem; color:rgba(255,138,0,1); border: 0.01rem solid rgba(255,138,0,1);
                text-align: center; border-radius: 0.1rem;
            }
            .isCode{
                color:rgba(204,204,204,1); border: 0.01rem solid rgba(204,204,204,1);
            }
        }
        .bind{
            width: 100%; height: 0.6rem; background:rgba(204,204,204,1); border-radius: 0.1rem; text-align: center; 
            color: rgba(255,255,255,1); margin-top: 0.2rem; line-height: 0.6rem; .font3;
        }
        .isBinds{ background:rgba(255,138,0,1); }
    }
    .phones{
        text-align: center; padding-top: 0.85rem;
        P{ font-size: 0.36rem!important; .font3!important; }
        span{ font-size: 0.36rem!important; color: #CB3B1D; }
    }
}

.record{
    text-align: center; font-size: 0.36rem; .font3; text-decoration: underline; color: white; margin-top: 0.35rem;
}

.Rotary{
    width: 6.26rem; height: 6.26rem; margin: 1rem auto; padding: 0.32rem; border-radius: 50%; position: relative;
    background: url('../../assets/home/Rotary.png') no-repeat; background-size: 100% 100%;
    .action{
        width: 1.48rem; height: 1.65rem; position: absolute; top: calc(50% - 0.825rem); left: calc(50% - 0.74rem);
    }
    #Rotary_{
        width: 5.6rem; height: 5.6rem; position: relative; border-radius: 50%; 
        background: url('../../assets/home/round.png') no-repeat; background-size: 100% 100%;
        transition: all 3s ease;
        div{
            width: 1.3rem; height: 2.8rem; position: absolute; text-align: center; padding-top: 0.34rem;
            // border: 1px solid lightblue;
            section{ 
                width: 1.24rem; height: 0.44rem; margin: 0 auto;
                background:linear-gradient(0deg,rgba(199,108,0,1),rgba(219,167,43,1),rgba(199,108,0,1));
                span{ font-size: 0.24rem; color:rgba(255,255,255,1); .font4; border: 0.015rem solid rgba(255,255,255,1); padding: 0.01rem 0.3rem; border-radius: 0.05rem; }
            }
            p{ font-size: 0.22rem; color:rgba(43,43,43,1); margin-top: 0.2rem; line-height: 0.26rem; .font4; }
        }
        div:nth-child(1){
            top: 0; left: calc(50% - 0.7rem);
        }
        div:nth-child(2){
            top: 0.35rem; right: 1.2rem;
            transform: rotate(45deg);
        }
        div:nth-child(3){
            top: 1.35rem; right: 0.75rem;
            transform: rotate(90deg);
        }
        div:nth-child(4){
            bottom: 0.45rem; right: 1.1rem;
            transform: rotate(135deg);
        }
        div:nth-child(5){
            bottom: 0rem; left: calc(50% - 0.6rem);
            transform: rotate(180deg);
        }
        div:nth-child(6){
            bottom: 0.4rem; left: 1.2rem;
            transform: rotate(225deg);
        }
        div:nth-child(7){
            top: 1.45rem; left: 0.75rem;
            transform: rotate(270deg);
        }
        div:nth-child(8){
            top: 0.4rem; left: 1.1rem;
            transform: rotate(315deg);
        }
    }
}


    
</style>


