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
        <v-card-subtitle>{{product.description}}</v-card-subtitle>
        <v-card-text>{{product.price | currency}}</v-card-text>
        <v-card-actions>
          <v-btn
            block
            class="mx-auto"
            color="purple accent-3"
            @click="addToCart(product)"
          >Add to cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <v-card>
        <v-img height="530px" src="@/assets/images/custom-brownie.jpg">
          <v-overlay absolute>
            <BuildBox />
          </v-overlay>
        </v-img>
      </v-card>
    </v-col>
    <v-snackbar
      v-model="snackbar"
      bottom
      color="red"
      :timeout="timeout"
      class="text-center"
    >{{name}} is already in your cart!</v-snackbar>
  </v-row>
</template>

<script>
import BuildBox from "../components/BuildBox";
import { mapState } from "vuex";

export default {
  name: "products-section",

  props: ["products", "index"],

  components: {
    BuildBox
  },

  data() {
    return {
      timeout: 2000,
      name: "",
      snackbar: false
    };
  },

  methods: {
    addToCart(item) {
      const { id, name, description, price } = item;

      this.name = name;

      let newItemProp = {
        id,
        name,
        description,
        price,
        quantity: 1
      };

      this.$store.dispatch("addToCart", newItemProp);

      if (this.isInCart) this.snackbar = true;
      //open nav drawer
    }
  },

  computed: {
    ...mapState(["isInCart"])
  }
};
</script>

<style lang="scss" scoped>
</style>