<template>
  <v-row class="section" align="center" justify="space-around">
    <v-col
      v-for="product in products"
      :key="product.id"
      class="text-center"
      cols="12"
      md="3"
      sm="6"
    >
      <v-card ref="card">
        <v-img height="350px" src="@/assets/images/box-brownies.jpeg"></v-img>
        <v-card-title>{{product.name}}</v-card-title>
        <v-card-text>{{product.description}}</v-card-text>
        <v-card-actions>
          <v-btn block class="mx-auto" color="purple accent-3">Add to cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <v-card>
        <v-img height="530px" src="@/assets/images/custom-brownie.jpg">
          <v-overlay absolute>
            <BuildBox :cart="cart" :cartStep="cartStep" />
          </v-overlay>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BuildBox from "../components/BuildBox";

export default {
  name: "products-section",

  props: ["products"],

  components: {
    BuildBox
  },

  data() {
    return {
      cart: false,
      cartStep: 1
    };
  }
};
</script>

<style lang="scss" scoped>
</style>