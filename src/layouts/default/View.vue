<template>
  <v-main>
    <v-progress-circular indeterminate v-if="!loaded"></v-progress-circular>
    <router-view v-else />
  </v-main>
</template>

<script>
export default {
  name: "DefaultView",
  props: {
    loaded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
