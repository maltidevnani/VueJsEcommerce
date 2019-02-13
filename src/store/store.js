import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    totalProductCount: 0,
    inCart: [],
    productsData: [
      {
        productImage: '/static/clothes.jpg',
        id: 1,
        title: 'Clothes',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        rating: 3,
        rate: '$12.99',
        quantity: 0,
        reviews: [
          {
            rId: 1,
            rName: 'Sohela',
            rImage: '',
            review: 'Really pretty clothes',
          },
          {
            rId: 2,
            rName: 'Lyndsy',
            rImage: '',
            review: 'clothes are good',
          },
          {
            rId: 3,
            rName: 'Kate',
            rImage: '',
            review: 'Value for money',
          },
        ],
      },
      {
        productImage: '/static/jwellery.jpg',
        id: 2,
        title: 'Earing',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        rating: 4,
        rate: '$10.99',
        quantity: 0,
        reviews: [
          {
            rId: 1,
            rName: 'Sohela',
            rImage: '',
            review: 'Classy earings',
          },
          {
            rId: 2,
            rName: 'Lyndsy',
            rImage: '',
            review: 'Happy to buy these earings',
          },
          {
            rId: 3,
            rName: 'kate',
            rImage: '',
            review: 'Earings are so beautiful',
          },
        ],
      },
      {
        productImage: '/static/perfume.jpeg',
        id: 3,
        title: 'Perfume',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        rating: 5,
        rate: '$15.99',
        quantity: 0,
        reviews: [
          {
            rId: 1,
            rName: 'Sohela',
            rImage: '',
            review: 'I loved this perfume',
          },
          {
            rId: 2,
            rName: 'lyndsy',
            rImage: '',
            review: 'It smells so good',
          },
          {
            rId: 3,
            rName: 'kate',
            rImage: '',
            review: 'Worth for money',
          },
        ],
      },
      {
        productImage: '/static/watches.jpg',
        id: 4,
        title: 'Watch',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        rating: 1,
        rate: '$19.99',
        quantity: 0,
        reviews: [
          {
            rId: 1,
            rName: 'Sohela',
            rImage: '',
            review: 'Most beautiful watch',
          },
          {
            rId: 2,
            rName: 'Malti',
            rImage: '',
            review: 'Very classy watch',
          },
          {
            rId: 3,
            rName: 'kate',
            rImage: '',
            review: 'Its an amazing watch',
          },
        ],
      },
      {
        productImage: '/static/choclate.jpg',
        id: 5,
        title: 'Chocolate',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        rating: 2,
        rate: '$9.99',
        quantity: 0,
        reviews: [
          {
            rId: 1,
            rName: 'Ankit',
            rImage: '',
            review: 'Good choclates',
          },
          {
            rId: 2,
            rName: 'Ammar',
            rImage: '',
            review: 'Tasty choclates',
          },
          {
            rId: 3,
            rName: 'Malti',
            rImage: '',
            review: 'Delicious choclates',
          },
        ],
      },
      {
        productImage: '/static/shooes.jpg',
        id: 6,
        title: 'Shooes',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        rating: '3',
        rate: '$24.99',
        quantity: 0,
        reviews: [
          {
            rId: 1,
            rName: 'Sohela',
            rImage: '',
            review: 'Good shooes',
          },
          {
            rId: 2,
            rName: 'kate',
            rImage: '',
            review: 'Comfortable to wear',
          },
          {
            rId: 3,
            rName: 'Malti',
            rImage: '',
            review: 'Loved it',
          },
        ],
      },
    ],
  },
  mutations: {
    productsData(state, productsData) {
      state.productsData = productsData;
    },
    updateTotalProductCount(state){
      
      console.log("Malti Calling");      
    },
    addToCart(state, data) {
      state.productsData.forEach((el) => {
        if (data.id === el.id) {
          el.quantity = data.quantity;
          console.log("Product quantity is " + el.quantity);
          state.inCart.push(data.id);
          console.log("Product id is " + el.quantity);
        }
      });
    },
    
  },
  getters: {
    
    getProductData(state) {
      return state.productsData;
    },
    getProductById(state, id) {
      return state.products.find(product => product.id === id);
    },
  },
});
