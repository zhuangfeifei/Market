<template>
	
    <div id="Logistics">
        
        <div class="Logistics">
            <section><img src="../../assets/my/default.png" alt=""></section>
            <div>
                <!-- <h5>已签收</h5> -->
                <p>{{CommonOrderDetail.delivername}}：{{CommonOrderDetail.deliverno}}</p>
                <span>客服电话：</span>
            </div>
        </div>
       
        <div class="Logistics_vertical">
            <van-steps direction="vertical" :active="0" active-color="#f44">
                <van-step v-for="(item,index) in getDeliverInfo" :key="index">
                    <h3>{{item.status}}</h3>
                    <p>{{item.time}}</p>
                </van-step>
            </van-steps>
        </div>
       
    </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            Data:'',show:true
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('getDeliverInfo', this.$route.query.deliverno)
    },
    computed:{
        ...mapState({
            imgUrlGoods: state => state.imgUrlGoods,
            CommonOrderDetail: state => state.CommonOrderDetail,
            getDeliverInfo: state => state.getDeliverInfo,
        }),
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '查看物流'

    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
#Logistics{
    width: 100%; font-size: 0.3rem; background:rgba(246,246,246,1);
}

*{
    box-sizing: border-box;
}


/**/
.font1{font-family:PingFang-SC-Medium; font-weight: Medium;}
.font2{font-family:PingFang-SC-Regular; font-weight: Regular;}

.Logistics{
    width: 100%; height: 2rem; background-color: white; display: flex; align-items: center; padding-left: 0.3rem;
    section{
        width: 1.4rem; height: 1.4rem; 
        // border: 1px solid lightblue;
        img{ width: 100%; height: 100%; }
    }
    div{
        width: calc(100% - 1.7rem); height: 1rem; padding-left: 0.24rem; font-size: 0.24rem; color: #4B4B4B; .font1;
        h5{
            color: #EA1616; .font1; font-size: 0.3rem; line-height: 0.6rem;
        }
    }
}

.Logistics_vertical{
    width: 100%; height: 100%; background-color: white; margin-top: 0.2rem; padding-left: 0.2rem;
}


</style>