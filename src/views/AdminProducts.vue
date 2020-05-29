<template>
  <v-container fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col>
        <v-data-table light :headers="headers" :items="products" sort-by="name" class="elevation-1">
          <template v-slot:top>
            <v-toolbar light flat color="pink accent-3">
              <v-toolbar-title class="text-uppercase">Brownie Storefront Managment</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn rounded color="light-blue accent-2" light class="mb-2" v-on="on">
                    <v-icon left>mdi-plus</v-icon>Add Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field outlined v-model="editedItem.image" label="Item Image"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field outlined v-model="editedItem.name" label="Item Name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            auto-grow
                            outlined
                            v-model="editedItem.description"
                            label="Item Description"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field outlined v-model="editedItem.price" label="Item Price"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue red accent-3" text @click="close">Cancel</v-btn>
                    <v-btn color="light-blue accent-3" text @click="save(editedItem)">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.image="{ item }">
            <v-avatar tile>
              <img :src="require(`../assets/images/${item.image}`)" />
            </v-avatar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn fab class="mr-5" x-small color="blue" @click="editItem(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab color="red" x-small @click="deleteItem(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:no-data>
            <h1>Add Items</h1>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "admin-products",
      dialog: false,
      headers: [
        {
          text: "Item Image",
          align: "start",
          sortable: false,
          value: "image"
        },
        { text: "Item ID", value: "id" },
        { text: "Item Name", value: "name" },
        { text: "Item Description", value: "description", sortable: false },
        { text: "Item Price", value: "price" },
        { text: "Edit/Delete", value: "actions", sortable: false }
      ],
      newTitle: true,
      editedItem: {
        name: "",
        image: "",
        description: "",
        price: 0
      }
    };
  },

  computed: {
    ...mapState(["products"]),

    formTitle() {
      return this.newTitle ? "New Item" : "Edit Item";
    }
  },

  methods: {
    async editItem(item) {
      this.dialog = true;
      this.newTitle = false;
      this.editedItem = Object.assign({}, item);
    },

    async deleteItem(item) {
      try {
        confirm("Are you sure you want to delete this item?") &&
          (await this.$store.dispatch("deleteProduct", item));
        this.close();
      } catch (err) {
        console.log(err);
      }
    },

    close() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.editedItem);
    },

    on() {
      this.newTitle = false;
    },

    async save(item) {
      if (this.newTitle) {
        try {
          await this.$store.dispatch("createProduct", this.editedItem);
          this.close();
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await this.$store.dispatch("updateProduct", item);
          this.close();
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