<template>
    <v-app>
    <v-layout row child-flex justify-center align-center wrap >
    <v-flex md6>
        <div class="myCardClass"
      v-for="product in $store.state.productsData" :key="product.id">
       <v-card v-if="proId == product.id">
        <v-img :src="product.productImage"  aspect-ratio="2.50"></v-img>
        <v-card-title>
          <div class="divContentClass">
            <h4 class="subheadingClass">{{product.title}}</h4>
            <h3 class="subheadingClass">{{product.productDetail}}</h3>
            <h3 class="subheadingClass">$ {{product.rate}}</h3>
            <v-rating class="justify-center" v-model="product.rating"></v-rating>
             <v-card-actions class="justify-center">
            <v-btn  color="blue" class="white--text"
            @click="goToReviews(product.id, 'add')">Add Review</v-btn>
            <v-btn  color="blue" class="white--text"
              @click="goToReviews(product.id, 'view')">View Reviews</v-btn>
            </v-card-actions>
          </div>
        </v-card-title>
        <v-card-actions class="justify-center">
            <v-btn  color="blue" class="white--text"
            @click="addOrRemoveProduct(product.id, 'add')">Add</v-btn>
            <v-btn  color="white" class="grey--text,subheadingClass"
            v-model="product.quantity">{{product.quantity | convertToNum }}</v-btn>
            <v-btn color="blue" class="white--text"
             @click="addOrRemoveProduct(product.id, 'remove')">Remove</v-btn>
        </v-card-actions>
      </v-card>
      </div>
      </v-flex>
  </v-layout>
</v-app>
</template>
<script>
export default {
     name: 'productDetail',
  data() {
    return {
        proId: this.$route.params.Pid,
    };
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

