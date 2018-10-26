import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['@/pages/index'], resolve)

const Home = resolve => require(['@/pages/Home/Home'], resolve)
const Introduce = resolve => require(['@/pages/Home/Introduce'], resolve)
const ShopActivity = resolve => require(['@/pages/Home/ShopActivity'], resolve)
const CouponAll = resolve => require(['@/pages/Home/CouponAll'], resolve)
const Crab = resolve => require(['@/pages/Home/Crab'], resolve)

const Brand = resolve => require(['@/pages/Brand/Brand'], resolve)
const ShopDetils = resolve => require(['@/pages/Brand/ShopDetils'], resolve)
const VoucherDetails = resolve => require(['@/pages/Brand/VoucherDetails'], resolve)
const GroupPurchaseOrder = resolve => require(['@/pages/Brand/GroupPurchaseOrder'], resolve)
const GroupPurchaseOrderDetils = resolve => require(['@/pages/Brand/GroupPurchaseOrderDetils'], resolve)
const CommonOrder = resolve => require(['@/pages/Brand/CommonOrder'], resolve)

const My = resolve => require(['@/pages/My/My'], resolve)
const Card = resolve => require(['@/pages/My/Card'], resolve)
const Opencard = resolve => require(['@/pages/My/Opencard'], resolve)
const Coupon = resolve => require(['@/pages/My/Coupon'], resolve)
const CouponContent = resolve => require(['@/pages/My/CouponContent'], resolve)
const Integralshop = resolve => require(['@/pages/My/Integralshop'], resolve)
const Membership = resolve => require(['@/pages/My/Membership'], resolve)
const Rule = resolve => require(['@/pages/My/Rule'], resolve)
const Balance = resolve => require(['@/pages/My/Balance'], resolve)
const Setpassword = resolve => require(['@/pages/My/Setpassword'], resolve)
const Wallet = resolve => require(['@/pages/My/Wallet'], resolve)
const Authentication = resolve => require(['@/pages/My/Authentication'], resolve)
const Owner = resolve => require(['@/pages/My/Owner'], resolve)
const Recharge = resolve => require(['@/pages/My/Recharge'], resolve)

const Discount = resolve => require(['@/pages/Activity/Discount'], resolve)
const DiscountItem = resolve => require(['@/pages/Activity/DiscountItem'], resolve)

Vue.use(Router)

// Router.prototype.go = function () {
//  this.isBack = true
//  window.history.go(-1)
// }


export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      meta:{
        index:0,
        keepAlive: true
      },
      children:[{
        path: '/',
        component: Home,
        meta:{
          index:1,
          keepAlive: true
        }
      },{
        path: 'Brand',
        component: Brand,
        meta:{
          index:2,
          keepAlive: true
        }
      },{
        path: 'Discount',
        component: Discount,
        meta:{
          index:2,
          keepAlive: true
        }
      },{
        path: 'My',
        component: My,
        meta:{
          index:2,
          keepAlive: true
        }
      }]
    },
    { path: '/Introduce', component: Introduce },
    { path: '/DiscountItem', component: DiscountItem },
    { path: '/Card', component: Card },
    { path: '/Opencard', component: Opencard },
    { path: '/Membership', component: Membership, meta:{ keepAlive: false } },
    { path: '/Coupon', component: Coupon },
    { path: '/CouponContent', component: CouponContent },
    { path: '/Wallet', component: Wallet },
    { path: '/Integralshop', component: Integralshop, },
    { path: '/ShopDetils', component: ShopDetils },
    { path: '/ShopActivity', component: ShopActivity },
    { path: '/Rule', component: Rule },
    { path: '/VoucherDetails', component: VoucherDetails },
    { path: '/Balance', component: Balance },
    { path: '/Setpassword', component: Setpassword },
    { path: '/GroupPurchaseOrder', component: GroupPurchaseOrder },
    { path: '/GroupPurchaseOrderDetils', component: GroupPurchaseOrderDetils },
    { path: '/Authentication', component: Authentication },
    { path: '/Owner', component: Owner },
    { path: '/CouponAll', component: CouponAll },
    { path: '/CommonOrder', component: CommonOrder },
    { path: '/Recharge', component: Recharge },
    { path: '/Crab', component: Crab },
  ]
})
