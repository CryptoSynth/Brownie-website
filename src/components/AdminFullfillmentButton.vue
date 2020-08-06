<template>
  <div>
    <div v-if="fullfilled">
      <v-navigation-drawer width="100%" light permanent>
        <v-list light nav dense>
          <v-list-item-group>
            <v-list-item :href="printLabel" target="_blank">
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
    </div>

    <v-btn v-else color="primary" @click="fullfillOrder">Fullfill Order</v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["shipping_id"],

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
  },

  methods: {
    fullfillOrder() {}
  }
};
</script>

<style>
</style>