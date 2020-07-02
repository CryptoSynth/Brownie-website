<template>
  <v-dialog v-model="dialog" max-width="350">
    <v-card>
      <v-card-title class="headline">Confirmation Notification</v-card-title>

      <v-card-text>Are you sure you want to go back to the home page?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green accent-2" text @click="confirmed">yes</v-btn>
        <v-btn color="red accent-2" text @click="canceled">cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  methods: {
    confirmed(event) {
      this.$emit("answer1", true);
    },

    canceled(event) {
      this.$emit("answer2", false);
    }
  }
};
</script>

<style>
</style>