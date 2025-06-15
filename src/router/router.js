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

    if (path !== "/" && !layout ) {
      document.body.innerHTML = "";
      layout = document.createElement("wc-layout");
      document.body.appendChild(layout);
    }

    const content = layout.shadowRoot.querySelector("#app");
    content.innerHTML = "";

    const routes = {
      "/dashboard": () => document.createElement("wc-welcome"),

      // COURSES
      "/courses/beginner": () => document.createElement("wc-beginner-contents-page"),
      "/courses/elementary": () => document.createElement("wc-elementary-contents-page"),
      "/courses/pre-intermediate": () => document.createElement("wc-pre-intermediate-contents-page"),
      "/courses/intermediate": () => document.createElement("wc-intermediate-contents-page"),

      // EXTRAS

      // Audiobooks
      "/extras/audiobooks": () => document.createElement("wc-audiobooks-contents-page"),
      "/extras/audiobooks/starter/young-learners-adults/a-new-zealand-adventure": () => document.createElement("wc-audiobooks-a-new-zealand-adventure"),

      //Grammar
      "/extras/grammar": () => document.createElement("wc-grammar-contents-page"),
      // Elementary
      "/extras/grammar/elementary": () => document.createElement("wc-grammar-elementary"),
      "/extras/grammar/intermediate": () => document.createElement("wc-grammar-intermediate"),

      // Pronunciation
      "/extras/pronunciation": () => document.createElement("wc-under-construction"),

      // Songs
      "/extras/songs": () => document.createElement("wc-under-construction"),
      
      // SPECIFIC PURPOSES
      "/specific-purposes/travel": () => document.createElement("wc-under-construction"),
      "/specific-purposes/business": () => document.createElement("wc-business-contents-page"),

      // Speak Business English Like an American
      "/specific-purposes/business/sbelaa": () => document.createElement("wc-sbelaa-contents-page"),
      "/specific-purposes/business/sbelaa/lesson-1": () => document.createElement("wc-sbelaa-lesson-1")
    }
    
    const routeHandler = routes[path];

    if (routeHandler) {
      const node = routeHandler() // invoke function
      content.appendChild(node);
    } else {
      content.innerHTML = `<wc-four-oh-four></wc-four-oh-four>`
    }
  },
};

export default Router;
