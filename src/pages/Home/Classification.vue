<template>
    <div id="Classification">
        
        <scroller-item :CategoryOneList="CategoryOneList"></scroller-item>

        <div class="Classification_right">
            <div class="Classification_good" v-for="(item,index) in CategoryTwoOrThreeList" :key="index" @click="$router.push({path:'/Goods',query:{id: item.ID, categoryLevel: item.CATEGORY_LEVEL}})">
                <img :src="imgUrl+item.TINY_PIC" alt="">
                <p>{{item.CATEGORY_NAME}}</p>
            </div>
        </div>
        <div v-if="CategoryTwoOrThreeList.length == 0" class="Classification_no">暂无</div>
        
    </div>
</template>

<script>
import scroller from '../../components/_scroller'
export default {
    data() {  
        return {
            activeKey: 1,
        }
    },
    components: {
        scrollerItem: scroller
    },
    beforeCreate(){
        this.$store.dispatch('CategoryOneList')
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '分类'
        // console.log(12)

    },
    computed:{
        CategoryOneList(){
            return this.$store.state.CategoryOneList
        },
        CategoryTwoOrThreeList(){
            return this.$store.state.CategoryTwoOrThreeList
        },
        isLoading(){
            return this.$store.state.isLoading
        },
        imgUrl(){
            return this.$store.state.imgUrl
        },
    },
    methods:{
        
    },
}
</script>

<style lang="less" scoped>
*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

#Classification{
    width: 100%; background-color: white; font-size: 0.3rem;
}

.Classification_right{
    width: calc(100% - 1.75rem); display: flex; flex-wrap: wrap; padding: 0.1rem 0; float: right; margin-bottom: 1.3rem;
    //  position: absolute; right: 0; top: 0;
    box-shadow:0px 3px 30px 0px rgba(231,71,68,0.1);
    .Classification_good{
        width: calc(100% / 3); text-align: center; margin-top: 0.2rem;
        img{ width: 1.5rem; height: 1.5rem; }
        p{ font-size: 0.27rem; }
    }
}

.Classification_no{
    width: 100%; text-align: center; padding-top: 2rem; color: gainsboro; font-size: 0.24rem;
}
</style>


