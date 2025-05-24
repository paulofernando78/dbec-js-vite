import cssImportsPath from "/src/css/imports.css?inline";

class Layout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css*/
    css.textContent = `
      .layout {
        display: flex;
        gap: 10px
      }

      #content {
        padding: var(--padding);
        border: var(--border);
        border-radius: var(--border-radius);
        width: 100%;
        height: 100dvh
      }

      @media (max-width: 768px) {
        .layout {
          flex-direction: column
        }

        #navbar {
          display: none
        }
      }
      `;

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <wc-header></wc-header>
      <div class="layout">
        <wc-navbar id="navbar"></wc-navbar>
        <div id="content"></div>
      </div>
    `;

    this.shadowRoot.appendChild(css);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Layout;
