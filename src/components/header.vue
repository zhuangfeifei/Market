<template>
    <div id="header">
        <img @click="gos" src="../assets/img/go.png" alt="">
        <span><slot></slot></span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    computed:{
        
    },
    created(){
        
    },
    methods:{
        gos(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
    #header{
        width: 100%; height: 1rem; position: fixed; top: 0; left: 0; text-align: center; line-height: 1rem; z-index: 1000;
        font-size: 0.37rem; color: white; background-color: black; font-family:PingFang-SC-Bold; font-weight: Bold;
        img{
            width: 0.35rem; height: 0.35rem; position: absolute; top: 0.325rem; left: 0.21rem;
        }
    }
</style>


