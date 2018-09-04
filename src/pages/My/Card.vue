<template>
    <div id="card">
        <!--<header-item>会员卡</header-item>-->

        <div v-if="user.wtCustomer" class="card">
            <div v-if="user.wtCustomer.phonenumber" class="card_vip">
                <img class="vipend" src="../../assets/img/vipend.png" alt="">
                <img class="qrcode" @click="qrcodes" src="../../assets/img/qrcode.png" alt="">
                <div class="step">
                    <p><span>会员等级</span><span>{{user.card[0].name}}</span></p>
                    <div><span :class="{ isyezhu: user.card[0].name === '黑金会员' }"></span><span></span><span :class="{ isyezhu1: user.card[0].name === '黑金会员' }"></span></div>
                    <div><span>普通会员</span><span>黑金会员</span></div>
                </div>
                <div class="code"><span>NO：{{user.wtCustomer.cardno}}</span></div>
            </div>
        </div>

        <div class="Card_list">
            <van-row type="flex" class="Card_list_">
                <van-col span="12" v-for="(item,index) in list" :key="index"><p @click="change_list(index)" :class="{Card_color:listIbdex == index}">{{item}}</p><div :class="{Card_xian:listIbdex == index}"></div></van-col>
            </van-row>
            <div class="Card_html" v-html="htmls"></div>
        </div>

        <van-popup class="QR" v-model="show"><div class="QR_codes"><p>会员码</p><div id="qrcode"></div></div></van-popup>

    </div>
</template>

<script>
// import header from '../../components/header'
export default {
    data() {
        return {
            show:false,isCode:true, list:['会员权益','使用说明'],listIbdex:0
        }
    },
    components: {
        // 'header-item': header
    },
    computed:{
        user(){
            if(this.$store.state.user == ''){
                this.$store.commit('USER')
            }
            this.$store.commit('HTML', this.$store.state.user.card[0].equity)
            return this.$store.state.user
        },
        htmls(){
            return this.$store.getters.htmls
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '会员卡'
    },
    methods:{
        qrcodes() {
            this.show = !this.show
            if(this.isCode){
                this.$nextTick(()=>{
                    var qrcode = new QRCode(document.getElementById("qrcode"), {
                        width: 200, height: 200
                    })
                    function makeCode(e) { qrcode.makeCode(e) }
                    makeCode(this.user.wtCustomer.cardno)
                })
                this.isCode = false
            }
        },
        change_list(index){
            this.listIbdex = index
            if(index == 0){
                this.$store.commit('HTML', this.user.card[0].equity)
            }else{
                this.$store.commit('HTML', this.user.card[0].regulations)
            }
        },
    }
}
</script>

<style lang="less" scoped>
    #card{
        width: 100%; height: 100%; font-size: 0.3rem; background-color: white;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    .card{
        width: 100%; height: 4.45rem; padding: 0.48rem 0; background-color: #e8e8e8;
        .card_vip{
            width: 6.71rem; height: 3.95rem; margin-left: 0.4rem; position: relative;
            .vipend{
                width: 100%; height: 100%; position: absolute; top: 0; left: 0;
            }
            .qrcode{
                width: 0.8rem; height: 0.8rem; position: absolute; top: 0; right: 0;
            }
            .code{ 
                width: 100%; height: 0.8rem; line-height: 0.8rem; position: absolute; bottom: 0.23rem; left: 0; text-align: center; 
                .font1; font-size: 0.35rem;
            }
        }
        .card_vips{
            width: calc(100% - 0.8rem); height: 3.95rem; margin-left: 0.4rem; margin-top: 0.55rem; position: relative;
            .vipend{
                width: 100%; height: 100%; position: absolute; top: 0; left: 0;
            }
            .register{ 
                width: 100%; height: 0.8rem; line-height: 0.8rem; position: absolute; bottom: 0.23rem; left: 0; text-align: center; 
                .font1; font-size: 0.35rem; text-decoration: underline; z-index: 11;
                a{ color: black; }
            }
        }
    }

    .Card_list{
        width: 100%; background: url('../../assets/img/listbac.png') no-repeat; background-size: 100% 6.5rem; 
        z-index: 10; position: relative; padding: 1.2rem 0; margin-top: -0.85rem;
        .Card_list_{ 
            text-align: center; height: 0.54rem; border-bottom: 0.01rem solid rgba(206,206,206,1); line-height: 0.5rem;
            .Card_xian{ width: 0.52rem; height: 0.04rem; background-color: #ff8b4b; margin: 0 auto; }
            .Card_color{ color:#ff8b4b; }
        }
        .Card_html{
            width: 100%; padding: 0.48rem 0.4rem;
        }
    }


.QR{ border-radius: 0.3rem;}
.QR_codes{
    padding: 0.3rem 0.6rem 0.5rem 0.6rem; background-color: white; text-align: center; font-size: 0.36rem; border-radius: 0.3rem; font-weight: bold;
    p{ margin-bottom: 0.2rem; }
}

.step{
    width: 100%; height: 1.3rem; position: absolute; bottom: 1rem; left: 0; padding-left: 0.6rem; .font1;
            p{
                display: inline-block; width: 100%; height: 0.3rem; font-size: 0.24rem; line-height: 0.3rem; margin-bottom: 0.15rem; 
                span:nth-child(2){
                    font-family:PingFang-SC-Medium; color:#ff8b4b; margin-left: 3vw; .font3;
                }
            }
            div:nth-child(2){
                width: 90%; height: 0.04rem; padding:0; display: flex;
                span{ display: inline-block;}
                span:nth-child(1){
                    width: 33%; height: 100%; background-color: RGBA(255, 139, 75, 1);
                }            
                span:nth-child(2){
                    width: 0.08rem; height: 0.08rem; border-radius: 50%; background-color: RGBA(255, 139, 75, 1); position: relative; top: -0.02rem;
                }            
                span:nth-child(3){
                    width: 100%; height: 0.02rem; background-color: RGBA(255, 139, 75, 1); position: relative; top: 0.012rem;
                }  
                .isyezhu{ width: 100%!important; }     
                .isyezhu1{ width: 0!important; }       
            }
            div:nth-child(3){
                width: 90%; height: 0.3rem; padding:0; font-size: 0.2rem; line-height: 0.3rem; color:rgba(128,128,128,1); margin-top: 0.15rem;
                span:nth-child(1){
                    float: left;
                }            
                span:nth-child(2){
                    float: right;
                }           
            }
}
    
</style>


