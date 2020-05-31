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
            <v-list-item-title>Admin User</v-list-item-title>
            <v-list-item-subtitle>Welcome, Admin User!</v-list-item-subtitle>
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
            <v-icon left color="pink accent-3">mdi-arrow-collapse-left</v-icon>Close
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12" class="text-center">
        <v-sheet light>
          <h1 class="display-3 py-3 text-uppercase">Admin {{$route.name}}</h1>
        </v-sheet>
      </v-col>

      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
          icon: "mdi-package-variant",
          url: "products"
        },
        { title: "Orders", icon: "mdi-clipboard-text", url: "orders" }
      ]
    };
  }
};
</script>

<style>
</style>