<template>
    <div id="Address">
        
        <swipeout>
            <div class="swipeoutList" v-for="(item,index) in listadress" :key="index">
                <swipeout-item ref="swipeoutItem" transition-mode="follow" :auto-close-on-button-click="false">
                    <div slot="right-menu">
                        <swipeout-button @click.native="onButtonClick(item.id, index)" type="default">{{'设为默认'}}</swipeout-button>
                        <swipeout-button @click.native="deletes(item.id, index)" type="warn">{{'删除'}}</swipeout-button>
                    </div>
                    <div slot="content" @click="details(index)" class="Address-content vux-1px-t" :class="{last: index == listadress.length - 1}">
                        <div>
                            <p><span>{{item.ship_name}}</span><span>{{item.phone_num}}</span><span v-if="item.isdefault == 1">默认</span></p>
                            <span class="Address-content_">{{item.province+item.city+item.area+item.address}}</span>
                        </div>
                        <img @click="$refs.swipeoutItem[index].open('right')" src="../../../assets/img/editor.png" alt="">
                    </div>
                </swipeout-item>
            </div>
        </swipeout>

        <div class="Address_btn" @click="$router.push('/AddAddress')">添加收货地址</div>
        
    </div>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
    data() {  
        return {
            activeKey: 1
        }
    },
    components: {
        Swipeout,
        SwipeoutItem,
        SwipeoutButton
    },
    beforeCreate(){
        this.$store.dispatch('listadress')
    },
    computed:{
        listadress(){
            return this.$store.state.listadress
        },
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '分类'
        // console.log(12)
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        onButtonClick (id, index) {
            this.$store.dispatch('defaultById', id)
            this.$refs.swipeoutItem[index].close('right')
        },
        deletes (id, index) {
            this.$store.dispatch('deladress', id)
            this.$refs.swipeoutItem[index].close('right')
        },
        details(index){
            this.$router.push({path:'/AddAddress',query:{object:this.listadress[index]}})
        }
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

#Address{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1)!important; font-size: 0.3rem;
}

.Address-content {
    width: calc(100% - 0.8rem); min-height: 1.6rem; padding: 0.3rem 0; border-bottom: 0.013rem solid rgba(206,206,206,1); margin: 0 auto; background-color: white;
    display: flex; justify-content: space-between; align-items: center;
    div{
        width: calc(100% - 0.9rem); height: 100%;
        p{
            color:rgba(43,43,43,1); .font1; 
            span:nth-child(1){ display: inline-block; width: 1.5rem; }
            span:nth-child(3){ margin-left: 0.26rem; font-size: 0.22rem; color:rgba(255,139,75,1); background-color: rgba(255,218,197,1); border-radius: 0.14rem; padding: 0 0.13rem; position: relative; top: -0.04rem; }
        }
        .Address-content_{ color:rgba(75,75,75,1); font-size: 0.24rem; }
    }
    img{ width: 0.32rem; height: 0.36rem; }
}
.last{ border: 0!important; }


.Address_btn{
    width: calc(100% - 0.8rem); height: 0.96rem; position: fixed; bottom: 0.48rem; left: 0.4rem; font-size: 0.36rem; color:rgba(255,139,75,1); text-align: center;
    background:rgba(255,255,255,1); border:0.02rem solid rgba(255,139,75,1); border-radius:0.1rem; line-height: 0.96rem;
}
</style>


