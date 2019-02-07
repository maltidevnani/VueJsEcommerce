<template>
  <v-app>
    <v-container class="mainContainer" grid-list-md text-xs-center>
      <v-layout row wrap class="gridLayoutClass">
        <v-flex v-for="product in productsData" :key="product.id" xs4 sm6 md4>
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
                <v-btn absolute color="pink" class="white--text" fab large right top>
                  <v-icon>mdi-cart</v-icon>
                  <h5>0</h5>
                </v-btn>
                <div>
                  <h3 class="headline">{{product.title}}</h3>
                  <div>Located two hours south of</div>
                </div>
                <v-rating v-model="product.rating"></v-rating>
              </v-card-title>
              <v-card-actions class="justify-center">
                <v-btn dark color="blue">Share</v-btn>
                <v-btn dark color="blue" v-bind:id="product.id">View Detail</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      productsData: [
        {
          productImage: '/static/clothes.jpg',
          id: 1,
          title: 'Clothes',
          rating: 3,
          rate: '$12.99',
        },
        {
          productImage: '/static/jwellery.jpg',
          id: 2,
          title: 'Earing',
          rating: 4,
          rate: '$10.99',
        },
        {
          productImage: '/static/perfume.jpeg',
          id: 3,
          title: 'Perfume',
          rating: 5,
          rate: '$15.99',
        },
        {
          productImage: '/static/watches.jpg',
          id: 4,
          title: 'Watch',
          rating: 1,
          rate: '$19.99',
        },
        {
          productImage: '/static/choclate.jpg',
          id: 5,
          title: 'Choclate',
          rating: 2,
          rate: '$9.99',
        },
        {
          productImage: '/static/shooes.jpg',
          id: 6,
          title: 'Shooes',
          rating: 3,
          rate: '$24.99',
        },
      ],
    };
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
</style>

