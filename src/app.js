import router from "./router/router"

window.app = {} // Create the 'app' global object
app.router = router // Add Router to 'app' global object

// Guarantee DOM loading before runnning code
window.addEventListener("DOMContentLoaded", () => {
  app.router.init(); // Initialize the router
})