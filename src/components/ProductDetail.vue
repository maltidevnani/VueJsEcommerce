<template>
    <v-app>
    <v-layout row child-flex justify-center align-center wrap >
    <v-flex md6>
        <div class="myCardClass">
       <v-card >
        <v-img :src="getProductInfo.product_image"  aspect-ratio="2.50"></v-img>
        <v-card-title>
          <div class="divContentClass">
            <h4 class="subheadingClass">{{getProductInfo.product_title}}</h4>
            <h3 class="subheadingClass">{{getProductInfo.product_description}}</h3>
            <h3 class="subheadingClass">$ {{getProductInfo.product_price}}</h3>
            <v-rating class="justify-center" v-model="getProductInfo.product_rating"></v-rating>
             <v-card-actions class="justify-center">
            <v-btn  color="blue" class="white--text"
            @click="goToReviews(getProductInfo.product_id, 'add')">Add Review</v-btn>
            <v-btn  color="blue" class="white--text"
             @click="goToReviews(getProductInfo.product_id, 'view')">View Reviews</v-btn>
            </v-card-actions>
          </div>
        </v-card-title>
        <v-card-actions class="justify-center">
            <v-btn  color="blue" class="white--text"
            @click="addOrRemoveProduct(proId, 'add')">Add</v-btn>
            <v-btn  color="white" class="grey--text,subheadingClass">
              {{ quantity| convertToNum }}
            </v-btn>
            <v-btn color="blue" class="white--text"
             @click="addOrRemoveProduct(proId, 'remove')">Remove</v-btn>
        </v-card-actions>
      </v-card>
      </div>
      </v-flex>
  </v-layout>
</v-app>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
export default {
     name: 'productDetail',
  data() {
    return {
        proId: this.$route.params.Pid,
        quantity: this.$route.params.quantity
    };
  },
   computed: {
    ...mapGetters(['getQuantity', 'getProductInfo']),
   },
   created() {
    this.fetchProductDetails(this.proId);
   },
  methods: {
    ...mapActions(['fetchProductDetails', 'updateQuantity', 'fetchCartItems', 'addToCart', 'removeProduct']),
    addOrRemoveProduct(id, operation) {
      if (operation == 'add') {
        if (this.quantity == 0) {
          this.quantity = parseInt(this.quantity) + 1;
          this.addToCart(id, this.quantity);
          return;
        }
        this.quantity = parseInt(this.quantity) + 1;
      }
     else {
        if (this.quantity == 0) {
          return;
        }
        else if (this.quantity == 1) {
          this.quantity =  0;
          this.removeProduct(id);
          return;
        }
        this.quantity =  parseInt(this.quantity) - 1;
      }
      this.updateQuantity({id: id, operation: operation, newQuantity: this.quantity});
    },
    goToReviews(id, mode) {
      console.log(id);
      this.$router.push({ name: 'commentPage', params: { Pid: id, mode: mode } });
    },
  },
  // filter added to check true or false on remove of product
  filters: {
    convertToNum(value){
      if(typeof value === 'boolean'){
         return  value ? 1: 0;
      }else{
        return value;
      }
    }
  }
};
</script>

<style scoped>
.subheadingClass{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
}
.myCardClass{
    margin-top: 75px;
}
.divContentClass{
    margin: auto;
}
</style>

