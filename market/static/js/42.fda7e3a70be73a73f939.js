webpackJsonp([42],{"06m3":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o={data:function(){return{amount:1}},components:{},beforeCreate:function(){this.$store.dispatch("myScoreGoodsList")},computed:{myScoreGoodsList:function(){return this.$store.state.myScoreGoodsList},imgUrlGoods:function(){return this.$store.state.imgUrlGoods}},created:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0,document.title="兑换记录"},activated:function(){},methods:{}},n={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"MyIntegral"}},[""!=t.myScoreGoodsList?e("div",t._l(t.myScoreGoodsList,function(s,o){return e("div",{key:o,staticClass:"MyIntegral_list"},[e("div",{staticClass:"MyIntegral_list_avatar"},[e("img",{attrs:{src:t.imgUrlGoods+s.goods_images,alt:""}})]),t._v(" "),e("div",{staticClass:"MyIntegral_list_content"},[e("div",{staticClass:"MyIntegral_list_content_title"},[t._v(t._s(s.goods_name))]),t._v(" "),e("p",[t._v("x"+t._s(s.goods_num))]),t._v(" "),e("span",[t._v(t._s(s.exchange_time))])]),t._v(" "),e("div",{staticClass:"MyIntegral_list_"},[e("p",[t._v("-"+t._s(s.score)+"积分")]),e("span",[t._v(t._s(0==s.status?"未领取":"已领取"))])])])})):t._e(),t._v(" "),""==t.myScoreGoodsList?e("div",{staticClass:"MyIntegral_no"},[t._v("暂无记录")]):t._e()])},staticRenderFns:[]};var i=e("VU/8")(o,n,!1,function(t){e("o4hq")},"data-v-4490bf3a",null);s.default=i.exports},o4hq:function(t,s){}});
//# sourceMappingURL=42.fda7e3a70be73a73f939.js.map