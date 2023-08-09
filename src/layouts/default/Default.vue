<template>
  <v-app>
    <header class="app-header">
      <div class="app-logo">
        <v-img src="@/assets/logo.svg" class="mr-3" width="48"></v-img
        ><span>Sandbox: {{ appName }}</span>
      </div>
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
// ? We will use composition API for Auth0
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
     * loginWithRedirect: this is used for login
     * logout: this is used for logout
     * user: this returns the user's details after login
     * isAUthenticated: checks if a user has been authenticated
     * getAccessTokenSilently: fetches the access token of the logged in user
     */
    const {
      loginWithRedirect,
      logout,
      user,
      isAuthenticated,
      getAccessTokenSilently,
    } = useAuth0();

    // ? This will store the data of the access token
    const user_ = ref(null);

    // ? Function to login
    const login = () => {
      loginWithRedirect();
    };

    // ? Function to logout
    const logout_ = () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

    // ? UIController to display a loading screen or the page content
    const loaded = ref(false);

    // ? we fetch the access token before mounting this component
    onMounted(async () => {
      try {
        if (isAuthenticated.value) {
          // ? check if the user has been logged in
          const claims = await getAccessTokenSilently(); // get the access token from Auth0
          user_.value = claims; // assign the token value to user_
        } else {
          this.$router.push("/"); // ? if the user is not logged in you may push the user back to the login screen
          // ! this may not work for all use cases, instead you can wait for the token and redirect the user to auth view
        }
      } catch (error) {
        console.error("Ein Error", error);
      }
      loaded.value = true;
    });

    // watches the change to user value
    watch(user, (currentValue) => {
      // ? you can handle the user's data here, unless there is an error
      // ? you will receive the details in the following format,
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

    watch(user_, (userVal) => {
      // ? you may require an access token for your site, thus you can handle the data here
      // ? after this you may make calls to your API endpoints and continue as usual
      localStorage.setItem("accessToken", userVal);
    });

    // ? You cannot access the components unless you return them
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
