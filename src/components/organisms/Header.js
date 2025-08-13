class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const css = document.createElement("style"); /*css*/
    css.textContent = `
      header {
        height: auto;
        padding: var(--padding);
        border: var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .left-button {
        position: relative;
        top: 2px;
        left: 2px;
      }

       .right-button {
        position: relative;
        top: 2px;
        right: 2px;
        margin-left: 9px
      }

      @media (min-width: 778px) {
        #menu-button {
          display: none;
        }
      }
    `;
    this.shadowRoot.appendChild(css);

    const header = document.createElement("header");

    // --- Left div ---
    const leftDiv = document.createElement("div");
    const menuButton = document.createElement("wc-button");
    menuButton.setAttribute("data-icon", "menu");
    menuButton.classList.add("left-button");
    menuButton.id = "menu-button";
    leftDiv.appendChild(menuButton);

    // --- Righ div ---
    const rightDiv = document.createElement("div");

    const darkModeBtn = document.createElement("wc-button");
    darkModeBtn.setAttribute("data-icon", "darkMode");
    darkModeBtn.classList.add("right-button");

    const loginBtn = document.createElement("wc-button");
    loginBtn.setAttribute("data-icon", "login");
    loginBtn.classList.add("right-button");
    // loginBtn.style.display = "none";
    
    const logoutBtn = document.createElement("wc-button");
    logoutBtn.setAttribute("data-icon", "logout");
    logoutBtn.classList.add("right-button");

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
    if (darkMode) {
      darkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");
        
        // Updates button icon
        darkMode.setIcon(isDark ? "lightMode" : "darkMode");

        // Saving at Local Storage 
        localStorage.setItem("theme", isDark ? "dark" : "light")
      });
    }

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
    

    const logout = this.shadowRoot.querySelector("[data-icon=logout]");
    if (logout) {
      logout.addEventListener("click", () => {
        window.location.href = "/";
      });
    }

    // Local Storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");

      const darkModeBtn = this.shadowRoot.querySelector("[data-icon=darkMode]");
      if (darkModeBtn) {
        darkModeBtn.setIcon("lightMode")
      }
    }
  }
}

export default Header;
