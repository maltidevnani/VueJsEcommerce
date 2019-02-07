import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Payment from '@/components/Payment';
import Products from '@/components/Products';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
    },
    {
      path: '/',
      name: 'Products',
      component: Products,
    },
  ],
});
