<template>
  <div id="app">
    <!--<transition :name="transitionName">-->
      <!--<router-view/>-->
      <!--<keep-alive>-->
          <!-- <router-view v-if="$route.meta.keepAlive"></router-view> -->
          <router-view/>
          <van-loading v-if="isLoading" class="apploading" size="40px" color="#E74744"/>
      <!--</keep-alive>-->

    <!--</transition>-->
    <!--<transition :name="transitionName">-->
        <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
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
  computed:{
    isLoading(){
      return this.$store.state.market_unionId == null ? true : false || this.$store.state.isLoading
    }
  },
  created(){
      
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

<style lang="less">
#app {
   min-height: 100vh;
}


.apploading{
  position: absolute; top: calc(50% - 20px); left: calc(50% - 20px); z-index: 10000;
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


.van-picker__cancel,.van-picker__confirm{
    font-size: 0.3rem!important;
}

#GoodsDetails_html{
    width: 100vw; overflow: hidden;
    img{ width: 100vw; }
}

</style>
