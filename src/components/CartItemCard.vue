<template>
  <v-row align="center" justify="center" no-gutters>
    <v-card color="pink accent-3" width="350px">
      <v-row align="center" justify="center" no-gutters>
        <v-col class="text-center" cols="4">
          <v-avatar style="border-radius: 5px; border: 2px solid black" tile size="100">
            <v-img class="overlay" cover src="@/assets/images/box-brownies.jpeg"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="8">
          <v-row align="center" justify="center" no-gutters>
            <v-sheet class="ma-2 pa-1" height="98px" color="white">
              <v-row class="fill-height" align="center" justify="center" no-gutters>
                <v-col cols="9">
                  <p class="name">{{item.name}}</p>
                </v-col>

                <v-col class="text-right" cols="3">
                  <v-icon md color="black " @click="removeFromCart">mdi-close-circle-outline</v-icon>
                </v-col>

                <v-col cols="12">
                  <p class="description">{{item.description}}</p>
                </v-col>

                <v-col>
                  <p class="price">Price: ${{item.price}}.00</p>
                </v-col>

                <v-col>
                  <v-row align="center" justify="end" no-gutters>
                    <v-col cols="6">
                      <v-text-field
                        dense
                        hide-details
                        type="text"
                        class="mb-1"
                        readonly
                        v-model="updateItemQuantity"
                        label="quantity"
                        single-line
                        solo
                      ></v-text-field>
                    </v-col>
                    <v-col class="ml-1" cols="3">
                      <div class="d-flex flex-column align-center justify-space-around">
                        <v-icon color="red" class="mb-1" md @click="add()">mdi-plus</v-icon>
                        <v-icon color="green" md @click="sub">mdi-minus</v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "cart-item-card",

  props: ["item", "index", "quantity"],

  data() {
    return {};
  },

  methods: {
    add() {
      this.$store.dispatch("add", this.index);
    },

    sub() {
      this.$store.dispatch("sub", this.index);
    },

    removeFromCart() {
      this.$store.dispatch("removeFromCart", this.index);
    }
  },

  computed: {
    updateItemQuantity: {
      get() {
        return this.item.quantity;
      },
      set(quantity) {
        this.item.quantity = quantity;
      }
    }
  }
};
</script>

<style>
.overflow {
  overflow: hidden;
}

.name {
  color: gray;
  font-size: 0.9rem;
  margin: 0 !important;
  text-transform: uppercase;
}

.price {
  color: black;
  font-weight: 800;
  font-size: 1rem;
  margin: 0 !important;
}

.description {
  color: gray;
  font-size: 0.7rem;
  margin: 0 !important;
}
</style>