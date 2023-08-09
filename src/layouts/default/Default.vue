<template>
  <v-app>
    <header class="app-header">
      <div class="app-logo">{{ appName }}</div>
      <div class="app-menu">
        <v-menu
          location="bottom"
          transition="slide-y-transition"
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
                      <v-list-item-text
                        ><a
                          @click="logout"
                          target="_blank"
                          class="menu__link"
                          rel="noopener noreferrer"
                          >Logout</a
                        ></v-list-item-text
                      >
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
    <default-view :loaded="loaded" />
    <footer class="app-footer">
      <p class="copyright">
        &copy;{{ new Date().getFullYear() }} {{ appName }}, All Rights Reserved
      </p>
    </footer>
  </v-app>
</template>

<script>
import DefaultView from "./View.vue";
import { watch, onMounted, ref, onBeforeMount } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  name: "Default",
  components: {
    "default-view": DefaultView,
  },

  data: () => ({
    appName: import.meta.env.VITE_APP_NAME,
  }),

  setup() {
    const {
      loginWithRedirect,
      logout,
      user,
      isAuthenticated,
      getAccessTokenSilently,
    } = useAuth0();

    const user_ = ref(null);

    const login = () => {
      loginWithRedirect();
    };

    const loaded = ref(false);

    onMounted(async () => {
      try {
        if (isAuthenticated.value) {
          const claims = await getAccessTokenSilently();
          user_.value = claims;
        }
      } catch (error) {
        console.error("Ein Error", error);
      }
      loaded.value = true;
    });

    const logout_ = () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

    watch(user, (currentValue) => {
      console.log(currentValue);
    });

    watch(user_, (userVal) => {
      localStorage.setItem("token", "Bearer " + userVal);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.value.email,
          email_verified: user.value.email_verified,
          family_name: user.value.family_name,
          given_name: user.value.given_name,
          locale: user.value.locale,
          name: user.value.name,
          nickname: user.value.nickname,
          picture: user.value.picture,
          sub: user.value.sub,
          updatedAt: user.value.updatedAt,
        })
      );
    });

    return {
      login,
      logout: logout_,
      user,
      isAuthenticated,
      loaded,
    };
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
  min-width: 30rem;
  margin-inline: 0px;
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
