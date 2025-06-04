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
      <wc-header></wc-header>
      <div class="layout">
        <wc-navbar></wc-navbar>
        <div id="content"></div>
      </div>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Layout;
