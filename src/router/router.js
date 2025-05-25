import Welcome from "@components/organisms/welcome";

const Router = {
  init: () => {
    console.log("Router running");
    Router.handleRouter();
    window.addEventListener("popstate", Router.handleLocation);

    const header = document.querySelector("wc-header");
    const login = header.shadowRoot.querySelector("[data-icon=login]");
    if (login) {
      login.addEventListener("click", () => {
        Router.nav("/dashboard");
      });
    }
  },

  nav: (route, addToHistory = true) => {
    console.log(route);

    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    Router.handleRouter();
  },

  handleRouter: () => {
    const path = window.location.pathname;

    if (path === "/dashboard") {
      document.body.innerHTML = "";

      const layout = document.createElement("wc-layout");
      document.body.appendChild(layout);

      const content = layout.shadowRoot.querySelector("#content");
      content.innerHTML = "";

      const welcome = document.createElement("wc-welcome");
      content.appendChild(welcome);
    }
  },
};

export default Router;
