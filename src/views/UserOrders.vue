<template>
  <v-container fluid>
    <v-data-iterator dark :items="current_user.orders" item-key="invoiceId">
      <template v-slot:default="{items, isExpanded, expand}">
        <v-row align="center">
          <v-col v-for="order in items" :key="order.id" cols="4">
            <v-card light color="green accent-2">
              <v-card-title>Order Invoice Id: {{order.invoiceId}}</v-card-title>
              <v-card-text>
                <p>Order Description: {{order.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="6">
                    <v-switch
                      class="px-3"
                      :input-value="isExpanded(order)"
                      :label="isExpanded(order) ? 'Close Items' :'View Items'"
                      @change="(v)=> expand(order, v)"
                      color="red accent-2"
                      inset
                    ></v-switch>
                  </v-col>
                  <v-col cols="6" class="text-center">
                    <v-btn
                      color="yellow accent-3"
                      :href="order.tracking_url"
                      target="_blank"
                    >Track Order</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>

              <v-divider light></v-divider>

              <v-list class="pa-0" v-if="isExpanded(order)" disabled>
                <template v-for="(item, index) in order.items">
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
                  <v-divider :key="index"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "orders",

  data() {
    return {};
  },

  methods: {},

  computed: {
    ...mapState({
      current_user: state => state.user.current_user
    })
  }
};
</script>

<style>
</style>
