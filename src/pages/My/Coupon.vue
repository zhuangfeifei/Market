<template>
    <div id="Coupon">
        <!--<header-item>优惠券</header-item>-->

        <nav>
            <div @click="tab(index)" v-for="(item,index) in title" :key="index" :class="{active: tabIndex == index}"><span>{{item}}</span><section v-show="tabIndex == index"></section></div>
        </nav>

        <mescroll-vue class="CouponMescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div v-if="coupon.length > 0" class="list">
                <div class="coupon_list" @click="coupon_content(item.id)" v-for="(item,index) in coupon" :key="index">
                    <div class="money"><h3 :class="{Coupon_list_active: tabIndex > 0}"><span>¥</span>{{item.discount}}</h3></div>
                    <div class="content" :class="{Coupon_list_active: tabIndex > 0}"><h3 :class="{Coupon_list_active: tabIndex > 0}">{{item.conditionDesc}}</h3><div>{{item.title}}</div></div>
                    <div class="status"><img :src="status[tabIndex]" alt=""></div>
                    <p class="time" :class="{Coupon_list_active: tabIndex > 0}">有效期：{{item.limitDateStart}} ~ {{item.limitDateEnd}}</p>
                </div>
            </div>
            <div v-else class="nos"><img src="../../assets/img/no.png" alt=""><p>目前还没有优惠券哦~</p></div>
        </mescroll-vue>
        
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
    data() {
        return {
            active: 0, title:['未使用','已使用','已到期'], data:'1',
            status:[require('../../assets/img/notUsed.png'),require('../../assets/img/Undue.png'),require('../../assets/img/Expired.png')],
            tabIndex: 0 ,
            mescroll: null, // mescroll实例对象
            mescrollDown:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
            mescrollUp: { // 上拉加载的配置.
                isBounce: false,
                callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
                noMoreSize: 5,
                //以下是一些常用的配置,当然不写也可以的.
                page: {
                    num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    size: 5 //每页数据条数,默认10
                },
                // empty: {
                //     warpId:'Coupon', //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示, 父布局的id (1.3.5版本支持传入dom元素)
				// 	icon: require('../../assets/img/no.png'), //图标,默认null
				// 	tip: "目前还没有优惠券哦~", //提示
                // },
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多了！ --</p>'
            },
            coupon:'',
        }
    },
    components: {
        MescrollVue
    },
    beforeCreate(){
        
    },
    computed:{
        
    },
    created(){

        document.title = '优惠券'

    },
    activated(){
        // console.log('hah')
    },
    methods:{
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit (mescroll) {
            this.mescroll = mescroll
        },
        upCallback (page, mescroll) {
            let list = { queryType: this.tabIndex, limit: page.size, current: page.num }
            this.$store.dispatch('coupon', list)
            .then(res => {
                // console.log(res.data)
                if(res.data.code == 200) {
                    let arr = res.data.data
                    if (page.num === 1) this.coupon = []
                    this.coupon = this.coupon.concat(arr)
                    this.$nextTick(() => {
                        res.data.data.length == 0 ? mescroll.endSuccess(this.coupon.length, false) : mescroll.endSuccess(this.coupon.length)
                    })
                }
            })
            .catch(err => mescroll.endErr())
        },
        tab(index){
            this.tabIndex = index
            this.coupon = []
            //重置列表数据
            this.mescroll.resetUpScroll()
        },
        coupon_content(id){
            this.$router.push({path:'/couponContent', query:{status: this.tabIndex, ids: id}})
        },
    },
}
</script>

<style lang="less" scoped>
    #Coupon{
        width: 100%; font-size: 0.3rem; position: fixed; top: 0; left: 0;
        height: 100vh; background:rgba(232,232,232,1);
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

    .CouponMescroll {
        position: fixed;
        top: 0.66rem;
        bottom: 0;
        height: auto;
    }

    .list{
        width: 100%; height: 100%; padding: 0.3rem 0.4rem 0 0.4rem;
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
                div{
                    width: 100%; height: 0.7rem; line-height: 0.35rem;
                    display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; -webkit-line-clamp: 2;
                }
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


