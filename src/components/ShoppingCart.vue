<template>
  <div>
    <table class="table">
            <tbody>
              <tr v-for="item in cart" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.quantity }}</td>
              </tr>
            </tbody>
          </table>
    <button class="btn btn-primary" data-toggle="modal" data-target="#shoppingCart">Cart ({{ numInCart }})</button>
    <div id="shoppingCart" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Shopping cart</h5>
            <button class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">Keep shopping</button>
            <button class="btn btn-primary">Check out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    computed: {
      inCart() { return this.$store.getters.inCart; },
      numInCart() { return this.inCart.length; },
      cart() {
        return this.$store.getters.inCart.map((cartItem) => {
          return this.$store.getters.getProductData.find((forSaleItem) => {
            return cartItem === forSaleItem.id;
          });
        });
      },
  },
}
</script>
<style>
.badgeMarginClass{
  margin-top: 20px;
  margin-right: 10px;
}
</style>


