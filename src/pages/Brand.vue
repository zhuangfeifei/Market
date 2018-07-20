<template>
    <div id="Brand">

        <header-item>品牌商家</header-item>

        <nav v-if="ishow" class="floor">
            <div><span>楼层</span></div>
            <div><span>业态</span></div>
            <div @click="focus">1</div>
        </nav>
        <nav v-else class="search">
            <div><input type="text" @focus="focus($event)" @blur="blur($event)" ref="input"><img :src="images[0]" alt=""></div>
        </nav>

        <div class="Brand">
            <div class="Brand_list">
                <img :src="images[0]" alt="">
                <div class="content">
                    <h3>苏浙徽农家大院</h3>
                    <p><span>餐饮</span><span>1F-C101</span></p>
                    <div>苏浙徽是一个非常著名的餐饮品牌店苏浙 徽是一个非常著名的餐饮品牌店</div>
                </div>
            </div>
            <div class="Brand_list">
                <img :src="images[1]" alt="">
                <div class="content">
                    <h3>苏浙徽农家大院</h3>
                    <p><span>餐饮</span><span>1F-C101</span></p>
                    <div>苏浙徽是一个非常著名的餐饮品牌店苏浙 徽是一个非常著名的餐饮品牌店</div>
                </div>
            </div>
            <div class="Brand_list">
                <img :src="images[0]" alt="">
                <div class="content">
                    <h3>苏浙徽农家大院</h3>
                    <p><span>餐饮</span><span>1F-C101</span></p>
                    <div>苏浙徽是一个非常著名的餐饮品牌店苏浙 徽是一个非常著名的餐饮品牌店</div>
                </div>
            </div>
            <div class="Brand_list">
                <img :src="images[1]" alt="">
                <div class="content">
                    <h3>苏浙徽农家大院</h3>
                    <p><span>餐饮</span><span>1F-C101</span></p>
                    <div>苏浙徽是一个非常著名的餐饮品牌店苏浙 徽是一个非常著名的餐饮品牌店</div>
                </div>
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
            activeNames: ['0'],
            ishow:true
        }
    },
    components: {
        'header-item': header
    },
    mounted(){
        // this.$nextTick(() => {this.$refs['input'].focus()})
    },
    created(){
        // this.$nextTick(() => {this.$refs['input'].focus()})
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    },
    methods:{
        focus(event) {
            console.log(event)
            // event.currentTarget.select();  // 获取焦点时需直接选中文本内容
            this.ishow = false
            this.$nextTick(() => {this.$refs['input'].focus()})
        },
        blur(value){
            console.log(value)
            this.ishow = true
        }
    }
}
</script>

<style lang="less" scoped>
    #Brand{
        width: 100%; height: 100%; padding-bottom: 1.1rem; background-color: white; padding-top: 1rem; font-size: 0.3rem;
    }
    
    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .floor{
        width: 100%; height: 1.03rem; font-size: 0.3rem; display: flex; justify-content: space-around;
        border-bottom: 0.01rem solid rgba(206,206,206,1); padding-top: 0.3rem;
        div{
            width: 30%; height: 0.5rem; text-align: center; color:rgba(43,43,43,1); font-family:PingFang-SC-Regular;
            border-right: 0.02rem solid rgba(206,206,206,1); line-height: 0.5rem;
        }
        div:nth-child(3){
            border: 0;
        }
    }
    .search{
        width: 100%; height: 1.03rem; border-bottom: 0.02rem solid rgba(206,206,206,1); padding-top: 0.195rem;
        div{
            width: 5.54rem; height: 0.64rem; border: 0.02rem solid #FF8B4B; margin: 0 auto; position: relative; border-radius: 0.32rem;
            input{
                width: 100%; height: 0.45rem; border: 0; background: none; outline: none!important;
                position: absolute; top: 0.07rem; left: 0; padding-left: 0.3rem; line-height: 0.45rem!important;
            }
            img{
                width: 0.42rem; height: 0.42rem; position: absolute; top: 0.1rem; right: 0.31rem;
            }
        }
    }


    .Brand{
        width: 100%; padding: 0 0.4rem;
        .Brand_list{
            width: 100%; height: 2.2rem; padding: 0.3rem 0; border-bottom: 0.01rem solid rgba(232,232,232,1);;
            img{
                width: 1.6rem; height: 1.6rem; float: left;
            }
            .content{
                width: calc(100% - 0.64rem - 1.6rem); height: 1.6rem; float: right;
                h3{ font-size: 0.3rem; }
                p{ 
                    font-size: 0.28rem; line-height: 0.6rem;
                    span:nth-child(1){ color:rgba(255,139,75,1); margin-right: 0.47rem; }
                }
                div{
                    width: 100%; height: 0.53rem; font-size: 0.24rem; color:rgba(68,68,68,1); line-height:0.3rem;
                    display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; -webkit-line-clamp: 2;
                }
            }
        }
    }

    


</style>


