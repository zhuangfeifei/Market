webpackJsonp([44],{UAFY:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=e("BO1k"),i=e.n(r),a={data:function(){return{show:!1,changeIndex:"",moeny:0}},components:{},beforeCreate:function(){this.$store.dispatch("listadress")},computed:{listadress:function(){for(var t in this.$store.state.listadress)1==this.$store.state.listadress[t].isdefault&&(this.changeIndex=t);return this.$store.state.listadress},cartList:function(){return""==this.$store.state.cartList&&this.$store.commit("cartList"),this.$store.state.cartList},imgUrl:function(){return this.$store.state.imgUrl},imgUrlGoods:function(){return this.$store.state.imgUrlGoods}},created:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0,document.title="订单确认",this.moeny=this.$route.query.moeny/100},activated:function(){},methods:{address:function(){0==this.listadress.length?this.$router.push("/AddAddress"):this.show=!0},createdOrder:function(){var t=[],s=!0,e=!1,r=void 0;try{for(var a,o=i()(this.cartList);!(s=(a=o.next()).done);s=!0){var n=a.value;t.push({goodsId:n.goodsid,goodsName:n.goodsname,goodsNum:n.amount,nowPrice:n.nowprice,oldPrice:n.marketprice,thumbPic:n.picture})}}catch(t){e=!0,r=t}finally{try{!s&&o.return&&o.return()}finally{if(e)throw r}}var d={addressId:this.listadress[this.changeIndex].id,orderMoney:this.moeny,orderSource:0,dataSource:0,killId:"",orderGoods:t};this.$store.dispatch("createGoods",d)},details:function(t){this.$router.push({path:"/AddAddress",query:{object:this.listadress[t]}})},changeAddress:function(t){this.show=!1,this.changeIndex=t}}},o={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{attrs:{id:"CreateGoodsCart"}},[r("nav",{on:{click:t.address}},[r("img",{attrs:{src:e("Li64"),alt:""}}),t._v(" "),0==t.listadress.length?r("div",[t._v("请填写收货信息")]):t._e(),t._v(" "),t._l(t.listadress,function(s,e){return t.listadress.length>0&&e==t.changeIndex?r("div",{key:e,staticClass:"nav_address"},[r("p",[t._v("收货人："+t._s(s.ship_name))]),r("span",[t._v(t._s(s.phone_num))]),t._v(" "),r("div",[t._v("收货地址："+t._s(s.province+s.city+s.area+s.address))])]):t._e()}),t._v(" "),r("img",{attrs:{src:e("nX5x"),alt:""}})],2),t._v(" "),r("div",{staticClass:"CreateGoodsCart_Commodity"},[r("h4",[t._v("商品信息")]),t._v(" "),t.cartList?r("div",{staticClass:"CreateGoodsCart_Commodity_"},t._l(t.cartList,function(s,e){return r("div",{key:e,staticClass:"CreateGoodsCart_Commodity_content"},[r("img",{attrs:{src:t.imgUrlGoods+s.picture,alt:""}}),t._v(" "),r("section",[r("p",[t._v(t._s(s.goodsname))]),t._v(" "),r("div",[r("span",[t._v(t._s(s.nowprice)+"元")]),t._v(" "),r("p",[t._v("x"+t._s(s.amount))])])])])})):t._e()]),t._v(" "),r("div",{staticClass:"CreateGoodsCart_footer"},[r("div",[r("span",[t._v("合计：")]),r("small",[t._v("¥ ")]),r("span",[t._v(t._s(t.moeny))])]),t._v(" "),r("div",{on:{click:t.createdOrder}},[t._v("提交订单")])]),t._v(" "),r("van-actionsheet",{staticClass:"actionsheet",model:{value:t.show,callback:function(s){t.show=s},expression:"show"}},[t._l(t.listadress,function(s,i){return r("div",{key:i,staticClass:"addressList",on:{click:function(s){t.changeAddress(i)}}},[r("div",[r("p",[r("span",[t._v(t._s(s.ship_name))]),r("span",[t._v(t._s(s.phone_num))]),1==s.isdefault?r("span",[t._v("默认")]):t._e()]),t._v(" "),r("span",{staticClass:"addressList_"},[t._v(t._s(s.province+s.city+s.area+s.address))])]),t._v(" "),r("img",{attrs:{src:e("27gO"),alt:""},on:{click:function(s){t.details(i)}}})])}),t._v(" "),r("div",{staticClass:"addressList_add"},[t._v("添加地址")])],2)],1)},staticRenderFns:[]};var n=e("VU/8")(a,o,!1,function(t){e("c4As")},"data-v-16520b5e",null);s.default=n.exports},c4As:function(t,s){}});
//# sourceMappingURL=44.8e5804154823400a0e69.js.map