import cssImportsPath from "/src/css/imports.css?inline";

class Layout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const style = document.createElement("style"); /*css*/
    style.textContent = `
      .layout {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
        height: calc(100dvh - 20px)
      }

      .grid-span {
        grid-column: 1 / 3
      }

      #app {
        grid-column: 2;
        grid-row: 2;
        overflow-y: auto;
        padding-right: 8px
      }

      @media (max-width: 768px) {
        .layout {
          display: flex;
          flex-direction: column
        }

        wc-navbar {
          display: none;
        }

        wc-navbar.open {
          display: block;
        }
      }
    `;
    this.shadowRoot.appendChild(style);

    const layout = document.createElement("div");
    layout.classList.add("layout");

    const header = document.createElement("wc-header");
    header.classList.add("grid-span");
    layout.appendChild(header);

    const aside = document.createElement("aside");
    const navBar = document.createElement("wc-nav-bar");
    aside.appendChild(navBar);
    layout.appendChild(aside);

    const app = document.createElement("div");
    app.id = "app";
    layout.appendChild(app);

    const footer = document.createElement("wc-footer");
    footer.classList.add("grid-span");
    layout.appendChild(footer);

    this.shadowRoot.appendChild(layout);
  }
}

export default Layout;
