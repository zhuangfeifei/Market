<template>
    <div id="NewYears">

        <nav class="NewYears_nav"></nav>

        <div class="NewYears_main">
            <div class="NewYears_main_list">
                <div class="NewYears_main_list_title">
                    <img src="../../assets/home/classBorder_.png" alt="">
                    <div class="NewYears_main_list_title_">特惠商品</div>
                </div>
                <p class="NewYears_main_list_status">(火爆进行中)</p>
                <div class="NewYears_main_lists">
                    <div class="NewYears_main_lists_" v-for="(item,index) in 4" :key="index">
                        <div class="imgs"></div>
                        <div class="NewYears_main_lists_inventory"></div>
                        <div class="NewYears_main_lists_title">【官方正品】中粮长城干红葡萄酒特酿3长城解百纳...</div>
                        <div class="NewYears_main_lists_money">
                            <div><del>原价：474</del><p>狂欢价：<small>¥</small></p></div>
                            <span>178.8</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    components: {
        
    },
    beforeCreate(){
        
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '双旦大促'
        
        
    },
    methods:{
        
    },
    destroyed(){
        
    },
}
</script>

<style lang="less" scoped>
#NewYears{
    width: 100%; min-height: 100vh; font-size: 0.3rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}
.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }
.font4{ font-family:STXinwei; font-weight: 400; }


.NewYears_nav{
    width: 100%; height: 9rem; background: url('../../assets/home/years.png') no-repeat; background-size: 100% 100%;
}

.NewYears_main{
    width: 100%; background: url('../../assets/home/yearsBg.png') no-repeat; background-size: 100% 100%; padding: 0.44rem 0.3rem;
    .NewYears_main_list{
        width: 100%; height: 10.2rem; background-color: #FFFFFF; padding-top: 0.44rem;
        .NewYears_main_list_title{
            width: 3.14rem; height: 0.63rem; margin: 0 auto; display: flex; align-items: center; justify-content: center;
            background: url('../../assets/home/classBorder.png') no-repeat; background-size: 100% 100%; position: relative;
            img{ width: 2.72rem; height: 0.2rem; }
            .NewYears_main_list_title_{
                width: 100%; height: 100%; position: absolute; text-align: center; line-height: 0.63rem; color:rgba(0,0,0,1); font-size: 0.36rem; .font4;
            }
        }
        .NewYears_main_list_status{ text-align: center; margin-top: 0.1rem; }
    }
    .NewYears_main_lists{
        width: 100%; margin-top: 0.2rem; display: flex; flex-wrap: wrap;
        .NewYears_main_lists_{
            width: 3.15rem; height: 3.75rem; margin-left: 0.2rem; margin-top: 0.2rem; padding: 0.1rem;
            box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.1); background-color: #FFFFFF;
            .imgs{ width: 100%; height: 1.9rem; border: 1px solid lightblue; }
            .NewYears_main_lists_inventory{
                width: 100%; height: 0.3rem; background-color: #DD6872;
            }
            .NewYears_main_lists_title{
                width: 100%; height: 0.6rem; font-size: 0.24rem; line-height: 0.3rem;
                overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
            }
            .NewYears_main_lists_money{
                width: 100%; display: flex;
                del{ font-size: 0.22rem; color:rgba(84,84,84,1); line-height: 0.3rem; }
                p{ font-size: 0.18rem; color:rgba(221,70,83,1); .font2; small{ margin-left: 0.1rem; font-size: 0.2rem; .font3; } }
                span{ font-size: 0.56rem; color:rgba(221,70,83,1); .font3; margin-left: 0.2rem; }
            }
        }
    }
}
    
</style>


