<template>
	
    <div id="Owner">

        <div class="Owner_main">
            <div class="Owner"><img src="../../assets/img/Owner.png" alt=""></div>
            <div class="Owner_class" @click="class_change"><span :class="{checked:show}">基础信息</span><span :class="{checked:!show}">商铺信息</span></div>
            <div class="Owner_bottom"><div :class="{back_color:show}"></div><div :class="{back_color:!show}"></div></div>
            <div v-if="basicinformation" class="Owner_information">
                <div v-if="show" class="Owner_information_Basics">
                    <van-row class="Owner_information_Basics_">
                        <van-col span="8">业主姓名</van-col><van-col span="16"><span>{{basicinformation.wtCustomer.name}}</span></van-col>
                    </van-row>
                    <van-row class="Owner_information_Basics_">
                        <van-col span="8">联系方式</van-col><van-col span="16"><span>{{basicinformation.wtCustomer.phonenumber}}</span></van-col>
                    </van-row>
                    <van-row class="Owner_information_Basics_">
                        <van-col span="8">证件类型</van-col><van-col span="16"><span>{{documentType[basicinformation.wtCustomer.identType]}}</span></van-col>
                    </van-row>
                    <van-row class="Owner_information_Basics_">
                        <van-col span="8">证件号</van-col><van-col span="16"><span>{{basicinformation.wtCustomer.identnumber}}</span></van-col>
                    </van-row>
                    <van-row class="Owner_information_Basics_">
                        <van-col span="8">权益人</van-col><van-col span="16"><span class="isOwner">{{basicinformation.wtCustomer.isRepresentative == 1 ? '是' : '否'}}</span></van-col>
                    </van-row>
                </div>
                <div v-else class="Owner_information_shops">
                    <div class="Owner_information_shops_list" v-for="(item,index) in basicinformation.isInterestsList" :key="index">
                        <van-row class="Owner_information_shops_list_">
                            <van-col span="12" ><h4>{{item.shopsnumber}}</h4><p>{{item.proname}}{{item.tubeposition}}-F{{item.floors}} &nbsp;{{item.area}}m2</p></van-col>
                            <van-col span="12">
                                <div>
                                    <img v-if="item.issign == '已签约'" src="../../assets/img/signed.png" alt="">
                                    <img v-if="item.issign == '未签约'" src="../../assets/img/nosign.png" alt="">
                                    <img v-if="item.issign == '签约不通过'" src="../../assets/img/Notthrough.png" alt="">
                                    <img v-if="item.isnetsign == '未网签'" src="../../assets/img/Certificate.png" alt="">
                                    <img v-if="item.isnetsign == '已办证'" src="../../assets/img/Certificated.png" alt="">
                                    <img v-if="item.isnetsign == '已网签未办证'" src="../../assets/img/Certificates.png" alt="">
                                    <img v-if="item.isnetsign == '其他'" src="../../assets/img/Other.png" alt="">
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>
        </div>
        
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                show:true, list: { current: 1, limit: 5, isPage: false }
            }
        },
        components: {
            
        },
        beforeCreate(){
            // 获取不到data属性
            this.$store.dispatch('basicinformation')
            this.$store.dispatch('documentType')
        },
        computed:{
            basicinformation(){
                return this.$store.state.basicinformation
            },
            documentType(){
                let list = []
                for(let val of this.$store.state.documentType){
                    list.push(val.name)
                }
                return list
            },
        },
        created(){
            document.title = '业主信息'
        },
        methods: {
            class_change(){
                this.show = !this.show
            },
        },
	}
</script>

<style lang="less" scoped>
#Owner{
    width: 100%; font-size: 0.3rem; overflow: hidden;
}

*{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }


/**/
.Owner_main{
    width: 100%;
    .font1{font-family:PingFang-SC-Medium; font-weight: Medium;}
    .font2{font-family:PingFang-SC-Regular; font-weight: Regular;}
    .Owner{
        width: 100%; height: 4rem;
        img{ width: 100%; height: 100%; }
    }
    .class{width: 100%; display: flex; justify-content: space-around;}
    .Owner_class{
        height: 0.76rem; line-height: 0.76rem; .class; .font1;
    }
    .Owner_bottom{
        height: 0.04rem; .class; font-size: 0.28rem;
        div{ width: 0.52rem; height: 100%; }
        .back_color{ background-color: rgba(255,139,75,1); }
    }
    .checked{
        color:rgba(255,139,75,1);
    }

    .Owner_information{
        width: 100%; border-top: 0.2rem solid gainsboro; padding: 0 0.4rem; .font1;
        .Owner_information_Basics{
            width: 100%;
            .Owner_information_Basics_{
                height: 0.88rem; border-bottom: 0.01rem solid gainsboro; line-height: 0.88rem;
                span{ .font2; }
                .isOwner{ color: rgba(234,22,22,1); }
            }
        }
        .Owner_information_shops{
            width: 100%;
            .Owner_information_shops_list{
                width: 100%; height: 1.73rem; border-bottom: 0.01rem solid gainsboro; .font2; color:rgba(75,75,75,1); padding-top: 0.4rem;
                h4{ font-size: 0.36rem; .font3; color:rgba(43,43,43,1); }
                .Owner_information_shops_list_ img{ min-width: 0.89rem; height: 0.43rem; float: right; margin-left: 0.2rem; }
            }
        }
    }
}

</style>