<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template #activator="{on}">
      <v-btn dark block color="pink accent-3" v-on="on">Order Checklist</v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="pink accent-3">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Order Checklist</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn :disabled="!valid" color="success" @click="fullfillOrder">Fullfill Order</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-form ref="checklist" v-model="valid">
        <v-list subheader>
          <v-subheader>Steps</v-subheader>
          <v-list-item v-for="(item, index) in checklist" :key="index">
            <template #default="{active}">
              <v-list-item-action :key="index">
                <v-checkbox :rules="required" :v-model="active" color="primary" required></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["order"],

  data() {
    return {
      dialog: false,
      checklist: [
        { title: "Step 1.." },
        { title: "Step 2.." },
        { title: "Step 3.." },
        { title: "Step 4.." },
        { title: "Step 4.." },
        { title: "Step 4.." },
        { title: "Step 4.." }
      ],
      required: [v => !!v || "Step Required."],
      valid: false
    };
  },

  methods: {
    async fullfillOrder() {
      const isValid = this.$refs.checklist.validate();

      if (isValid) {
        this.valid = true;
        this.dialog = false;
        await this.$store.dispatch("order/fullfillOrder", this.order._id);
      }
    }
  }
};
</script>

<style>
</style>