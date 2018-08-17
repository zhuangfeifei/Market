<template>
  <div id="app">
    <!--<transition :name="transitionName">-->
      <!--<router-view/>-->
      <!--<keep-alive>-->
          <router-view v-if="$route.meta.keepAlive"></router-view>
      <!--</keep-alive>-->

    <!--</transition>-->
    <!--<transition :name="transitionName">-->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
        transitionName:'', isShow:true
    }
  },
  watch:{
    $route(to, from) {
      //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index > from.meta.index){
            this.transitionName = 'slide-right'
        }else{
            this.transitionName = 'slide-left'
        }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active{
        will-change: transform;
        transition: all 0.3s;
        /*position: absolute;
        width:100%;
        left:0;*/
        /*opacity: 0;*/
    }
    .slide-right-enter {
        /*transform: translateX(100%);*/
    }
    .slide-left-enter {
        /*transform: translateX(-100%);*/
    }

    
</style>
