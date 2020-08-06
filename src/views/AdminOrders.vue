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

          <template #item.pendingFullfillment="{item}">{{ordersPendingFullfillment(item)}}</template>

          <template #item.completedFullfillment="{item}">{{ordersCompleted(item)}}</template>

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
                      <v-card-title class="headline pb-8">
                        <v-chip v-if="order.isFullfilled" color="success">Complete</v-chip>
                        <v-chip v-else color="orange">Order {{order.invoiceId}} Pending...</v-chip>
                      </v-card-title>
                      <v-card-subtitle v-text="order.description"></v-card-subtitle>

                      <AdminItemListSwitch :order="order" />

                      <v-navigation-drawer v-if="order.isFullfilled" width="100%" light permanent>
                        <v-list light nav dense>
                          <v-list-item-group>
                            <v-list-item :href="printLabel(order)" target="_blank">
                              <v-list-item-icon>
                                <v-icon color="orange">mdi-download</v-icon>
                              </v-list-item-icon>

                              <v-list-item-content style="color: orange">Print Label</v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                              <v-list-item-icon>
                                <v-icon color="error">mdi-emoticon-frown</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content style="color: red">Refund, add confirmation</v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-navigation-drawer>

                      <AdminFullfillmentButton v-else class="pa-2" :order="order" />
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
          text: "Orders Pending Fullfillment",
          value: "pendingFullfillment",
          sortable: false
        },
        {
          text: "Orders Fullfilled",
          value: "completedFullfillment",
          sortable: false
        },
        { text: "Order Details", value: "data-table-expand" }
      ]
    };
  },

  methods: {
    ordersCompleted(item) {
      if (item) {
        return item.orders.filter(order => order.isFullfilled === true).length;
      }
    },

    ordersPendingFullfillment(item) {
      if (item) {
        return item.orders.filter(order => order.isFullfilled === false).length;
      }
    },

    printLabel(order) {
      const shipping = this.shipping_list.find(
        shipping => shipping.id === order.shipping_id
      );

      return shipping.postage_label.label_url;
    }
  },

  computed: {
    ...mapState({
      users_list: state => state.user.users_list,
      orders_list: state => state.order.orders_list,
      order_status: state => state.order.fullfilled,
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
