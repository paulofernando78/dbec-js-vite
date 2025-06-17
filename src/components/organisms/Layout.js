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

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <div class="layout">
        <wc-header class="grid-span"></wc-header>
        <aside>
          <wc-navbar></wc-navbar>
        </aside>
        <div id="app"></div>
        <wc-footer class="grid-span"></wc-footer>
      </div>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Layout;
