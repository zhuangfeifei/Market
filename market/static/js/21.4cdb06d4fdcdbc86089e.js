webpackJsonp([21],{"0auZ":function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADSUlEQVRYR8XXWchuYxQH8N/JLEMyXZinzjkJRTKUeVbGc3IynCORuJGkJBeUuDKWC4ULMksyz7NClDEyZIpCIjJkiv6n9Z7eb5+9373f71x863I/a63n/6zhv9aeZ45l3hzfb1oAG+F4nIgdsRX+wzf4BA/gfvw89GFDAWyBi3A21irnP+EzrIZtEHCR33E5rsI/fUCGADgUD2JdvIob8Ry+bjjfEgfjXOyN93ESPpwEog/AGbgZf+Ac3N73ojo/HTdgzYrarV12kwAcgGfxFY7CRwMvH6ktwGPYGofh+Tb7LgDJ5+csL9Ld8MWUl4/Ud8Kb+LeK9semny4A1+M8LK6qnuX9y83SMemM+Dx/CIAN8APewx4Tbk7B7Yrv8QRWet2Y7RsVyU3wy7jPtggsxW04FXe2AAjAe3Dk2NmfuATXFC80zeIrBRzfMwq5DcAdWIKNOwjlJpyFp+rS73Ba9f4VuLQF9IYIb9xVD1uh0gbgFSRUqeKmpKK/xCM4pnF4XdXNttU5Tdt0UdK1X18Kwm5pvQNbAIRYEv60ZfI+LofgmSKf+1psX0TIaoc+AHlheD0M2JR0RZwfjccbh/n2aM2KMGdTnq7Lt+8D8BbWxsIJKXgYxzbOQzqJWl7Z1hHv1JzYpw9AaDNFtV5RcBNHqPnMqoN76zD6h+NCXN0CfB38VvQcflkhbUW4DAFxMu5ucZaKvrI4fvU6/wsX49qONjwF6a607pN9ANbHt3gXM8LVAJM0pVNCsx8jXNAlb2PTmgvRnxiBHKaXLys+GIV5gv+JR+GURPKCitAM5a5ZkNn/KcJ6+1Y0ZgMge8ELRb/zi4wGAYhS5kBG6K+VirTnNBLgyXceGY54vc24byHJsMn2kzUrDDYUxF5ll30xfPJaF/I+ALHLPvByzYUsKWHKSbIdUnRJ4xEFpFN/CIAY71k0m9Vs/6r6NqeZIZklAXFcC12vZDMUQAx3LxB/4yB80PC2GV6qyxcVUfXWzDQA4mwXZKisUZyfnTES7kiadq4p2RxUq5yCcQe5JK0Vqk51pyYyBwIuPy0ZSINl2giMHKenU9lZu/MXtDlOwEODby7F2QIYdcctVRsZRm3rWy+eVQHQ63yIwpwD+B/BrqEhPa4hvQAAAABJRU5ErkJggg=="},NZux:function(t,s){},aZeK:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i("Cz8s"),a=(e.a,{data:function(){return{images:["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531462002438&di=e061bf459cfedfddc668e4336da6ca46&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da4742242da1373f0e13267dfcd772e97%2F8718367adab44aed5b4404ddb81c8701a18bfb85.jpg","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531461952740&di=6ad5282d2d30f8ba0d75cd2bade8eed8&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F25%2F79%2F58PIC4B58PICbtD.jpg"],activeNames:["0"]}},components:{"header-item":e.a},beforeCreate:function(){},computed:{imgUrl:function(){return this.$store.state.imgUrl},groupList:function(){return""==this.$store.state.groupList&&(this.$store.commit("GROUP_LIST"),this.$store.commit("SHOP_DETAIL")),this.$store.state.groupList[this.$route.query.index]},shopDetail:function(){return this.$store.state.shopDetail},htmls:function(){return this.$store.commit("HTML",this.groupList.description),this.$store.getters.htmls}},created:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0,document.title="券详情",this.$nextTick(function(){})},methods:{map:function(){window.location.href="https://uri.amap.com/navigation?from=&to="+this.shopDetail.LNG+","+this.shopDetail.LAT+","+this.shopDetail.ADDRESS+"&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=0"},pay:function(){this.$toast.loading({mask:!0,message:"加载中...",duration:0}),this.$store.dispatch("addGroupOrder",this.groupList)}}}),o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.groupList?e("div",{attrs:{id:"VoucherDetails"}},[e("div",{staticClass:"logo"},[e("img",{attrs:{src:t.imgUrl+t.groupList.thumbnail_pic,alt:""}})]),t._v(" "),e("div",{staticClass:"VoucherDetails"},[e("div",{staticClass:"detail"},[e("h4",[t._v(t._s(t.groupList.group_name))]),t._v(" "),e("p",[e("span",[t._v("广场指定餐饮商户"+t._s(t.groupList.group_name))]),e("span",[t._v("库存"+t._s(t.groupList.inventory))])]),t._v(" "),e("p",[e("span",[t._v(t._s(t.groupList.present_price)+"元")]),e("span",[t._v("/价值"+t._s(t.groupList.purchas_num)+"元")])]),t._v(" "),0==t.groupList.period_validity?e("p",[t._v("有效期：长期有效")]):e("p",[t._v("有效期："+t._s(t.groupList.start_time)+" ~ "+t._s(t.groupList.end_time))])]),t._v(" "),e("div",{staticClass:"VoucherDetails_business"},[e("div",{staticClass:"VoucherDetails_business_logo"},[e("img",{attrs:{src:t.imgUrl+t.shopDetail.thumbnail_pic,alt:""}})]),t._v(" "),e("div",{staticClass:"VoucherDetails_business_contact"},[e("p",[t._v(t._s(t.groupList.update_man))]),t._v(" "),e("p",[e("span",{staticClass:"VoucherDetails_business_address"},[t._v(t._s(t.shopDetail.ADDRESS))]),e("img",{attrs:{src:i("0auZ"),alt:""}})]),t._v(" "),e("div",[e("a",{attrs:{href:"tel:"+t.shopDetail.PHONE}},[e("div",{staticClass:"contact"},[t._v("联系门店")])]),e("div",{staticClass:"reach",on:{click:t.map}},[t._v("到这去")])])])]),t._v(" "),e("div",{staticClass:"Discount_content"},[e("h4",[t._v("优惠详情")]),t._v(" "),e("div",{staticClass:"content",domProps:{innerHTML:t._s(t.htmls)}})])]),t._v(" "),e("div",{staticClass:"footers"},[e("button",{on:{click:t.pay}},[t._v("¥"+t._s(t.groupList.discount)+"立即购买")])])]):t._e()},staticRenderFns:[]};var c=i("VU/8")(a,o,!1,function(t){i("NZux")},"data-v-480dbab7",null);s.default=c.exports}});
//# sourceMappingURL=21.4cdb06d4fdcdbc86089e.js.map