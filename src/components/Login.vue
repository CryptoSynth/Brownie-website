<template>
  <v-dialog v-model="login" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn text width="100" class="mr-10" color="purple accent-3" v-on="on">Login</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Login</span>
      </v-card-title>

      <v-card-text>
        <v-container fluid>
          <v-row align="center" justify="center" no-gutters>
            <v-col>
              <v-form>
                <v-text-field
                  v-model="email"
                  type="text"
                  color="purple accent-3"
                  outlined
                  label="Email"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  type="password"
                  color="purple accent-3"
                  outlined
                  label="Password"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="purple accent-3" text @click="login = false">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      login: false,
      email: "",
      password: ""
    };
  }
};
</script>

<style>
</style>