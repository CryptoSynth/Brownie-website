<template>
  <v-container fluid>
    <!--Admin menu and drawer -->
    <v-navigation-drawer permanent :mini-variant.sync="mini" app v-model="admintool" left>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <img src="@/assets/images/brownie_avatar.png" alt="brownie-avatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              class="text-capitalize"
            >Welcome, {{current_user.account.firstName}} {{current_user.account.lastName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item :to="`/admin-account/${item.url}`" v-for="(item, index) in items" :key="index">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list nav dense v-if="mini">
          <v-list-item @click.stop="mini = !mini">
            <v-list-item-icon>
              <v-icon color="pink accent-3">mdi-arrow-collapse-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <div v-else class="pa-2">
          <v-btn light block @click.stop="mini = !mini">
            <v-icon left color="pink accent-3">mdi-arrow-collapse-left</v-icon>Close Menu
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12">
        <v-sheet light>
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="4">
              <v-btn dark to="/">
                <v-icon left large class="mr-5" color="pink accent-3">mdi-arrow-left</v-icon>Back To Store
              </v-btn>
            </v-col>
            <v-col class="text-center" cols="8">
              <h1 class="display-3 text-uppercase">Admin {{current_user.account.firstName}}</h1>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import store from "../store/index";

export default {
  name: "admin-dashboard",

  data() {
    return {
      admintool: true,
      mini: true,
      items: [
        {
          title: "Profile",
          icon: "mdi-account-circle",
          url: "profile"
        },
        {
          title: "Products",
          icon: "mdi-clipboard-text",
          url: "products"
        },
        { title: "Orders", icon: "mdi-package-variant", url: "orders" },
        {
          title: "Shipped Orders",
          icon: "mdi-package-variant-closed",
          url: "shipping"
        }
      ]
    };
  },

  computed: {
    ...mapState({
      current_user: state => state.user.current_user
    })
  },

  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch("user/getCurrentUser");
      next();
    } catch (err) {
      console.log(err);
      next("/");
    }
  },

  async created() {
    try {
      await this.$store.dispatch("user/getAllUsers");
      await this.$store.dispatch("order/getOrders");
      await this.$store.dispatch("shipping/getAllShipping");
      await this.$store.dispatch("tracking/getAllTracking");
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
</style>