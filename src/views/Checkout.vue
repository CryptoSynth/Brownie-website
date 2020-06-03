<template>
  <v-container fluid>
    <v-row align="center" justify="space-around" no-gutters>
      <v-col class="text-center" cols="7">
        <v-sheet height="620" color="red accent-2 pa-2">
          Show Items Here
          <v-row>
            <v-col cols="12" v-for="item in cart" :key="item.id">
              <v-sheet light height="100">
                <v-row align="center" justify="center">
                  <v-col>
                    <v-avatar size="80" tile>
                      <v-img :src="require(`@/assets/images/${item.image}`)"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <p>NAME: {{item.name}}</p>
                  </v-col>
                  <v-col>
                    <p>PRICE: {{item.price}}</p>
                  </v-col>
                  <v-col>
                    <p>QUANTITY: {{item.quantity}}</p>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col class="text-center" cols="4">
        <v-sheet height="620" color="blue pa-2">
          Pay Here
          <v-form>
            <v-container fluid>
              <v-row align="center" justify="space-around" no-gutters>
                <v-col cols="12">
                  <v-text-field
                    :rules="emailRule"
                    v-model="email"
                    type="text"
                    light
                    solo
                    label="First Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :rules="emailRule"
                    v-model="email"
                    type="text"
                    light
                    solo
                    label="Last Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :rules="emailRule"
                    v-model="email"
                    type="text"
                    light
                    solo
                    label="####-####-####-####"
                  ></v-text-field>
                </v-col>
                <v-col class="mr-auto" cols="5">
                  <v-text-field
                    :rules="passwordRule"
                    v-model="password"
                    type="password"
                    light
                    solo
                    label="CSV"
                  ></v-text-field>
                </v-col>
                <v-col class="mr-auto" cols="6">
                  <v-text-field
                    :rules="passwordRule"
                    v-model="password"
                    type="password"
                    light
                    solo
                    label="EXP "
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    color="green accent-3"
                    label="Accept Terms Conditions & Privacy Policy"
                  ></v-checkbox>
                  <v-checkbox color="green accent-3" label="Subscribe To Email Notifications"></v-checkbox>
                </v-col>
                <v-col class="text-center">
                  <v-btn block color="red accent-3">place order</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "checkout",
  methods: {},
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style>
</style>