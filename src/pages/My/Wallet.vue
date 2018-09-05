<template>
	
    <div class="yuyue">
        <!--<header-item>积分</header-item>-->
        
        <div class="Wallet_main">
            <div class="integral"><span>当前积分</span><br><span>{{user.wtCustomer.integration || 0}}</span></div>
            <div class="integral_class" @click="class_change"><span :class="{checked:show}">积分明细</span><span :class="{checked:!show}">积分规则</span></div>
            <div class="integral_bottom"><div :class="{back_color:show}"></div><div :class="{back_color:!show}"></div></div>
            <div v-if="show" class="integral_content">
                <div class="add_reduce" v-for="(item,index) in getIntegralHis" :key="index">
                    <div><span>{{item.remark}}</span><br><span class="date">{{item.operatime}}</span></div>
                    <!--<div><span>停车时长</span></div>-->
                    <div><span>{{item.changed}}</span></div>
                </div>
            </div>
            <div v-else class="integral_content content">
                <p>积分规则</p>
                <div class="regulations" v-html="htmls"></div>
            </div>
        </div>

        <!--<button v-show="show" class="btn">积分兑换</button>-->
        
    </div>

</template>

<script>
import header from '../../components/header'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                show:true, list: { current: 1, limit: 10, isPage: false }
            }
        },
        components: {
            'header-item': header
        },
        beforeCreate(){
            // 获取不到data属性
            this.$store.dispatch('getJFIllege')
        },
        computed:{
            user(){
                if(this.$store.state.user == ''){
                    this.$store.commit('USER')
                }
                return this.$store.state.user
            },
            getJFIllege(){
                return this.$store.state.getJFIllege
            },
            htmls(){
                this.$store.commit('HTML', this.getJFIllege.detail)
                return this.$store.getters.htmls
            },
            getIntegralHis(){
                return this.$store.state.getIntegralHis
            },
        },
        created(){
            document.title = '会员积分'
            this.$store.commit('SET_PAGE', true)
            this.$store.dispatch('getIntegralHis', this.list)
            window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
            class_change(){
                this.show = !this.show
            },
            handleScroll(){
                let scrollTop = $(window).scrollTop()
                let scrollHeight = $(document).height()
                let windowHeight = $(window).height()
                if (scrollTop + windowHeight === scrollHeight && this.show) {
                    this.list.current ++
                    this.list.isPage = true
                    if(this.$store.state.isPage) this.$store.dispatch('getIntegralHis', this.list)
                }
            },
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        }
	}
</script>

<style lang="less" scoped>
.yuyue{
    width: 100%; font-size: 0.3rem; overflow: hidden;
}




/**/
.Wallet_main{
    width: 100%;
    .font1{font-family:PingFang-SC-Medium; font-weight: Medium;}
    .font2{font-family:PingFang-SC-Regular; font-weight: Regular;}
    .integral{
        width: 90%; height: 3.04rem; margin: 0 auto; border-bottom: 0.02rem dashed rgba(206,206,206,1); 
        padding-top: 1rem; text-align: center; .font2; color:rgba(128,128,128,1);
        span:nth-child(3){
            .font1; color:rgba(75,75,75,1); font-size: 0.6rem;
        }
    }
    .class{width: 100%; display: flex; justify-content: space-around;}
    .integral_class{
        height: 0.97rem; line-height: 0.97rem; .class; .font1;
    }
    .integral_bottom{
        height: 0.04rem; .class; font-size: 0.28rem;
        div{ width: 0.52rem; height: 100%; }
        .back_color{ background-color: rgba(43,43,43,1); }
    }
    .integral_content{
        width: 100%; border-top: 0.3rem solid gainsboro; .font2;
        .add_reduce{
            width: 90%; height: 1.3rem; margin: 0 auto; display: flex; justify-content: space-between; font-size: 0.28rem;
            border-bottom: 0.01rem solid rgba(206,206,206,1); line-height: 0.4rem; padding-top: 0.48rem;
            .date{
                color:rgba(128,128,128,1); font-size: 0.22rem;
            }
            div:nth-child(3){ font-size: 0.36rem; }
        }
    }
    .checked{
        color:rgba(255,139,75,1);
    }
    .content{
        padding-left: 0.4rem; padding-top: 0.48rem; font-size: 0.26rem;
        p{ .font1; color:rgba(26,26,26,1); font-size: 0.32rem; }
        ol{margin-bottom: 0.62rem; padding: 0 0.4rem; line-height: 0.48rem;}
        li{.font2; color:rgba(128,128,128,1); list-style: decimal; }
    }
}

.regulations{
    width: 100%; min-height: 10vh; padding-right: 4vw;
}

.btn{
    font-family:PingFang-SC-Bold; font-weight: Bold; color:rgba(255,255,255,1); font-size: 0.36rem; border: 0;
    width: 90%; height: 0.96rem; position: fixed; bottom: 0.48rem; left: 5%; background-color:rgba(255,139,75,1);
    box-shadow:0px 0px 10px rgba(43,43,43,0.1); border-radius: 0.1rem; outline: none!important;
}
</style>