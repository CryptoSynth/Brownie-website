<template>
  <v-container fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12">
        <v-data-table light :headers="headers" :items="products" sort-by="name" class="elevation-1">
          <template v-slot:top>
            <v-toolbar light flat color="pink accent-3">
              <v-toolbar-title class="text-uppercase">Products Managment</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="700px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    rounded
                    color="green accent-2"
                    light
                    class="mb-2"
                    v-on="on"
                    @click="addItem"
                  >
                    <v-icon left>mdi-plus</v-icon>Add Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <v-col cols="12">
                          <v-text-field outlined v-model="editedItem.image" label="Item Image"></v-text-field>

                          <!-- <v-file-input
                            accept="image/*"
                            show-size
                            counter
                            outlined
                            label="Upload Image"
                            prepend-icon
                          >
                            <template v-slot:selection="{ text }">
                              <v-chip label color="pink accent-3">{{ text }}</v-chip>
                            </template>
                          </v-file-input>-->
                        </v-col>
                        <v-col cols="12">
                          <v-text-field outlined v-model="editedItem.name" label="Item Name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field outlined v-model="editedItem.price" label="Item Price"></v-text-field>
                        </v-col>
                      </v-col>
                      <v-col cols="6">
                        <v-col cols="12">
                          <v-textarea
                            row-height="55"
                            auto-grow
                            outlined
                            v-model="editedItem.description"
                            label="Item Description"
                          ></v-textarea>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red accent-3" text @click="close">Cancel</v-btn>
                    <v-btn v-if="newTitle" color="green accent-3" text @click="save(editedItem)">Add</v-btn>
                    <v-btn v-else color="green accent-3" text @click="save(editedItem)">Update</v-btn>
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
    <v-snackbar
      dark
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      v-model="snackbar.isActive"
    >
      <div v-if="snackbar.isError">{{snackbar.errorMessage}}</div>
      <div v-else>{{snackbar.successMessage}}</div>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "admin-products-table",

  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Item Image",
          align: "start",
          sortable: false,
          value: "image"
        },
        { text: "Item ID", value: "_id" },
        { text: "Item Name", value: "name" },
        { text: "Item Description", value: "description", sortable: false },
        { text: "Item Price", value: "price" },
        { text: "Edit/Delete", value: "actions", sortable: false }
      ],
      newTitle: true,
      snackbar: {
        isActive: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
        timeout: 2000,
        color: ""
      },
      editedItem: {
        id: "",
        name: "",
        image: "box-brownies.jpeg",
        description: "",
        price: 0
      }
    };
  },

  computed: {
    ...mapState({
      products: state => state.product.products
    }),

    formTitle() {
      return this.newTitle ? "New Item" : "Edit Item";
    }
  },

  methods: {
    editItem(product) {
      this.dialog = true;
      this.newTitle = false;
      this.editedItem = {
        id: product._id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price
      };
    },

    async deleteItem(product) {
      try {
        const isConfirmed = confirm(
          "Are you sure you want to delete this item?"
        );

        if (isConfirmed) {
          await this.$store.dispatch("product/deleteProduct", product._id);
          this.snackbar.isActive = true;
          this.snackbar.isError = false;
          this.snackbar.color = "success";
          this.snackbar.successMessage = `${product.name} Deleted!`;

          this.close();
        }
      } catch (err) {
        this.snackbar.isActive = true;
        this.snackbar.isError = true;
        this.snackbar.color = "red";
        this.snackbar.errorMessage = err;
      }
    },

    addItem() {
      this.dialog = true;
      this.newTitle = true;
    },

    async save(editedItem) {
      if (this.newTitle) {
        try {
          await this.$store.dispatch("product/createProduct", editedItem);
          this.snackbar.isActive = true;
          this.snackbar.isError = false;
          this.snackbar.color = "success";
          this.snackbar.successMessage = `${editedItem.name} Added!`;
          this.close();
        } catch (err) {
          this.snackbar.isActive = true;
          this.snackbar.isError = true;
          this.snackbar.color = "red";
          this.snackbar.errorMessage = err;
        }
      } else {
        try {
          await this.$store.dispatch("product/updateProduct", editedItem);
          this.snackbar.isActive = true;
          this.snackbar.isError = false;
          this.snackbar.color = "success";
          this.snackbar.successMessage = `${editedItem.name} Updated!`;
          this.close();
        } catch (err) {
          this.snackbar.isActive = true;
          this.snackbar.isError = true;
          this.snackbar.color = "red";
          this.snackbar.errorMessage = err;
        }
      }
    },

    close() {
      this.dialog = false;
      this.editedItem = {
        id: "",
        name: "",
        image: "box-brownies.jpeg",
        description: "",
        price: 0
      };
    }
  }
};
</script>

<style>
</style>