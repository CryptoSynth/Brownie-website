<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <h1>Thank you {{order.account.firstName}} {{order.account.lastName}} for your order!</h1>
        <h3>Your Order Number is {{orderId}}</h3>
        <h3>An email with the order receipt has been sent to {{order.account.email}}</h3>
      </v-col>
      <v-col cols="6">
        <h1>Bill To:</h1>
        <ul>
          <li>{{order.account.billing.firstName || ""}}</li>
          <li>{{order.account.billing.lastName || ""}}</li>
          <li>{{order.account.billing.addressOne || ""}}</li>
          <li>{{order.account.billing.addressTwo || ""}}</li>
          <li>{{order.account.billing.city || ""}}</li>
          <li>{{order.account.billing.state || ""}}</li>
          <li>{{order.account.billing.zipCode || ""}}</li>
          <li>{{order.account.billing.country || ""}}</li>
          <li>{{order.account.billing.phoneNum || ""}}</li>
        </ul>
      </v-col>
      <v-col cols="6">
        <h1>Ship To:</h1>
        <ul>
          <li>{{order.account.shipping.firstName || ""}}</li>
          <li>{{order.account.shipping.lastName || ""}}</li>
          <li>{{order.account.shipping.addressOne || ""}}</li>
          <li>{{order.account.shipping.addressTwo || ""}}</li>
          <li>{{order.account.shipping.city || ""}}</li>
          <li>{{order.account.shipping.state || ""}}</li>
          <li>{{order.account.shipping.zipCode || ""}}</li>
          <li>{{order.account.shipping.country || ""}}</li>
        </ul>
      </v-col>
      <v-col cols="12">
        <router-link to="/">Continue shopping</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import serverAPI from "../mock-server/server.api";

export default {
  name: "thank-you",

  props: ["orderId"],

  data() {
    return {
      order: ""
    };
  },

  async created() {
    try {
      const order = await serverAPI.getOrder(this.orderId);
      this.order = order.data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
};
</script>

<style>
</style>