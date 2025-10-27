import styleHome from "/src/css/components/organisms/header.css?inline";

class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = styleHome;
    this.shadowRoot.appendChild(style);

    const header = document.createElement("header");

    // Home
    const home = document.createElement("wc-button");
    home.className = "home";
    home.setAttribute("data-icon", "home");
    header.appendChild(home);

    // --- Left div ---
    const leftDiv = document.createElement("div");
    const menuButton = document.createElement("wc-button");
    menuButton.setAttribute("data-icon", "menu");
    menuButton.className = "left-button";
    menuButton.id = "menu-button";
    leftDiv.appendChild(menuButton);

    // --- Right div ---
    const rightDiv = document.createElement("div");
    rightDiv.className = "right-div"
    
    //! Dark Mode
    const darkModeBtn = document.createElement("wc-button");
    darkModeBtn.className = "right-button";
    darkModeBtn.id = "dark-mode",
    darkModeBtn.setAttribute("data-icon", "darkMode");

    //! Login
    const loginBtn = document.createElement("wc-button");
    loginBtn.className = "right-button";
    loginBtn.id = "login",
    loginBtn.setAttribute("data-icon", "login");

    //! Logout
    const logoutBtn = document.createElement("wc-button");
    logoutBtn.className = "right-button";
    logoutBtn.id = "logout",
    logoutBtn.setAttribute("data-icon", "logout");

    rightDiv.append(darkModeBtn, loginBtn, logoutBtn);

    header.append(leftDiv, rightDiv);

    this.shadowRoot.appendChild(header);
  }

  updateLoginVisibility = () => {
    const login = this.shadowRoot.querySelector("data-icon=login");
    if (login) {
      login.style.display =
        window.location.pathname === "/" ? "inline-block" : "none";
    }
  };

  connectedCallback() {
    // Home
    const home = this.shadowRoot.querySelector("[data-icon=home]");
    home.addEventListener("click", () => {
      window.location.href = "/";

    });
    if (
      home &&
      (
        window.location.pathname.endsWith("/pages/sobre.html") ||
        window.location.pathname.endsWith("/pages/teste-nivelamento.html")
      )
    ) {
      home.style.display = "inline-block";
    } else if (home) {
      home.style.display = "none";
    }

    // Menu
    const menuBtn = this.shadowRoot.querySelector("#menu-button");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        const layout = document.querySelector("wc-layout");
        if (layout) {
          const navBar = layout.shadowRoot.querySelector("wc-nav-bar");
          if (navBar) {
            navBar.classList.toggle("open");
          }
        }
      });
    }

    // Dark Mode
    const darkMode = this.shadowRoot.querySelector("[data-icon=darkMode]");
    darkMode.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");

      // Updates button icon
      darkMode.setIcon(isDark ? "lightMode" : "darkMode");

      // Saving at Local Storage
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Login
    const login = this.shadowRoot.querySelector("[data-icon=login]");
    login.addEventListener("click", () => {
      const navigateEvent = new CustomEvent("navigate", {
        detail: "/dashboard",
      });
      this.dispatchEvent(navigateEvent);
    });

    if (login && window.location.pathname !== "/") {
      login.style.display = "none";
    }

    // Logout
    const logout = this.shadowRoot.querySelector("[data-icon=logout]");
    logout.addEventListener("click", () => {
      window.location.href = "/";
    });

    // Local Storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");

      const darkModeBtn = this.shadowRoot.querySelector("[data-icon=darkMode]");
      if (darkModeBtn) {
        darkModeBtn.setIcon("lightMode");
      }
    }
  }
}

export default Header;
