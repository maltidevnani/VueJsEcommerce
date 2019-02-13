import Vue from 'vue';
import Router from 'vue-router';
import Payment from '@/components/Payment';
import Profile from '@/components/Profile';
import Products from '@/components/Products';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },

    {
      path: '/login',
      name: 'Login',
      component: Products,
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
    },
    {
      path: '/',
      name: 'Products',
      component: Profile,
    },
  ],
});
