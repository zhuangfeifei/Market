<template>
	
    <div class="yuyue">
        <!--<header-item>{{title}}</header-item>-->
        
        <div class="content" v-html="htmls">
            
        </div>

        
    </div>

</template>

<script>
import header from '../../components/header'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                show:true, list: { current: 1, limit: 5, isPage: false }, title:''
            }
        },
        components: {
            'header-item': header
        },
        beforeCreate(){
            
        },
        computed:{
            htmls(){
                return this.$store.getters.htmls
            },
        },
        created(){
            this.title = this.$route.query.title
            document.title = this.$route.query.title
        },
        methods: {
            
        }
	}
</script>

<style lang="less" scoped>
.yuyue{
    width: 100%; font-size: 0.3rem; overflow: hidden;
}

*{
    margin: 0; padding: 0; box-sizing: border-box;
}
.content{
    width: 100%; padding: 0.4rem;
}


</style>