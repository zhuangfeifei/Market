<template>
    <div id="Discount">
        <!--<header-item>商场活动</header-item>-->

        <div v-if="show" class="Discount">
            <div class="Discount_list" @click="details">
                <img :src="images[1]" alt="">
                <div class="title">酱小七开业5.8折大促</div>
                <div class="state">进行中</div>
            </div>
            <div class="Discount_list">
                <img :src="images[1]" alt="">
                <div class="title">酱小七开业5.8折大促</div>
                <div class="state">进行中</div>
            </div>
            <div class="Discount_list">
                <img :src="images[1]" alt="">
                <div class="title">酱小七开业5.8折大促</div>
                <div class="state">进行中</div>
            </div>
            <div class="Discount_list">
                <img :src="images[1]" alt="">
                <div class="title">酱小七开业5.8折大促</div>
                <div class="state">进行中</div>
            </div>
            <div class="Discount_list">
                <img :src="images[1]" alt="">
                <div class="title">酱小七开业5.8折大促</div>
                <div class="state">进行中</div>
            </div>
            <div class="Discount_list" @click="details">
                <img :src="images[1]" alt="">
                <div class="title">酱小七开业5.8折大促</div>
                <div class="state">进行中</div>
            </div>
        </div>

        <div v-else class="no"><img src="../assets/img/nohuo.png" alt=""></div>

    </div>
</template>

<script>
import header from '../components/header'
export default {
    data() {
        return {
            images: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531461952740&di=6ad5282d2d30f8ba0d75cd2bade8eed8&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F25%2F79%2F58PIC4B58PICbtD.jpg'
            ],
            activeNames: ['0'],
            show:true
        }
    },
    components: {
        'header-item': header
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '商场活动'
        
    },
    methods:{
        details(){
            this.$router.push({path:'/DiscountItem'})
        }
    }
}
</script>

<style lang="less" scoped>
    #Discount{
        width: 100%; min-height: calc(100vh); background-color: rgba(232,232,232,1);
    }
    
    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .Discount{
        width: 100%; height: 100%; padding-top: 0.48rem;
        .Discount_list{
            width: 6.7rem; height: 3.88rem; margin: 0.48rem auto; margin-top: 0; background-color: white; border-radius: 0.1rem; position: relative;
            font-family:PingFang-SC-Medium; font-weight: Medium;
            img{
                width: 100%; height: 3rem; border-top-left-radius: 0.1rem; border-top-right-radius: 0.1rem;
            }
            .title{
                width: 100%; height: 0.88rem; line-height: 0.88rem; font-size: 0.3rem; padding-left: 0.2rem; position: absolute; bottom: 0; left: 0;
            }
            .state{
                width: 1.2rem; height: 0.5rem; font-size: 0.28rem; line-height: 0.5rem; border-top-right-radius: 0.1rem; border-bottom-left-radius: 0.1rem;
                position: absolute; top: 0; right: 0; background:rgba(98,185,0,1); color: white; text-align: center;
            }
        }
    }

    .no{
        width: 3.33rem; height: 3rem; margin: 1.6rem auto;
        img{ width: 100%; height: 100%; }
    }


</style>


