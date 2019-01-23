<template>
    <div id="index">

        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive" />

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
    beforeCreate(){
        this.$store.dispatch('carousel')
        this.$store.dispatch('isFineList')
    },
    computed:{
        isFocus(){
            return this.$store.state.isFocus
        }
    },
    mounted(){
        
    },
}
</script>

<style lang="less" scoped>
    #index{
        width: 100%; height: 100%; padding-bottom: 1.1rem; background-color: white;
    }

</style>


