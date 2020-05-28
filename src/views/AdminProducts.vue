<template>
  <v-container fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col class="text-right" cols="12">
        <h1>Admin Products</h1>
      </v-col>

      <v-col cols="12">
        <v-row no-gutters align="center" justify="center">
          <v-sheet light height="100px">
            <v-col>
              <div class="d-flex justify-center align-center">
                <h1>Create Products Here:</h1>
                <v-btn class="ml-10" color="purple accent-3">Create</v-btn>
              </div>
            </v-col>
          </v-sheet>
        </v-row>
      </v-col>

      <v-col v-for="product in products" :key="product.id" class="mt-5" cols="12">
        <v-sheet light height="100px">
          <v-row no-gutters align="center" justify="center">
            <v-col cols="3">
              <h1>{{product.image}}</h1>
            </v-col>
            <v-col cols="3">
              <h1>{{product.name}}</h1>
            </v-col>
            <v-col cols="3">
              <v-btn color="blue accent-3">Edit</v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn color="red accent-3">Delete</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["products"])
  },

  methods: {
    create() {},
    edit() {},
    delete() {}
  },

  async created() {
    try {
      await this.$store.dispatch("fetchProducts");
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
</style>