const Router = {
  init: () => {
    console.log("Router running");

    document.addEventListener("navigate", (e) => {
      const url = e.detail;
      Router.nav(url);
    });

    Router.locationHandler();
    window.addEventListener("popstate", Router.locationHandler);
  },

  nav: (route, addToHistory = true) => {
    console.log(route);
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }
    Router.locationHandler();
  },

  locationHandler: () => {
    const path = window.location.pathname;

    let layout = document.querySelector("wc-layout");

    if (path !== "/" && !layout) {
      document.body.innerHTML = "";
      layout = document.createElement("wc-layout");
      document.body.appendChild(layout);
    }

    const content = layout.shadowRoot.querySelector("#app");
    content.innerHTML = "";

    const routes = {
      "/dashboard": () => document.createElement("wc-welcome"),
    };

    const routeHandler = routes[path];

    if (routeHandler) {
      const node = routeHandler(); // invoke function
      content.appendChild(node);
    } else {
      const contentMatch = path.match(/^\/(courses|extras|specific-purposes)(\/.+)+$/);
      if (contentMatch) {
        const node = document.createElement("wc-content-page");
        node.setAttribute("path", path.slice(1));
        content.appendChild(node);
        return;
      }

      content.innerHTML = `<wc-four-oh-four></wc-four-oh-four>`;
    }
  },
};

export default Router;
