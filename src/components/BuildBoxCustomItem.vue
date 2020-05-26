<template>
  <v-container fluid>
    <v-row justify="center" no-gutters>
      <v-col cols="3">
        <v-avatar tile left>
          <v-img :src="require(`../assets/images/${item.img}`)" />
        </v-avatar>
      </v-col>
      <v-col cols="9">
        <v-list-item-content class="text-capitalize">{{item.type}}</v-list-item-content>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
export default {
  name: "custom-item",

  props: ["item"]
};
</script>

<style>
</style>