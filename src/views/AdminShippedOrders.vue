<template>
  <v-container fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12">
        <v-data-table
          light
          :headers="headers"
          :items="orders_list"
          show-expand
          class="elevation-1 my-3"
          item-key="id"
        >
          <template v-slot:top>
            <v-toolbar light flat color="green accent-2">
              <v-toolbar-title class="text-uppercase">Orders Managment</v-toolbar-title>
            </v-toolbar>
          </template>

          <template
            v-slot:item.accountName="{item}"
          >{{item.account.firstName}} {{item.account.lastName}}</template>

          <template v-slot:item.orders="{item}">{{item.orders.length}}</template>

          <template v-slot:item.fullfillmentStatus="{}">
            <v-chip light color="orange">Pending...</v-chip>
          </template>

          <template v-slot:item.data-table-expand="{ expand, isExpanded }">
            <v-btn
              dark
              :loading="isLoading"
              small
              color="purple accent-2"
              @click="expand(!isExpanded)"
            >Show Order Details</v-btn>
          </template>

          <template v-slot:expanded-item="{item}">
            <v-container fluid>
              <v-row dense align="start" justify="center">
                <v-col v-for="(order, index) in item.orders" :key="index">
                  <v-card min-width="250" color="pink accent-1" dark>
                    <v-card-title class="headline" v-text="order.invoiceId"></v-card-title>
                    <v-card-subtitle v-text="order.description"></v-card-subtitle>

                    <v-sheet
                      :key="item.id"
                      v-for="item in order.items"
                      class="d-flex justify-content-around align-center ma-2"
                      color="black"
                    >
                      <v-avatar class="ma-3" size="80" tile>
                        <v-img :src="require(`../assets/images/${item.image}`)"></v-img>
                      </v-avatar>

                      <ul class="pa-1">
                        <p style="font-size: .8rem" class="ma-0">Name: {{item.name}}</p>
                        <p style="font-size: .8rem" class="ma-0">Descripton: {{item.description}}</p>
                        <p style="font-size: .8rem" class="ma-0">Price: {{item.price}}</p>
                        <p style="font-size: .8rem" class="ma-0">Quantity: {{item.quantity}}</p>
                      </ul>
                    </v-sheet>

                    <AdminFullfillmentButton
                      class="pa-3"
                      :shipping_id="order.shipping_id"
                      :user_order="item"
                      @orderFullfilled="orderFullfilled"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:no-data>
            <h1>Orders...</h1>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AdminFullfillmentButton from "../components/AdminFullfillmentButton";

export default {
  name: "shipped-orders",

  components: {
    AdminFullfillmentButton
  },

  data() {
    return {
      headers: [
        { text: "Random ID", value: "id" },
        { text: "Account Name", value: "accountName" },
        { text: "Orders", value: "orders" },
        {
          text: "Order Fullfillment",
          value: "fullfillmentStatus",
          sortable: false
        },
        { text: "Order Details", value: "data-table-expand" }
      ],

      current_user_order: ""
    };
  },

  methods: {
    orderFullfilled(value) {
      this.current_user_order = value;
    }
  },

  computed: {
    ...mapState(["orders_list", "shipping_list", "tracking_list"]),

    isLoading() {
      if (this.shipping_list.length === 0 && this.tracking_list.length === 0)
        return true;

      return false;
    }
  }
};
</script>

<style>
</style>
