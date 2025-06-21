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

    // courses/{level}/lesson-{number}/{part}
    const courseLessonMatch = path.match(
      /^\/courses\/([^\/]+)\/lesson-(\d+)\/([^\/]+)$/
    );
    if (courseLessonMatch) {
      const [, level, lesson, part] = courseLessonMatch;
      const node = document.createElement("wc-data-page");
      node.setAttribute("path", `courses/${level}`);
      node.setAttribute("lesson", lesson);
      node.setAttribute("part", part);
      content.appendChild(node);
      return;
    }

    // Generic lessons
    const genericLessonMatch = path.match(
      /^\/(.+)\/lesson-(\d+)$/
    );
    if (genericLessonMatch) {
      const [, basePath, lesson] = genericLessonMatch;
      const node = document.createElement("wc-data-page");
      node.setAttribute("path", basePath);
      node.setAttribute("lesson", lesson);
      content.appendChild(node);
      return;
    }

    if (routeHandler) {
      const node = routeHandler(); // invoke function
      content.appendChild(node);
    } else {
      // For all contents.json
      const contentMatch = path.match(
        /^\/(courses|extras|specific-purposes)(\/.+)+$/
      );
      if (contentMatch) {
        const node = document.createElement("wc-data-page");
        node.setAttribute("path", path.slice(1));
        content.appendChild(node);
        return;
      }

      content.innerHTML = `<wc-four-oh-four></wc-four-oh-four>`;
    }
  },
};

export default Router;
