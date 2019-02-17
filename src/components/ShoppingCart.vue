<template>
    <v-badge class="badgeMarginClass">
      <span slot="badge">{{numInCart}}</span>
      <v-icon>mdi-cart</v-icon>
    </v-badge>
</template>
<script>
export default {
    computed: {
    inCart() { return this.$store.getters.inCart; },
    numInCart() { return this.inCart.length; },
  },
}
</script>
<style>
.badgeMarginClass{
  margin-top: 20px;
  margin-right: 10px;
}
</style>


