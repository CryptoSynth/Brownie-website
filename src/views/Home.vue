<template>
  <v-container fluid>
    <Landing />
    <Products :quantity="quantity" :products="products" />
  </v-container>
</template>

<script>
import Landing from "../components/Landing";
import Products from "../components/Products";
import { mapState } from "vuex";

export default {
  name: "home",

  components: {
    Landing,
    Products
  },

  computed: {
    ...mapState(["products", "cart", "quantity", "drawer"])
  }
};
</script>

<style>
</style>