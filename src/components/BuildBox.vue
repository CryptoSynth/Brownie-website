<template>
  <div>
    <v-dialog width="600" v-model="cart">
      <template v-slot:activator="{ on }">
        <v-btn color="pink accent-3" v-on="on">You Choose</v-btn>
      </template>

      <v-stepper v-model="cartStep" vertical>
        <v-stepper-step color="pink accent-2" :complete="cartStep > 1" step="1">Brownie #1</v-stepper-step>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="pink accent-2" height="200px"></v-card>

          <v-btn color="pink accent-3 mr-5" @click="cartStep = 2">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step color="pink accent-2" :complete="cartStep > 2" step="2">Brownie #2</v-stepper-step>
        <v-stepper-content step="2">
          <v-card class="mb-12" color="pink accent-2" height="200px"></v-card>

          <v-btn color="pink accent-3" @click="cartStep = 3">Continue</v-btn>
          <v-spacer></v-spacer>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step color="pink accent-2" :complete="cartStep > 3" step="3">Brownie #3</v-stepper-step>
        <v-stepper-content step="3">
          <v-card class="mb-12" color="pink accent-2" height="200px"></v-card>

          <v-btn color="pink accent-3" @click="cartStep = 4">Continue</v-btn>
          <v-spacer></v-spacer>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step color="pink accent-2" :complete="cartStep > 4" step="4">Brownie #4</v-stepper-step>
        <v-stepper-content step="4">
          <v-card class="mb-12" color="pink accent-2" height="200px"></v-card>

          <v-btn color="pink accent-3" @click="cartStep = 5">Continue</v-btn>
          <v-spacer></v-spacer>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step color="pink accent-2" :complete="cartStep > 5" step="5">Brownie #5</v-stepper-step>
        <v-stepper-content step="5">
          <v-card class="mb-12" color="pink accent-2" height="200px"></v-card>

          <v-btn color="pink accent-3" @click="cartStep = 6">Continue</v-btn>
          <v-spacer></v-spacer>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step color="pink accent-2" :complete="cartStep > 6" step="6">Brownie #6</v-stepper-step>

        <v-stepper-content step="6">
          <v-card class="mb-12" color="pink accent-2" height="200px"></v-card>

          <v-btn color="pink accent-3" @click="cartStep = 6">Continue</v-btn>
          <v-spacer></v-spacer>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["cart", "cartStep"],
  data() {
    return {};
  }
};
</script>

<style>
</style>