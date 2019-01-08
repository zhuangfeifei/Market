<template>
    <div id="scroller">
        
        <div class="scroller_">
            <div class="scrollers">
                <div class="scroller_list" :class="{scroller_actives: item.CATEGORY_NAME == CATEGORY_NAME}" v-for="(item,index) in CategoryOneList" :key="index" @click="change(index)">
                    <p>{{item.CATEGORY_NAME}}</p>
                    <section></section> 
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            active:0
        }
    },
    props:['CategoryOneList'],
    computed:{
        CATEGORY_NAME(){
            return this.$store.state.CATEGORY_NAME
        }
    },
    created(){
        
    },
    methods:{
        change(index){
            this.active = this.$store.commit('CATEGORY_NAME', this.CategoryOneList[index].CATEGORY_NAME)
            this.$store.dispatch('CategoryTwoOrThreeList', this.CategoryOneList[index].ID)
        }
    }
}
</script>

<style lang="less" scoped>
*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

#scroller{
    width: 1.6rem; height: calc(100vh - 1.1rem); background:rgba(246,246,246,1); 
    position: fixed; left: 0; top: 0;
    .scroller_{
        width: 100%; height: 100%; overflow: hidden;
        .scrollers{
            width: 100%; height: 100%; overflow-y: auto; -webkit-overflow-scrolling:touch;
            .scroller_list{
                width: 100%; height: 0.9rem; text-align: center; line-height: 0.9rem; position: relative;
                p{ font-size: 0.24rem; .font2; color:rgba(75,75,75,1); }
            }
            .scroller_actives{
                background-color: white;
                p{ font-size: 0.28rem; .font1; }
                section{
                    width: 0.08rem; height: 0.25rem; background-color: red; position: absolute; top: 0.325rem; left: 0;
                }
            }
        }
    }
}

</style>


