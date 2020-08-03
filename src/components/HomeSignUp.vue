<template>
  <v-dialog persistent v-model="signup" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Sign Up</span>
      </v-card-title>

      <v-card-text>
        <v-container fluid>
          <v-row align="center" justify="center" no-gutters>
            <v-col>
              <v-form ref="registerForm">
                <v-text-field
                  :rules="firstRule"
                  v-model="first"
                  type="text"
                  color="pink accent-3"
                  outlined
                  label="First Name"
                ></v-text-field>
                <v-text-field
                  :rules="lastRule"
                  v-model="last"
                  type="text"
                  color="pink accent-3"
                  outlined
                  label="Last Name"
                ></v-text-field>
                <v-text-field
                  :rules="emailRule"
                  v-model="email"
                  type="text"
                  color="pink accent-3"
                  outlined
                  label="Email"
                ></v-text-field>
                <v-text-field
                  :rules="passwordRule"
                  v-model="password"
                  type="password"
                  color="pink accent-3"
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
          Already have an account?
          <v-btn class="ml-2" x-small color="blue" text @click.stop="redirectLogin">Login</v-btn>
        </span>
        <v-spacer></v-spacer>
        <v-btn color="red accent-3 mr-3" text @click="close">Close</v-btn>
        <v-btn color="pink accent-3" @click="registerUser">Create Account</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "home-signup",
  data() {
    return {
      signup: true,
      first: "",
      last: "",
      email: "",
      password: "",
      firstRule: [v => !!v || "First name is required"],
      lastRule: [v => !!v || "Last name is required"],
      emailRule: [v => !!v || "Email is required"],
      passwordRule: [v => !!v || "Password is required"]
    };
  },

  methods: {
    redirectLogin() {
      this.signup = false;
      this.$router.push("login");
    },

    async close() {
      this.$router.push("/");
    },

    async registerUser() {
      const isValid = this.$refs.registerForm.validate();

      if (isValid) {
        const newuser = {
          account: {
            firstName: this.first,
            lastName: this.last,
            email: this.email,
            password: this.password
          }
        };

        try {
          await this.$store.dispatch("user/registerUser", newuser);
          this.signup = false;
          this.$router.push("/");
          // location.reload();
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