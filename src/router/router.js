const Router = {
  init: () => {
    console.log("Router running");

    document.addEventListener("navigate", (e) => {
      const url = e.detail;
      Router.nav(url);
    });

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

    let layout = document.querySelector("wc-layout");
    
    if (!layout && path !== "/") {
      document.body.innerHTML = "";
      layout = document.createElement("wc-layout");
      document.body.appendChild(layout);
    }

    const content = layout.shadowRoot.querySelector("#app");
    content.innerHTML = "";

    switch (path) {
      case "/dashboard":
        content.appendChild(document.createElement("wc-welcome"));
        break;
      case "/courses/beginner":
        content.appendChild(
          document.createElement("wc-beginner-contents-page")
        );
        break;
      default:
        content.innerHTML = `<wc-four-oh-four></wc-four-oh-four>`;
    }
  },
};

export default Router;
