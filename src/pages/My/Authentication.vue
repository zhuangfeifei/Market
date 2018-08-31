<template>
	
    <div id="Authentication">
        
        <div v-if="user" class="Authentication_main">
            <section><img :src="user.avatar" alt=""></section>
            <van-row class="Authentication">
                <van-col span="7"><h4>业主姓名</h4></van-col><van-col span="17"><input type="text" v-model="list.name" placeholder="请输入姓名"></van-col>
            </van-row>
            <van-row class="Authentication Authentication_class">
                <van-col span="7"><h4>证件类型</h4></van-col><van-col span="17"><p @click="isShow"><span>{{documentType[list.identType] || '请选择证件类型'}}</span><img src="../../assets/img/yishoujiantou.png" alt=""></p></van-col>
            </van-row>
            <van-row class="Authentication">
                <van-col span="7"><h4>证件号</h4></van-col><van-col span="17"><input type="text" v-model="list.identNumber" placeholder="请输入购买商铺登记的证件号"></van-col>
            </van-row>
            <van-row class="files_img">
                <van-col span="7"><h5>拍照上传</h5></van-col>
                <van-col span="17">
                    <div class="files_img_list">
                        <div class="files_imgs" v-for="(item,index) in Item_img" :key="index">
                            <img :src="item" alt="">
                            <img @click="deletes(index)" class="delet" src="../../assets/img/deleteImg.png" alt="">
                        </div>
                        <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" :disabled="disabled">
                            <div class="files"></div>
                        </van-uploader>
                        <p class="files_tip">{{Item_img.length == 0 ? '请上传网签合同' : Item_img.length == 5 ? '最多上传5张' : ''}}</p>
                    </div>
                </van-col>
            </van-row>
            <div @click="Submission" class="files_btn" :class="{btned: isAuthentication}">提交</div>
        </div>

        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker class="Authentication_" show-toolbar title="证件类型" :columns="documentType" @cancel="onCancel" @confirm="onConfirm" 
                confirm-button-text="确定" :item-height="50"/>
        </van-popup>

        <van-popup v-model="success" class="Success">
            <div v-if="isGetAuthentication == 2">
                <p>认证中</p><p>请稍后</p><p>...</p>
            </div>
            <div v-if="isGetAuthentication == 1">
                <p>认证成功</p><p>{{num}}S</p><img @click="clearGo" src="../../assets/img/cleas.png" alt="">
            </div>
            <div v-if="isGetAuthentication == 0">
                <p>认证失败</p><img @click="clear" src="../../assets/img/agin.png" alt="">
            </div>
        </van-popup>


    </div>

</template>

<script>
import Util from '../../store/storage'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                show: false,
                Authentication:'', Item_img:[],Item_imgs:[], disabled:false,isAuthentication:false,
                list:{ name:'', identType:'', identNumber:'', contractPic:'' }, success: false, num:3
            }
        },
        beforeCreate(){
            this.$store.dispatch('documentType')
        },
        components: {
            
        },
        computed:{
            user(){
                if(this.$store.state.user == ''){
                    this.$store.commit('USER')
                }
                return this.$store.state.user.wtCustomer
            },
            documentType(){
                let list = []
                for(let val of this.$store.state.documentType){
                    list.push(val.name)
                }
                return list
            },
            isGetAuthentication(){
                return this.$store.state.isGetAuthentication
            }
        },
        created(){
            document.title = '业主验证'

            this.$store.commit('isGetAuthentication', 2)
        },
        methods: {
            isShow(){
                this.show = !this.show
            },
            onConfirm(value, index) {
                this.list.identType = index
                this.isShow()
            },
            onCancel() {
                this.isShow()
            },
            onRead(file) {
                this.Item_img.push(file.content)
                this.Item_imgs.push(file.file)
            },
            deletes(index){
                this.Item_img.splice(index,1)
                this.Item_imgs.splice(index,1)
            },
            Submission(){
                if(this.isAuthentication){
                    let formData = new FormData()
                    // formData.append('file', this.Item_imgs)         // 这是错的，不可以直接放在数组里，不然会取不到值
                    for(let val of this.Item_imgs){   
                        formData.append('file', val)
                    }
                    formData.append('access_type', 'WXH5')
                    formData.append('wxh', Util.getLocal('market_wxh'))
                    formData.append('openId', Util.getLocal('market_openId'))
                    formData.append('unionId', Util.getLocal('unionId'))
                    formData.append('ownerName', this.list.name)
                    formData.append('identNumber', this.list.identNumber)
                    formData.append('identType', this.list.identType)
                    this.list.contractPic = formData
                    this.success = true
                    this.$store.commit('isGetAuthentication', 1)
                    // this.$store.dispatch('ownerCertification', formData)
                }
            },
            clear(){
                this.success = false
            },
            clearGo(){
                this.$router.push({path:'/Owner'})
            }
        },
        watch:{
            Item_img(val,old){
                if(val.length > 4){
                    this.disabled = true
                }else{
                    this.disabled = false
                }
            },
            list:{
                handler(val,old){
                    val.name && val.identType >= 0 && val.identNumber ? this.isAuthentication = true : this.isAuthentication = false
                },
                deep: true
            },
            isGetAuthentication(val,old){
                if(val == 1){
                    let time = setInterval(()=>{
                        if(this.num == 0) {
                            clearInterval(time)
                            this.$router.push({path:'/Owner'})
                            return
                        }
                        this.num --
                    },1000)
                }
            }
        }
	}
