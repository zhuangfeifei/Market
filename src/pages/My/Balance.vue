<template>
    <div id="Balance">
        <!--<header-item>会员卡</header-item>-->

        <div class="Balance">
            <div class="Balance_">
                <p>当前余额</p><h4><span>¥ </span>{{user.wtCustomer.amount || 0}}</h4>
                <router-link to=""><div class="Balance_Recharge">充值</div></router-link>
            </div>
            <nav>
                <div @click="tab(index)" v-for="(item,index) in title" :key="index" :class="{active: list.tabIndex == index}"><span>{{item}}</span><section v-show="list.tabIndex == index"></section></div>
            </nav>
        </div>
        
        <div v-if="balance != ''" class="Balance_content">
            <div class="add_reduce" v-for="(item,index) in balance" :key="index">
                <div><span>{{item.flow}}</span><br><span class="date">{{item.create_time}}</span></div>
                <div><span :class="{colors:item.status == 1}">{{item.status === 0 ? '-¥' : '+¥'}} {{item.amount}}</span></div>
            </div>
        </div>


        <div v-else class="no"><img src="../../assets/img/nohuo.png" alt="">暂无</div>



    </div>
</template>

<script>
// import header from '../../components/header'
export default {
    data() {
        return {
            active: 0, title:['全部','支出','收入'],
            list:{ limit:10, current:1, isPage: false, tabIndex: 0 }
        }
    },
    components: {
        // 'header-item': header
    },
    beforeCreate(){
            // this.$store.dispatch('documentType')
        },
    computed:{
        balance(){
            return this.$store.state.balance
        },
        user(){
            if(this.$store.state.user == ''){
                this.$store.commit('USER')
            }
            return this.$store.state.user
        },
    },
    created(){
        this.top()
        document.title = '余额'

        this.$store.commit('SET_PAGE', true)
        this.$store.dispatch('balance', this.list)
        window.addEventListener('scroll', this.handleScroll)
    },
    methods:{
        top(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        tab(index){
            this.top()
            this.list.tabIndex = index
            this.list.current = 1
            this.$store.commit('SET_PAGE', true)
            this.$store.dispatch('balance', this.list)
        },
        handleScroll() {
            let scrollTop = $(window).scrollTop()
            let scrollHeight = $(document).height()
            let windowHeight = $(window).height()
            if (scrollTop + windowHeight === scrollHeight) {
                this.list.current ++
                this.list.isPage = true
                if (this.$store.state.isPage) this.$store.dispatch('balance', this.list)
            }
        },
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style lang="less" scoped>
    #Balance{
        width: 100%; min-height: 100vh; font-size: 0.3rem; padding-top: calc(4.27rem + 0.93rem);
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }
    .font4{ font-family:PingFang-SC-Light; font-weight: Light; }

    .Balance{
        width: 100%; height: calc(4.27rem + 0.93rem); padding-top: 1rem; background-color: #e8e8e8;
        position: fixed; top: 0; left: 0; text-align: center;
        .Balance_{
            width: 100%; 
            p{ color: rgba(128,128,128,1); } 
            h4{ font-size: 0.6rem; letter-spacing: 0.02rem; .font1; span{ font-size: 0.36rem; } }
            .Balance_Recharge{
                width: 2rem; height: 0.6rem; background-color: rgba(255,139,75,1); line-height: 0.6rem; .font1; color: white; 
                font-size: 0.28rem; margin: 0.5rem auto; border-radius: 0.1rem;
            }
        }
    }

    nav{
        width: 100%; height: 0.93rem; .font1; background:rgba(255,255,255,1); display: flex; justify-content: space-around;
        position: absolute; bottom: 0; left: 0; border-bottom: 0.01rem solid gainsboro;
        div{
            height: 100%; text-align: center; line-height: 0.93rem; font-size: 0.28rem; color: rgba(43,43,43,1); letter-spacing: 0.1rem;
            section{
                width: 0.52rem; height: 0.04rem; background:rgba(255,139,75,1); margin: 0 auto; position: relative; top: -0.04rem;
            }
        }
        .active{ color: rgba(255,139,75,1); }
    }


    .Balance_content{
        width: 100%; .font2;
        .add_reduce{
            width: 90%; height: 1.3rem; margin: 0 auto; display: flex; justify-content: space-between; font-size: 0.28rem;
            border-bottom: 0.01rem solid rgba(206,206,206,1); line-height: 0.4rem; padding-top: 0.29rem; .font1;
            .date{
                color:rgba(128,128,128,1); font-size: 0.24rem; .font4;
            }
            div:nth-child(2){  height: 100%; font-size: 0.36rem; margin-top: 0.15rem; } 
            .colors{ color:rgba(234,22,22,1); }
        }
    }

    .no{
        width: 3.33rem; padding-top: 1.6rem; margin: 0 auto; font-size: 0.3rem; text-align: center; 
        img{ width: 100%; height: 3rem; }
    }

    
</style>


