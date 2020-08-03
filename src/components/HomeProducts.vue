<template>
  <v-row class="section" align="center" justify="space-around">
    <v-col
      v-for="product in products"
      :key="product._id"
      class="text-center"
      cols="12"
      md="3"
      sm="6"
    >
      <v-card ref="card">
        <v-img height="350px" :src="require(`@/assets/images/${product.image}`)"></v-img>
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
    async addToCart(item) {
      let newItemProp = {
        id: item._id,
        image: item.image,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: 1
      };

      const itemName = await this.$store.dispatch("addToCart", newItemProp);

      if (itemName) {
        this.name = itemName;
        this.snackbar = true;
      }

      this.$store.dispatch("updateCartState", true);
    }
  },

  computed: {
    ...mapState(["isInCart"])
  }
};
</script>

<style lang="scss" scoped>
</style>