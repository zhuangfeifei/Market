import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['@/pages/index'], resolve)
const Home = resolve => require(['@/pages/Home'], resolve)
const Brand = resolve => require(['@/pages/Brand'], resolve)
const Discount = resolve => require(['@/pages/Discount'], resolve)
const Introduce = resolve => require(['@/pages/Introduce'], resolve)
const DiscountItem = resolve => require(['@/pages/DiscountItem'], resolve)
const My = resolve => require(['@/pages/My'], resolve)
const Card = resolve => require(['@/pages/Card'], resolve)

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
        path: '/My',
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
  ]
})
