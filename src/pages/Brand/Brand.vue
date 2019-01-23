<template>
    <div id="Brand">

        <nav v-if="ishow" class="floor">
            <div v-for="(item,index) in activeNames" @click="changShow(index)" :key="index"><span>{{item}}</span><img src="../../assets/img/down.png" alt=""></div>
            <div @click="focus"><img src="../../assets/img/search.png" alt=""></div>
        </nav>
        <nav v-else class="search">
            <div><input id="name" type="text" v-model="list.shopName" autofocus="autofocus" @focus="focus($event)" @blur="blur($event)" ref="input"><img @click="search" src="../../assets/img/search.png" alt=""></div>
        </nav>
        <div v-show="change" class="changeList">
            <div v-show="changes == 0"><p v-for="(item,index) in List.projects" @click="getContact(index)" :class="{actives: projectsNum == index}" :key="index">{{item.PROJECT_NAME}}</p></div>
            <div v-show="changes == 1"><p v-for="(item,index) in getContactList" @click="Contact(index)" :class="{actives: getContactListNum == index}" :key="index">{{item.REGION_NAME}}</p></div>
            <div v-show="changes == 2"><p v-for="(item,index) in List.floors" @click="floors(index)" :class="{actives: floorstNum == index}" :key="index">{{item.name}}</p></div>
            <div v-show="changes == 3"><p v-for="(item,index) in List.calssfiy" @click="calssfiy(index)" :class="{actives: calssfiyNum == index}" :key="index">{{item.categoryName}}</p></div>
        </div>


        <mescroll-vue class="BrandMescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div v-if="shopList.length > 0" class="Brand">
                <div class="Brand_list" @click="detils(item.id)" v-for="(item,index) in shopList" :key="index">
                    <img :src="imgUrl + item.logo_pic" alt="">
                    <div class="Brand_content">
                        <h3>{{item.shopName}}</h3>
                        <p><span>{{item.categoryName}}</span><span class="Brand_name">{{item.floor}}-{{item.shopNum}}</span></p>
                        <div>{{item.SHOP_DESCRIPTION}}</div>
                    </div>
                </div>
            </div>
            
            <div v-else class="no"><img src="../../assets/img/nohuo.png" alt=""></div>
        </mescroll-vue>


    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
    data() {
        return {
            activeNames: ['项目','馆位','楼层','业态'], projectsNum:0, getContactListNum: -1,floorstNum:-1,calssfiyNum:-1,
            ishow:true,change:false,changes:-1, i:0,
            list:{ categoryId:'', projectId:'', shopName:'', regionId:'', floorId:'', sort:'', order:'',  },
            mescroll: null, mescrollDown:{}, 
            mescrollUp: { 
                isBounce: false,
                callback: this.upCallback, 
                noMoreSize: 10,
                page: { num: 0, size: 10 },
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多了！ --</p>',
                // toTop: {
				// 	//回到顶部按钮
				// 	src: require("../../assets/img/totop.png"), //图片路径,默认null,支持网络图
				// 	offset: 500 //列表滚动1000px才显示回到顶部按钮
				// },
            },
            shopList:''
        }
    },
    components: {
        MescrollVue
    },
    beforeCreate(){
        
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
        List(){
            return this.$store.state.List
        },
        getContactList(){
            return this.$store.state.getContactList
        },
    },
    mounted(){
        // this.$nextTick(() => {this.$refs['input'].focus()})
    },
    created(){
        document.title = '品牌商家'
        this.$store.commit('ACTIVE', 2)

        
    },
    beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
		next(vm => {
			vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
		})
	},
	beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
		this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
		next()
	},
    methods:{
        changShow(index){
            this.i % 2 == 0 ? this.change = true : this.change = false
            this.changes = index
            this.i++
        },
        getContact(index){
            this.projectsNum = index
            this.list.projectId = this.List.projects[index].ID
            this.func()
        },
        Contact(index){
            this.getContactListNum = index
            this.list.regionId = this.getContactList[index].ID
            this.func()
        },
        floors(index){
            this.floorstNum = index
            this.list.floorId = this.List.floors[index].num
            this.func()
        },
        calssfiy(index){
            this.calssfiyNum = index
            this.list.categoryId = this.List.calssfiy[index].id
            this.func()
        },
        func(){
            this.changes = -1  // 显示
            this.i++           // 再次点击关闭
            this.mescroll.resetUpScroll()
        },
        focus(event) {
            // console.log(event)
            // event.currentTarget.select();  // 获取焦点时需直接选中文本内容
            this.ishow = false
            this.$nextTick(() => {
                this.$refs['input'].focus() 
                // $("input").trigger("click").focus()
            })
            
        },
        blur(value){
            // console.log(value)
            this.ishow = true
        },
        search(){  // 搜索
            this.mescroll.resetUpScroll()
        },
        detils(shopid){
            this.$router.push({path:'/ShopDetils',query:{ shopid: shopid }})
        },
        mescrollInit (mescroll) {
            this.mescroll = mescroll
        },
        upCallback (page, mescroll) {
            let list = { categoryId: this.list.categoryId, projectId: this.list.projectId, shopName: this.list.shopName, regionId: this.list.regionId, 
                floorId: this.list.floorId, limit: page.size, current: page.num, sort: this.list.sort, order: this.list.order }
            this.$store.dispatch('shopList', list)
            .then(res => {
                // console.log(res.data)
                if(res.data.code == 200) {
                    this.$store.dispatch('getContactList', this.list.projectId ? this.list.projectId : res.data.data.projects[0].ID)
                    this.$store.commit('LIST', res.data.data)
                    let arr = res.data.data.shops
                    if (page.num === 1) this.shopList = []
                    this.shopList = this.shopList.concat(arr)
                    this.$nextTick(() => {
                        res.data.data.shops.length == 0 ? mescroll.endSuccess(this.shopList.length, false) : mescroll.endSuccess(this.shopList.length)
                    })
                }
            })
            .catch(err => mescroll.endErr())
        },
    },
    
}
</script>

