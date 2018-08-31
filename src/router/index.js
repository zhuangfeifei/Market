import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['@/pages/index'], resolve)

const Home = resolve => require(['@/pages/Home/Home'], resolve)
const Introduce = resolve => require(['@/pages/Home/Introduce'], resolve)
const ShopActivity = resolve => require(['@/pages/Home/ShopActivity'], resolve)

const Brand = resolve => require(['@/pages/Brand/Brand'], resolve)
const ShopDetils = resolve => require(['@/pages/Brand/ShopDetils'], resolve)
const VoucherDetails = resolve => require(['@/pages/Brand/VoucherDetails'], resolve)
const GroupPurchaseOrder = resolve => require(['@/pages/Brand/GroupPurchaseOrder'], resolve)
const GroupPurchaseOrderDetils = resolve => require(['@/pages/Brand/GroupPurchaseOrderDetils'], resolve)

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
    {
      path: '/Introduce',
      component: Introduce,
      meta:{
        index:3,
        // keepAlive: true
      }
    },
    {
      path: '/DiscountItem',
      component: DiscountItem,
      meta:{
        index:3
      }
    },
    {
      path: '/Card',
      component: Card,
      meta:{
        index:3
      }
    },
    {
      path: '/Opencard',
      component: Opencard,
      meta:{
        index:3
      }
    },
    {
      path: '/Membership',
      component: Membership,
      meta:{
        index:3
      }
    },
    {
      path: '/Coupon',
      component: Coupon,
      meta:{
        index:3
      }
    },
    {
      path: '/CouponContent',
      component: CouponContent,
      meta:{
        index:3
      }
    },
    {
      path: '/Wallet',
      component: Wallet,
      meta:{
        index:3
      }
    },
    {
      path: '/Integralshop',
      component: Integralshop,
      meta:{
        index:3
      }
    },
    {
      path: '/ShopDetils',
      component: ShopDetils,
      meta:{
        index:3
      }
    },
    {
      path: '/ShopActivity',
      component: ShopActivity,
      meta:{
        index:3
      }
    },
    {
      path: '/Rule',
      component: Rule,
      meta:{
        index:3
      }
    },
    {
      path: '/VoucherDetails',
      component: VoucherDetails,
      meta:{
        index:3
      }
    },
    {
      path: '/Balance',
      component: Balance,
      meta:{
        index:3
      }
    },
    {
      path: '/Setpassword',
      component: Setpassword,
      meta:{
        index:3
      }
    },
    {
      path: '/GroupPurchaseOrder',
      component: GroupPurchaseOrder,
      meta:{
        index:3
      }
    },
    {
      path: '/GroupPurchaseOrderDetils',
      component: GroupPurchaseOrderDetils,
      meta:{
        index:3
      }
    },
    {
      path: '/Authentication',
      component: Authentication,
      meta:{
        index:3
      }
    },
    {
      path: '/Owner',
      component: Owner,
      meta:{
        index:3
      }
    },
  ]
})
