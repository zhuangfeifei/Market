<template>
    <div id="GroupPurchaseOrderDetils">

        <nav>
            <p>订单状态：<span v-if="order.order_status == '0'">待付款</span><span v-else>交易完成</span></p>
            <p v-if="order.order_status == '0'" class="tip">请在下单后及时付款</p>
            <p v-if="order.order_status == '1' && order.verification_status != '1'" class="tip">您已交易成功，请尽快到门店使用</p>
            <p v-if="order.verification_status == '1'" class="tip">订单已使用</p>
        </nav>

        <div v-if="order != '' && user != ''" class="GroupPurchaseOrderDetils">
            <div class="GroupPurchaseOrderDetils_list">
                <div class="GroupPurchaseOrderDetils_content">
                    <div class="GroupPurchaseOrderDetils_content_logo"><img :src="imgUrlGoods + order.thumbnail_pic" alt=""></div>
                    <div class="GroupPurchaseOrderDetils_content_">
                        <p>{{order.group_name}}</p>
                        <p>数量：{{order.num}}</p>
                        <p>实付款：{{order.amount}}元</p>
                    </div>
                </div>
                <div class="GroupPurchaseOrderDetils_date"><span>有效期</span><span v-if="order.period_validity == 0">长期有效</span><span v-else>{{order.start_time}} 至 {{order.end_time}}</span></div>
                <div class="GroupPurchaseOrderDetils_shop"><span>适用商家</span><span>{{order.shopName}}</span></div>
            </div>
            <div class="GroupPurchaseOrderDetils_list_s">
                <div class="GroupPurchaseOrderDetils_list_"><span>订单编号</span><span>{{order.order_num}}</span></div>
                <div class="GroupPurchaseOrderDetils_list_"><span>下单时间</span><span>{{order.order_time}}</span></div>
                <div class="GroupPurchaseOrderDetils_list_"><span>订单金额</span><span class="amount">¥{{order.amount}}</span></div>
                <div v-if="order.order_status != '1'" class="GroupPurchaseOrderDetils_list_">
                    <span>当前余额 ( ¥{{checke_show ? user.wtCustomer.amount : user.wtCustomer.amount > order.amount ? (user.wtCustomer.amount - order.amount).toFixed(2) : 0 }} )</span>
                    <img @click="change" class="Pay_checke" :src="checke_show ? img[0] : img[1]" alt=""><span @click="change" class="Pay_status">{{user.wtCustomer.amount > 0 ? '可用' : '不可用'}}</span>
                </div>
                <div v-if="order.order_status != '1'" class="GroupPurchaseOrderDetils_list_"><span>实际付款</span><span class="amount">¥{{ checke_show ? order.amount : user.wtCustomer.amount > order.amount ? 0 : (order.amount - user.wtCustomer.amount).toFixed(2) }}</span></div>
            </div>
            <div v-if="order.order_status == '1'" class="GroupPurchaseOrderDetils_code">
                <div><span>兑换码</span><div><span>{{order.coupon_code}}</span><img v-if="order.verification_status == '1'" src="../../assets/img/fork.png" alt=""></div></div>
                <section><img :src="imgUrl + order.coupon_path" alt=""><img v-if="order.verification_status == '1'" src="../../assets/img/used.png" alt=""></section>
            </div>
        </div>


        <div v-if="order.order_status == '0'" class="GroupPurchaseOrderDetils_footer">
            <div @click="cancel">取消订单</div><div @click="isPay">确认付款</div>
        </div>

        <pay-item v-if="isPays" :isWx="checke_show"></pay-item>
        
    </div>
</template>

<script>
import Pay from '@/components/Pay'
export default {
    data() {
        return {
            active: 0, title:['全部','待付款','已完成'], data:'1',
            img:[require('../../assets/img/checke.png'),require('../../assets/img/checked.png')],
            checke_show:true,
            status:[require('../../assets/img/notUsed.png'),require('../../assets/img/Undue.png'),require('../../assets/img/Expired.png')],
            list:{ limit:5, current:1, isPage: false, tabIndex: 0 },order_id:''
        }
    },
    components: {
        'pay-item': Pay
    },
    beforeCreate(){
        var list = { orderIds: this.$route.query.order_id, status: 1 }
        this.$store.dispatch('getHistoryGroupOrderDetail', list)
        this.$store.dispatch('user')
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
        imgUrlGoods(){
            return this.$store.state.imgUrlGoods
        },
        order(){
            return this.$store.state.order
        },
        user(){
            return this.$store.state.user
        },
        isPays(){
            return this.$store.state.isPay
        }
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '订单详情'

        this.order_id = this.$route.query.order_id


        this.$nextTick(()=>{
            if(this.order.order_status == '1' && this.order.verification_status != '1'){
                this.$dialog.confirm({
                    title: '提货热线！',
                    confirmButtonText:'拨打'
                }).then(() => {
                    window.location.href = 'tel:0512-66830887'
                }).catch(()=>{

                });
            }
        })
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        change(){
            this.user.wtCustomer.amount > 0 ? this.checke_show = !this.checke_show : ''
        },
        isPay(){
            if(!this.checke_show){
                // if(this.user.wtCustomer.amount < this.order.amount){
                //     this.$dialog.alert({
                //         title: '余额不足！',
                //     }).then(() => {
                        
                //     })
                //     return
                // }
                if(this.user.wtCustomer.payPassword == '' || this.user.wtCustomer.payPassword == null){
                    this.$dialog.confirm({
                        title: '您还没有设置密码！',
                        confirmButtonText:'去设置'
                    }).then(() => {
                        this.$router.push({path:'/Setpassword'})
                    }).catch(()=>{

                    });
                    return
                }
            }
            this.$store.commit('SET_PAY', true)
        },
        cancel(){
            this.$store.dispatch('cancelOrder', this.order_id)
        }
    },
}
</script>

