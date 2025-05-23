class Layout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const css = document.createElement("style"); /*css*/
    css.textContent = `
      .header-navbar {
        display: flex;
        flex-direction: column;
      }

      #content {
        border: var(--border);
        border-radius: var(--border-radius);
        height: 300px
      }

      `;

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
        <div class="layout">
          <div class="header-header">
            <wc-header></wc-header>
            <wc-navbar></wc-navbar>
          </div>
          <div id="content"></div>
        </div>
      `;

    this.shadowRoot.appendChild(css);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Layout;
