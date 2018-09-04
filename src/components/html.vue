<template>
    <div id="html">

        <div v-html="htmls" class="htmls"></div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    components: {
        
    },
    beforeCreate(){
        // this.$store.dispatch('user')
    },
    created(){
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        // console.log(wx)
    },
    computed:{
        htmls(){
            return this.$store.getters.htmls
        },
    },
    methods:{
        
    }
}
</script>
<style lang="less" scoped>
#html{
    width: 100%; font-size: 0.3rem; min-height: calc(100vh - 1.2rem);
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}

.font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
.font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
.font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }


.htmls{
    width: 100%; padding: 0 0.4rem;
}


</style>


