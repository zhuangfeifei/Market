webpackJsonp([34],{"+yyo":function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var s=t("p0f0"),a=(s.a,{data:function(){return{goodsName:"",mescroll:null,mescrollDown:{},mescrollUp:{isBounce:!1,callback:this.upCallback,noMoreSize:10,page:{num:0,size:10},htmlNodata:'<p class="upwarp-nodata">-- 没有更多商品了！ --</p>'},goodsList:""}},components:{MescrollVue:s.a},beforeCreate:function(){},computed:{imgUrlGoods:function(){return this.$store.state.imgUrlGoods}},created:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0,document.title=this.$route.query.title||"商品分类"},activated:function(){},methods:{search:function(){this.mescroll.resetUpScroll()},mescrollInit:function(e){this.mescroll=e},upCallback:function(e,o){var t=this,s={};s=void 0===this.$route.query.goodsLabel?{limit:e.size,current:e.num,categoryId:this.$route.query.id,categoryLevel:this.$route.query.categoryLevel,goodsLabel:"",goodsName:this.goodsName}:{limit:e.size,current:e.num,categoryId:"",categoryLevel:"",goodsLabel:this.$route.query.goodsLabel,goodsName:this.goodsName},this.$store.dispatch("goodsList",s).then(function(s){if(200==s.data.code){var a=s.data.data;1===e.num&&(t.goodsList=[]),t.goodsList=t.goodsList.concat(a),t.$nextTick(function(){0==s.data.data.length?o.endSuccess(t.goodsList.length,!1):o.endSuccess(t.goodsList.length)})}}).catch(function(e){return o.endErr()})}}}),i={render:function(){var e=this,o=e.$createElement,s=e._self._c||o;return s("div",{attrs:{id:"Goods"}},[s("nav",{staticClass:"search"},[s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.goodsName,expression:"goodsName"}],ref:"input",attrs:{id:"name",type:"text",placeholder:"搜索你想要的商品"},domProps:{value:e.goodsName},on:{input:function(o){o.target.composing||(e.goodsName=o.target.value)}}})]),e._v(" "),s("img",{attrs:{src:t("p1AH"),alt:""},on:{click:e.search}})]),e._v(" "),s("mescroll-vue",{staticClass:"GoodsMescroll",attrs:{down:e.mescrollDown,up:e.mescrollUp},on:{init:e.mescrollInit}},[s("div",{staticClass:"goods"},e._l(e.goodsList,function(o,t){return s("div",{key:t,staticClass:"goods_list",on:{click:function(t){e.$router.push({path:"/GoodsDetails",query:{id:o.id}})}}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.imgUrlGoods+o.thumbnail_pic,expression:"imgUrlGoods + item.thumbnail_pic"}],attrs:{alt:""}}),e._v(" "),s("div",[s("p",[e._v(e._s(o.goods_name))])]),e._v(" "),s("span",[e._v("¥"+e._s(o.price))])])})),e._v(" "),0==e.goodsList.length?s("div",{staticClass:"goods_no"},[e._v("暂无")]):e._e()])],1)},staticRenderFns:[]};var n=t("VU/8")(a,i,!1,function(e){t("lqAc")},"data-v-61de6875",null);o.default=n.exports},lqAc:function(e,o){}});
//# sourceMappingURL=34.5e2ff758da96395612b3.js.map