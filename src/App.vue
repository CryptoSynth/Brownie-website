<template>
  <v-app id="inspire">
    <!--Content-->
    <v-main>
      <router-view></router-view>
    </v-main>

    <!--Footer-->
    <v-footer app>
      <span>&copy; 2020 { Website Footer }</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    toggleDark: true
  }),

  async mounted() {
    this.$vuetify.theme.dark = this.toggleDark;

    try {
      this.$store.dispatch("product/getProducts");
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
