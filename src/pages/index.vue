<template>
    <div id="index">

        <router-view></router-view>

        <bottom-item></bottom-item>

    </div>
</template>

<script>
import bottom from '../components/bottom'
export default {
    data() {
        return {
            
        }
    },
    components: {
        "bottom-item": bottom,
    },
    computed:{
        
    },
    created(){
        
    }
}
</script>

<style lang="less" scoped>
    #index{
        width: 100%; height: 100%; padding-bottom: 1.1rem; background-color: white;
    }

</style>


