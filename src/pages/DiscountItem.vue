<template>
    <div id="Discount">

        <!--<header-item>商家优惠</header-item>-->

        <div class="Discount">
            <h3>酱小七开业5.8折大促</h3>
            <p class="time"><span>活动时间</span><span>2018.07.01-2018.07.05</span></p>
            <div class="state">进行中</div>
            <div class="logo"><img :src="images[1]" alt=""></div>
            <h4>适用商家</h4>
            <div class="business">
                <div class="business_logo"><img :src="images[1]" alt=""></div>
                <div class="business_contact">
                    <p>酱小七</p>
                    <p><span>相城区元和街道华元路818号相城区元和街道华元路818号</span><img src="../assets/img/addresss.png" alt=""></p>
                    <div>
                        <div class="contact">联系门店</div><div class="reach">到这去</div>
                    </div>
                </div>
            </div>
            <div class="Discount_content">
                <h4>优惠详情</h4>
                <div class="content"></div>
            </div>
        </div>


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
            activeNames: ['0']
        }
    },
    components: {
        'header-item': header
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

    },
}
</script>

<style lang="less" scoped>
    #Discount{
        width: 100%; height: 130vh; background-color: white; font-size: 0.3rem;
    }
    
    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }

    .Discount{
        width: 100%; height: 100%; padding: 0.4rem;
        h3{ font-size: 0.48rem; }
        .time{
            font-size: 0.28rem; color:rgba(75,75,75,1); .font2; margin: 0.28rem 0;
            span:nth-child(1){ margin-right: 0.31rem; }
        }
        .state{
            width: 1.2rem; height: 0.5rem; background:rgba(98,185,0,1); .font1; font-size: 0.28rem;
            text-align: center; line-height: 0.5rem; color: white;
        }
        .logo{
            width: 100%; height: 4.44rem; margin: 0.48rem 0; border-bottom: 0.02rem dashed rgba(206,206,206,1);
            img{ width: 100%; height: 3.8rem; border-radius: 0.1rem; }
        }
        h4{ font-size: 0.36rem; }
        .business{
            width: 100%; height: 1.6rem; display: flex; justify-content: space-between; margin: 0.3rem 0;
            .business_logo{
                width: 1.6rem; height: 100%;
                img{ width: 100%; height: 100%; }
            }
            .business_contact{
                width: calc(100% - 1.6rem - 0.64rem); height: 100%; position: relative; top: -0.05rem;
                img{ width: 0.4rem; height: 0.4rem; }
                p:nth-child(1){ .font1; color:rgba(43,43,43,1); font-size: 0.3rem; margin-bottom: 0.05rem; }
                p:nth-child(2){ .font2; color:rgba(75,75,75,1); font-size: 0.28rem; margin-bottom: 0.25rem; display: flex; justify-content: space-between;
                    span{ display: inline-block; width: calc(100% - 0.4rem); overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
                }
                div{
                    width: 100%; height: 0.5rem; font-size: 0.28rem; .font1; text-align: center; line-height: 0.48rem;
                    .contact{
                        width: 1.6rem; height: 100%; border-radius: 0.25rem; color: #FF8B4B; border: 0.02rem solid #FF8B4B; float: left;
                    }
                    .reach{
                        width: 1.6rem; height: 100%; border-radius: 0.25rem; color: #62B900; border: 0.02rem solid #62B900; float: left; margin-left: 0.64rem;
                    }
                }
            }
        }
        .Discount_content{
            width: 100%; margin-top: 0.6rem; padding-top: 0.48rem; border-top: 0.02rem dashed rgba(206,206,206,1);
            .content{
                width: 100%; 
            }
        }
    }


    


</style>


