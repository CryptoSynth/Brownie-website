<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <h1>Thank you for your order!</h1>
        <h3>Your Order Number: #######</h3>
      </v-col>
      <v-col cols="6">
        <h1>Bill To:</h1>
      </v-col>
      <v-col cols="6">
        <h1>Ship To:</h1>
      </v-col>
      <v-col cols="12">
        <router-link to="/">Continue shopping</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>