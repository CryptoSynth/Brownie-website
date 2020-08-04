<template>
  <v-container fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12">
        <v-data-table
          light
          :headers="headers"
          :items="users_list"
          show-expand
          class="elevation-1 my-3"
          item-key="_id"
        >
          <template #top>
            <v-toolbar light flat color="green accent-2">
              <v-toolbar-title class="text-uppercase">Orders Managment</v-toolbar-title>
            </v-toolbar>
          </template>

          <template #item.accountName="{item}">{{item.account.firstName}} {{item.account.lastName}}</template>

          <template #item.orders="{item}">{{item.orders.length}}</template>

          <template #item.fullfillmentStatus="{}">
            <v-chip light color="orange">Pending...</v-chip>
          </template>

          <template #item.data-table-expand="{expand, isExpanded}">
            <v-btn
              dark
              :loading="isLoading"
              small
              color="purple accent-2"
              @click="expand(!isExpanded)"
            >Show Order Details</v-btn>
          </template>

          <template #expanded-item="{item, headers}">
            <td :colspan="headers.length">
              <v-container fluid>
                <v-row dense>
                  <v-col v-for="(order, index) in item.orders" :key="index" cols="4">
                    <v-card color="green accent-2" light>
                      <v-card-title class="headline" v-text="order.invoiceId"></v-card-title>
                      <v-card-subtitle v-text="order.description"></v-card-subtitle>

                      <AdminItemListSwitch :order="order" />

                      <AdminFullfillmentButton
                        class="pa-2"
                        :shipping_id="order.shipping_id"
                        :user_order="item"
                        @orderFullfilled="orderFullfilled"
                      />
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </td>
          </template>

          <template #no-data>
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
import AdminItemListSwitch from "../components/AdminItemListSwitch";

export default {
  name: "orders",

  components: {
    AdminFullfillmentButton,
    AdminItemListSwitch
  },

  data() {
    return {
      headers: [
        { text: "Account Name", value: "accountName" },
        { text: "Orders", value: "orders" },
        {
          text: "Order Fullfillment",
          value: "fullfillmentStatus",
          sortable: false
        },
        { text: "Order Details", value: "data-table-expand" }
      ],

      current_user_order: "",
      showList: false
    };
  },

  methods: {
    orderFullfilled(value) {
      this.current_user_order = value;
    }
  },

  computed: {
    ...mapState({
      users_list: state => state.user.users_list,
      orders_list: state => state.order.orders_list,
      shipping_list: state => state.shipping.shipping_list,
      tracking_list: state => state.tracking.tracking_list
    }),

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
