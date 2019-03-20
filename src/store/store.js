import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    totalProductCount: 0,
    inCart: [],
    userInfo: {
      name: '',
    },
    isLoggedIn: false,
    productsData: [     
    ],
    productInfo:{},
  },
  mutations: {
    productsData(state, productsData) {
      state.productsData = productsData;
    },
    addToCart(state, data) {
      state.productsData.forEach((el) => {
        if (data.id === el.id) {
          el.quantity = data.quantity;
          console.log("Product quantity is " + el.quantity);
          if (state.inCart.indexOf(data.id) < 0) {
            state.inCart.push(data.id);
          }
        }
      });
    },
    addOrRemoveProduct(state, data) {
      state.productsData.forEach((el) => {
        if (data.id === el.id) {
          if (data.operation === 'add') {
            el.quantity += 1;
            if (state.inCart.indexOf(data.id) < 0) {
              state.inCart.push(data.id);
            }
          } else if (data.operation === 'remove' && el.quantity > 0) {            
            el.quantity -= 1;
            if (state.inCart.indexOf(data.id) > -1 && el.quantity === 0) {
              // remove that particular product whose quanity is 0
              let index=state.inCart.indexOf(data.id);
              state.inCart.splice(index,1);
            }
          } else {
            el.quantity = 0;
            
          }
          console.log(el.quantity);
        }
      });
    },
    addReview(state, data) {
      console.log('add review', data);
      state.productsData.forEach((el) => {
        if (data.id === el.id) {
          const review = {
            rId: el.reviews.length + 1,
            rName: data.name,
            rImage: '',
            review: data.review,
          };
          console.log(el);
          el.reviews.push(review);
        }
      });
    },
    signUp(state,data){
      console.log("use name is", data.name);    
      state.userInfo = data;  
      console.log("use data", state.userInfo);    
    },    
  },
  getters: {
    inCart: state => state.inCart,
    getProductData(state) {
      return state.productsData;
    },
    getProductById(state, id) {
      return state.products.find(product => product.id === id);
    },
  },
});
