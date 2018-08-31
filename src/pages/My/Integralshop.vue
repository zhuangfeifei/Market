<template>
	
    <div class="yuyue">
        <!--<header-item>积分商城</header-item>-->
        
        <div class="main">
            <div class="Integrals_mains">
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
            </div>
            <div class="Integrals_mains">
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯杯果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
                <div class="list" >
                    <img src="../../assets/img/1.jpg" alt="">
                    <p>星巴克榛果拿铁中杯</p>
                    <p><span>50积分</span><del>￥39</del></p>
                </div>
            </div>
        </div>

        <div class="top"><p>返回</p><p>顶部</p></div>
        
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                Data:'',show:true
            }
        },
        components: {
            
        },
        created(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            document.title = '积分兑换'

            $(document).ready(()=>{
                $('.top').click(()=>{
                    $('body,html').animate({scrollTop:0},500)
                })
            })
        },
        methods: {
            history() {
                history.go(-1)
            },
            // class_change(){
            //     this.show = !this.show
            // }
        }
	}
</script>

<style lang="less" scoped>
.yuyue{
    width: 100%; font-size: 4vw; background:rgba(232,232,232,1);
}

*{
    box-sizing: border-box;
}


/**/
.font1{font-family:PingFang-SC-Medium; font-weight: Medium;}
.font2{font-family:PingFang-SC-Regular; font-weight: Regular;}

.main{ width: 100%; display: flex; padding-left: 0.1rem; padding-top: 0.3rem; }
.Integrals_mains{
    width: 3.2rem; margin-left: 0.3rem;
    // -moz-column-count:2; /* Firefox */
    // -webkit-column-count:2; /* Safari 和 Chrome */
    // column-count:2;    // 把div中的文本分为多少列
    // -moz-column-gap: 5vw;
    // -webkit-column-gap: 5vw;
    // column-gap: 5vw;  // 规定列间隙
    // // column-width 规定列宽
    .list{
         background:rgba(255,255,255,1); border-radius: 0.2rem; padding-bottom: 0.2rem; margin-bottom: 0.3rem;
        box-shadow:4px 0px 16px rgba(35,24,21,0.2); 
        -moz-page-break-inside: avoid; -webkit-column-break-inside: avoid; break-inside: avoid; // 避免元素内部断行并产生新列
        img{
            width: 100%; height: 2.4rem; border-top-left-radius: 0.2rem; border-top-right-radius: 0.2rem; margin-bottom: 0.2rem;
        }
        p{ padding: 0 0.19rem; margin: 0; font-size: 0.24rem; color:rgba(43,43,43,1); .font2; }
        p:nth-child(3){ 
            color:rgba(255,139,75,1); margin-top: 2vw; font-size: 0.28rem; .font1;
            del{ color:rgba(75,75,75,1); font-size: 0.24rem; margin-left: 0.19rem; .font2;}
        }
    }
}

.top{
    p{margin: 0; padding: 0;} font-size: 0.3rem;
    width: 1.28rem; height: 1.28rem; .font1; color:rgba(255,255,255,1);border-radius: 50%; position: fixed; bottom: 0.64rem; right: 0.64rem; line-height: 0.4rem;
    background:rgba(255,139,75,1); opacity:0.9; box-shadow:4px 0px 30px rgba(35,24,21,0.4); text-align: center; padding-top: 0.24rem;
}


</style>