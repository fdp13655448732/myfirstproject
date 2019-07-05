//动态路由模块化
import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//定义组件
import Header from './components/header/Header.vue'
import Goods from './components/goods/Goods.vue'
import Seller from './components/seller/Seller.vue'
import Ratings from './components/ratings/Ratings.vue'

//定义路由
const routes = [
    { path: '/header', component: Header },
    { path: '/goods', component: Goods },
    { path: '/seller', component: Seller },
    { path: '/ratings', component: Ratings },
    { path: '/', redirect: '/goods' }
  ];
  const router = new VueRouter({
    linkActiveClass: 'active',
    routes: routes
  });
  export default router
