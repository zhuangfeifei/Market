webpackJsonp([31],{FfkD:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i("BO1k"),r=i.n(e),a={data:function(){return{tabNum:0,list:[{Progressbar:40},{Progressbar:80},{Progressbar:60}]}},beforeCreate:function(){var t=this;setInterval(function(){t.$store.commit("TIMES")},1e3),this.$store.dispatch("groupKillList"),this.$store.dispatch("promotionList")},computed:{imgUrl:function(){return this.$store.state.imgUrl},groupKillList:function(){return this.$store.state.groupKillList},killTimeList:function(){var t=[],s=!0,i=!1,e=void 0;try{for(var a,n=r()(this.groupKillList.data);!(s=(a=n.next()).done);s=!0){var o=a.value;t.push({day:o.start_time.substring(5,7)+"月"+o.start_time.substring(8,10)+"日",hour:o.start_time.substring(11,16),status:o.data[0].status})}}catch(t){i=!0,e=t}finally{try{!s&&n.return&&n.return()}finally{if(i)throw e}}return t},time:function(){return this.$store.state.times}},created:function(){document.title="秒杀"},methods:{tabTime:function(t){this.tabNum=t}},filters:{filter:function(t){var s=t%864e5,i=s%36e5,e=i%6e4;return Math.floor(t/864e5)+"天 "+Math.floor(s/36e5)+"小时 "+Math.floor(i/6e4)+"分钟 "+Math.round(e/1e3)+"秒"}}},n={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{attrs:{id:"SecondKill"}},[i("nav",{staticClass:"SecondKill_time"},t._l(t.killTimeList,function(s,e){return i("div",{key:e,staticClass:"SecondKill_time_list",class:{active_times:e==t.tabNum,active_time_after:!0},on:{click:function(s){t.tabTime(e)}}},[i("p",[t._v(t._s(s.day))]),i("span",[t._v(t._s(s.hour))]),i("p",{staticClass:"SecondKill_time_list_status"},[t._v(t._s(1==s.status?"抢购中":"即将开始"))])])})),t._v(" "),t.groupKillList.length>0?i("div",{staticClass:"goods_list"},t._l(t.groupKillList[t.tabNum].data,function(s,e){return i("div",{key:e,staticClass:"goods_list_"},[i("a",{attrs:{href:"http://www.homeamc.cn/#/Crab?&statusId="+s.id}},[i("div",{staticClass:"goods_list_content"},[i("section",[i("img",{attrs:{src:t.imgUrl+s.path,alt:""}})]),t._v(" "),i("div",{staticClass:"goods_list_contents"},[i("div",{staticClass:"goods_list_contents_name"},[t._v(t._s(s.title))])])])])])})):t._e()])},staticRenderFns:[]};var o=i("VU/8")(a,n,!1,function(t){i("wlFJ")},"data-v-d3216222",null);s.default=o.exports},wlFJ:function(t,s){}});
//# sourceMappingURL=31.8ba5cff08d0467e4c68a.js.map