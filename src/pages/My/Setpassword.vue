<template>
    <div id="Setup">

        <div class="liu">
            <p>请输入密码</p>
            <div class="ge">
                <input type="password" v-model="mm" maxlength = "6">
                <div class="ge1">
                    <div><span v-show="mm.length > 0">●</span></div>
                    <div><span v-show="mm.length > 1">●</span></div>
                    <div><span v-show="mm.length > 2">●</span></div>
                    <div><span v-show="mm.length > 3">●</span></div>
                    <div><span v-show="mm.length > 4">●</span></div>
                    <div><span v-show="mm.length > 5">●</span></div>
                </div>
            </div>
            <p>请再次输入密码</p>
            <div class="ge">
                <input id="password" v-model="mm1" type="password" maxlength = "6">
                <div class="ge1">
                    <div><span v-show="mm1.length > 0">●</span></div>
                    <div><span v-show="mm1.length > 1">●</span></div>
                    <div><span v-show="mm1.length > 2">●</span></div>
                    <div><span v-show="mm1.length > 3">●</span></div>
                    <div><span v-show="mm1.length > 4">●</span></div>
                    <div><span v-show="mm1.length > 5">●</span></div>
                </div>
            </div>
        </div>
        <button @click="set" type="button" class="btn">确认</button>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            mm:'',mm1:''
        }
    },
    components: {
        
    },
    beforeCreate(){
        
    },
    computed:{
        
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '支付密码'
        
    },
    methods:{
        set() {
            if(this.isNumber(this.mm1)){
                if(this.mm === this.mm1){
                    this.$store.dispatch('paypwd', this.mm1)
                }else{
                    this.$dialog.alert({
                        title: '两次输入的密码不一致!',
                        message: '',
                        confirmButtonText: '关闭'
                    }).then(() => {
                        
                    })
                }
            }else{
                this.$dialog.alert({
                    title: '密码必须为数字!',
                    message: '',
                    confirmButtonText: '关闭'
                }).then(() => {
                        
                })
            }
            // if ($(':password')[0].value != $(':password')[1].value) {
            //     this.$dialog.alert({
            //         title: '两次输入的密码不一致!',
            //         message: '',
            //         confirmButtonText: '关闭'
            //     }).then(() => {
            //     // on close
            //     });
            // }
        },
        isNumber(val) {
            var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if(regPos.test(val) || regNeg.test(val)) {
                return true;
            } else {
                return false;
            }
        }
    },
}
</script>

<style lang="less" scoped>
    #Setup{
        width: 100%; background-color: white; font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }

    
    /**/
.liu{
    width: 100%; margin-top: 3vw;
    font-size: 4vw; text-align: center;
}
.liu p{
    font-size: 4.5vw; margin-top: 5vw; clear: both;
}
input{
    width: 100%; height: 100%; font-size: 6vw; letter-spacing: 6.5vw;
    border: 0; background: none; position: absolute; top: 0; left: 0;
    opacity: 0;
    /*color:transparent;*/
    /*caret-color:rgba(0, 0, 0, 0);*/
    /*改变光标颜色*/
}

a:focus{
    outline: none;
}

.btn{
    outline: none!important; margin-top: 10vw;
    width: 60%; height: 12vw; border-radius: 1vw; border: 0.02rem solid black;
    margin-left: 20%; font-size: 4.6vw; background-color: white;
}


.ge{
    width: 60vw; height: 10vw; margin: 5vw auto; position: relative; 
}
.ge1{
    width: 100%; height: 100%; font-size: 7vw; font-weight: 600;
}
.ge1>div{
    width: 10vw; height: 100%; border: 0.3vw solid gainsboro; float: left; border-right: 0; text-align: center; line-height: 10vw;
}
.ge1>div:nth-child(6){
    border-right: 0.3vw solid gainsboro;
}
    
</style>


