webpackJsonp([10],{"46ft":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});i("A0bp");var e=i("Wb4x"),o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"Crab"}},[""!=t.crabgroupList?e("div",{staticClass:"Crab"},[e("nav",[e("img",{staticClass:"Crab_list_logos",attrs:{src:i("7gBg"),alt:""}}),t._v(" "),e("div",[e("video",{attrs:{muted:"",id:"videos",width:"100%",height:"100%",src:i("URub"),controls:"",autoplay:"autoplay",playsinline:"true",loop:"",type:"video/mp4"},domProps:{muted:!0}},[t._v("\n                    您的浏览器不支持 video 标签。 \n                ")])])]),t._v(" "),e("div",{staticClass:"Crab_main"},[e("div",{staticClass:"Crab_list_"},[e("div",{staticClass:"Crab_Recommend"},[e("img",{attrs:{src:t.img[1],alt:""}})]),t._v(" "),t._l(t.crabgroupList,function(s,i){return e("div",{key:s.id,staticClass:"Crab_list"},[e("img",{staticClass:"Crab_list_content",attrs:{src:t.imgUrl+s.thumbnail_pic,alt:""},on:{click:function(s){t.detailss(i)}}}),t._v(" "),e("div",{staticClass:"Crab_list_ammont"},[e("span",[t._v(t._s(s.group_name))]),t._v(" "),e("div",{staticClass:"Crab_"},[e("p",[t._v("已售"+t._s(s.soldRate)+"%")]),t._v(" "),e("div",{staticClass:"Crab_Progressbar"},[e("div",{staticClass:"Crab_Progressbar_",style:{width:s.soldRate+"%"}},[e("div")])])]),t._v(" "),e("div",{staticClass:"Crab_pay"},[e("p",[t._v("¥"),e("span",[t._v(t._s(s.price))]),t._v(" "),e("del",[t._v("原价："+t._s(s.discount))])]),t._v(" "),e("div",{class:{CrabNo:0==s.inventory}},[t._v(t._s(0==s.inventory?"已售罄":"立即抢购"))])])])])})],2),t._v(" "),t._m(0)])]):e("div",{staticClass:"no"},[e("img",{attrs:{src:i("7hpO"),alt:""}}),t._v("暂无活动")])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"Crab_footer"},[s("img",{attrs:{src:i("KOT4"),alt:""}})])}]};var a=function(t){i("U5ae")},r=i("VU/8")(e.a,o,!1,a,"data-v-5046cde7",null);s.default=r.exports},"7gBg":function(t,s,i){t.exports=i.p+"static/img/CrabBacks.05c3407.png"},"8lWI":function(t,s,i){t.exports=i.p+"static/img/NoRecommend.c25850f.png"},A0bp:function(t,s,i){"use strict";(function(t){}).call(s,i("7t+N"))},KOT4:function(t,s,i){t.exports=i.p+"static/img/CrabBacks_footer.883fb91.png"},U5ae:function(t,s){},URub:function(t,s,i){t.exports=i.p+"static/media/1.22e47f8.mp4"},WIXY:function(t,s,i){t.exports=i.p+"static/img/Recommend.5ce0692.png"},Wb4x:function(t,s,i){"use strict";(function(t){s.a={data:function(){return{activeNames:["0"],img:[i("WIXY"),i("8lWI")],show:!0,list:{current:1,limit:50,isPage:!1}}},components:{},beforeCreate:function(){this.$store.dispatch("user");this.$store.dispatch("promotionList",{current:1,limit:50,isPage:!1})},computed:{imgUrl:function(){return this.$store.state.imgUrl},crabgroupList:function(){return this.$store.state.crabgroupList}},created:function(){var t=this;document.body.scrollTop=0,document.documentElement.scrollTop=0,document.title="大闸蟹火热抢购...",this.$store.commit("SET_PAGE",!0),void 0!=this.$route.query.statusId&&(this.$store.dispatch("groupListDetail",this.$route.query.statusId),this.$router.push({path:"/VoucherDetails"})),this.$nextTick(function(){setTimeout(function(){t.videoMethod()},500)})},methods:{detailss:function(t){this.$store.dispatch("groupListDetail",this.crabgroupList[t].id),this.$router.push({path:"/VoucherDetails",query:{index:t}})},promotionListGet:function(){t(window).scrollTop()+t(window).height()===t(document).height()&&(this.list.current++,this.list.isPage=!0,this.$store.state.isPage&&this.$store.dispatch("promotionList",this.list))},videoMethod:function(){wx.config({debug:!1,appId:"",timestamp:1,nonceStr:"",signature:"",jsApiList:[]}),wx.ready(function(){document.getElementById("videos").play()})}},destroyed:function(){window.removeEventListener("scroll",this.promotionListGet)}}}).call(s,i("7t+N"))}});
//# sourceMappingURL=10.ff58e6e14724955a464a.js.map