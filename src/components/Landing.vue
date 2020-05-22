<template>
  <v-row class="section" align="center" justify="center">
    <v-col class="text-center" cols="12" md="5">
      <v-col>
        <v-sheet
          class="d-flex flex-column justify-space-around align-center"
          color="pink accent-1"
          height="350px"
        >
          <h1>Company Title</h1>
          <h1>Company Moto</h1>
          <h1>Extra Info</h1>
        </v-sheet>
      </v-col>
      <v-col>
        <v-btn min-width="200px" large color="purple accent-3">Sign Up</v-btn>
      </v-col>
    </v-col>
    <v-col cols="12" md="7">
      <v-sheet
        class="d-flex flex-column justify-center align-center"
        height="480px"
        color="pink accent-1"
      >
        <h1 class>Video Goes Here</h1>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "landing-section",

  data() {
    return {};
  }
};
</script>

<style lang="css" scoped>
</style>