</script>

<style lang="less" scoped>
#Authentication{
    width: 100%; font-size: 0.3rem; padding-bottom: 0.6rem;
}

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }


.Authentication_main{
    width: 100%; margin: 0 auto; font-size: 0.28rem; .font1; padding: 0 0.4rem;
    section{
        width: 1.4rem; height: 1.4rem; margin: 0.64rem auto;
        & img{ width: 100%; height: 100%; border-radius: 50%; }
    }
    .Authentication{
        height: 1.22rem; line-height: 1.22rem; border-top: 0.01rem solid rgba(206,206,206,1); 
        input{
            width: 100%; height: 100%; border: 0; outline: none!important; color: rgba(255,139,75,1); line-height: 0.5rem;
        }
        input:-moz-placeholder{
            color: rgba(255,139,75,1); .font2;
        }
        ::-webkit-input-placeholder{
            color: rgba(255,139,75,1); .font2;
        }
        h4::before{ content: '*'; margin-right: 0.1rem; color:rgba(234,22,22,1); }
        span{ color: rgba(255,139,75,1); .font2; }
        h5{ font-size: 0.28rem; margin-left: 0.3rem; }
    }
    .Authentication_class{
        & img{ width: 0.16rem; height: 0.29rem; float: right; margin-top: calc((1.22rem - 0.3rem)/2); }
    }
    .files_img{ 
        border-bottom: 0.01rem solid rgba(206,206,206,1); border-top: 0.01rem solid rgba(206,206,206,1); padding: 0.3rem 0 0.48rem 0;
        h5{ font-size: 0.28rem; margin-left: 0.3rem; margin-top: 0.1rem; }
        .files_img_list{ width: 100%; }
        .files_imgs{
            width: 1rem; height: 1rem; float: left; margin-right: 0.23rem; position: relative; margin-top: 0.2rem;
            img{width: 100%; height: 100%;} 
            .delet{
                width: 0.2rem; height: 0.2rem; position: absolute; right: -0.1rem; top: -0.1rem;
            }
        }
        .files_imgs:nth-child(4){
            margin-right: 0;
        }
        .files{
            width: 1rem; height: 1rem; float: left; margin-top: 0.2rem;
            background: url("../../assets/img/files.png") no-repeat; background-size: 100% 100%;
        }
        .files_tip{ color: rgba(255,139,75,1); .font2; float: right; line-height: 1.22rem; }
    }
    .files_btn{
        width: 100%; height: 0.96rem; background:gainsboro; color: white; font-size: 0.36rem; 
        text-align: center; line-height: 0.96rem; border-radius: 0.1rem; margin-top: 0.64rem;
    }
    .btned{
        background-color: rgba(255,139,75,1);
    }
}

.Authentication_{
    width: 100%;
}


.Success{
    width: 100vw; height: 100vh; background: none; text-align: center; color: white; .font1; font-size: 0.36rem;
    padding-top: 3rem; line-height: 0.48rem; letter-spacing: 0.1rem;
    img{ width: 4rem; height: 0.96rem; position: absolute; bottom: 2rem; left: 1.75rem; }
}





.Success p:nth-child(3) {
  -webkit-animation: loader 3s 600ms infinite ease-in-out;
  animation: loader 3s 600ms infinite ease-in-out;
}


@keyframes loader {
  0% {
    opacity: 0;
    transform: translateX(-1rem) scale(1);
  }
  33% {
    opacity: 1;
    transform: translateX(0px) scale(2);
  }
  66% {
    opacity: 1;
    transform: translateX(0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(1rem) scale(2);
  }
}
@-webkit-keyframes loader {
  0% {
    opacity: 0;
    transform: translateX(-1rem) scale(1);
  }
  33% {
    opacity: 1;
    transform: translateX(0px) scale(2);
  }
  66% {
    opacity: 1;
    transform: translateX(0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(1rem) scale(2);
  }
}



</style>