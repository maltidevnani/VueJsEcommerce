<template>
  <div>
    <v-badge ref="cartIcon" class="badgeMarginClass">
      <span slot="badge">{{inCart.length}}</span>
      <v-icon @click.stop="dialog = true">mdi-cart</v-icon>
    </v-badge>
    <v-dialog v-model="dialog" persistent max-width="430">
      <v-card>
        <table
          v-for="item in inCart" :key="item.product_id"
          class="elevation-1"
          hide-actions
          hide-headers
        >
          <template>
            <v-btn color="error" small @click="removeProduct(item.product_id)">Remove</v-btn>
            <td class="text-xs-right" style="width:100px !important;" >{{ item.product_title }}</td>
            <v-btn fab dark small color="primary" @click="addOrRemoveProduct(item.product_id, 'remove', item.quantity)">
              <v-icon dark>remove</v-icon>
            </v-btn>
            <td style="width:30px;" class="text-xs-right">{{ item.quantity }}</td>
            <v-btn fab dark small color="primary" @click="addOrRemoveProduct(item.product_id, 'add', item.quantity)">
              <v-icon dark>add</v-icon>
            </v-btn>
            <td class="text-xs-right">{{ item.quantity * item.product_price }} $</td>
          </template>
        </table>
        <v-btn block  color="primary" @click="checkoutAction()">
          Checkout
        </v-btn>
        <v-btn block  dark  color="pink" @click="dialog = false">
          Continue Shopping
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['inCart', 'getLoginStatus']),
  },
  methods: {
    ...mapActions(['fetchProductDetails', 'updateQuantity', 'fetchCartItems', 'addToCart', 'removeProduct']),
    addOrRemoveProduct(id, operation, quantity) {
      if (operation == 'add') {
        if (quantity == 0) {
          quantity = parseInt(quantity) + 1;
          this.addToCart(id, quantity);
          return;
        }
        quantity = parseInt(quantity) + 1;
      }
     else {
        if (quantity == 0) {
          return;
        }
        else if (quantity == 1) {
          quantity =  0;
          this.removeProduct(id);
          return;
        }
        quantity =  parseInt(quantity) - 1;
      }
      this.updateQuantity({id: id, operation: operation, newQuantity: quantity});
    },
    checkoutAction() {
      console.log('::checkoutAction::')
      this.dialog = false;
      this.$router.push({name: 'Profile'});
    }
  }
};
</script>
<style>
.badgeMarginClass {
  margin-top: 20px;
  margin-right: 10px;
}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 350px; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

td,
th {
  color: black;
  text-align: center;
  width: 100px;
  border: 1px solid grey;
  padding: 5px 15px;
  border: 0;
}
</style>


