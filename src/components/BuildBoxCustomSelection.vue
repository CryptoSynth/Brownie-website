<template>
  <v-chip class="text-capitalize" color="pink accent-1">
    <v-avatar left>
      <v-img :src="require(`../assets/images/${item.img}`)" />
    </v-avatar>
    <span>
      {{item.type}}
      <slot></slot>
    </span>
  </v-chip>
</template>

<script>
export default {
  name: "custom-selection",

  props: ["item"]
};
</script>

<style>
</style>