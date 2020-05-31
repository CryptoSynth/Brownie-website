<template>
  <v-dialog v-model="signup" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn width="200" outlined light color="pink accent-3" v-on="on">Sign Up</v-btn>
    </template>
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
        <v-spacer></v-spacer>
        <v-btn color="pink accent-3" text @click="registerUser">Create Account</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      signup: false,
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
    async registerUser() {
      const isValid = this.$refs.registerForm.validate();

      if (isValid) {
        try {
          const newuser = {
            account: {
              firstName: this.first,
              lastName: this.last,
              email: this.email,
              password: this.password
            },
            orders: [],
            isAdmin: false
          };

          this.$store.dispatch("registerUser", newuser);
        } catch (err) {
          console.log(err);
        }
        this.signup = false; //should only close if the user sucessfully registers!
      }
    }
  }
};
</script>

<style>
</style>