<style lang="less" scoped>
    #Brand{
        width: 100%; height: 100%; padding-bottom: 1.1rem; background-color: white; font-size: 0.3rem; padding-top: 1.03rem;
    }
    
    *{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }

    .BrandMescroll {
        position: fixed; 
        top: 1.03rem;
        bottom: 0.8rem;
        height: auto;
    }

    .floor{
        width: 100%; height: 1.03rem; font-size: 0.3rem; display: flex; justify-content: space-around; background-color: white;
        border-bottom: 0.01rem solid rgba(206,206,206,1); padding-top: 0.3rem; position: fixed; top: 0; left: 0;
        div{
            width: 20%; height: 0.5rem; text-align: center; color:rgba(43,43,43,1); font-family:PingFang-SC-Regular;
            border-right: 0.02rem solid rgba(206,206,206,1); line-height: 0.5rem;
            img{ width: 0.2rem; height: 0.1rem; position: relative; top: -0.05rem; left: 0.05rem; }
        }
        div:last-child{
            border: 0; img{ width: 0.42rem; height: 0.42rem; top: 0; }
        }
    }
    .search{
        width: 100%; height: 1.03rem; border-bottom: 0.02rem solid rgba(206,206,206,1); padding-top: 0.195rem; position: fixed; top: 0; left: 0; background-color: white;
        div{
            width: 5.54rem; height: 0.64rem; border: 0.02rem solid #FF8B4B; margin: 0 auto; position: relative; border-radius: 0.32rem;
            input{
                width: 100%; height: 0.45rem; border: 0; background: none; outline: none!important;
                position: absolute; top: 0.07rem; left: 0; padding-left: 0.3rem; line-height: 0.45rem!important;
            }
            img{
                width: 0.42rem; height: 0.42rem; position: absolute; top: 0.1rem; right: 0.31rem;
            }
        }
    }


    .changeList{
        width: 100%; color:rgba(68,68,68,1); font-size: 0.3rem; z-index: 10;
        position: fixed; top: 1.03rem; left: 0;
        div{
            width: 100%; height: 3.96rem; line-height: 0.6rem; background-color: rgba(232,232,232,1); padding: 0.1rem 0.4rem;
            .font1; 
        }
        .actives{
            color: #FF8B4B;
        }
    }


    .Brand{
        width: 100%; padding: 0 0.4rem;
        .Brand_list{
            width: 100%; height: 2.2rem; padding: 0.3rem 0; border-bottom: 0.01rem solid rgba(232,232,232,1);;
            img{
                width: 1.6rem; height: 1.6rem; float: left;
            }
            .Brand_content{
                width: calc(100% - 0.64rem - 1.6rem); height: 1.6rem; float: right;
                h3{ font-size: 0.3rem; }
                p{ 
                    font-size: 0.28rem; line-height: 0.6rem; display: flex; justify-content: space-between;
                    span:nth-child(1){ color:rgba(255,139,75,1); margin-right: 0.47rem;}
                    .Brand_name{
                        display: inline-block; width: 2.5rem; height: 0.6rem; line-height: 0.6rem;
                        overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; 
                    }
                }
                div{
                    width: 100%; height: 0.6rem; font-size: 0.24rem; color:rgba(68,68,68,1); line-height:0.3rem;
                    display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; -webkit-line-clamp: 2;
                }
            }
        }
    }

    .no{
        width: 3.33rem; height: 3rem; margin: 1.6rem auto;
        img{ width: 100%; height: 100%; }
    }

    


</style>


