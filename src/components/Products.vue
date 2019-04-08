<template>
  <v-app>
    <v-container class="mainContainer" grid-list-md text-xs-center>
      <v-layout row wrap class="gridLayoutClass">
        <v-flex v-for="product in getProductData" :key="product.product_id" xs4 sm6 md4>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              class="mx-auto, mainCardClass"
              color="grey lighten-4"
              max-width="600">
              <v-img :aspect-ratio="16/9" :src="product.product_image">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out
                     black darken-3 v-card--reveal display-3 white--text"
                    style="height: 100%;">{{product.product_price}}</div>
                </v-expand-transition>
              </v-img>
              <v-card-title primary-title class="pt-4" style="position: relative;">
                <div>
                  <h3 class="subheadingClass">{{product.product_title}}</h3>
                  <h4 class="subheadingClass">$ {{product.product_price}}</h4>
                   <v-rating class="justify-center" v-model="product.product_rating"></v-rating>
                   <h4 class="subheadingClass">
                   Quantity: {{getQuantity(product.product_id)}}</h4>
                </div>
                </v-card-title>
                <v-card-actions class="justify-center">
                  <v-btn dark color="blue" v-bind:id="product.product_id" v-if="getQuantity(product.product_id) == 0"
                  @click="addToCart(product.product_id)">Add To Cart</v-btn>
                  <v-btn dark color="red" v-bind:id="product.product_id" v-if="getQuantity(product.product_id) != 0"
                  @click="removeProduct(product.product_id)" >Remove From Cart</v-btn>
                <v-btn dark color="blue" v-bind:id="product.product_id"
                 @click="moveToProductDetail(product.product_id, getQuantity(product.product_id))">View Detail</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'products',
  data() {
    return {
      totalCountProduct: 0,
      productQuantiy:0,
      
    };
  },
  computed: {
    ...mapGetters(['getQuantity', 'getProductData']),
  },
  created () {
    this.fetchProductsData();
    this.fetchCartItems();
   },
  methods: { ...mapActions(['fetchProductsData', 'addToCart', 'fetchCartItems', 'removeProduct']),
    moveToProductDetail(id, quantity) {
      this.$router.push({ name: 'productDetail', params: { Pid: id, quantity: quantity } });
     },
  }
};
</script>
<style>
.mainContainer {
  margin-top: 130px;
}
.gridLayoutClass {
  padding: 20px;
}
.mainCardClass {
  margin: 20px;
  padding-bottom: 10px;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.headline{
  margin-top: 10px;
  margin-left: 0px;
  padding-left: 0px;
  text-align: left;
  font-weight: bold;
}
.subheadingClass{
  text-align: left;
}

.v-btn--floating.v-btn--absolute, .v-btn--floating.v-btn--fixed {
  z-index: 0;
}

</style>

