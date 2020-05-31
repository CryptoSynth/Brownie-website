<template>
  <v-app id="inspire">
    <!--Content-->
    <v-content>
      <router-view></router-view>
    </v-content>

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
  })
};
</script>