<style lang="less" scoped>
    #GroupPurchaseOrderDetils{
        width: 100%; min-height: 100vh; background:rgba(232,232,232,1); font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    nav{
        width: 100%; height: 1.68rem; background: url("../../assets/img/status.png") no-repeat; background-size: 100% 100%;
        color: white; padding-left: 0.64rem; padding-top: 0.4rem; .font1;
        .tip{ font-size: 0.24rem; color: rgba(255,254,254,1); opacity: 0.8; .font2; line-height: 0.5rem; }
    }


    .nos{
        width: 100%; height: 100%; padding-top: 2rem; text-align: center; .font2; color:rgba(43,43,43,1);
        img{ width: 3rem; height: 3rem; margin-bottom: 0.6rem; }
    }


    .GroupPurchaseOrderDetils{
        width: 100%;
        .GroupPurchaseOrderDetils_list{
            width: 100%; height: 3.58rem; background-color: white; margin: 0.2rem 0; padding: 0 0.4rem;
            .GroupPurchaseOrderDetils_num{
                width: 100%; height: 0.63rem; line-height: 0.63rem; font-size: 0.24rem; .font1; color:rgba(43,43,43,1);
                span:nth-child(2){ float: right; color:rgba(255,139,75,1); }
            }
            .GroupPurchaseOrderDetils_content{
                width: 100%; height: 1.8rem; display: flex; padding: 0.3rem 0;
                .GroupPurchaseOrderDetils_content_logo{
                    width: 1.2rem; height: 1.2rem;
                    img{ width: 100%; height: 100%; border-radius: 0.1rem; }
                }
                .GroupPurchaseOrderDetils_content_{
                    width: calc(100% - 0.49rem - 0.8rem); height: 100%; margin-left: 0.49rem; margin-top: -0.08rem;
                    p:nth-child(1){ 
                        overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; 
                        color:rgba(43,43,43,1); .font3;
                    }
                    p:nth-child(2){ 
                        color:rgba(128,128,128,1); font-size: 0.24rem; line-height: 0.4rem; .font2;
                    }
                    p:nth-child(2){ 
                        color:rgba(75,75,75,1); .font2; font-size: 0.28rem;
                    }
                }
            }
            .GroupPurchaseOrderDetils_date,.GroupPurchaseOrderDetils_shop{
                width: 100%; height: 0.88rem; line-height: 0.88rem; .font1;
                border-top: 0.02rem dashed rgba(206,206,206,1); border-bottom: 0.02rem dashed rgba(206,206,206,1);
                span:nth-child(2){ color: rgba(75,75,75,1); font-size: 0.28rem; margin-left: 0.7rem; .font2; }
            }
            .GroupPurchaseOrderDetils_shop{ border: 0; span:nth-child(2){ margin-left: 0.45rem; } }
        }
        .GroupPurchaseOrderDetils_list_s{
            width: 100%; background-color: white; padding: 0 0.4rem;
            .GroupPurchaseOrderDetils_list_{
                width: 100%; height: 0.88rem; line-height: 0.88rem; .font1;
                span:nth-child(2){ color: rgba(75,75,75,1); font-size: 0.28rem; margin-left: 0.51rem; .font2; }
            }
            & div{  border-bottom: 0.02rem dashed rgba(206,206,206,1); }
            & div:last-child{ border: 0; }
            .amount{ color: rgba(234,22,22,1)!important; font-size: 0.36rem!important; .font1!important; }
            .Pay_checke{ width: 0.3rem; height: 0.3rem; float: right; margin: 0.28rem 0.1rem 0 0.1rem; }
            .Pay_status{ float: right; color: rgba(75,75,75,1); font-size: 0.28rem; .font2; }
        }
        .GroupPurchaseOrderDetils_code{
            width: 100%; height: 5.5rem; padding: 0.2rem 0.4rem; background-color: white; margin-top: 0.2rem; position: relative;
            div:nth-child(1){ 
                width: 100%; height: 0.88rem; line-height: 0.88rem; .font1; display: flex;
                div{ margin-left: 0.81rem; .font3; font-size: 0.36rem; position: relative; } 
                img{ width: 1.97rem; height: 0.4rem; position: absolute; top: 0.2rem; left: 0; }
            }
            section{ 
                width: 100%; text-align: center; margin-top: 0.1rem;
                img{ width: 3.1rem; height: 3.1rem; }
                img:nth-child(2){ width: 2.42rem; height: 1.63rem; position: absolute; right: 0.1rem; top: 0; }
            }
        }
    }


    .GroupPurchaseOrderDetils_footer{
        width: 100%; height: 0.98rem; font-size: 0.28rem; .font3; padding-right: 0.4rem;
        position: fixed; bottom: 0; left: 0; background-color: white; border-top: 0.01rem solid rgba(255,139,75,1);
        div{ 
            width: 1.6rem; height: 0.6rem; line-height: 0.6rem; text-align: center; margin-top: 0.17rem;
            float: right; border-radius: 0.3rem; border: 0.02rem solid rgba(43,43,43,1); 
        }
        div:nth-child(2){ border: 0.02rem solid rgba(255,139,75,1); margin-right: 0.3rem; color: rgba(255,139,75,1); }
    }
    
</style>


