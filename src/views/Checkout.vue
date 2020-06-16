<template>
  <div>
    <v-container fluid>
      <router-view v-if="success"></router-view>
      <v-row v-else align="center" justify="space-around" no-gutters>
        <v-col class="text-center" cols="7">
          <v-sheet height="620" color="transparent">
            Cart Items
            <v-row>
              <v-col cols="12" v-for="item in cart" :key="item.id">
                <v-sheet light height="100">
                  <v-row align="center" justify="center">
                    <v-col>
                      <v-avatar size="80" tile>
                        <v-img :src="require(`@/assets/images/${item.image}`)"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col>
                      <p>NAME: {{item.name}}</p>
                    </v-col>
                    <v-col>
                      <p>PRICE: {{item.price}}</p>
                    </v-col>
                    <v-col>
                      <p>QUANTITY: {{item.quantity}}</p>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col class="text-center" cols="4">
          <v-sheet height="auto" color="blue pa-2">
            Pay Here
            <v-form ref="paymentForm">
              <v-container fluid>
                <v-row align="center" justify="space-around">
                  <v-col cols="12">
                    <v-text-field
                      hide-details="auto"
                      :rules="firstNameRule"
                      v-model="firstName"
                      type="text"
                      light
                      solo
                      label="First Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      hide-details="auto"
                      :rules="lastNameRule"
                      v-model="lastName"
                      type="text"
                      light
                      solo
                      label="Last Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      hide-details="auto"
                      :rules="cardNumRule"
                      v-model="cardNum"
                      v-mask="'####-####-####-####'"
                      type="text"
                      light
                      solo
                      label="####-####-####-####"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      hide-details="auto"
                      :rules="cardCsvRule"
                      v-model="cardCsv"
                      v-mask="'####'"
                      type="text"
                      light
                      solo
                      label="CSV"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      hide-details="auto"
                      :rules="cardMonthRule"
                      v-model="cardMonth"
                      v-mask="'##'"
                      type="text"
                      light
                      solo
                      label="Month"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      hide-details="auto"
                      :rules="cardYearRule"
                      v-model="cardYear"
                      v-mask="'####'"
                      type="text"
                      light
                      solo
                      label="Year"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox
                      hide-details="auto"
                      color="green accent-3"
                      label="Accept Terms Conditions & Privacy Policy"
                    ></v-checkbox>
                    <v-checkbox
                      hide-details="auto"
                      color="green accent-3"
                      label="Subscribe To Email Notifications"
                    ></v-checkbox>
                  </v-col>
                  <v-col class="text-center">
                    <v-btn block color="red accent-3" @click="order">Place Order</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
      <v-snackbar :timeout="3000" v-model="transStatus" bottom color="red accent-3">{{response}}</v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "checkout",

  data() {
    return {
      firstName: "",
      lastName: "",
      cardNum: "",
      cardCsv: "",
      cardMonth: "",
      cardYear: "",
      firstNameRule: [v => !!v || "First name is required."],
      lastNameRule: [v => !!v || "Last name is required."],
      cardNumRule: [v => !!v || "Card number is required."],
      cardCsvRule: [v => !!v || "Card CSV is required."],
      cardMonthRule: [v => !!v || "Card month is required."],
      cardYearRule: [v => !!v || "Card year is required."],
      transStatus: false,
      response: "",
      success: false
    };
  },

  methods: {
    paymentFormUpdate(opaqueData) {
      this.firstName = "";
      this.lastName = "";
      this.cardNum = "";
      this.cardCsv = "";
      this.cardMonth = "";
      this.cardYear = "";

      const user = JSON.parse(localStorage.getItem("user"));

      axios
        .post("http://localhost:3000/api/checkouts/", {
          id: user.id,
          lineItems: this.cart,
          dataDescriptor: opaqueData.dataDescriptor,
          dataValue: opaqueData.dataValue
        })
        .then(res => {
          if (res.data != null) {
            this.success = true;
            this.$router.push("/checkout/successful-payment");
          }
        })
        .catch(err => {
          this.response = err.response.data.transErrText;
          this.transStatus = true;
        });
    },

    responseHandler(response) {
      if (response.messages.resultCode === "Error") {
        let i = 0;
        while (i < response.messages.message.length) {
          this.response = response.messages.message[i].text;
          i = i + 1;
        }
        this.transStatus = true;
      } else {
        this.paymentFormUpdate(response.opaqueData);
      }
    },

    order() {
      const authData = {
        clientKey:
          "3bw8GPYE7cdkgbF8DZJ28t4Nx8nY9B9VvSrYKB9qNVBjr8N3Nsqm9y23EFTwq76L",
        apiLoginID: "469sAkuGW"
      };

      const cardData = {
        cardNumber: this.cardNum.replace(/-/g, ""),
        cardCode: this.cardCsv,
        month: this.cardMonth,
        year: this.cardYear
      };

      const secureData = {
        authData,
        cardData
      };

      console.log(authData);
      console.log(cardData);
      console.log(secureData);

      const isValid = this.$refs.paymentForm.validate();

      if (isValid) {
        Accept.dispatchData(secureData, this.responseHandler);
      }
    }
  },

  computed: {
    ...mapState(["cart"])
  },

  mounted() {
    //mount Accept.js into checkout page when routed to
    let authAcceptScript = document.createElement("script");
    authAcceptScript.setAttribute(
      "src",
      "https://jstest.authorize.net/v1/Accept.js"
    );
    document.head.appendChild(authAcceptScript);
  }
};
</script>

<style>
</style>