<template>
	
    <div class="Rule">
        
        
        <div class="Rules" v-html="htmls">
            
        </div>
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                show:true, list: { current: 1, limit: 10, isPage: false }, title:''
            }
        },
        components: {
            
        },
        beforeCreate(){
            this.$store.dispatch('getJFIllege')
        },
        computed:{
            getJFIllege(){
                return this.$store.state.getJFIllege
            },
            htmls(){
                this.$store.commit('HTML', this.getJFIllege.regulations)
                return this.$store.getters.htmls
            },
        },
        created(){
            this.title = this.$route.query.title
            document.title = '开卡需知'
        },
        methods: {
            
        }
	}
</script>

<style lang="less" scoped>
.Rule{
    width: 100%; font-size: 0.3rem; overflow: hidden;
}

*{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }


.Rules{
    width: 100%; padding: 0.5rem 0.4rem; color:rgba(75,75,75,1);
}


</style>