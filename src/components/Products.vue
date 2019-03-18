<template>
  <v-app>
    <v-container class="mainContainer" grid-list-md text-xs-center>
      <v-layout row wrap class="gridLayoutClass">
        <v-flex v-for="product in $store.state.productsData" :key="product.id" xs4 sm6 md4>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              class="mx-auto, mainCardClass"
              color="grey lighten-4"
              max-width="600">
              <v-img :aspect-ratio="16/9" :src="product.productImage">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out
                     black darken-3 v-card--reveal display-3 white--text"
                    style="height: 100%;">{{product.rate}}</div>
                </v-expand-transition>
              </v-img>
              <v-card-title primary-title class="pt-4" style="position: relative;">
                <div>
                  <h3 class="subheadingClass">{{product.title}}</h3>
                  <h4 class="subheadingClass">$ {{product.rate}}</h4>
                   <v-rating class="justify-center" v-model="product.rating"></v-rating>
                   <h4 class="subheadingClass"
                   v-bind:id="product.quantity">Quantity: {{product.quantity}}</h4>
                </div>
                </v-card-title>
                <v-card-actions class="justify-center">
                <v-btn dark color="blue" v-bind:id="product.id"
                @click="addProduct(product)">Add To Cart</v-btn>
                <v-btn dark color="blue" v-bind:id="product.id"
                 @click="moveToProductDetail(product.id)">View Detail</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: 'products',
  data() {
    return {
      totalCountProduct: 0,
    };
  },
  mounted () {
    axios
      .post('https://localhost:5566/ecommerceassignment1_backend/ecommerceassignment2_backend/api/getProductList.php')
      .then(response => (this.$store.state.productsData= response))
      .catch(error => console.log(error));
      console.log(this.$store.stateproductsData);
  },
  methods: {
    moveToProductDetail(id) {
      console.log(id);
      this.$router.push({ name: 'productDetail', params: { Pid: id } });
    },
    addProduct(prod) {
      console.log(prod);
         const data = {
          id: prod.id,
          quantity: prod.quantity + 1,
        };
      console.log(data);
      this.$store.commit('addToCart', data);
    },
  },
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

