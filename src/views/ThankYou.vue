<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <h1>Thank you {{current_user.account.firstName}} {{current_user.account.lastName}} for your order!</h1>
        <h3>Your Order Number is {{orderId}}</h3>
        <h3>An email with the order receipt has been sent to {{current_user.account.email}}</h3>
      </v-col>

      <v-col cols="12">
        <v-btn class="mr-3" color="pink accent-2" to="/user-account/orders">View Order</v-btn>
        <v-btn color="success" to="/">Continue shopping</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "../store/index";
import { mapState } from "vuex";

export default {
  name: "thank-you",

  props: ["orderId"],

  data() {
    return {};
  },

  computed: {
    ...mapState({
      current_user: state => state.user.current_user
    }),

    order() {
      const order = this.current_user.orders.find(
        order => order.invoiceId === this.orderId
      );
      return order;
    }
  },

  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch("user/getCurrentUser");
      next();
    } catch (err) {
      console.log(err);
      next("/");
    }
  }
};
</script>

<style>
</style>