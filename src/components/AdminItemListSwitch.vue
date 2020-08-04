<template>
  <div>
    <v-switch
      :label="showList ? 'Close Items' : 'View Items'  "
      v-model="showList"
      class="px-3"
      color="red accent-2"
      inset
    ></v-switch>

    <v-list v-if="showList" class="pa-0" disabled>
      <template v-for="(item, index) in order.items">
        <v-divider :key="index"></v-divider>

        <v-list-item :key="item._id">
          <v-list-item-avatar tile size="80">
            <v-img :src="require(`../assets/images/${item.image}`)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-title>{{item.subtitle}}</v-list-item-title>
            <v-list-item-action-text>
              <p class="ma-0 py-1">Price: {{item.price}}</p>
              <p>Quantity: {{item.quantity}}</p>
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "Admin-Item-List",

  props: ["order"],

  data() {
    return {
      showList: false
    };
  }
};
</script>

<style>
</style>