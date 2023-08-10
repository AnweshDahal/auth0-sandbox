<template>
  <v-app>
    <header class="app-header">
      <div class="app-logo">
        <v-img src="@/assets/logo.svg" class="mr-3" width="48"></v-img
        ><span>Sandbox: {{ appName }}</span>
      </div>
      {{ isAuthenticated }}
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
// ~> We will use composition API for Auth0
import { watch, onMounted, ref } from "vue";
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
    /*
     |> loginWithRedirect: this is used for login
     |> logout: this is used for logout
     |> user: this returns the user's details after login
     |> isAUthenticated: checks if a user has been authenticated
     |> getAccessTokenSilently: fetches the access token of the logged in user
     */
    const { loginWithRedirect, logout, idTokenClaims } = useAuth0();

    // ~> This will store the data of the access token
    const user = ref(null);

    // ~> Function to login
    const login = () => {
      loginWithRedirect();
    };

    // ~> Function to logout
    const logout_ = () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

    // ~> UIController to display a loading screen or the page content
    const loaded = ref(false);

    watch(idTokenClaims, (value) => {
      console.log(value);
      user.value = {
        __raw: value.__raw,
        given_name: value.given_name,
        family_name: value.family_name,
        nickname: value.nickname,
        name: value.name,
        picture: value.picture,
        locale: value.locale,
        updated_at: value.updated_at,
        email: value.email,
        email_verified: value.email_verified,
        iss: value.iss,
        aud: value.aud,
        iat: value.iat,
        exp: value.exp,
        sub: value.sub,
        sid: value.sid,
        nonce: value.nonce,
      };
    });

    watch(user, (userValue) => {
      localStorage.setItem("token", userValue.__raw);
    });

    // ? You cannot access the components unless you return them
    return {
      login,
      logout: logout_,
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
    display: flex;
    align-items: center;
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
