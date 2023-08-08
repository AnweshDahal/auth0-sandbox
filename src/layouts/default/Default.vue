<template>
  <v-app>
    <header class="app-header">
      <div class="app-logo">{{ appName }}</div>
    </header>
    <default-view />
    <footer class="app-footer">
      <p class="copyright">
        &copy;{{ new Date().getFullYear() }} {{ appName }}, All Rights Reserved
      </p>
    </footer>
  </v-app>
</template>

<script>
import DefaultView from "./View.vue";
export default {
  name: "Default",
  components: {
    "default-view": DefaultView,
  },
  data: () => ({
    appName: import.meta.env.VITE_APP_NAME,
  }),
};
</script>

<style lang="scss" scoped>
header.app-header {
  padding: 1rem;
  .app-logo {
    font-size: 2rem;
    font-family: "Manrope", sans-serif;
    font-weight: 600;
  }
}

.app-footer {
  padding: 1rem;
  text-align: center;
  font-family: "Manrope", sans-serif;
}
</style>
