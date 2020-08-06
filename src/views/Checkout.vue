<template>
  <div>
    <v-container fluid>
      <router-view v-if="success"></router-view>
      <v-row v-else justify="space-around">
        <!--PAYMENT SUMMARY-->
        <v-col class="text-center" cols="6">
          <v-stepper v-model="step" vertical>
            <!--Personal Details-->
            <v-stepper-step
              color="green accent-2"
              :editable="step > 1"
              :complete="step > 1"
              step="1"
            >
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <v-sheet dark height="auto" width="620px">
                    <v-container>
                      <h1>Personal Details</h1>
                      <v-row v-if="displayPersonal" align="center" justify="center">
                        <v-col cols="12">
                          <h3>{{account.firstName.init}} {{account.lastName.init}}</h3>
                          <h3>{{account.email.init}}</h3>
                          <h3>{{account.phoneNum.init}}</h3>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-form ref="personalDetailsForm">
                <v-container fluid>
                  <v-row align="center" justify="space-around">
                    <v-col cols="6">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.firstName.init, account.firstName.label)]"
                        v-model="account.firstName.init"
                        type="text"
                        light
                        solo
                        :label="account.firstName.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.lastName.init, account.lastName.label)]"
                        v-model="account.lastName.init"
                        type="text"
                        light
                        solo
                        :label="account.lastName.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.email.init, account.email.label)]"
                        v-model="account.email.init"
                        type="text"
                        light
                        solo
                        :label="account.email.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.phoneNum.init, account.phoneNum.label)]"
                        v-model="account.phoneNum.init"
                        v-mask="'(###)-###-####'"
                        type="text"
                        light
                        solo
                        :label="account.phoneNum.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-checkbox
                        color="green accent-2"
                        v-model="terms"
                        :rules="[rules.required(terms, 'Terms and Conditions')]"
                        label="Terms and Conditions"
                      ></v-checkbox>
                      <v-checkbox
                        color="green accent-2"
                        v-model="isSubscribed"
                        label="Subscribe To Email for Discounts and Offers"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="5">
                      <v-btn
                        v-if="!loggedIn"
                        @click="continueToShipping"
                        light
                        block
                        color="green accent-2"
                      >Continue As Guest</v-btn>
                      <v-btn
                        v-else
                        light
                        block
                        color="green accent-2"
                        @click="continueToShipping"
                      >Continue To Shipping</v-btn>
                    </v-col>
                    <v-col v-if="!loggedIn" class="text-center" cols="2">
                      <h4>OR</h4>
                    </v-col>
                    <v-col v-if="!loggedIn" cols="5">
                      <v-btn color="blue accent-3" to="login">Login to your account</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-stepper-content>

            <!--Shipping-->
            <v-stepper-step
              color="green accent-2"
              :editable="step > 2"
              :complete="step > 2"
              step="2"
            >
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <v-sheet dark height="auto" width="620px">
                    <v-container>
                      <h1>Shipping Details</h1>
                      <v-row v-if="displayShipping" align="center" justify="center">
                        <v-col cols="12">
                          <h3>{{account.shipping.firstName.init}} {{account.shipping.lastName.init}}</h3>
                          <h3>{{account.shipping.addressOne.init}}</h3>
                          <h3>{{account.shipping.addressTwo.init}}</h3>
                          <h3>{{account.shipping.city.init}}, {{account.shipping.state.init}} {{account.shipping.zipCode.init}}</h3>
                          <h3>{{account.shipping.country.init}}</h3>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-form ref="shippingForm">
                <v-container fluid>
                  <v-row align="center" justify="space-around">
                    <v-col cols="6">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.shipping.firstName.init, account.shipping.firstName.label)]"
                        v-model="account.shipping.firstName.init"
                        type="text"
                        light
                        solo
                        :label="account.shipping.firstName.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.shipping.lastName.init, account.shipping.lastName.label)]"
                        v-model="account.shipping.lastName.init"
                        type="text"
                        light
                        solo
                        :label="account.shipping.lastName.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.shipping.addressOne.init, account.shipping.addressOne.label)]"
                        v-model="account.shipping.addressOne.init"
                        type="text"
                        light
                        solo
                        :label="account.shipping.addressOne.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        hide-details="auto"
                        v-model="account.shipping.addressTwo.init"
                        type="text"
                        light
                        solo
                        :label="account.shipping.addressTwo.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.shipping.city.init, account.shipping.city.label)]"
                        v-model="account.shipping.city.init"
                        type="text"
                        light
                        solo
                        :label="account.shipping.city.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.shipping.state.init, account.shipping.state.label)]"
                        v-model="account.shipping.state.init"
                        type="text"
                        light
                        solo
                        :label="account.shipping.state.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.shipping.zipCode.init, account.shipping.zipCode.label)]"
                        v-model="account.shipping.zipCode.init"
                        type="text"
                        light
                        solo
                        :label="account.shipping.zipCode.label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        hide-details="auto"
                        :rules="[rules.required(account.shipping.country.init, account.shipping.country.label)]"
                        v-model="account.shipping.country.init"
                        type="text"
                        light
                        solo
                        :label="account.shipping.country.label"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-btn
                        light
                        color="green accent-2"
                        @click="continueToPayment"
                      >Continue To Payment</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-stepper-content>

            <!--Payment Method-->
            <v-stepper-step
              color="green accent-2"
              :editable="step > 3"
              :complete="step > 3"
              step="3"
            >Payment Method</v-stepper-step>

            <v-stepper-content step="3">
              <v-form ref="paymentForm">
                <v-container fluid>
                  <v-row align="center" justify="space-around">
                    <v-col cols="12">
                      <v-checkbox
                        class="mt-0"
                        hide-details="auto"
                        color="green accent-2"
                        v-model="copyShippingAddress"
                        label="Copy address data from shipping"
                        @change="copyAddress"
                      ></v-checkbox>
                      <v-row v-if="!copyShippingAddress" align="center" justify="space-around">
                        <v-col cols="6">
                          <v-text-field
                            hide-details="auto"
                            :rules="[rules.required(account.billing.firstName.init, account.billing.firstName.label)]"
                            v-model="account.billing.firstName.init"
                            type="text"
                            light
                            solo
                            :label="account.billing.firstName.label"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            hide-details="auto"
                            :rules="[rules.required(account.billing.lastName.init, account.billing.lastName.label)]"
                            v-model="account.billing.lastName.init"
                            type="text"
                            light
                            solo
                            :label="account.billing.lastName.label"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            hide-details="auto"
                            :rules="[rules.required(account.billing.addressOne.init, account.billing.addressOne.label)]"
                            v-model="account.billing.addressOne.init"
                            type="text"
                            light
                            solo
                            :label="account.billing.addressOne.label"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            hide-details="auto"
                            v-model="account.billing.addressTwo.init"
                            type="text"
                            light
                            solo
                            :label="account.billing.addressTwo.label"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            hide-details="auto"
                            :rules="[rules.required(account.billing.city.init, account.billing.city.label)]"
                            v-model="account.billing.city.init"
                            type="text"
                            light
                            solo
                            :label="account.billing.city.label"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            hide-details="auto"
                            :rules="[rules.required(account.billing.state.init, account.billing.state.label)]"
                            v-model="account.billing.state.init"
                            type="text"
                            light
                            solo
                            :label="account.billing.state.label"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            hide-details="auto"
                            :rules="[rules.required(account.billing.zipCode.init, account.billing.zipCode.label)]"
                            v-model="account.billing.zipCode.init"
                            type="text"
                            light
                            solo
                            :label="account.billing.zipCode.label"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            hide-details="auto"
                            :rules="[rules.required(account.billing.country.init, account.billing.country.label)]"
                            v-model="account.billing.country.init"
                            type="text"
                            light
                            solo
                            :label="account.billing.country.label"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            hide-details="auto"
                            :rules="[rules.required(account.billing.phoneNum.init, account.billing.phoneNum.label)]"
                            v-model="account.billing.phoneNum.init"
                            v-mask="'(###)-###-####'"
                            type="text"
                            light
                            solo
                            :label="account.billing.phoneNum.label"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12">
                      <v-divider dark></v-divider>
                    </v-col>

                    <!-- <v-col cols="12">
                      <v-radio-group :rules="[rules.selectionRequired]" v-model="shippingSelection">
                        <v-radio
                          v-for="rate in shippingRates"
                          :key="rate.id"
                          hide-details="auto"
                          color="green accent-2"
                          :label="`${rate.service} (${rate.delivery_days || '1'} days) | $${rate.rate}`"
                          :value="parseInt(rate.rate)"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>-->

                    <v-col cols="12">
                      <v-text-field
                        color="green accent-2"
                        hide-details="auto"
                        :rules="[rules.required(cardPayment.cardNum.init, cardPayment.cardNum.label)]"
                        v-model="cardPayment.cardNum.init"
                        v-mask="'####-####-####-####'"
                        type="text"
                        dark
                        filled
                        :label="cardPayment.cardNum.label"
                        :placeholder="cardPayment.cardNum.placeholder"
                        @input="checkSystemNumber"
                      >
                        <template v-slot:append>
                          <v-img
                            v-if="!!creditCardIcon"
                            width="40"
                            height="40"
                            :src="require(`../assets/images/credit-card-icons/${creditCardIcon}.png`)"
                          ></v-img>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        color="green accent-2"
                        hide-details="auto"
                        :rules="[rules.required(cardPayment.cardCode.init, cardPayment.cardCode.label)]"
                        v-model="cardPayment.cardCode.init"
                        v-mask="'####'"
                        type="text"
                        dark
                        filled
                        :label="cardPayment.cardCode.label"
                        :placeholder="cardPayment.cardCode.placeholder"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        color="green accent-2"
                        hide-details="auto"
                        :rules="[rules.required(cardPayment.cardExp.init, cardPayment.cardExp.label)]"
                        v-model="cardPayment.cardExp.init"
                        v-mask="'##/##'"
                        type="text"
                        dark
                        filled
                        :label="cardPayment.cardExp.label"
                        :placeholder="cardPayment.cardExp.placeholder"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-btn
                color="orange accent-2"
                :loading="isLoading"
                light
                @click="placeOrder"
              >Place Order</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-col>

        <!--ORDER SUMMARY-->
        <v-col class="text-center" cols="6">
          <v-sheet height="auto" light>
            <v-container fluid>
              <v-row align="center" justify="space-around">
                <v-col cols="12">
                  <h1>Order Summary</h1>
                </v-col>
                <v-col cols="12">
                  <v-sheet class="pa-5" dark height="auto">
                    <v-card
                      light
                      color="green accent-2"
                      class="my-5"
                      v-for="item in getCart"
                      :key="item.id"
                    >
                      <v-row align="center" justify="center" no-gutters class="pa-2">
                        <v-col cols="6">
                          <v-img
                            height="100px"
                            width="100px"
                            :src="require(`../assets/images/${item.image}`)"
                          ></v-img>
                        </v-col>
                        <v-col cols="6">
                          <v-row align="center" justify="start" no-gutters>
                            <v-col
                              class="text-left"
                              cols="12"
                            >Item Description: {{item.description}}</v-col>
                            <v-col class="text-left" cols="12">Item Price: {{item.price | currency}}</v-col>
                            <v-col class="text-left" cols="12">Item Quantity: {{item.quantity}}</v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-sheet>
                </v-col>
                <v-col class="text-left" cols="12">
                  <h3>Item Total: {{getTotalPrice | currency}}</h3>
                  <h3>
                    Shipping:
                    <span v-if="shippingSelection">
                      <span
                        v-if="shippingSelection === shippingRates.standard.value"
                      >{{shippingRates.standard.value | currency}}</span>
                      <span
                        v-else-if="shippingSelection === shippingRates.prority.value"
                      >{{shippingRates.prority.value | currency}}</span>
                      <span v-else>{{shippingRates.express.value | currency}}</span>
                    </span>
                  </h3>
                  <h3>Taxes: {{calculateTax | currency}}</h3>
                </v-col>
                <v-col class="text-left" cols="12">
                  <h2>Grand Total: {{totalOrderPrice | currency}}</h2>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar">{{response}}</v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "checkout",

  data() {
    return {
      account: {
        firstName: {
          init: "",
          label: "First Name"
        },
        lastName: {
          init: "",
          label: "Last Name"
        },
        email: {
          init: "",
          label: "Email"
        },
        phoneNum: {
          init: "",
          label: "Phone Number"
        },

        shipping: {
          firstName: {
            init: "",
            label: "First Name"
          },
          lastName: {
            init: "",
            label: "Last Name"
          },
          addressOne: {
            init: "",
            label: "Address 1"
          },
          addressTwo: {
            init: "",
            label: "Address 2"
          },
          city: {
            init: "",
            label: "City"
          },
          state: {
            init: "",
            label: "State"
          },
          zipCode: {
            init: "",
            label: "Zip Code"
          },
          country: {
            init: "",
            label: "Country"
          }
        },

        billing: {
          firstName: {
            init: "",
            label: "First Name"
          },
          lastName: {
            init: "",
            label: "Last Name"
          },
          addressOne: {
            init: "",
            label: "Address 1"
          },
          addressTwo: {
            init: "",
            label: "Address 2"
          },
          city: {
            init: "",
            label: "City"
          },
          state: {
            init: "",
            label: "State"
          },
          zipCode: {
            init: "",
            label: "Zip Code"
          },
          country: {
            init: "",
            label: "Country"
          },
          phoneNum: {
            init: "",
            label: "Phone Number"
          }
        }
      },

      items: [],

      isSubscribed: true,

      cardPayment: {
        cardNum: {
          init: "4111-1111-1111-1111", //temp
          label: "Card Number",
          placeholder: "1234-1234-1234-1234"
        },
        cardCode: {
          init: "123", //temp
          label: "CCV",
          placeholder: "123"
        },
        cardExp: {
          init: "01/22", //temp
          label: "Exp. Date",
          placeholder: "01/20"
        }
      },

      shippingSelection: "",

      rules: {
        required: (value, label) => !!value || `${label} is required.`,
        selectionRequired: value => !!value || "Selection is required."
      },
      showPass: false,
      createAccount: false,
      copyShippingAddress: true,
      creditCardIcon: "",
      terms: false,
      displayPersonal: false,
      displayShipping: false,
      step: 1,
      success: false,
      response: "",
      snackbar: false,
      dialog: false,
      isLoading: false
    };
  },

  methods: {
    paymentFormUpdate(opaqueData) {
      //create guest acccount
      if (!this.getUser) {
        const newUser = {
          account: this.filterAccount,
          isSubscribed: this.isSubscribed
        };
        try {
          this.$store.dispatch("user/registerUser", newUser);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          this.$store.dispatch("user/updateCurrentUser", {
            account: this.filterAccount
          });
        } catch (err) {
          console.log(err);
        }
      }

      //place order
      axios
        .post("http://localhost:3000/api/checkouts/", {
          account: this.filterAccount,
          items: this.items,
          dataDescriptor: opaqueData.dataDescriptor,
          dataValue: opaqueData.dataValue
        })
        .then(async res => {
          if (res.data != null) {
            this.cardPayment.cardNum.init = "";
            this.cardPayment.cardCode.init = "";
            this.cardPayment.cardExp.init = "";

            //Hide Orders Page Once payment is successful
            this.success = true;
            this.$router.push(
              `/checkout/successful-payment/${res.data.orderId}`
            );
          }
        })
        .catch(err => {
          this.response = err.response.data
            ? err.response.data.msgText
            : err.response.data.transErrText;
          this.snackbar = true;
        });
    },

    responseHandler(response) {
      if (response.messages.resultCode === "Error") {
        this.snackbar = true;
        let i = 0;
        while (i < response.messages.message.length) {
          this.response = response.messages.message[i].text;
          i = i + 1;
        }
      } else {
        this.paymentFormUpdate(response.opaqueData);
      }
    },

    continueToShipping() {
      const isValid = this.$refs.personalDetailsForm.validate();

      if (isValid) {
        this.step = 2;
        this.displayPersonal = true;
      }
    },

    continueToPayment() {
      // //get Shipping Rates from USPS

      // try {
      //   await this.$store.dispatch("getShippingRates", {
      //     account: this.filterAccount
      //   });
      // } catch (err) {
      //   console.log(err);
      // }

      const isValid = this.$refs.shippingForm.validate();

      if (isValid) {
        this.step = 3;
        this.displayShipping = true;

        //by default set shipping fields equal to billing
        this.account.billing.firstName.init = this.account.shipping.firstName.init;
        this.account.billing.lastName.init = this.account.shipping.lastName.init;
        this.account.billing.addressOne.init = this.account.shipping.addressOne.init;
        this.account.billing.addressTwo.init = this.account.shipping.addressTwo.init;
        this.account.billing.city.init = this.account.shipping.city.init;
        this.account.billing.state.init = this.account.shipping.state.init;
        this.account.billing.zipCode.init = this.account.shipping.zipCode.init;
        this.account.billing.country.init = this.account.shipping.country.init;
        this.account.billing.phoneNum.init = this.account.phoneNum.init;
      }
    },

    placeOrder() {
      const isValid = this.$refs.paymentForm.validate();

      //validate payment form
      if (isValid) {
        //start button loading
        this.isLoading = true;

        const authData = {
          clientKey:
            "3bw8GPYE7cdkgbF8DZJ28t4Nx8nY9B9VvSrYKB9qNVBjr8N3Nsqm9y23EFTwq76L",
          apiLoginID: "469sAkuGW"
        };

        const cardDate = this.cardPayment.cardExp.init.split("/");

        const cardData = {
          cardNumber: this.cardPayment.cardNum.init.replace(/-/g, ""),
          cardCode: this.cardPayment.cardCode.init,
          month: cardDate[0],
          year: cardDate[1]
        };

        const secureData = {
          authData,
          cardData
        };

        console.log(secureData);

        //dispatch secure data
        Accept.dispatchData(secureData, this.responseHandler);
      }
    },

    async getUserAccount() {
      try {
        await this.$store.dispatch("user/getCurrentUser");
      } catch (err) {
        console.log(err.respone.data);
      }

      if (this.current_user) {
        //account info
        this.account.email.init = this.current_user.account.email;
        this.account.firstName.init = this.current_user.account.firstName;
        this.account.lastName.init = this.current_user.account.lastName;
        this.account.phoneNum.init = this.current_user.account.billing.phoneNum;

        //acount shipping
        this.account.shipping.firstName.init = this.current_user.account.shipping.firstName;
        this.account.shipping.lastName.init = this.current_user.account.shipping.lastName;
        this.account.shipping.addressOne.init = this.current_user.account.shipping.addressOne;
        this.account.shipping.addressTwo.init = this.current_user.account.shipping.addressTwo;
        this.account.shipping.city.init = this.current_user.account.shipping.city;
        this.account.shipping.state.init = this.current_user.account.shipping.state;
        this.account.shipping.zipCode.init = this.current_user.account.shipping.zipCode;
        this.account.shipping.country.init = this.current_user.account.shipping.country;

        //acount billing
        this.account.billing.firstName.init = this.current_user.account.billing.firstName;
        this.account.billing.lastName.init = this.current_user.account.billing.lastName;
        this.account.billing.addressOne.init = this.current_user.account.billing.addressOne;
        this.account.billing.addressTwo.init = this.current_user.account.billing.addressTwo;
        this.account.billing.city.init = this.current_user.account.billing.city;
        this.account.billing.state.init = this.current_user.account.billing.state;
        this.account.billing.zipCode.init = this.current_user.account.billing.zipCode;
        this.account.billing.country.init = this.current_user.account.billing.country;
        this.account.billing.phoneNum.init = this.current_user.account.billing.phoneNum;
      }
    },

    copyAddress() {
      if (this.copyShippingAddress) {
        this.account.billing.firstName.init = this.account.shipping.firstName.init;
        this.account.billing.lastName.init = this.account.shipping.lastName.init;
        this.account.billing.addressOne.init = this.account.shipping.addressOne.init;
        this.account.billing.addressTwo.init = this.account.shipping.addressTwo.init;
        this.account.billing.city.init = this.account.shipping.city.init;
        this.account.billing.state.init = this.account.shipping.state.init;
        this.account.billing.zipCode.init = this.account.shipping.zipCode.init;
        this.account.billing.country.init = this.account.shipping.country.init;
        this.account.billing.phoneNum.init = this.account.phoneNum.init;
      } else {
        this.account.billing.firstName.init = "";
        this.account.billing.lastName.init = "";
        this.account.billing.addressOne.init = "";
        this.account.billing.addressTwo.init = "";
        this.account.billing.city.init = "";
        this.account.billing.state.init = "";
        this.account.billing.zipCode.init = "";
        this.account.billing.country.init = "";
        this.account.billing.phoneNum.init = "";
      }
    },

    checkSystemNumber() {
      switch (this.cardPayment.cardNum.init.substring(0, 1)) {
        case "4":
          this.creditCardIcon = "visa";
          break;
        case "5":
          this.creditCardIcon = "mastercard";
          break;
        case "6":
          this.creditCardIcon = "discover";
          break;
        default:
          this.creditCardIcon = "";
          break;
      }
    }
  },

  computed: {
    ...mapState({
      current_user: state => state.user.current_user,
      cart: state => state.cart,
      shippingRates: state => state.shippingRate
    }),
    ...mapGetters(["getTotalPrice"]),

    getUser() {
      return this.$store.getters["user/getUser"];
    },

    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },

    calculateTax() {
      const salesTax = 0.06;

      const shippingRate = !this.shippingSelection ? 0 : this.shippingSelection;

      const totalSalesTax =
        (parseFloat(shippingRate) + this.getTotalPrice) * salesTax;

      return totalSalesTax;
    },

    getTotalPrice() {
      let totalItemPrice = 0;

      const cart = JSON.parse(localStorage.getItem("cart"));

      cart.forEach(item => {
        totalItemPrice = totalItemPrice + item.price * item.quantity;
      });

      return totalItemPrice;
    },

    totalOrderPrice() {
      const shippingRate = !this.shippingSelection ? 0 : this.shippingSelection;

      return this.calculateTax + parseFloat(shippingRate) + this.getTotalPrice;
    },

    getCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },

    //filter out the label from account
    filterAccount() {
      const filteredAccount = {
        firstName: this.account.firstName.init,
        lastName: this.account.lastName.init,
        email: this.account.email.init,
        shipping: {
          firstName: this.account.shipping.firstName.init,
          lastName: this.account.shipping.lastName.init,
          addressOne: this.account.shipping.addressOne.init,
          addressTwo: this.account.shipping.addressTwo.init,
          city: this.account.shipping.city.init,
          state: this.account.shipping.state.init,
          zipCode: this.account.shipping.zipCode.init,
          country: this.account.shipping.country.init
        },
        billing: {
          firstName: this.account.billing.firstName.init,
          lastName: this.account.billing.lastName.init,
          addressOne: this.account.billing.addressOne.init,
          addressTwo: this.account.billing.addressTwo.init,
          city: this.account.billing.city.init,
          state: this.account.billing.state.init,
          zipCode: this.account.billing.zipCode.init,
          country: this.account.billing.country.init,
          phoneNum: this.account.billing.phoneNum.init
        }
      };

      return filteredAccount;
    }
  },

  created() {
    //mount Accept.js into checkout page when routed to
    let authAcceptScript = document.createElement("script");
    authAcceptScript.setAttribute(
      "src",
      "https://jstest.authorize.net/v1/Accept.js"
    );
    document.head.appendChild(authAcceptScript);

    //this loads the user email in the email field if the user is logged In
    if (this.getUser) {
      this.getUserAccount();
    }

    //load users cart into account items
    this.items = this.getCart;
  }
};
</script>

<style>
</style>