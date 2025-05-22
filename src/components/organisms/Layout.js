class Layout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const css = document.createElement("style"); /*css*/
    css.textContent = `
      
      `;

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
        <div class="layout">
          <div class="header-layout">
            <wc-header></wc-header>
            <wc-navbar></wc-navbar>
          </div>
          <div id="content"></div>
        </div>
      `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Layout;
