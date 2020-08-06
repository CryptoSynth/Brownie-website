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
                      <v-navigation-drawer
                        v-model="drawer"
                        :mini-variant.sync="mini"
                        absolute
                        right
                      >
                        <v-list-item class="px-2">
                          <v-btn v-if="mini" icon @click.stop="mini = !mini">
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>

                          <v-btn icon @click.stop="mini = !mini">
                            <v-icon>mdi-chevron-left</v-icon>
                          </v-btn>
                        </v-list-item>

                        <v-divider></v-divider>

                        <v-form ref="checklist" v-model="valid">
                          <v-list>
                            <v-list-item v-for="(item, index) in checklist" :key="index">
                              <template #default="{active}">
                                <v-list-item-action :key="index">
                                  <v-checkbox
                                    :rules="required"
                                    :v-model="active"
                                    color="primary"
                                    required
                                  ></v-checkbox>
                                </v-list-item-action>

                                <v-list-item-content>
                                  <v-list-item-title>{{item.title}}</v-list-item-title>
                                </v-list-item-content>
                              </template>
                            </v-list-item>
                          </v-list>

                          <v-btn
                            :disabled="!valid"
                            block
                            color="success"
                            @click="completeChecklist"
                          >Complete</v-btn>
                        </v-form>
                      </v-navigation-drawer>
                      <v-card-title class="headline pb-8">
                        <v-chip v-if="order.isFullFilled" color="success">Complete</v-chip>
                        <v-chip v-else color="orange">Order {{order.invoiceId}} Pending...</v-chip>
                      </v-card-title>
                      <v-card-subtitle v-text="order.description"></v-card-subtitle>

                      <AdminItemListSwitch :order="order" />

                      <AdminFullfillmentButton class="pa-2" :shipping_id="order.shipping_id" />
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
      ],

      showList: false,
      drawer: true,
      mini: true,
      checklist: [
        { title: "Step 1.." },
        { title: "Step 2.." },
        { title: "Step 3.." },
        { title: "Step 4.." }
      ],
      required: [v => !!v || "Step Required."],
      valid: false
    };
  },

  methods: {
    ordersCompleted(item) {
      return item.orders.filter(order => order.isFullfilled === true).length;
    },

    ordersPendingFullfillment(item) {
      return item.orders.filter(order => order.isFullfilled === false).length;
    },

    completeChecklist() {
      const isValid = this.$refs.checklist.validate();

      if (isValid) {
        this.valid = true;
      }
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
