import Router from "./router/router";

window.app = {}; // Create the 'app' global object
app.router = Router; // Add Router to 'app' global object

// Guarantee DOM loading before runnning code
window.addEventListener("DOMContentLoaded", () => {
  app.router.init(); // Initialize the router
});

// Listening to <wc-header>
const header = document.querySelector("wc-header");
if (header) {
  header.addEventListener("navigate", (e) => {
    Router.nav(e.detail);
  });
}
