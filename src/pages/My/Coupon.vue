<template>
    <div id="Coupon">
        <!--<header-item>优惠券</header-item>-->

        <nav>
            <div @click="tab(index)" v-for="(item,index) in title" :key="index" :class="{active: list.tabIndex == index}"><span>{{item}}</span><section v-show="list.tabIndex == index"></section></div>
        </nav>

        <div v-if="data" class="list">
            <div class="coupon_list" @click="coupon_content(item.id)" v-for="(item,index) in coupon" :key="index">
                <div class="money"><h3 :class="{Coupon_list_active: list.tabIndex > 0}"><span>¥</span>{{item.discount}}</h3></div>
                <div class="content" :class="{Coupon_list_active: list.tabIndex > 0}"><h3 :class="{Coupon_list_active: list.tabIndex > 0}">{{item.conditionDesc}}</h3><p>{{item.title}}</p></div>
                <div class="status"><img :src="status[list.tabIndex]" alt=""></div>
                <p class="time" :class="{Coupon_list_active: list.tabIndex > 0}">有效期：{{item.limitDateStart}} ~ {{item.limitDateEnd}}</p>
            </div>
        </div>

        <div v-else class="nos"><img src="../../assets/img/no.png" alt=""><p>目前还没有优惠券哦~</p></div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0, title:['未使用','已使用','已到期'], data:'1',
            status:[require('../../assets/img/notUsed.png'),require('../../assets/img/Undue.png'),require('../../assets/img/Expired.png')],
            list:{ limit:5, current:1, isPage: false, tabIndex: 0 }
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
    },
    created(){
        this.top()
        document.title = '优惠券'

        this.$store.commit('SET_PAGE', true)
        this.$store.dispatch('coupon', this.list)
        window.addEventListener('scroll', this.get)
    },
    activated(){
        // console.log('hah')
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
            this.$store.dispatch('coupon', this.list)
        },
        coupon_content(id){
            this.$router.push({path:'/couponContent', query:{status: this.list.tabIndex, ids: id}})
        },
        get(){
            var scrollTop = $(window).scrollTop()
            var windowHeight = $(window).height()
            var documentHeight = $(document).height()
            if(scrollTop + windowHeight === documentHeight){
                this.list.current ++
                this.list.isPage = true
                if(this.$store.state.isPage) this.$store.dispatch('coupon', this.list)
            }
        },
        
    },
    destroyed(){
        window.removeEventListener('scroll', this.get)
    }
}
</script>

<style lang="less" scoped>
    #Coupon{
        width: 100%; min-height: 100vh; background:rgba(232,232,232,1); padding-top: calc(0.66rem); font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    nav{
        width: 100%; height: 0.66rem; .font1; background:rgba(255,255,255,1); display: flex; justify-content: space-around;
        position: fixed; top: 0; left: 0;
        div{
            height: 100%; text-align: center; line-height: 0.66rem; font-size: 0.28rem; color: rgba(43,43,43,1);
            section{
                width: 0.52rem; height: 0.04rem; background:rgba(255,139,75,1); margin: 0 auto; position: relative; top: -0.04rem;
            }
        }
        .active{ color: rgba(255,139,75,1); }
    }

    .list{
        width: 100%; height: 100%; padding: 0.3rem 0.4rem;
        .coupon_list{
            width: 6.7rem; height: 2.57rem; border-radius: 0.1rem; color:rgba(43,43,43,1); font-size: 0.24rem;
            background: url('../../assets/img/couponList.png') no-repeat; background-size: 100% 100%; margin-bottom: 0.3rem;
            .money{
                width: 2.53rem; height: 1.74rem; float: left; text-align: center; padding-top: 0.66rem;
                h3{ font-size: 0.6rem; color:rgba(255,139,75,1); .font3; span{ font-size: 0.48rem; margin-right: 0.14rem;} line-height: 0.45rem; }
            }
            .content{
                width: calc(6.7rem - 2.53rem - 1.39rem); height: 1.74rem; float: left; padding-top: 0.48rem;
                h3{ .font1; font-size: 0.3rem; color:rgba(234,22,22,1); line-height: 0.45rem; margin-bottom: 0.03rem; }
            }
            .status{
                width: 1rem; height: 1rem; float: right;
                img{ width: 100%; height: 100%; }
            }
            .time{ clear: both; line-height: 0.82rem; padding-left: 0.48rem; font-size: 0.26rem; .font2; color:#949494; }
        }
    }
    .Coupon_list_active{ color:rgba(206,206,206,1)!important; }

    .nos{
        width: 100%; height: 100%; padding-top: 1.6rem; text-align: center; .font2; color:rgba(43,43,43,1);
        img{ width: 3rem; height: 3rem; margin-bottom: 0.6rem; }
    }
    
</style>


