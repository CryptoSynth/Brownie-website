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
              <v-form ref="loginForm">
                <v-text-field
                  :rules="emailRule"
                  v-model="email"
                  type="text"
                  color="purple accent-3"
                  outlined
                  label="Email"
                ></v-text-field>
                <v-text-field
                  :rules="passwordRule"
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
        <span class="font-weight-thin" style="font-size: .7rem">
          Dont have an account?
          <v-btn class="ml-2" x-small color="blue" text>Sign Up</v-btn>
        </span>
        <v-spacer></v-spacer>
        <v-btn color="purple accent-3" text @click="loginUser">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "home-login",

  data() {
    return {
      email: "",
      password: "",
      login: false,
      emailRule: [v => !!v || "Email is required!"],
      passwordRule: [v => !!v || "Password is required!"]
    };
  },

  methods: {
    async loginUser() {
      const isValid = this.$refs.loginForm.validate();

      if (isValid) {
        try {
          const user = {
            account: {
              email: this.email,
              password: this.password
            }
          };

          const authUser = await this.$store.dispatch("loginUser", user);

          if (authUser.isAdmin) {
            return this.$router.push("admin-account/");
          }

          this.login = false;
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>

<style>
</style>