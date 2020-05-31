<template>
  <v-container fluid>
    <!--User menu and drawer -->

    <v-app-bar app clipped-right>
      <v-toolbar-title>Brownie Inc.</v-toolbar-title>
      <v-spacer></v-spacer>
      <Login />
      <v-btn shapped md color="purple accent-3" @click.stop="updateCartState = !updateCartState">
        <v-badge
          light
          offset-y="-7"
          offset-x="-22"
          bordered
          v-if="getCartQuantity !== 0"
          color="pink accent-3"
          :content="getCartQuantity"
        ></v-badge>
        <v-icon md color="white">mdi-cart-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer width="400px" v-model="updateCartState" app right clipped>
      <v-list dense rounded>
        <v-list-item v-for="(item, index) in cart" :key="item.id">
          <v-list-item-content>
            <CartItemCard :cart="cart" :quantity="quantity" :index="index" :item="item" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-sheet height="100">
              <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                  <h1 class="text-uppercase">total: {{total | currency}}</h1>
                </v-row>
              </v-container>
            </v-sheet>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="py-2 px-6">
          <v-btn color="purple accent-3" block>Checkout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <Landing />
    <Products :quantity="quantity" :products="products" />
  </v-container>
</template>

<script>
import Landing from "../components/Landing";
import Products from "../components/Products";
import CartItemCard from "../components/CartItemCard";
import Login from "../components/Login";
import { mapState, mapGetters } from "vuex";

export default {
  name: "home",

  data() {
    return {
      toggleDark: true
    };
  },

  components: {
    Landing,
    Products,
    Login,
    CartItemCard
  },

  computed: {
    ...mapState(["products", "cart", "quantity", "drawer"]),
    ...mapGetters(["getCartQuantity"]),

    total() {
      let totalItemPrice = 0;

      if (this.cart.length === 0) return (totalItemPrice = 0);

      this.cart.forEach(item => {
        totalItemPrice = totalItemPrice + item.price * item.quantity;
      });

      return totalItemPrice;
    },

    updateCartState: {
      get() {
        return this.drawer;
      },
      set(isOpen) {
        this.$store.dispatch("updateCartState", isOpen);
      }
    }
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

<style lang=css>
.section {
  height: 85vh;
}

/* ::-webkit-scrollbar {
  width: 18px;
  background-color: black;
}
::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 10px;
  background-color: rgba(214, 57, 235, 0.5);
  -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);
} */

/* html {
  overflow: hidden !important;
}

.v-content {
  height: 100vh;
  flex-direction: column;
  overflow: scroll;
} */

@media (max-width: 960px) {
  .section {
    height: 100%;
  }
}
</style>