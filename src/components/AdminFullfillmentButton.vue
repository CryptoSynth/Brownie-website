<template>
  <div>
    <div v-if="fullfilled">
      <v-navigation-drawer width="100%" dark permanent>
        <v-list dark nav dense>
          <v-list-item-group>
            <v-list-item :href="printLabel" target="_blank">
              <v-list-item-icon>
                <v-icon color="orange">mdi-download</v-icon>
              </v-list-item-icon>

              <v-list-item-content style="color: orange">Print Label</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="red">mdi-emoticon-frown</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="color: red">Refund, add confirmation</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-btn v-else block color="primary" @click="fullfillOrder">Fullfill Order</v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["user_order", "shipping_id"],

  data() {
    return {
      fullfilled: false
    };
  },

  computed: {
    ...mapState({
      orders_list: state => state.order.orders_list,
      shipping_list: state => state.shipping.shipping_list,
      tracking_list: state => state.tracking.tracking_list
    }),

    printLabel() {
      const shipping = this.shipping_list.find(
        shipping => shipping.id === this.shipping_id
      );

      return shipping.postage_label.label_url;
    }

    // trackOrder() {
    //   const shipping = this.shipping_list.find(
    //     shipping => shipping.id === this.shipping_id
    //   );

    //   const tracking = this.tracking_list.find(
    //     tracking => tracking.id === shipping.tracker.id
    //   );

    //   return tracking.public_url;
    // }
  },

  methods: {
    fullfillOrder() {
      this.fullfilled = true;

      const order = this.user_order.orders.find(
        order => order.shipping_id === this.shipping_id
      );

      this.$emit("orderFullfilled", order.invoiceId);
    }
  }
};
</script>

<style>
</style>