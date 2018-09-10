<template>
    <div id="Brand">

        <nav v-if="ishow" class="floor">
            <div v-for="(item,index) in activeNames" @click="changShow(index)" :key="index"><span>{{item}}</span><img src="../../assets/img/down.png" alt=""></div>
            <div @click="focus"><img src="../../assets/img/search.png" alt=""></div>
        </nav>
        <nav v-else class="search">
            <div><input id="name" type="text" autofocus="autofocus" @focus="focus($event)" @blur="blur($event)" ref="input"><img @click="search" src="../../assets/img/search.png" alt=""></div>
        </nav>
        <div v-show="change" class="changeList">
            <div v-show="changes == 0"><p v-for="(item,index) in List.projects" @click="getContact(index)" :class="{actives: projectsNum == index}" :key="index">{{item.PROJECT_NAME}}</p></div>
            <div v-show="changes == 1"><p v-for="(item,index) in getContactList" @click="Contact(index)" :class="{actives: getContactListNum == index}" :key="index">{{item.REGION_NAME}}</p></div>
            <div v-show="changes == 2"><p v-for="(item,index) in List.floors" @click="floors(index)" :class="{actives: floorstNum == index}" :key="index">{{item.name}}</p></div>
            <div v-show="changes == 3"><p v-for="(item,index) in List.calssfiy" @click="calssfiy(index)" :class="{actives: calssfiyNum == index}" :key="index">{{item.categoryName}}</p></div>
        </div>

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


    </div>
</template>

<script>
export default {
    data() {
        return {
            activeNames: ['项目','馆位','楼层','业态'], projectsNum:0, getContactListNum: -1,floorstNum:-1,calssfiyNum:-1,
            ishow:true,change:false,changes:-1, i:0,
            list:{ categoryId:'', projectId:'', shopName:'', regionId:'', floorId:'', limit:10, current:1, sort:'', order:'', isPage:false }
        }
    },
    components: {
        
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
        shopList(){
            return this.$store.state.shopList
        },
        getContactList(){
            return this.$store.state.getContactList
        },
    },
    mounted(){
        // this.$nextTick(() => {this.$refs['input'].focus()})
        this.$store.dispatch('shopList', this.list)
        this.$store.commit('SET_PAGE', true)
        window.addEventListener('scroll', this.handleScroll)
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '品牌商家'
        this.$store.commit('ACTIVE', 1)

        
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
            this.list.current = 1   // 第一页
            this.list.isPage = false  // 更新shop列表
            this.$store.commit('SET_PAGE', true)
            this.$store.dispatch('shopList', this.list)
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
            var list = { categoryId:'', projectId:'', shopName:$('#name').val(), regionId:'', floorId:'', limit:5, current:1, sort:'', order:'', isPage:false }
            this.$store.dispatch('shopList', list)
        },
        detils(shopid){
            this.$router.push({path:'/ShopDetils',query:{ shopid: shopid }})
        },
        handleScroll(){
            let scrollTop = $(window).scrollTop()
            let scrollHeight = $(document).height()
            let windowHeight = $(window).height()
            if (scrollTop + windowHeight === scrollHeight) {
                this.list.current ++
                this.list.isPage = true
                if(this.$store.state.isPage) {
                    this.$toast.loading({
                        duration: 1000,       // 持续展示 toast
                        mask: true,
                        message: '加载中...'
                    });
                    this.$store.dispatch('shopList', this.list)
                }else{
                    this.$toast('没有更多了！')
                }
            }
        }
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
    }
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
        width: 100%; color:rgba(68,68,68,1); font-size: 0.3rem;
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
                        display: inline-block; width: 2.5rem; height: 0.4rem; line-height: 0.6rem;
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


