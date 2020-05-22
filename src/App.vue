<template>
  <v-app id="inspire">
    <v-navigation-drawer width="400px" v-model="drawer" app right clipped>
      <v-list rounded v-for="product in products" :key="product.id">
        <CartItemCard :product="product" />
      </v-list>
      <v-list>
        <v-sheet class="ma-3" height="100">
          <v-row class="fill-height" align="center" justify="center">
            <h1 class="text-uppercase">total: $0.00</h1>
          </v-row>
        </v-sheet>
      </v-list>
      <template v-slot:append>
        <div class="py-2 px-6">
          <v-btn color="purple accent-3" block>Checkout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-right>
      <v-toolbar-title>{ WEBSTIE NAME }</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn shapped md color="purple accent-3" @click.stop="drawer = !drawer">
        <v-icon md color="white">mdi-cart-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <Landing />
        <Products :products="products" />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020 { Website Footer }</span>
    </v-footer>
  </v-app>
</template>

<script>
import Landing from "./components/Landing";
import Products from "./components/Products";
import CartItemCard from "./components/CartItemCard";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    Landing,
    Products,
    CartItemCard
  },

  data: () => ({
    drawer: false,
    toggleDark: true
  }),

  computed: {
    ...mapState(["products"])
  },

  async created() {
    this.$vuetify.theme.dark = this.toggleDark;

    try {
      await this.$store.dispatch("fetchProducts");
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="css" scoped>
.section {
  height: 85vh;
}

@media (max-width: 960px) {
  .section {
    height: 100%;
  }
}
</style>