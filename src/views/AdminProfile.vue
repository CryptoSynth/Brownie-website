<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <v-sheet
          height="550"
          class="d-flex flex-column align-center justify-center pa-3"
          color="red accent-2"
        >
          <v-card>
            <v-card-title>
              <v-avatar left class="mr-4">
                <img :src="require(`@/assets/images/${user.image}`)" alt />
              </v-avatar>Profile
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-container fluids>
                  <v-row align="center" jsutify="center">
                    <v-col cols="6">
                      <v-text-field
                        dense
                        v-model="user.firstName"
                        value="firstName"
                        label="First Name"
                        outlined
                        color="pink accent-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        dense
                        v-model="user.lastName"
                        value="lastName"
                        label="Last Name"
                        outlined
                        color="pink accent-3"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row align="center" jsutify="center">
                    <v-col cols="12">
                      <v-text-field
                        dense
                        v-model="user.address"
                        value="address"
                        label="Address"
                        outlined
                        color="pink accent-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        v-model="user.city"
                        value="city"
                        label="City"
                        outlined
                        color="pink accent-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        v-model="user.state"
                        value="state"
                        label="State"
                        outlined
                        color="pink accent-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        v-model="user.zipCode"
                        value="zipCode"
                        label="Zip Code"
                        outlined
                        color="pink accent-3"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink accent-3">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        image: "brownie_avatar.png",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: ""
      }
    };
  }
};
</script>

<style>
</style>