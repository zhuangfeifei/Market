<template>
	
    <div class="Hot_comments">

        暂无

    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                images: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531461952740&di=6ad5282d2d30f8ba0d75cd2bade8eed8&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F25%2F79%2F58PIC4B58PICbtD.jpg'
                ],
                active: 0, title:['优惠信息','热门评论','品牌故事'], tabIndex: 0,
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
            shopDetail(){
                return this.$store.state.shopDetail
            },
            groupList(){
                return this.$store.state.groupList
            },
        },
        created(){
            
        },
        methods: {
            
            // tab(index){
            //     this.tabIndex = index
            // },
        }
	}
</script>

<style lang="less" scoped>
.Hot_comments{
    width: 100%; font-size: 0.3rem; min-height: calc(100vh - 1.2rem); padding: 0.4rem;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }






</style>