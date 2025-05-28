import Welcome from "@components/organisms/welcome";

const Router = {
  init: () => {
    console.log("Router running");
    Router.handleLocation();
    window.addEventListener("popstate", Router.handleLocation);
  },

  nav: (route, addToHistory = true) => {
    console.log(route);
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }
    Router.handleLocation();
  },

  handleLocation: () => {
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
