import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '../config.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    inCart: [],
    userInfo: {
      name: '',
    },
    isLoggedin: false,
    productsData: [],
    productInfo:{},
  },
  actions: {
    setLoggedin({commit}, loggedIn) {
      if (typeof loggedIn === "string") {
        if (loggedIn == "true") {
          loggedIn = true;
        } else {
          loggedIn = false;
        }
      }
      commit('setLoginStatus', {loggedIn: loggedIn});
    },
    fetchProductsData({commit}) {
      axios
      .post(config.apiUrlProducts)
      .then((response) => {
        commit('setProductsData', response.data.products);
      })
      .catch(error => console.log(error));
    },
    fetchProductDetails({commit}, pid) {
      var params = new URLSearchParams();
      params.append('productId', pid);  
      axios
        .post(config.apiUrlProductDetail, params)      
        .then((response) => {
          commit('setProductInfo', response.data);
        })
        .catch(error => console.log(error));
    },
    updateQuantity({dispatch, commit}, data) {
      var userId;
      if (this.state.userInfo) {
        userId = this.state.userInfo.id;
      }
      if (!userId) {
        userId = 0;
      }
      var productId= data.id;
      var newQuantity = data.newQuantity;
      console.log('updateQ', userId, productId, newQuantity);
      let params = new URLSearchParams();
      params.append('userId', userId);
      params.append('productId', productId);
      params.append('quantity', newQuantity);
      axios
        .post(config.apiUrlUpdateQuantity, params)
        .then((response) =>{
          console.log('Quantity update success', response);
          dispatch('fetchCartItems');
        })
        .catch(error => console.log(error));
    },
    addToCart({dispatch, commit}, prodId) {
      var userId;
      if (this.state.userInfo) {
        userId = this.state.userInfo.id;
      }
      var productId= prodId;
      if (!this.state.isLoggedin) {
        userId = 0;
      }
      console.log('updateQ', userId, productId);
      let params = new URLSearchParams();
      params.append('userId', userId);
      params.append('productId', productId);
      params.append('quantity', 1);
      axios
        .post(config.apiUrlAddCart, params)
        .then((response) =>{
          console.log('Product add success', response);
          dispatch('fetchCartItems');
        })
        .catch(error => console.log(error));
    },
    fetchCartItems({commit}) {
      var userId;
      if (this.state.userInfo) {
        userId = this.state.userInfo.id;
      }
      if (!userId) {
        userId = 0;
      }
      var params = new URLSearchParams();
      params.append('userId', userId);
      axios
      .post(config.apiUrlGetCartProducts, params)
      .then((response) =>{
        console.log('GetCartProducts',response);  
        commit('setCartItems', response.data.products);
      })
      .catch(error => console.log(error));
    },
    removeProduct({dispatch, commit}, prodId) {
      var userId;
      if (this.state.userInfo) {
        userId = this.state.userInfo.id;
      }
      if (!userId) {
        userId = 0;
      }
      var params = new URLSearchParams();
      params.append('userId', userId);
      params.append('productId', prodId);
      axios
      .post(config.apiUrlRemoveProduct, params)
      .then((response) =>{
        dispatch('fetchCartItems');
      })
      .catch(error => console.log(error));
    },
    doLogin({dispatch, commit}, data) {
      return new Promise((resolve, reject) => {
        var params = new URLSearchParams();
        params.append('email', data.email);
        params.append('password', data.password);
        axios
          .post(
            config.apiUrlLogin,
            params
          )
          .then(response => {
            //  this.$store.commit("signUp",response.data);
            commit('signUp', response.data);
            dispatch('fetchCartItems');
            localStorage.setItem('isLoggedin', "true");
            localStorage.setItem('user', JSON.stringify(this.state.userInfo));
            dispatch('setLoggedin', 'true');
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
    })
    }
  },
  mutations: {
    setProductsData(state, productsData) {
      state.productsData = productsData;
    },
    setLoginStatus(state, data) {
            state.isLoggedin = data.loggedIn;
    },
    setProductInfo(state, product) {
         state.productInfo = product;
    },
    setCartItems(state, products) {
      state.inCart = products;
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
      state.userInfo = data;  
    },    
  },
  getters: {
    inCart: (state) => {
          return state.inCart;
        },
    getProductData(state) {
      return state.productsData;
    },
    getQuantity: (state) => (id) => {
        for (let index = 0; index < state.inCart.length; index++) {
          if (state.inCart[index].product_id == id) {
            return state.inCart[index].quantity;
          }
        }
        return 0;
      },
    getProductInfo(state) {
        return state.productInfo;
    },
    getProductById(state, id) {
      return state.products.find(product => product.id === id);
    },
    getLoginStatus(state) {
        return state.isLoggedin;
      },
    getUser(state) {
      console.log('userInfo', state.userInfo);
      return state.userInfo;
    },
  },
});
