<template>
    <div id="card">
        <header-item>会员卡</header-item>

        <div class="card">
            <div class="integral">
                <img src="../assets/img/integrals.png" alt=""><span>积分</span><span>0</span><span>查看更多 ></span>
            </div>
            <div class="card_vip">
                <img class="vipend" src="../assets/img/vipend.png" alt="">
                <img class="qrcode" src="../assets/img/qrcode.png" alt="">
                <div class="code"><span>NO：12356165</span></div>
            </div>
        </div>

        <div class="list">
            <div></div>
        </div>

    </div>
</template>

<script>
import header from '../components/header'
export default {
    data() {
        return {
            
        }
    },
    components: {
        'header-item': header
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

    },
    methods:{
        
    }
}
</script>

<style lang="less" scoped>
    #card{
        width: 100%; height: 100vh; background-color: white; padding-top: 1rem; font-size: 0.3rem;
    }

    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }

    .card{
        width: 100%; height: 5.41rem; padding-top: 0.53rem; background-color: #e8e8e8;
        .integral{
            width: 100%; height: 0.38rem; line-height: 0.38rem; padding: 0 0.4rem; 
            color:rgba(43,43,43,1); .font1;
            img{ width: 0.38rem; height: 0.38rem; margin-right: 0.2rem; float: left; }
            span:nth-child(2){ float: left; }
            span:nth-child(3){ margin-left: 0.48rem; color: #EA1616; font-size: 0.36rem; float: left; }
            span:nth-child(4){ font-size: 0.24rem; .font2; float: right;}
        }
        .card_vip{
            width: calc(100% - 0.8rem); height: 3.95rem; margin-left: 0.4rem; margin-top: 0.55rem; position: relative;
            .vipend{
                width: 100%; height: 100%; position: absolute; top: 0; left: 0;
            }
            .qrcode{
                width: 0.5rem; height: 0.5rem; position: absolute; top: 0.43rem; right: 0.5rem;
            }
            .code{ 
                width: 100%; height: 0.8rem; line-height: 0.8rem; position: absolute; bottom: 0.23rem; left: 0; text-align: center; 
                .font1; font-size: 0.35rem;
            }
        }
    }

    .list{
        width: 100%; height: 6rem; background: url('../assets/img/listbac.png') no-repeat; background-size: 100% 100%;
        z-index: 10; position: relative; top: -0.8rem; padding: 1rem 0.4rem;
        // border: 1px solid red;
        div{
            
        } 
    }
    
</style>


