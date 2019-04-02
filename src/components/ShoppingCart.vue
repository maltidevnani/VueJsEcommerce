<template>
  <div>
    <v-badge ref="cartIcon" class="badgeMarginClass" v-if="getLoginStatus">
      <span slot="badge">{{inCart.length}}</span>
      <v-icon v-on:click="showCart">mdi-cart</v-icon>
    </v-badge>
    <div ref="cartModal" id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span v-on:click="closeCart" class="close">&times;</span>
        <table class="table">
          <tbody>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            <tr v-for="item in inCart" :key="item.product_id">
              <td>{{ item.product_title }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.product_price * item.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div></div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters(['inCart', 'getLoginStatus']),
  },
  methods: {
    showCart: () => {
      console.log("Showing cart", this);
      document.getElementById("myModal").style.display = "block";
    },
    closeCart: () => {
      console.log("Showing cart", this);
      document.getElementById("myModal").style.display = "none";
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
  width: auto;
  border: 1px solid grey;
  padding: 5px 15px;
}
</style>


