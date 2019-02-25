<template>
    <div id="Discount">

        <mescroll-vue class="DiscountMescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div v-if="preferentialList != ''" class="Discount">
                <div class="Discount_list" @click="details(index)" v-for="(item,index) in preferentialList" :key="index" :class="{state3: item.status === '2'}">
                    <div class="Discount_img" 
                    :style="{background:'url('+imgUrl + item.offerpic+')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position':'center'}"></div>
                    <!-- <img :src="imgUrl + item.offerpic" alt=""> -->
                    <div class="title">{{item.title}}</div>
                    <div class="state">进行中</div>
                    <div v-if="item.status === '0'" class="state" :class="{state1: item.status === '0'}">未开始</div>
                    <div v-if="item.status === '2'" class="state" :class="{state2: item.status === '2'}">已结束</div>
                </div>
            </div>

            <div v-else class="no"><img src="../../assets/img/nohuo.png" alt="">暂无活动</div>
		</mescroll-vue>

    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
    data() {
        return {
            activeNames: ['0'],
            show:true,
            mescroll: null, mescrollDown:{}, 
            mescrollUp: { 
                isBounce: false,
                callback: this.upCallback, 
                noMoreSize: 5,
                page: { num: 0, size: 4 },
                htmlNodata: ''
            },
            preferentialList:''
        }
    },
    components: {
        MescrollVue
    },
    beforeCreate(){
        
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
    },
    created(){
        document.title = '商家优惠'
        this.$store.commit('ACTIVE', 3)
    },
    methods:{
        details(index){
            this.$router.push({path:'/DiscountItem',query:{indexs: index}})
        },
        mescrollInit (mescroll) {
            this.mescroll = mescroll
        },
        upCallback (page, mescroll) {
            let list = { limit: page.size, current: page.num }
            this.$store.dispatch('preferentialList', list)
            .then(res => {
                // console.log(res.data)
                if(res.data.code == 200) {
                    let arr = res.data.data
                    if (page.num === 1) this.preferentialList = []
                    this.preferentialList = this.preferentialList.concat(arr)
                    this.$nextTick(() => {
                        res.data.data.length == 0 ? mescroll.endSuccess(this.preferentialList.length, false) : mescroll.endSuccess(this.preferentialList.length)
                    })
                }
            })
            .catch(err => mescroll.endErr())
        },
    },
}
</script>

<style lang="less" scoped>
    #Discount{
        width: 100%; height: 100vh; background-color: rgba(232,232,232,1);
    }
    
    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .DiscountMescroll {
        position: fixed;
        top: 0;
        bottom: 0.8rem;
        height: auto;
    }

    .Discount{
        width: 100%; height: 100%;
        .Discount_list{
            width: 6.7rem; height: 3.88rem; margin: 0.48rem auto; margin-bottom: 0; background-color: white; border-radius: 0.1rem; position: relative;
            font-family:PingFang-SC-Medium; font-weight: Medium;
            // img{
            //     width: 100%; height: 3rem; border-top-left-radius: 0.1rem; border-top-right-radius: 0.1rem;
            // }
            .Discount_img{
                width: 100%; height: 3rem; border-top-right-radius: 0.1rem; border-top-left-radius: 0.1rem; padding-top: calc((300/750) * 100%);
            }
            .title{
                width: 100%; height: 0.88rem; line-height: 0.88rem; font-size: 0.3rem; padding-left: 0.2rem; position: absolute; bottom: 0; left: 0;
            }
            .state{
                width: 1.2rem; height: 0.5rem; font-size: 0.28rem; line-height: 0.5rem; border-top-right-radius: 0.1rem; border-bottom-left-radius: 0.1rem;
                position: absolute; top: 0; right: 0; background:rgba(98,185,0,1); color: white; text-align: center;
            }
            .state1{ background:rgba(255,139,75,1); }
            .state2{ background:rgba(75,75,75,1); }
        }
        .state3{  opacity: 0.6; }
    }

    .no{
        width: 3.33rem; padding-top: 1.6rem; margin: 0 auto; font-size: 0.3rem; text-align: center; 
        img{ width: 100%; height: 3rem; }
    }


</style>


