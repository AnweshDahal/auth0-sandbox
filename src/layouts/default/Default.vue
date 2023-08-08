<template>
  <v-app>
    <header class="app-header">
      <div class="app-logo">{{ appName }}</div>
      <div class="app-menu">
        <v-menu
          location="bottom"
          open-on-hover
          open-delay="100"
          close-delay="100"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              dark
              variant="link"
              class="menu-link"
              v-bind="props"
              append-icon="mdi-chevron-down"
              >My Account</v-btn
            >
          </template>
          <v-card class="menu__card" elevation="10">
            <v-card-text>
              <v-row class="menu__menu-row">
                <v-col cols="6" class="menu__menu-col">
                  <v-list class="menu__list">
                    <v-list-subheader
                      color="indigo-darken-1"
                      class="menu__list-subheader"
                    >
                      Profile Options
                    </v-list-subheader>
                    <v-list-item class="list-item">
                      <v-list-item-text
                        ><a
                          @click="login"
                          target="_blank"
                          class="menu__link"
                          rel="noopener noreferrer"
                          >Login</a
                        ></v-list-item-text
                      >
                    </v-list-item>
                    <v-list-item class="list-item">
                      <v-list-item-text>My Account</v-list-item-text>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="6" class="menu__menu-col">
                  <v-list class="menu__list">
                    <v-list-subheader class="menu__list-subheader">
                      Profile Options
                    </v-list-subheader>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
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
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
  },
};
</script>

<style lang="scss" scoped>
header.app-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .app-logo {
    font-size: 2rem;
    font-family: "Manrope", sans-serif;
    font-weight: 600;
  }

  .app-menu {
    .menu-link {
      font-family: "Manrope", sans-serif;
      font-size: 1rem;
      font-weight: 600 !important;
      text-transform: capitalize;
      letter-spacing: 0px;
    }
  }
}

.menu__card {
  min-width: 40rem;
  border-radius: 0.8rem !important;
  margin-top: 1rem;
  padding: 2rem 1.5rem;

  .menu__menu-row {
    .menu__menu-col {
      .menu__list {
        font-family: "Manrope", sans-serif;
      }

      .menu__list-subheader {
        font-weight: 700 !important;
        font-size: 1.1rem;
        text-transform: uppercase;
      }
    }
  }
}

.app-footer {
  padding: 1rem;
  text-align: center;
  font-family: "Manrope", sans-serif;
}

.menu__link {
  cursor: pointer;
}
.menu__link:hover {
  text-decoration: underline;
  color: #3949ab;
}
</style>
