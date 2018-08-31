<template>
	
    <div class="yuyue">
        <!--<header-item>会员中心</header-item>-->
        
        <div v-if="user" class="Membership_main">
            <section><img :src="user.avatar" alt=""></section>
            <div class="main">
                <span>会员卡号</span><span>{{user.cardno}}</span>
            </div>
            <div class="main">
                <span>昵称</span><span>{{user.nickname}}</span>
            </div>
            <div class="main_input">
                <span>真实姓名</span><input type="text" v-model="list.name" placeholder="请输入真实姓名">
            </div>
            <div class="main">
                <span>手机号</span><span>{{user.phonenumber}}</span>
            </div>
            <div class="main_input_data">
                <span>出生年月</span>
                <datetime @on-change="change" class="date" :title="''" v-model="list.birthday" :min-year="min" :max-year="max"></datetime>
                <img src="../../assets/img/Mores.png" alt="">
            </div>
            <div class="main_inputs" @click="sexChange">
                <div>性别</div><div><span>{{sex}}</span><img src="../../assets/img/Mores.png" alt=""></div>
            </div>
            <!--<router-link to="/Address">
                <div class="main_add">
                    <div>收货地址</div><img src="../../assets/img/Mores.png" alt="">
                </div>
            </router-link>-->
            <button class="Preservation" @click="Preservation">保存</button>
        </div>

        <actionsheet
      v-model="sexChecked"
      :menus="menus"
      @on-click-menu="sex_click"></actionsheet>

      

    </div>

</template>

<script>
import { Calendar,Datetime } from 'vux'
import { TransferDom, Actionsheet, Group, XSwitch, Toast } from 'vux'
import header from '../../components/header'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                sexChecked:false, 
                menus:['保密','男','女'], min:1950, max:2018,integral:'',
                list:{ name:'', sex:'', birthday:'' }, sex:''
            }
        },
        components: {
            'header-item': header,
            Calendar,Actionsheet,
            Group,
            XSwitch,
            Toast,Datetime
        },
        directives: {
            TransferDom
        },
        computed:{
            user(){
                if(this.$store.state.user == ''){
                    this.$store.commit('USER')
                }
                return this.$store.state.user.wtCustomer
            },
        },
        created(){
            document.title = '会员信息'

            this.$nextTick(() => {
                this.list.name = this.user.name
                this.list.birthday = this.user.birthday != '' ? this.user.birthday.substring(0,10) : ''
                this.list.sex = this.user.sex
                this.sex = this.menus[this.user.sex]
            })
        },
        methods: {
            change (value) {
                this.birthday = value
            },
            onChange (val) {
                // console.log('on change', val)
            },
            sexChange(){
                this.sexChecked = !this.sexChecked
            },
            sex_click (key) {
                this.sex = this.menus[key]
                this.list.sex = key
            },
            Preservation(){
                this.$store.dispatch('editUserInfo', this.list)
            }
        }
	}
</script>

<style lang="less" scoped>
.yuyue{
    width: 100%; font-size: 0.3rem;
}

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }


.Membership_main{
    width: 6.7rem; margin: 0 auto; font-size: 0.28rem; .font1;
    section{
        width: 1.4rem; height: 1.4rem; margin: 0.64rem auto;
        img{ width: 100%; height: 100%; border-radius: 50%; }
    }
    & div{
        width: 100%; height: 0.86rem; border-top: 0.01rem solid rgba(206,206,206,1); line-height: 0.86rem;
    }
    .main{
        & span:nth-child(1){ float: left; font-size: 0.28rem; color:rgba(43,43,43,1); .font1; }
        & span:nth-child(2){ float: right; color:rgba(255,139,75,1); .font2; }
    }
    .main_input{
        & span:nth-child(1){ float: left; font-size: 0.28rem; color:rgba(43,43,43,1); .font1; }
        input{
            text-align: right; width: 60%; height: 100%; border: 0; outline: none!important; color: rgba(255,139,75,1); float: right;
        }
        input:-moz-placeholder{
            color: rgba(255,139,75,1); .font2;
        }
        ::-webkit-input-placeholder{
            color: rgba(255,139,75,1); .font2;
        }
        img{ float: right; }
    }
    .main_input_data{
        display: flex; justify-content: space-between;
        span{ display: inline-block; width: 25%; }
        .date{
            width: calc(75% - 0.26rem); height: 0.86rem; border: 0!important; display: flex; text-align: right; .font2; 
        }
        img{ width: 0.16rem; height: 0.29rem; position: relative; top: 0.27rem; margin-left: 0.1rem; }
    }
    .main_inputs{
        display: flex; justify-content: space-between; border-bottom: 0.01rem solid rgba(206,206,206,1);
        & div:nth-child(2){
            text-align: right; .font2;
            img{ width: 0.16rem; height: 0.29rem; position: relative; top: 0.07rem; margin-left: 0.1rem; }
        }
    }
    .main_add{
        border-bottom: 0.01rem solid rgba(206,206,206,1);
        & div{ float: left; width: 50%; }
        img{ float: right; width: 0.16rem; height: 0.29rem; position: relative; top: 0.3rem; margin-left: 0.1rem; }
    }
    a{ color: black; }
}

.Preservation{ 
    width: 4rem; height: 0.96rem; margin: 1rem 0 0.5rem calc(50% - 2rem); background:rgba(255,139,75,1); border: 0; outline: none; 
    color: white; font-size: 0.36rem; border-radius: 0.1rem;
}


</style>