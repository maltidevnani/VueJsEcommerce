<template>
<v-app>
<v-toolbar fixed="true" dark color="primary">
  <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="toolbarTitleClass">One Stop Shopping Center</v-toolbar-title>
    <v-spacer></v-spacer>
    <ShoppingCart/>
    <v-toolbar-items class="hidden-sm-and-down">     
      <v-btn flat to="/login" class="white--text">LogIn</v-btn>
      <v-btn flat to="/profile" class="white--text">SignUp</v-btn>
      </v-toolbar-items>
      </v-toolbar>
  <router-view></router-view>
</v-app>
</template>

<script>
import Product from '@/components/Products';
import ShoppingCart from '@/components/ShoppingCart';
export default {  
  name: 'App',
   data() {
    return {
    };
  },
  computed: {
    inCart() { return this.$store.getters.inCart; },
    numInCart() { return this.inCart.length; },
  },
  components: {
    Product,
    ShoppingCart,
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }
.toolbarTitleClass{
  font-family: cursive;
  color: white;
  font-weight: bolder;
}
.badgeMarginClass{
  margin-top: 20px;
  margin-right: 10px;
}
</style>
