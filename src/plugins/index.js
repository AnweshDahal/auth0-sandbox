/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import auth0 from "./auth0";

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(router).use(auth0);
}
