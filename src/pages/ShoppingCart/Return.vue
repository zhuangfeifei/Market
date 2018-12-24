<template>
    <div id="Return">
        
        <nav class="Return_nav">
            <p>是否已收货</p>
            <div class="Return_navs">
                <div @click="checke = !checke"><img :src="checke ? img[1] : img[0]" alt=""><span :class="{Return_navs_: checke}">是</span></div>
                <div @click="checke = !checke"><img :src="checke ? img[0] : img[1]" alt=""><span :class="{Return_navs_: !checke}">否</span></div>
            </div>
        </nav>

        <div class="Return_change">
            <div>我需要</div>
            <div>
                <p @click="change = index" v-for="(item,index) in changeList" :key="index">
                    <img :src="change == index ? img[1] : img[0]" alt="">
                    <span :class="{Return_change_: change == index}">{{item}}</span>
                </p>
            </div>
        </div>

        <!-- <div class="Return_money">
            <div>退款金额</div>
            <div><van-field class="input" type="number" v-model="money" input-align="center" placeholder="退款金额≤付款金额" /></div>
        </div> -->

        <div class="Return_reason">
            <div>退货退款原因</div>
            <div>
                <p @click="changeReason = index" v-for="(item,index) in changeReasonList" :key="index">
                    <img :src="changeReason == index ? img[1] : img[0]" alt="">
                    <span :class="{Return_reason_: changeReason == index}">{{item}}</span>
                </p>
            </div>
        </div>

        <div class="Return_credentials">
            <div>凭证<p>≤3张</p></div>
            <div class="Return_credentials_img">
                <div v-for="(item,index) in fileImg" :key="index">
                    <img :src="item.content" alt="">
                    <img @click="deletes(index)" class="Return_delete" src="../../assets/img/deleteImg.png" alt="">
                </div>
                <div v-if="fileImg.length < 3">
                    <van-uploader class="Return_uploader" :after-read="onRead">
                        <van-icon name="photograph" />
                    </van-uploader>
                    <img class="uploaders" src="../../assets/img/credentials.png" alt="">
                </div>
            </div>
        </div>

        <div class="Return_fotter" @click="result" :class="{isResult: true}">确定</div>
        
    </div>
</template>

<script>
export default {
    data() {  
        return {
            checke: false, img:[ require('../../assets/img/checke.png'), require('../../assets/img/returns.png') ],
            change: 0, changeList:[ '仅退款', '换货', '退货退款' ], 
            money:'',
            changeReason: 0, changeReasonList:[ '七天无理由', '始终未收到货', '其他原因' ], 
            fileImg:[]
        }
    },
    components: {
        
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '退换货'
        // console.log(12)
    },
    methods:{
        details(){
            this.$router.replace({path:'/CommonOrderDetils', query:{ order_id: this.$route.query.orderId}})
        },
        onRead(file) {
            this.fileImg.push(file)
        },
        deletes(index){
            this.fileImg.splice(index,1)
        },
        result(){
            let list = {
                orderId: this.$route.query.id, sale_type: this.change + 1, isGetGoods: this.checke ? 1 : 0, reason: this.changeReason,
                remark:'', credentialsPic:'', formData:''
            }; 
            let img = new FormData()
            for(let val of this.fileImg){
                img.append('file', val.file)
            }
            list.formData = img
            this.$store.dispatch('returnOrExchange', list)
        },
    },
}
</script>

<style lang="less" scoped>
#Return{
    width: 100%; min-height: 100vh; font-size: 0.3rem; background:rgba(232,232,232,1); padding-bottom: 0.1rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

.Return_nav{
    width: 100%; height: 0.88rem; background-color: white; display: flex; justify-content: space-between; align-items: center; padding: 0 0.4rem;
    p{ color:rgba(43,43,43,1); .font1; }
    .Return_navs{
        width: 45%; height: 100%; display: flex; justify-content: space-between; align-items: center; color:rgba(128,128,128,1); .font2;
        img{ width: 0.27rem; height: 0.27rem; margin-right: 0.35rem; }
    }
    .Return_navs_{ color:rgba(43,43,43,1); .font1; }
}

.Return_change{
    width: 100%; height: 2.02rem; background-color: white; margin-top: 0.3rem; display: flex; padding: 0 0.4rem; line-height: 0.6rem;
    div{ height: 100%; padding-top: 0.1rem; color:rgba(128,128,128,1); .font2; }
    div:nth-child(1){ width: 35%; color:rgba(43,43,43,1); .font1; }
    img{ width: 0.27rem; height: 0.27rem; margin-right: 0.35rem; }
    .Return_change_{ color:rgba(43,43,43,1); .font1; }
}

// .Return_money{
//     width: 100%; height: 1.22rem; background-color: white; margin-top: 0.3rem; padding: 0 0.4rem; display: flex; align-items: center;
//     div:nth-child(1){ width: 30%; color:rgba(43,43,43,1); .font1; }
//     div:nth-child(2){
//         width: calc(70%); height: 0.62rem; background-color: rgba(232,232,232,1); border-radius: 0.1rem; padding-top: 0.1rem;
//         .input{ width: 100%; background: none; }
//     }
// }
    
.Return_reason{
    width: 100%; height: 2.02rem; background-color: white; margin-top: 0.3rem; display: flex; padding: 0 0.4rem; line-height: 0.6rem;
    div{ height: 100%; padding-top: 0.1rem; color:rgba(128,128,128,1); .font2; }
    div:nth-child(1){ width: 35%; color:rgba(43,43,43,1); .font1; }
    img{ width: 0.27rem; height: 0.27rem; margin-right: 0.35rem; }
    .Return_reason_{ color:rgba(43,43,43,1); .font1; }
}

.Return_credentials{
    width: 100%; height: 2.56rem; background-color: white; margin-top: 0.3rem; display: flex; padding: 0 0.4rem; align-items: center;
    div:nth-child(1){ width: 16%; height: 2.1rem; color:rgba(43,43,43,1); .font1; p{ color: #EA1616; font-size: 0.24rem; .font2; line-height: 0.6rem; } }
    .Return_credentials_img{
        width: 5.48rem; height:1.96rem; border:1px dashed rgba(206,206,206,1); display: flex; align-items: center;
        div{ 
            width: 1.56rem; height: 1.56rem; background:rgba(232,232,232,1); position: relative; text-align: center; line-height: 1.56rem; margin-left: 0.2rem;
            img{ width: 100%; height: 100%; }
            .uploaders{ width: 0.48rem; height: 0.42rem; }
            .Return_uploader{ position: absolute; top: 0; left: 0; opacity: 0; }
            .Return_delete{ width: 0.3rem; height: 0.3rem; position: absolute; top: -0.1rem; right: -0.1rem; }
        }
    }
}

.Return_fotter{
    width: 4rem; height: 0.96rem; margin: 1rem auto; background:rgba(206,206,206,1); border-radius: 0.1rem; text-align: center; line-height: 0.96rem;
    color:rgba(254,254,254,1); .font1; font-size: 0.36rem;
}
.isResult{ background:rgba(255,139,75,1); }

</style>


