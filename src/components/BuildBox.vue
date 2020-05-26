<template>
  <div>
    <v-dialog class="scroll" width="600" v-model="custom">
      <template v-slot:activator="{ on }">
        <v-btn color="pink accent-3" v-on="on">You Choose</v-btn>
      </template>

      <v-form ref="customForm">
        <v-stepper v-model="customstep" vertical>
          <template v-for="(step, index) in steps">
            <v-stepper-step
              @click="removeItem(step, index)"
              :editable="isComplete(step)"
              :key="index"
              color="pink accent-2"
              :complete="isComplete(step)"
              :step="step"
            >Brownie #{{step}}</v-stepper-step>

            <v-stepper-content :step="step" :key="index + 10">
              <v-sheet light class="mb-5" height="250px">
                <v-container class="fill-height" fluid>
                  <v-row justify="center" align="center" no-gutters>
                    <v-col class="mt-7" cols="8">
                      <v-select
                        dark
                        :rules="frostingRule"
                        color="pink accent-1"
                        item-color="pink accent-1"
                        item-text="type"
                        :items="choices.frosting"
                        chips
                        solo
                        v-model="selectedFrost"
                        label="Frosting"
                      >
                        <template v-slot:selection="{item}">
                          <BuildBoxCustomSelection :item="item">Frosting</BuildBoxCustomSelection>
                        </template>

                        <template v-slot:item="{item}">
                          <BuildBoxCustomItem :item="item" />
                        </template>
                      </v-select>

                      <v-select
                        dark
                        color="pink accent-1"
                        item-color="pink accent-1"
                        :rules="batterRule"
                        item-text="type"
                        light
                        chips
                        solo
                        v-model="selectedBat"
                        :items="choices.batter"
                        label="Batter"
                      >
                        <template v-slot:selection="{item}">
                          <BuildBoxCustomSelection :item="item">Batter</BuildBoxCustomSelection>
                        </template>

                        <template v-slot:item="{item}">
                          <BuildBoxCustomItem :item="item" />
                        </template>
                      </v-select>
                    </v-col>
                    <v-col class="text-center" cols="4">
                      <v-btn
                        dark
                        v-if="step < steps.length"
                        color="pink accent-3"
                        @click="add(step)"
                      >
                        <v-icon left>mdi-plus</v-icon>add
                      </v-btn>
                      <v-btn dark v-else color="pink accent-3" @click="createBox()">
                        <v-icon left>mdi-download</v-icon>Create
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-sheet>
            </v-stepper-content>
          </template>
        </v-stepper>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import BuildBoxCustomItem from "../components/BuildBoxCustomItem";
import BuildBoxCustomSelection from "../components/BuildBoxCustomSelection";

export default {
  name: "build-box",

  components: {
    BuildBoxCustomItem,
    BuildBoxCustomSelection
  },

  data() {
    return {
      custom: false,
      customstep: 1,
      steps: [1, 2, 3, 4, 5, 6],
      choices: {
        frosting: [
          { img: "choco-frosting.jpg", type: "chocolate" },
          { img: "straw-frosting.jpg", type: "strawberry" },
          { img: "choco-frosting.jpg", type: "vanilla" }
        ],

        batter: [
          { img: "choco-frosting.jpg", type: "chocolate" },
          { img: "straw-frosting.jpg", type: "strawberry" },
          { img: "choco-frosting.jpg", type: "vanilla" }
        ]
      },
      selectedFrost: "",
      selectedBat: "",
      frostingRule: [v => !!v || "Selection is required"],
      batterRule: [v => !!v || "Selection is required"],
      customBox: {
        id: 1,
        name: "Custom Box",
        price: 40,
        quantity: 1,
        description: "custom box",
        items: []
      }
    };
  },

  methods: {
    isComplete(step) {
      return this.customstep > step;
    },

    createItem(step) {
      const customItem = {
        number: step < 6 ? step : step,
        frosting: this.selectedFrost,
        batter: this.selectedBat
      };

      this.customBox.items.push(customItem);
    },

    removeItem(step, index) {
      this.selectedFrost = "";
      this.selectedBat = "";

      if (this.isComplete(step)) {
        return this.customBox.items.splice(index);
      }
    },

    add(step) {
      const isValid = this.$refs.customForm.validate();

      if (isValid) {
        this.createItem(step);
        this.customstep = step + 1;
        this.selectedFrost = "";
        this.selectedBat = "";
        this.$refs.customForm.resetValidation();
      }
    },

    createBox(step) {
      const isValid = this.$refs.customForm.validate();

      if (isValid) {
        this.createItem(step);
        this.$store.dispatch("addToCart", this.customBox);
      }

      this.custom = false;
      this.$store.dispatch("updateCartState", true);
    }
  }
};
</script>

<style lang="css" scoped>
/* .scroll::-webkit-scrollbar {
  display: none !important;
} */
</style>