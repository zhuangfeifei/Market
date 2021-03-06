import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['@/pages/index'], resolve)

const Home = resolve => require(['@/pages/Home/Home'], resolve)
const Introduce = resolve => require(['@/pages/Home/Introduce'], resolve)
const ShopActivity = resolve => require(['@/pages/Home/ShopActivity'], resolve)
const CouponAll = resolve => require(['@/pages/Home/CouponAll'], resolve)
const Crab = resolve => require(['@/pages/Home/Crab'], resolve)
const GoodsDetails = resolve => require(['@/pages/Home/GoodsDetails'], resolve)
const CreateGoods = resolve => require(['@/pages/Home/CreateGoods'], resolve)
const OrdersSubmitted = resolve => require(['@/pages/Home/OrdersSubmitted'], resolve)
const Classification = resolve => require(['@/pages/Home/Classification'], resolve)
const Goods = resolve => require(['@/pages/Home/Goods'], resolve)
const Address = resolve => require(['@/pages/Home/address/Address'], resolve)
const AddAddress = resolve => require(['@/pages/Home/address/AddAddress'], resolve)
const NewYears = resolve => require(['@/pages/Home/NewYears'], resolve)
const Vouchers = resolve => require(['@/pages/Home/Vouchers'], resolve)
const LuckyDraw = resolve => require(['@/pages/Home/LuckyDraw'], resolve)
const GoodStatus = resolve => require(['@/pages/Home/GoodStatus'], resolve)
const SecondsKill = resolve => require(['@/pages/Home/SecondsKill'], resolve)

const ShoppingCart = resolve => require(['@/pages/ShoppingCart/ShoppingCart'], resolve)
const CreateGoodsCart = resolve => require(['@/pages/ShoppingCart/CreateGoodsCart'], resolve)
const Result = resolve => require(['@/pages/ShoppingCart/Result'], resolve)
const Return = resolve => require(['@/pages/ShoppingCart/Return'], resolve)

const Brand = resolve => require(['@/pages/Brand/Brand'], resolve)
const ShopDetils = resolve => require(['@/pages/Brand/ShopDetils'], resolve)
const VoucherDetails = resolve => require(['@/pages/Brand/VoucherDetails'], resolve)
const GroupPurchaseOrder = resolve => require(['@/pages/Brand/GroupPurchaseOrder'], resolve)
const GroupPurchaseOrderDetils = resolve => require(['@/pages/Brand/GroupPurchaseOrderDetils'], resolve)
const CommonOrder = resolve => require(['@/pages/Brand/CommonOrder'], resolve)
const CommonOrderDetils = resolve => require(['@/pages/Brand/CommonOrderDetils'], resolve)
const Logistics = resolve => require(['@/pages/Brand/Logistics'], resolve)

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
const IntegralshopDetails = resolve => require(['@/pages/My/IntegralshopDetails'], resolve)
const MyIntegral = resolve => require(['@/pages/My/MyIntegral'], resolve)
const Password = resolve => require(['@/pages/My/Password'], resolve)
const NewPassword = resolve => require(['@/pages/My/NewPassword'], resolve)

const Discount = resolve => require(['@/pages/Activity/Discount'], resolve)
const DiscountItem = resolve => require(['@/pages/Activity/DiscountItem'], resolve)
const Promotion = resolve => require(['@/pages/Activity/Promotion'], resolve)

Vue.use(Router)

// Router.prototype.go = function () {
//  this.isBack = true
//  window.history.go(-1)
// }


export default new Router({
  routes: [
    {
      path: '/', component: index, meta:{ index:0, keepAlive: false },
      children:[
        { path: '/',name:'Home', component: Home, meta:{ index:1, keepAlive: true } },
        { path: 'Classification',name:'Classification', component: Classification, meta:{ index:2, keepAlive: true } },
        { path: 'Brand',name:'Brand', component: Brand, meta:{ index:2, keepAlive: true } },
        { path: 'Discount', component: Discount, meta:{ index:2, keepAlive: false } },
        { path: 'ShoppingCart', component: ShoppingCart, meta:{ index:2, keepAlive: false } },
        { path: 'My',name:'My', component: My, meta:{ index:2, keepAlive: true } }
      ]
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
    { path: '/ShopActivity',name:'ShopActivity', component: ShopActivity, meta:{ keepAlive: true } },
    { path: '/Rule', component: Rule },
    { path: '/VoucherDetails', component: VoucherDetails },
    { path: '/Balance', component: Balance },
    { path: '/Setpassword', component: Setpassword },
    { path: '/GroupPurchaseOrder', component: GroupPurchaseOrder },
    { path: '/GroupPurchaseOrderDetils', component: GroupPurchaseOrderDetils },
    { path: '/Authentication', component: Authentication },
    { path: '/Owner', component: Owner },
    { path: '/CouponAll', component: CouponAll },
    { path: '/CommonOrder',name:'CommonOrder', component: CommonOrder, meta:{ keepAlive: true } },
    { path: '/CommonOrderDetils', component: CommonOrderDetils },
    { path: '/Recharge', component: Recharge },
    { path: '/Crab', component: Crab, meta:{ keepAlive: false } },
    { path: '/GoodsDetails',name:'GoodsDetails', component: GoodsDetails },
    { path: '/CreateGoods', component: CreateGoods },
    { path: '/OrdersSubmitted', component: OrdersSubmitted },
    { path: '/CreateGoodsCart', component: CreateGoodsCart },
    { path: '/Goods',name:'Goods', component: Goods, meta:{ keepAlive: true } },
    { path: '/Address', component: Address },
    { path: '/AddAddress', component: AddAddress },
    { path: '/Result', component: Result },
    { path: '/Return', component: Return },
    { path: '/NewYears', component: NewYears },
    { path: '/Vouchers', component: Vouchers },
    { path: '/LuckyDraw', component: LuckyDraw },
    { path: '/IntegralshopDetails', component: IntegralshopDetails },
    { path: '/MyIntegral', component: MyIntegral },
    { path: '/Password', component: Password },
    { path: '/NewPassword', component: NewPassword },
    { path: '/Logistics', component: Logistics },
    { path: '/GoodStatus', name:'GoodStatus', component: GoodStatus, meta:{ keepAlive: false } },
    { path: '/Promotion', component: Promotion },
    { path: '/SecondsKill', component: SecondsKill },
  ]
})
