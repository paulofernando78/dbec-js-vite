class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const css = document.createElement("style"); /*css*/
    css.textContent = `
      header {
        height: auto;
        margin-bottom: .625rem;
        padding: var(--padding);
        border: var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      span {
        display: inline-block;
        font-family: "Anton", sans-serif;
        font-size: 1.25rem;
        text-align: center;
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
        margin-left: 4px
      }

      @media (min-width: 768px) {
        #menu-button {
          display: none;
        }
      }
    `;
    this.shadowRoot.appendChild(css);

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <header>
        <div>
        <wc-button data-icon="menu" class="left-button" id="menu-button"></wc-button>
        </div>
        <span id="logo-name">DAILY BASIS ENGLISH COURSE</span>
        <div>
          <wc-button data-icon="darkMode" class="right-button"></wc-button>
          <wc-button data-icon="login" class="right-button"></wc-button>
          <wc-button data-icon="logout" class="right-button"></wc-button>
        </div>
      </header>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
          const navBar = layout.shadowRoot.querySelector("wc-navbar");
          if (navBar) {
            navBar.classList.toggle("open");
          }
        }
      });
    }

    const darkMode = this.shadowRoot.querySelector("[data-icon=darkMode]");
    if (darkMode) {
      darkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");
        darkMode.setIcon(isDark ? "lightMode" : "darkMode");
      });
    }

    const login = this.shadowRoot.querySelector("[data-icon=login]");
    if (login) {
      login.addEventListener("click", () => {
        console.log(login);
        const navigateEvent = new CustomEvent("navigate", {
          detail: "/dashboard",
        });
        this.dispatchEvent(navigateEvent);
      });
      
      if (login && window.location.pathname !== "/") {
        login.style.display = "none";
      }
    }

    const logout = this.shadowRoot.querySelector("[data-icon=logout]");
    if (logout) {
      logout.addEventListener("click", () => {
        console.log(logout);
        window.location.href = "/";
      });
    }
  }
}

export default Header;
