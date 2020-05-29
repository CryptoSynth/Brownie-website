<template>
  <v-container fluid>
    <v-row justify="center" align="center" no-gutters>
      <v-col class="text-center">
        <v-sheet light>
          <h1 class="display-3 py-3 text-uppercase">Admin {{$route.name}}</h1>
        </v-sheet>
        <!--Admin menu and drawer -->
        <v-navigation-drawer app expand-on-hover v-model="admintool" left>
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
            <v-list-item
              :to="`/admin-account/${item.url}`"
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-icon>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="text-left">{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>

      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      admin: true, // temp palceholder,
      admintool: true,
      items: [
        {
          title: "Profile",
          icon: "mdi-help-box",
          url: "profile"
        },
        {
          title: "Products",
          icon: "mdi-view-dashboard",
          url: "products"
        },
        { title: "Orders", icon: "mdi-image", url: "orders" }
      ]
    };
  }
};
</script>

<style>
</style>