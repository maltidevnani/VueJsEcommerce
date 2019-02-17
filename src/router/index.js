import Vue from 'vue';
import Router from 'vue-router';
import Payment from '@/components/Payment';
import Profile from '@/components/Profile';
import Products from '@/components/Products';
import ProductDetail from '@/components/ProductDetail';
import Comments from '@/components/Comments';
import Login from '@/components/Login';
import ShoppingCart from '@/components/ShoppingCart';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/shopping',
      name: 'ShoppingCart',
      component: ShoppingCart,
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/productDetail/:Pid',
      name: 'productDetail',
      component: ProductDetail,
      props: true,
    },
    {
      path: '/comments/:Pid',
      name: 'commentPage',
      component: Comments,
      props: true,
    },
    {
      path: '/',
      name: 'Products',
      component: Products,
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
    },
  ],
});
