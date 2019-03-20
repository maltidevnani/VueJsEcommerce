<template>
    <v-app>
    <v-layout row child-flex justify-center align-center wrap >
    <v-flex md6>
        <div class="myCardClass">
       <v-card >
        <v-img :src="this.$store.state.productInfo.product_image"  aspect-ratio="2.50"></v-img>
        <v-card-title>
          <div class="divContentClass">
            <h4 class="subheadingClass">{{this.$store.state.productInfo.product_title}}</h4>
            <h3 class="subheadingClass">{{this.$store.state.productInfo.product_description}}</h3>
            <h3 class="subheadingClass">$ {{this.$store.state.productInfo.product_price}}</h3>
            <v-rating class="justify-center" v-model="this.$store.state.productInfo.product_rating"></v-rating>
             <v-card-actions class="justify-center">
            <v-btn  color="blue" class="white--text"
            @click="goToReviews(productId, 'add')">Add Review</v-btn>
            <v-btn  color="blue" class="white--text"
              @click="goToReviews(productId, 'view')">View Reviews</v-btn>
            </v-card-actions>
          </div>
        </v-card-title>
        <v-card-actions class="justify-center">
            <v-btn  color="blue" class="white--text"
            @click="addOrRemoveProduct(productId, 'add')">Add</v-btn>
            <v-btn  color="white" class="grey--text,subheadingClass"
            ></v-btn>
            <v-btn color="blue" class="white--text"
             @click="addOrRemoveProduct(productId, 'remove')">Remove</v-btn>
        </v-card-actions>
      </v-card>
      </div>
      </v-flex>
  </v-layout>
</v-app>
</template>
<script>
import axios from 'axios';
export default {
     name: 'productDetail',
  data() {
    return {
        proId: this.$route.params.Pid,
    };
  },
   computed: {
      productId () {
      console.log("product id in product detail",this.$store.state.productInfo.product_id);
      return this.$store.state.productInfo.product_id;
    },
    },
  mounted () {
    console.log(this.proId);
   var params = new URLSearchParams();
   params.append('productId', this.proId);  
    axios
      .post('http://localhost:5566/ecommerceassignment1_backend/ecommerceassignment2_backend/api/getProductDetail.php',
      params)      
      .then((response) =>{
        console.log(response);  
        this.$store.state.productInfo = response.data;
        console.log("productDetail is",this.$store.state.productInfo);
      })
      .catch(error => console.log(error));
  },
  methods: {
    addOrRemoveProduct(id, operation) {
      this.$store.commit('addOrRemoveProduct', {id: id, operation: operation});
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

<style>
.subheadingClass{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}
.myCardClass{
    margin-top: 100px;
}
.divContentClass{
    margin: auto;
}
</style>

