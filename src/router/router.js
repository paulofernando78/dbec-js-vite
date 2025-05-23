import Layout from '../components/organisms/Layout.js'; 

const routes = {
  '/dashboard': () => {
    const layout = document.createElement('wc-layout');
    return layout;
  },
  '/': () => {
    const home = document.createElement('div');
    home.innerHTML = `<h1>Welcome Home</h1>`;
    return home;
  }
};

function router() {
  const path = window.location.pathname;
  const route = routes[path];

  document.body.innerHTML = "";

  if (route) {
    const component = route();
    document.body.appendChild(component);
  } else {
    document.body.innerHTML = "<h1>404 - Not Found</h1>";
  }
}

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

function init() {
  router();
  window.addEventListener('popstate', router);
}

export default {
  init,
  navigateTo
};