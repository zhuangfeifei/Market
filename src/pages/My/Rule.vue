<template>
	
    <div class="Rule">
        
        
        <div class="Rules">
            <h4>积分获取来源</h4>
            1、该卡仅用于方圆里消费、兑换使用；<br>
            2、该卡只能本人使用， 严禁他人使用；<br>
            该卡积分获取请按照规范正确使用，严禁非正
            常刷分，一经查处禁止该会员正常使用；<br>
            3、该卡处于非正常使用状态，则可以联系商城客
            服进行处理；<br>
            4、注册信息仅用于商城内会员识别，不做其他用
            途；<br>
            5、详细的会员卡使用规则见会员卡中会员权益；<br>
            该卡有效期为从开卡日期开始；<br>
            6、此卡最终解释权为我方圆里商场所有。
        </div>
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                show:true, list: { current: 1, limit: 5, isPage: false }, title:''
            }
        },
        components: {
            
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
            document.title = '开卡需知'
        },
        methods: {
            
        }
	}
</script>

<style lang="less" scoped>
.Rule{
    width: 100%; font-size: 0.3rem; overflow: hidden;
}

*{
        margin: 0; padding: 0; box-sizing: border-box;
    }

    .font1{ font-family:PingFang-SC-Medium; font-weight: Medium; }
    .font2{ font-family:PingFang-SC-Regular; font-weight: Regular; }
    .font3{ font-family:PingFang-SC-Bold; font-weight: Bold; }


.Rules{
    width: 100%; padding: 0.5rem 0.4rem; color:rgba(75,75,75,1); line-height: 0.6rem;
    h4{ font-size: 0.36rem; .font3; margin-bottom: 0.5em; color:rgba(43,43,43,1); }
}


</style>