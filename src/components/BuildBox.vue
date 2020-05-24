<template>
  <div>
    <v-dialog class="scroll" width="600" v-model="custom">
      <template v-slot:activator="{ on }">
        <v-btn color="pink accent-3" v-on="on">You Choose</v-btn>
      </template>

      <v-stepper v-model="customstep" vertical>
        <template v-for="(step, index) in steps">
          <v-stepper-step
            editable
            :key="index"
            color="pink accent-2"
            :complete="customstep > step"
            :step="step"
          >Brownie #{{step}}</v-stepper-step>

          <v-stepper-content :step="step" :key="index + 10">
            <v-sheet color="pink accent-2" class="mb-5" height="250px">
              <v-container class="fill-height" fluid>
                <v-row justify="center" align="center" no-gutters>
                  <v-col class="mt-7" cols="8">
                    <v-select
                      item-text="type"
                      :items="choices.frosting"
                      light
                      chips
                      solo
                      v-model="selectedFrost"
                      label="Frosting"
                    >
                      <template v-slot:selection="{item}">
                        <v-chip class="text-capitalize" color="pink accent-1">
                          <v-avatar left>
                            <v-img :src="require(`../assets/images/${item.img}`)" />
                          </v-avatar>
                          {{item.type}}-Frosting
                        </v-chip>
                      </template>
                      <template v-slot:item="{item}">
                        <v-container fluid>
                          <v-row justify="center" no-gutters>
                            <v-col cols="3">
                              <v-avatar tile left>
                                <v-img :src="require(`../assets/images/${item.img}`)" />
                              </v-avatar>
                            </v-col>
                            <v-col cols="9">
                              <v-list-item-content class="text-capitalize">{{item.type}}</v-list-item-content>
                            </v-col>
                          </v-row>
                        </v-container>
                      </template>
                    </v-select>
                    <v-select
                      light
                      chips
                      solo
                      v-model="selectedBat"
                      :items="choices.batter"
                      label="Batter"
                    >
                      <template v-slot:selection="{item}">
                        <v-chip class="text-capitalize" color="pink accent-1">
                          <v-avatar left>
                            <v-img :src="require(`../assets/images/${item.img}`)" />
                          </v-avatar>
                          {{item.type}}-Batter
                        </v-chip>
                      </template>
                      <template v-slot:item="{item}">
                        <v-container fluid>
                          <v-row justify="center" no-gutters>
                            <v-col cols="3">
                              <v-avatar tile left>
                                <v-img :src="require(`../assets/images/${item.img}`)" />
                              </v-avatar>
                            </v-col>
                            <v-col cols="9">
                              <v-list-item-content class="text-capitalize">{{item.type}}</v-list-item-content>
                            </v-col>
                          </v-row>
                        </v-container>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
            <v-btn color="pink accent-3 mr-5" @click="add(step)">Add</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </template>

        <v-stepper-step
          color="pink accent-2"
          :complete="customstep > steps.length + 1"
          step="6"
        >Brownie #6</v-stepper-step>

        <v-stepper-content step="6">
          <v-card class="mb-12" color="pink accent-2" height="200px">
            <v-container class="fill-height" fluid>
              <v-row justify="center" align="center" no-gutters>
                <v-col class="mt-7" cols="8">
                  <v-select
                    light
                    chips
                    solo
                    v-model="selectedFrost"
                    :items="choices.frosting"
                    label="Frosting"
                  ></v-select>
                  <v-select
                    light
                    chips
                    solo
                    v-model="selectedBat"
                    :items="choices.batter"
                    label="Batter"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-btn color="pink accent-3 mr-5" @click="createBox(step)">Create Box</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "buildbox",

  data() {
    return {
      custom: false,
      customstep: 1,
      steps: [1, 2, 3, 4, 5],
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
    createItem(step) {
      console.log(this.selectedFrost);

      const customItem = {
        number: step,
        frosting: this.selectedFrost.type,
        batter: this.selectedBat.type
      };

      this.customBox.items.push(customItem);
    },

    add(step) {
      this.createItem(step);
      this.selectedFrost = "";
      this.selectedBat = "";

      this.customstep = step + 1;
    },

    createBox(step) {
      this.createItem(step);
      this.$store.dispatch("addToCart", this.customBox);
      //close dialog
      //open nav drawer
    }
  }
};
</script>

<style lang="css" scoped>
/* .scroll::-webkit-scrollbar {
  display: none !important;
} */
</style>