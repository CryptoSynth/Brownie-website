<template>
  <v-container fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col class="text-center" cols="12">
        <v-card dark>
          <v-card-title class="text-capitalize">
            <v-avatar left class="mr-4">
              <img :src="require(`@/assets/images/${image}`)" alt />
            </v-avatar>
            {{current_user.account.firstName}}'s Profile
          </v-card-title>

          <v-divider dark></v-divider>

          <v-card-text>
            <v-form>
              <v-container fluid>
                <v-row jsutify="center">
                  <!--profile-->
                  <v-col cols="4">
                    <v-sheet class="pa-5" light color="primary accent-2">
                      <h1 class="text-left mb-5">Personal:</h1>
                      <v-row justify="center">
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="account.firstName"
                            label="First Name"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="account.lastName"
                            label="Last Name"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="account.billing.phoneNum"
                            label="Phone Number"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="account.email"
                            value="email"
                            label="email"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>

                  <!--shipping-->
                  <v-col cols="4">
                    <v-sheet class="pa-5" light color="primary accent-2">
                      <h1 class="text-left mb-5">Shipping:</h1>
                      <v-row justify="center">
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="account.shipping.firstName"
                            label="First Name"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="account.shipping.lastName"
                            label="Last Name"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="account.shipping.addressOne"
                            label="addressOne"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="account.shipping.addressTwo"
                            label="addressTwo"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            dense
                            v-model="account.shipping.city"
                            label="City"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            dense
                            v-model="account.shipping.state"
                            label="State"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            dense
                            v-model="account.shipping.zipCode"
                            label="Zip Code"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="account.shipping.country"
                            label="Country"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>

                  <!--billing-->
                  <v-col cols="4">
                    <v-sheet class="pa-5" light color="primary accent-2">
                      <h1 class="text-left mb-5">Billing:</h1>
                      <v-row justify="center">
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="account.billing.firstName"
                            label="First Name"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="account.billing.lastName"
                            label="Last Name"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="account.billing.addressOne"
                            label="addressOne"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="account.billing.addressTwo"
                            label="addressTwo"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            dense
                            v-model="account.billing.city"
                            label="City"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            dense
                            v-model="account.billing.state"
                            label="State"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            dense
                            v-model="account.billing.zipCode"
                            label="Zip Code"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="account.billing.country"
                            label="Country"
                            outlined
                            color="pink accent-3"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="updateCurrentUserData">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">Profile Updated!</v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      image: "brownie_avatar.png", //put as prop in account
      account: {
        firstName: "",
        lastName: "",
        shipping: {
          firstName: "",
          lastName: "",
          addressOne: "",
          addressTwo: "",
          city: "",
          state: "",
          zipCode: "",
          country: ""
        },
        billing: {
          firstName: "",
          lastName: "",
          addressOne: "",
          addressTwo: "",
          city: "",
          state: "",
          zipCode: "",
          phoneNum: "",
          country: ""
        }
      },
      // isSubscribed: true,
      snackbar: false
    };
  },

  methods: {
    setCurrentUserData() {
      if (this.current_user) {
        this.account.firstName = this.current_user.account.firstName;
        this.account.lastName = this.current_user.account.lastName;
        this.account.email = this.current_user.account.email;

        this.account.shipping.firstName = this.current_user.account.shipping.firstName;
        this.account.shipping.lastName = this.current_user.account.shipping.lastName;
        this.account.shipping.addressOne = this.current_user.account.shipping.addressOne;
        this.account.shipping.addressTwo = this.current_user.account.shipping.addressTwo;
        this.account.shipping.city = this.current_user.account.shipping.city;
        this.account.shipping.state = this.current_user.account.shipping.state;
        this.account.shipping.zipCode = this.current_user.account.shipping.zipCode;
        this.account.shipping.country = this.current_user.account.shipping.country;

        this.account.billing.firstName = this.current_user.account.billing.firstName;
        this.account.billing.lastName = this.current_user.account.billing.lastName;
        this.account.billing.addressOne = this.current_user.account.billing.addressOne;
        this.account.billing.addressTwo = this.current_user.account.billing.addressTwo;
        this.account.billing.city = this.current_user.account.billing.city;
        this.account.billing.state = this.current_user.account.billing.state;
        this.account.billing.zipCode = this.current_user.account.billing.zipCode;
        this.account.billing.country = this.current_user.account.billing.country;
        this.account.billing.phoneNum = this.current_user.account.billing.phoneNum;

        // this.isSubscribed = this.current_user.isSubscribed //add checkbox
      }
    },

    async updateCurrentUserData() {
      try {
        const updated = await this.$store.dispatch("user/updateCurrentUser", {
          account: { ...this.account }
        });

        this.snackbar = updated;
        location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  },

  computed: {
    ...mapState({
      current_user: state => state.user.current_user
    })
  },

  created() {
    this.setCurrentUserData();
  }
};
</script>

<style>
</style>