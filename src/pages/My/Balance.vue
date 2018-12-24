<template>
    <div id="Balance">
        <!--<header-item>会员卡</header-item>-->

        <div class="Balance">
            <div class="Balance_">
                <p>当前余额</p><h4><span>¥ </span>{{user.wtCustomer.amount || 0}}</h4>
                <router-link to=""><div class="Balance_Recharge">充值</div></router-link>
            </div>
            <nav>
                <div @click="tab(index)" v-for="(item,index) in title" :key="index" :class="{active: tabIndex == index}"><span>{{item}}</span><section v-show="tabIndex == index"></section></div>
            </nav>
        </div>
        

        <mescroll-vue class="BalanceMescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div v-if="balance != ''" class="Balance_content">
                <div class="add_reduce" v-for="(item,index) in balance" :key="index">
                    <div class="Balance_title"><span>{{item.flow}}</span><br><span class="date">{{item.create_time}}</span></div>
                    <div class="Balance_s"><p :class="{colors:item.status == 1}">{{item.status === 0 ? '-¥ '+item.amount : '+¥ '+item.amount}}</p></div>
                </div>
            </div>


            <div v-else class="no"><img src="../../assets/img/nohuo.png" alt="">暂无</div>
        </mescroll-vue>



    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
    data() {
        return {
            active: 0, title:['全部','支出','收入'],
            tabIndex: 0 ,
            mescroll: null, mescrollDown:{}, 
            mescrollUp: { 
                isBounce: false,
                callback: this.upCallback, 
                noMoreSize: 5,
                page: { num: 0, size: 5 },
                htmlNodata: ''
            },
            balance:''
        }
    },
    components: {
        MescrollVue
    },
    beforeCreate(){
            this.$store.dispatch('user')
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
        document.title = '余额'

        this.$store.commit('SET_PAGE', true)
    },
    methods:{
        tab(index){
            this.tabIndex = index
            this.mescroll.resetUpScroll()
        },
        mescrollInit (mescroll) {
            this.mescroll = mescroll
        },
        upCallback (page, mescroll) {
            let list = { queryType: this.tabIndex, limit: page.size, current: page.num }
            this.$store.dispatch('balance', list)
            .then(res => {
                // console.log(res.data)
                if(res.data.code == 200) {
                    let arr = res.data.data.yueList
                    if (page.num === 1) this.balance = []
                    this.balance = this.balance.concat(arr)
                    this.$nextTick(() => {
                        res.data.data.yueList.length == 0 ? mescroll.endSuccess(this.balance.length, false) : mescroll.endSuccess(this.balance.length)
                    })
                }
            })
            .catch(err => mescroll.endErr())
        },
    },
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

    .BalanceMescroll {
        position: fixed;
        top: calc(4.27rem + 0.93rem);
        bottom: 0;
        height: auto;
    }

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
            width: 90%; margin: 0 auto; display: flex; justify-content: space-between; font-size: 0.28rem; align-items: center;
            border-bottom: 0.01rem solid rgba(206,206,206,1); line-height: 0.4rem; padding: 0.29rem 0; .font1;
            .date{
                color:rgba(128,128,128,1); font-size: 0.24rem; .font4;
            }
            div:nth-child(2){  height: 100%; font-size: 0.36rem; } 
            .colors{ color:rgba(234,22,22,1); }
            .Balance_title{ width: calc(100% - 2rem); }
            .Balance_s{ width: 2rem; text-align: right; }
        }
    }

    .no{
        width: 3.33rem; padding-top: 1.6rem; margin: 0 auto; font-size: 0.3rem; text-align: center; 
        img{ width: 100%; height: 3rem; }
    }

    
</style>


