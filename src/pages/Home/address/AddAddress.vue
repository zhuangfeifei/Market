<template>
    <div id="AddAddress">

        <div class="AddAddress">
            <div class="AddAddress_">
                <span>收货人</span><van-field v-model="list.shipName" class="AddAddress_input" placeholder="请输入用户名" />
            </div>
            <div class="AddAddress_">
                <span>联系电话</span><van-field type="tel" v-model="list.phoneNum" class="AddAddress_input" placeholder="请填写联系电话" />
            </div>
            <div class="AddAddress_">
                <span>收货地址</span><p @click="show = true" class="AddAddress_input AddAddress_default" :class="{AddAddress_active: address != ''}">{{address != '' ? address : '请选择省、市、区' }}</p>
            </div>
            <div class="AddAddress_">
                <span>详细地址</span><van-field v-model="list.address" class="AddAddress_input" placeholder="请填写详细地址（街道、楼牌号等）" rows="1" autosize/>
            </div>
            <div class="AddAddress_">
                <span>邮政编码</span><van-field v-model="list.zipCode" class="AddAddress_input" placeholder="请填写邮政编码" />
            </div>
        </div>

        <div class="AddAddress_defailt">
            <span>设为默认地址</span><img @click="list.isdefault == 0 ? list.isdefault = 1 : list.isdefault = 0" :src="list.isdefault == 0 ? img[0] : img[1]" alt="">
        </div>

        <div class="AddAddress_fotter">
            <div @click="$router.go(-1)">放  弃</div><div @click="addAddress">保  存</div>
        </div>

        <van-actionsheet v-model="show">
            <van-area class="areaLists_" :area-list="areaList" @confirm="confirm" @cancel="cancel"/>
        </van-actionsheet>
            
        
    </div>
</template>

<script>
import a from '../../../assets/address'
export default {
    data() {  
        return {
            areaList:a, address: '', value:'', checked: false, show: false,object:'',
            img:[require('../../../assets/img/adressDefailt.png'),require('../../../assets/img/adressDefailts.png')],
            list:{ shipName:'', phoneNum:'', province:'', city:'', area:'', address:'', zipCode:'', isdefault: 0 }
        }
    },
    components: {
        
    },
    beforeCreate(){
        
    },
    computed:{
        
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.title = '新增收货地址'

        if(this.$route.query.object != undefined){
            let object = this.$route.query.object
            this.object = this.$route.query.object
            this.list.shipName = object.ship_name
            this.list.phoneNum = object.phone_num
            this.list.province = object.province
            this.list.city = object.city
            this.list.area = object.area
            this.list.address = object.address
            this.list.zipCode = object.zip_code
            this.list.isdefault = object.isdefault
            this.address = object.province+'、'+object.city+'、'+object.area
        }
        
    },
    activated(){
        // console.log('hah')
    },
    methods:{
        confirm(content) {
            this.show = false
            this.list.province = content[0].name
            this.list.city = content[1].name
            this.list.area = content[2].name
            this.address = content[0].name+'、'+content[1].name+'、'+content[2].name
        },
        cancel() {
            this.show = false
        },
        addAddress(){
            if(this.list.shipName != '' && this.list.phoneNum.length == 11 && this.address != '' && this.list.address != '' && this.list.zipCode != '') {
                this.$toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration: 0
                })
                this.list.province = this.address.split('、')[0]
                this.list.city = this.address.split('、')[1]
                this.list.area = this.address.split('、')[2]
                // console.log(this.list)
                if(this.object === ''){
                    this.$store.dispatch('addadress', this.list)
                }else{
                    this.list.id = this.object.id
                    this.$store.dispatch('updateadress', this.list)
                }
            }else{
                this.$dialog.alert({
                    title: '必填信息为空！',
                }).then(() => {
                // on close
                });
            }
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

#AddAddress{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1)!important; font-size: 0.3rem;
}


.AddAddress{
    width: 100%; height: 6.13rem; background-color: white; padding: 0 0.4rem;
    .AddAddress_{
        width: 100%; height: 1.22rem; display: flex; justify-content: space-between; border-bottom: 0.01rem solid rgba(206,206,206,1); align-items: center;
        span{ font-size: 0.28rem; color:rgba(43,43,43,1); .font1; }
        .AddAddress_input{ width: 78%; }
        .AddAddress_default{ color: rgba(180,180,180,1); font-size: 0.262rem; }
        .AddAddress_active{ color:rgba(43,43,43,1); }
    }
    .AddAddress_:last-child{ border: 0; }
}

.AddAddress_defailt{
    width: 100%; height: 1.22rem; display: flex; justify-content: space-between; align-items: center; background-color: white; margin-top: 0.2rem;
    padding: 0 0.4rem; color:rgba(43,43,43,1); .font1; font-size: 0.28rem;
    img{ width: 0.81rem; height: 0.51rem; }
}

.AddAddress_fotter{
    width: 100%; height: 1.28rem; border-top: 0.01rem solid rgba(204,204,204,1); position: fixed;bottom: 0; left: 0;
    display: flex; justify-content: space-around; align-items: center; text-align: center;
    div{
        width: 3.15rem; height: 0.96rem; border: 0.02rem solid rgba(255,139,75,1); border-radius: 0.1rem; line-height: 0.96rem;
        color: rgba(255,139,75,1); font-size: 0.36rem; .font3;
    }
    div:nth-child(2){ color: white; background:rgba(255,139,75,1); }
}


.areaLists{
    width: 100%; height: 100%; position: relative;
    .areaLists_{ position: absolute; bottom: 0; left: 0; }
}

</style>


