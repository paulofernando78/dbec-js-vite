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
      "/dashboard": () => document.createElement("wc-dashboard"),
    };

    const routeHandler = routes[path];

    if (routeHandler) {
      const node = routeHandler();
      content.appendChild(node);
    } else {
      const genericPageMatch = path.match(/^\/(.+)$/);
      if (genericPageMatch) {
        const [, basePath] = genericPageMatch;
        const node = document.createElement("wc-data-page");
        node.setAttribute("path", basePath);
        node.setAttribute("page", "true");
        content.appendChild(node);
        return;
      }

      content.innerHTML = `<wc-four-oh-four></wc-four-oh-four>`;
    }
  },
};

export default Router;
