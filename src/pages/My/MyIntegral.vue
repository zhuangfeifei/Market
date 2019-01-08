<template>
    <div id="MyIntegral">
        
        <div v-if="myScoreGoodsList != ''">
        <div class="MyIntegral_list" v-for="(item,index) in myScoreGoodsList" :key="index">
            <div class="MyIntegral_list_avatar"><img :src="imgUrlGoods + item.goods_images" alt=""></div>
            <div class="MyIntegral_list_content">
                <div class="MyIntegral_list_content_title">{{item.goods_name}}</div>
                <p>x{{item.goods_num}}</p>
                <span>{{item.exchange_time}}</span>
            </div>
            <div class="MyIntegral_list_"><p>-{{item.score}}积分</p><span>{{item.status == 0 ? '未领取' : '已领取'}}</span></div>
        </div>
        </div>
        <div v-if="myScoreGoodsList == ''" class="MyIntegral_no">暂无记录</div>
        
    </div>
</template>

<script>
export default {
    data() {  
        return {
            amount:1
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('myScoreGoodsList')
    },
    computed:{
        myScoreGoodsList(){
            return this.$store.state.myScoreGoodsList
        },
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '兑换记录'
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        
    },
}
</script>

<style lang="less" scoped>
#MyIntegral{
    width: 100%; min-height: 100vh; font-size: 0.3rem;  background-color: white; padding: 0 0.4rem;
    // background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

.MyIntegral_list{
    width: 100%; height: 2.13rem; border-bottom: 0.01rem solid #CECECE;
    display: flex; justify-content: space-between; align-items: center; padding: 0.3rem 0;
    .MyIntegral_list_avatar{ width: 0.7rem; height: 100%; img{ width: 100%; height: 0.7rem; } }
    .MyIntegral_list_content{
        width: 3.62rem; height: 100%; display: flex; flex-flow: column; justify-content: space-between;
        .MyIntegral_list_content_title{
            width: 100%; max-height: 0.72rem; font-size: 0.28rem; line-height: 0.36rem; 
            overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
        }
        p{ font-size: 0.28rem; color:rgba(43,43,43,1); }
        span{ font-size: 0.24rem; color:rgba(128,128,128,1); }
    }
    .MyIntegral_list_{
        height: 100%; display: flex; flex-flow: column; justify-content: space-between; text-align: right;
        p{ .font1; }
        span{ color:rgba(234,22,22,1); }
    }
}

.MyIntegral_no{
    width: 100%; padding-top: 3rem; color: gray; text-align: center;
}
    
</style>


